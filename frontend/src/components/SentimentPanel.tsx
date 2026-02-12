import React from 'react';
import { AnalysisResult } from '../types';
import { TrendingUp, TrendingDown, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

interface Props {
    data: AnalysisResult;
}

const SentimentPanel: React.FC<Props> = ({ data }) => {
    const {
        overall_sentiment_score,
        sentiment_label,
        confidence_score,
        reasoning_summary,
        positive_factors,
        negative_factors,
        recommendation,
        risk_level
    } = data;

    // Normalize score to 0-100 for progress bar
    const scorePercent = ((overall_sentiment_score + 1) / 2) * 100;

    const getScoreColor = (score: number) => {
        if (score > 0.3) return 'text-emerald-400';
        if (score < -0.3) return 'text-red-400';
        return 'text-yellow-400';
    };

    const getBgColor = (score: number) => {
        if (score > 0.3) return 'bg-emerald-500';
        if (score < -0.3) return 'bg-red-500';
        return 'bg-yellow-500';
    };

    return (
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                AI Sentiment Analysis
                <span className={`text-sm px-2 py-1 rounded-full bg-slate-700 ${getScoreColor(overall_sentiment_score)} border border-slate-600`}>
                    {sentiment_label}
                </span>
            </h2>

            {/* Sentiment Meter */}
            <div className="mb-6">
                <div className="flex justify-between text-sm text-slate-400 mb-1">
                    <span>Bearish (-1)</span>
                    <span>Neutral (0)</span>
                    <span>Bullish (+1)</span>
                </div>
                <div className="h-4 bg-slate-700 rounded-full overflow-hidden relative">
                    <div
                        className={`h-full transition-all duration-1000 ease-out ${getBgColor(overall_sentiment_score)}`}
                        style={{ width: `${scorePercent}%` }}
                    />
                    {/* Center marker */}
                    <div className="absolute top-0 left-1/2 w-0.5 h-full bg-slate-500 transform -translate-x-1/2" />
                </div>
                <div className="mt-2 text-center font-mono text-xl font-bold text-white">
                    {overall_sentiment_score.toFixed(2)}
                </div>
            </div>

            {/* Investment Recommendation & Confidence */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <div className="text-sm text-slate-400 mb-1">Recommendation</div>
                    <div className={`text-2xl font-bold ${recommendation === 'Buy' ? 'text-emerald-400' :
                        recommendation === 'Sell' ? 'text-red-400' : 'text-yellow-400'
                        }`}>
                        {recommendation.toUpperCase()}
                    </div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <div className="text-sm text-slate-400 mb-1">AI Confidence</div>
                    <div className="text-2xl font-bold text-blue-400">
                        {confidence_score}%
                    </div>
                </div>
            </div>

            {/* Risk Level */}
            <div className="mb-6 flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
                {risk_level === 'Low' ? <ShieldCheck className="text-emerald-400" /> :
                    risk_level === 'Medium' ? <Shield className="text-yellow-400" /> :
                        <ShieldAlert className="text-red-400" />}
                <div>
                    <span className="text-slate-400 text-sm">Risk Level: </span>
                    <span className={`font-semibold ${risk_level === 'Low' ? 'text-emerald-400' :
                        risk_level === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                        }`}>{risk_level}</span>
                </div>
            </div>

            {/* Reasoning */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-slate-200">Analysis Summary</h3>
                <p className="text-slate-300 text-sm leading-relaxed bg-slate-700/30 p-3 rounded-lg border border-slate-600/50">
                    {reasoning_summary}
                </p>
            </div>

            {/* Factors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-1">
                        <TrendingUp size={16} /> Bullish Factors
                    </h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                        {positive_factors.length > 0 ? positive_factors.map((f, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-emerald-500 mt-1">•</span>
                                <span>{f}</span>
                            </li>
                        )) : <li className="text-slate-500 italic">None identified</li>}
                    </ul>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-1">
                        <TrendingDown size={16} /> Bearish Factors
                    </h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                        {negative_factors.length > 0 ? negative_factors.map((f, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>{f}</span>
                            </li>
                        )) : <li className="text-slate-500 italic">None identified</li>}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default SentimentPanel;
