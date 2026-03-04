export interface StockData {
    open: number;
    high: number;
    low: number;
    volume: number;
    marketCap: number;
}

export interface SentimentAnalysis {
    overall_sentiment_score: number;
    sentiment_label: 'Bullish' | 'Bearish' | 'Neutral';
    confidence_score: number;
    positive_factors: string[];
    negative_factors: string[];
    reasoning_summary: string;
    recommendation: 'Buy' | 'Hold' | 'Sell';
    risk_level: 'Low' | 'Medium' | 'High';
}

export interface AnalysisResult extends SentimentAnalysis {
    price: number;
    rsi: number;
    sma20: number;
    sma50: number;
    ema20: number;
    volumeAnomaly: boolean;
    trend: 'Uptrend' | 'Downtrend';
    market_data: StockData;
    history: any[]; // Or define strict HistoricalData type
    news: string[];
}
