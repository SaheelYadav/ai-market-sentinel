import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance();

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 30 * 1000; // 30 seconds

// Validate ticker format
function isValidTicker(ticker: string): boolean {
    // Check if ticker is 1-5 letters, numbers, or dots
    const tickerRegex = /^[A-Z0-9.]{1,5}$/;
    return tickerRegex.test(ticker.toUpperCase());
}

// ===============================
// 📈 Get Real-Time Stock Quote
// ===============================
export async function getStockQuote(ticker: string) {
    // Validate ticker format
    if (!isValidTicker(ticker)) {
        throw new Error(`Invalid ticker format: ${ticker}. Stock symbols should be 1-5 characters (letters, numbers, or dots).`);
    }

    const cacheKey = `quote_${ticker}`;

    if (cache.has(cacheKey)) {
        const entry = cache.get(cacheKey)!;
        if (Date.now() - entry.timestamp < CACHE_TTL) {
            return entry.data;
        }
    }

    try {
        const quote = await yahooFinance.quote(ticker);

        if (!quote) {
            throw new Error('No quote data returned');
        }

        cache.set(cacheKey, { data: quote, timestamp: Date.now() });
        return quote;

    } catch (error) {
        console.error(`Error fetching quote for ${ticker}:`, error);
        throw new Error(`Invalid stock ticker: ${ticker}. Please enter a valid stock symbol.`);
    }
}

// =====================================
// 📊 Get 6 Months Historical Data
// =====================================
export async function getHistoricalData(ticker: string) {
    // Validate ticker format
    if (!isValidTicker(ticker)) {
        throw new Error(`Invalid ticker format: ${ticker}. Stock symbols should be 1-5 characters (letters, numbers, or dots).`);
    }

    const cacheKey = `history_${ticker}`;

    if (cache.has(cacheKey)) {
        const entry = cache.get(cacheKey)!;
        if (Date.now() - entry.timestamp < CACHE_TTL) {
            return entry.data;
        }
    }

    try {
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6);

        const historical = await yahooFinance.historical(ticker, {
            period1: startDate,
            period2: new Date(),
            interval: '1d'
        });

        if (!historical || historical.length === 0) {
            throw new Error('No historical data returned');
        }

        cache.set(cacheKey, { data: historical, timestamp: Date.now() });
        return historical;

    } catch (error) {
        console.error(`Error fetching historical data for ${ticker}:`, error);
        throw new Error(`Unable to fetch historical data for ${ticker}. Please verify the stock symbol.`);
    }
}


// =====================================
// 📰 Get Latest Stock News
// =====================================
export async function getStockNews(ticker: string) {
    // Validate ticker format
    if (!isValidTicker(ticker)) {
        throw new Error(`Invalid ticker format: ${ticker}. Stock symbols should be 1-5 characters (letters, numbers, or dots).`);
    }

    const cacheKey = `news_${ticker}`;

    if (cache.has(cacheKey)) {
        const entry = cache.get(cacheKey)!;
        if (Date.now() - entry.timestamp < CACHE_TTL) {
            return entry.data;
        }
    }

    try {
        const result = await yahooFinance.search(ticker, {
            newsCount: 10
        });

        const news = result?.news ?? [];

        cache.set(cacheKey, { data: news, timestamp: Date.now() });
        return news;

    } catch (error) {
        console.error(`Error fetching news for ${ticker}:`, error);
        throw new Error(`Unable to fetch news for ${ticker}. Please verify the stock symbol.`);
    }
}
