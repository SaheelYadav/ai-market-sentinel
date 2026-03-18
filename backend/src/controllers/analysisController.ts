import { Request, Response } from 'express';
import * as marketService from '../services/marketService';
import * as geminiService from '../services/geminiService';
import { calculateRSI, calculateSMA, calculateEMA, detectVolumeAnomaly } from '../utils/technicalIndicators';

export const analyzeStock = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ticker } = req.params;
        if (!ticker || typeof ticker !== 'string') {
            res.status(400).json({ error: 'Ticker is required and must be a string' });
            return;
        }

        console.log(`🔍 Starting analysis for ticker: ${ticker}`);

        // 1. Fetch Data
        console.log(`📊 Fetching market data for ${ticker}...`);
        const [quote, history, news] = await Promise.all([
            marketService.getStockQuote(ticker),
            marketService.getHistoricalData(ticker),   // ✅ FIXED
            marketService.getStockNews(ticker)
        ]);

        console.log(`✅ Market data fetched successfully for ${ticker}`);

        if (!history || history.length < 50) {
            res.status(400).json({ error: 'Not enough historical data for analysis' });
            return;
        }

        // 2. Process Technical Indicators
        const closePrices = history.map((d: any) => d.close);
        const volumes = history.map((d: any) => d.volume);

        const rsi = calculateRSI(closePrices, 14);
        const sma20 = calculateSMA(closePrices, 20);
        const sma50 = calculateSMA(closePrices, 50);
        const ema20 = calculateEMA(closePrices, 20);
        const volumeAnomaly = detectVolumeAnomaly(volumes, 20, 1.5);

        const technicalData = {
            price: quote.regularMarketPrice,
            rsi: rsi[rsi.length - 1],
            sma20: sma20[sma20.length - 1],
            sma50: sma50[sma50.length - 1],
            ema20: ema20[ema20.length - 1],
            volumeAnomaly,
            trend: sma20[sma20.length - 1] > sma50[sma50.length - 1] ? 'Uptrend' : 'Downtrend'
        };

        // 3. AI Sentiment Analysis
        const headlines = news.map((n: any) => n.title).slice(0, 10); // Top 10 headlines
        const sentimentAnalysis = await geminiService.analyzeMarketSentiment(ticker, headlines, technicalData);

        // 4. Combine & Return
        const result = {
            ...technicalData,
            ...sentimentAnalysis,
            market_data: {
                open: quote.regularMarketOpen,
                high: quote.regularMarketDayHigh,
                low: quote.regularMarketDayLow,
                volume: quote.regularMarketVolume,
                marketCap: quote.marketCap
            },
            history: history, // Include full history for charts
            news: headlines
        };

        res.json(result);

    } catch (error) {
        console.error('❌ Error analyzing stock:', error);
        console.error('Error details:', {
            message: error?.message,
            stack: error?.stack,
            name: error?.name,
            ticker: req.params?.ticker
        });
        
        // Send more specific error message
        const errorMessage = error?.message || 'Unknown error occurred';
        res.status(500).json({ 
            error: 'Analysis failed', 
            details: errorMessage,
            ticker: req.params?.ticker
        });
    }
};

export const analyzeSentiment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { headlines } = req.body;
        if (!headlines || !Array.isArray(headlines)) {
            res.status(400).json({ error: 'Array of headlines is required' });
            return;
        }

        // For pure sentiment analysis without technical context, we can mock or omit technicals
        // Or just analyze text. I'll reuse the service but pass dummy technicals or modify service.
        // For now, let's just analyze text sentiment using a simpler prompt or the same service with null technicals.
        // I will call a specialized method if needed, or just pass empty technicals.
        // simpler: call gemini directly here for text-only analysis if the service is rigid.
        // But the prompt in service expects technicals.
        // I'll update service to make technicals optional or handle it here.
        // Let's assume standard usage mostly via `analyzeStock`.
        // For this specific endpoint, I'll return a "Not Implemented" or reuse logic with defaults.
        // Actually, `analyzeMarketSentiment` uses technicals in the prompt.
        // I'll pass dummy values if technicals are missing.
        const dummyTechnicals = { price: 'N/A', rsi: 'N/A', sma20: 'N/A', ema20: 'N/A', volumeAnomaly: false };
        const result = await geminiService.analyzeMarketSentiment('Unknown', headlines, dummyTechnicals);

        res.json(result);
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        res.status(500).json({ error: 'Sentiment analysis failed' });
    }
};
