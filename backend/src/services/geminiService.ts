import { GoogleGenerativeAI } from '@google/generative-ai';
import env from '../config/env';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

interface SentimentAnalysisResult {
    overall_sentiment_score: number; // -1 to +1
    sentiment_label: 'Bullish' | 'Bearish' | 'Neutral';
    confidence_score: number; // Percentage (0-100)
    positive_factors: string[];
    negative_factors: string[];
    reasoning_summary: string;
    recommendation: 'Buy' | 'Hold' | 'Sell';
    risk_level: 'Low' | 'Medium' | 'High';
}

export async function analyzeMarketSentiment(
    ticker: string,
    headlines: string[],
    technicalData: any
): Promise<SentimentAnalysisResult> {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", generationConfig: { responseMimeType: "application/json" } });

    const prompt = `
    You are an expert financial analyst AI. Analyze the market sentiment for the stock ticker: ${ticker}.
    
    Here are the latest news headlines:
    ${headlines.length > 0 ? headlines.map((h, i) => `${i + 1}. ${h}`).join('\n') : 'No recent news available.'}
    
    Here are the technical indicators:
    - Current Price: ${technicalData.price}
    - RSI (14): ${technicalData.rsi}
    - SMA (20): ${technicalData.sma20}
    - EMA (20): ${technicalData.ema20}
    - Volume Anomaly: ${technicalData.volumeAnomaly ? 'Yes' : 'No'}
    
    Task:
    1. Analyze the overall market sentiment based on news and technicals.
    2. Identify bullish and bearish signals.
    3. Provide a confidence score (0-100%).
    4. Provide a unique investment recommendation ("Buy", "Hold", "Sell").
    5. Assess risk level ("Low", "Medium", "High").
    6. Provide a concise reasoning summary.
    
    CRITICAL: Output MUST be valid JSON only. No markdown, no triple backticks.
    
    Example Output Format:
    {
      "overall_sentiment_score": 0.75,
      "sentiment_label": "Bullish",
      "confidence_score": 85,
      "positive_factors": ["Strong volume", "Rising RSI"],
      "negative_factors": ["Overbought in short term"],
      "reasoning_summary": "Strong momentum confirmed by volume spike.",
      "recommendation": "Buy",
      "risk_level": "Medium"
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        console.log(`Gemini analysis requested for ${ticker}`);

        const response = await result.response;
        const text = response.text();

        // Clean potential markdown or unexpected chars
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const data = JSON.parse(cleanedText) as SentimentAnalysisResult;

            // Basic validation of required fields
            if (typeof data.overall_sentiment_score !== 'number' || !data.recommendation) {
                throw new Error('Invalid JSON structure returned from Gemini');
            }

            return data;
        } catch (parseError) {
            console.error('Failed to parse Gemini response:', parseError);
            console.error('Raw response:', text);
            throw new Error('AI returned invalid analysis format');
        }

    } catch (error) {
        console.error('Error in Gemini analysis service:', error);
        
        // Check for missing API key
        if (error.message?.includes('API_KEY') || error.status === 400) {
            return {
                overall_sentiment_score: 0,
                sentiment_label: 'Neutral',
                confidence_score: 0,
                positive_factors: ['Configuration needed'],
                negative_factors: ['API key not configured'],
                reasoning_summary: 'AI analysis service is not properly configured. Please check environment variables.',
                recommendation: 'Hold',
                risk_level: 'High'
            };
        }
        
        // Check for rate limiting
        if (error.status === 429) {
            return {
                overall_sentiment_score: 0,
                sentiment_label: 'Neutral',
                confidence_score: 0,
                positive_factors: ['Rate limited by AI service'],
                negative_factors: ['AI service temporarily unavailable'],
                reasoning_summary: 'AI analysis temporarily unavailable due to rate limits. Please try again in a few minutes.',
                recommendation: 'Hold',
                risk_level: 'Medium'
            };
        }
        
        // Return a graceful fallback instead of crashing
        return {
            overall_sentiment_score: 0,
            sentiment_label: 'Neutral',
            confidence_score: 0,
            positive_factors: [],
            negative_factors: [],
            reasoning_summary: 'AI analysis unavailable at the moment. Please try again later.',
            recommendation: 'Hold',
            risk_level: 'Low'
        };
    }
}
