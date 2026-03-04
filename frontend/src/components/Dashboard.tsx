import React, { useState, useEffect } from 'react';
import { getMarketAnalysis } from '../api/marketApi';
import { AnalysisResult } from '../types';
import StockChart from './StockChart';
import SentimentPanel from './SentimentPanel';
import { Search, Loader2, ArrowUpCircle, ArrowDownCircle, Activity } from 'lucide-react';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
    const [ticker, setTicker] = useState('AAPL');
    const [inputTicker, setInputTicker] = useState('AAPL');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<AnalysisResult | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getMarketAnalysis(ticker);
            setData(result);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to fetch analysis');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, [ticker]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputTicker.trim()) {
            setTicker(inputTicker.trim().toUpperCase());
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                    AI Market Sentinel
                </h1>

                <form onSubmit={handleSearch} className="flex w-full md:w-auto relative">
                    <input
                        type="text"
                        value={inputTicker}
                        onChange={(e) => setInputTicker(e.target.value)}
                        placeholder="Search Ticker (e.g. NVDA)"
                        className="bg-slate-800 text-white rounded-l-lg px-4 py-2 border border-slate-700 outline-none focus:border-emerald-500 w-full md:w-64"
                    />
                    <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-r-lg flex items-center transition-colors"
                    >
                        <Search size={20} />
                    </button>
                </form>
            </header>

            {/* Content */}
            {loading && !data && (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-emerald-500" size={48} />
                </div>
            )}

            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6 text-center">
                    {error}
                </div>
            )}

            {data && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Chart Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Price Header */}
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex justify-between items-end">
                            <div>
                                <h2 className="text-4xl font-bold">{data.market_data.marketCap > 0 ? ticker : ticker}</h2>
                                <div className="text-sm text-slate-400 mt-1">
                                    Last Updated: {format(new Date(), 'HH:mm:ss')}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-5xl font-mono font-bold text-white">
                                    ${data.price.toFixed(2)}
                                </div>
                                <div className={`text-lg font-medium flex justify-end items-center gap-1 ${data.trend === 'Uptrend' ? 'text-emerald-400' : 'text-red-400'
                                    }`}>
                                    {data.trend === 'Uptrend' ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                                    {data.trend}
                                </div>
                            </div>
                        </div>

                        {/* Chart */}
                        <StockChart history={data.history} />

                        {/* Technical Indicators Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                                <div className="text-slate-400 text-xs uppercase">RSI (14)</div>
                                <div className={`text-2xl font-bold ${data.rsi > 70 ? 'text-red-400' : data.rsi < 30 ? 'text-emerald-400' : 'text-white'}`}>
                                    {data.rsi}
                                </div>
                                <div className="text-xs text-slate-500">{data.rsi > 70 ? 'Overbought' : data.rsi < 30 ? 'Oversold' : 'Neutral'}</div>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                                <div className="text-slate-400 text-xs uppercase">SMA (20)</div>
                                <div className="text-2xl font-bold text-blue-400">{data.sma20}</div>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                                <div className="text-slate-400 text-xs uppercase">EMA (20)</div>
                                <div className="text-2xl font-bold text-purple-400">{data.ema20}</div>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                                <div className="text-slate-400 text-xs uppercase">Vol. Anomaly</div>
                                <div className={`text-xl font-bold ${data.volumeAnomaly ? 'text-yellow-400' : 'text-slate-300'}`}>
                                    {data.volumeAnomaly ? 'DETECTED' : 'Normal'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Sentiment & News */}
                    <div className="space-y-6">
                        <SentimentPanel data={data} />

                        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Activity size={20} className="text-blue-400" /> Latest News
                            </h3>
                            <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {data.news.map((headline, i) => (
                                    <li key={i} className="text-sm text-slate-300 border-b border-slate-700 pb-2 last:border-0 hover:text-white transition-colors">
                                        {headline}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
