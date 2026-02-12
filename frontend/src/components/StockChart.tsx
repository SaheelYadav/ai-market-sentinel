import React, { useMemo } from 'react';
import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import { format } from 'date-fns';

interface Props {
    history: any[]; // Assuming array of { date, open, high, low, close, volume }
    sma20?: number;
    sma50?: number;
}

const StockChart: React.FC<Props> = ({ history }) => {
    // Format data for chart
    const data = useMemo(() => {
        if (!history) return [];
        return history.map((d: any) => ({
            date: format(new Date(d.date), 'MMM dd'),
            price: d.close,
            volume: d.volume,
            // For real SMA overlay, we need computed SMA array from backend for history.
            // Or compute it here.
            // The backend returns current SMA, not historical series in the main analysis endpoint.
            // To overlay SMA, we need SMA history.
            // For now, let's just plot price and volume.
        }));
    }, [history]);

    if (!data || data.length === 0) return <div className="text-center p-10 text-slate-500">No chart data available</div>;

    return (
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-slate-200">Price History (6 Months)</h3>
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#9CA3AF"
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            minTickGap={30}
                        />
                        <YAxis
                            yAxisId="left"
                            stroke="#9CA3AF"
                            domain={['auto', 'auto']}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            tickFormatter={(value) => `$${value.toFixed(0)}`}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#9CA3AF"
                            tick={{ fill: '#9CA3AF', fontSize: 10 }}
                            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                            itemStyle={{ color: '#E5E7EB' }}
                            formatter={(value: any) => [typeof value === 'number' ? value.toFixed(2) : value, '']}
                            labelStyle={{ color: '#9CA3AF' }}
                        />
                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="price"
                            stroke="#10B981"
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                            strokeWidth={2}
                        />
                        <Bar
                            yAxisId="right"
                            dataKey="volume"
                            barSize={10}
                            fill="#3B82F6"
                            opacity={0.3}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StockChart;
