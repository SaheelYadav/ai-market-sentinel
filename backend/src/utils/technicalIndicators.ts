/**
 * Calculate Relative Strength Index (RSI) manually.
 * formula: RSI = 100 - (100 / (1 + RS))
 * where RS = Average Gain / Average Loss over a period (usually 14).
 */
export function calculateRSI(prices: number[], period: number = 14): number[] {
    if (prices.length < period + 1) {
        return []; // Not enough data
    }

    const rsiValues: number[] = [];
    let gains = 0;
    let losses = 0;

    // First RSI calculation: Simple Average
    for (let i = 1; i <= period; i++) {
        const change = prices[i] - prices[i - 1];
        if (change > 0) {
            gains += change;
        } else {
            losses += Math.abs(change);
        }
    }

    let avgGain = gains / period;
    let avgLoss = losses / period;

    // Calculate first RSI
    let rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    let rsi = 100 - (100 / (1 + rs));
    rsiValues.push(Number(rsi.toFixed(2))); // First RSI value at index `period`

    // Subsequent calculations (Smoothed Average)
    for (let i = period + 1; i < prices.length; i++) {
        const change = prices[i] - prices[i - 1];
        const gain = change > 0 ? change : 0;
        const loss = change < 0 ? Math.abs(change) : 0;

        avgGain = (avgGain * (period - 1) + gain) / period;
        avgLoss = (avgLoss * (period - 1) + loss) / period;

        rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        rsi = 100 - (100 / (1 + rs));
        rsiValues.push(Number(rsi.toFixed(2)));
    }

    return rsiValues;
}

/**
 * Calculate Simple Moving Average (SMA).
 */
export function calculateSMA(prices: number[], period: number): number[] {
    if (prices.length < period) return [];
    const smaValues: number[] = [];

    for (let i = 0; i <= prices.length - period; i++) {
        const sum = prices.slice(i, i + period).reduce((a, b) => a + b, 0);
        smaValues.push(Number((sum / period).toFixed(2)));
    }
    return smaValues;
}

/**
 * Calculate Exponential Moving Average (EMA).
 * Formula: EMA_today = (Value_today * (k)) + (EMA_yesterday * (1 - k))
 * k = 2 / (N + 1)
 */
export function calculateEMA(prices: number[], period: number): number[] {
    if (prices.length < period) return [];

    const k = 2 / (period + 1);
    const emaValues: number[] = [];

    // Start with SMA for the first EMA value
    const initialSMA = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;
    emaValues.push(Number(initialSMA.toFixed(2)));

    let previousEMA = initialSMA;

    for (let i = period; i < prices.length; i++) {
        const currentPrice = prices[i];
        const currentEMA = (currentPrice * k) + (previousEMA * (1 - k));
        emaValues.push(Number(currentEMA.toFixed(2)));
        previousEMA = currentEMA;
    }

    return emaValues;
}

/**
 * Detect Volume Spikes.
 * Returns true if the latest volume is significantly higher than the average volume of the previous `period`.
 * Threshold multiplier defines "significantly higher" (default 1.5x).
 */
export function detectVolumeAnomaly(volumes: number[], period: number = 20, thresholdMultiplier: number = 1.5): boolean {
    if (volumes.length < period + 1) return false;

    const latestVolume = volumes[volumes.length - 1];
    const previousVolumes = volumes.slice(volumes.length - period - 1, volumes.length - 1);
    const avgVolume = previousVolumes.reduce((a, b) => a + b, 0) / previousVolumes.length;

    return latestVolume > (avgVolume * thresholdMultiplier);
}
