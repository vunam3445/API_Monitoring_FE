import React, { useState, useEffect } from 'react';
import { adminDashboardService } from '../../../../../services/adminDashboardService';

const UptimePerformance = ({ performanceData: initialData }) => {
    const [performance, setPerformance] = useState(initialData);
    const [range, setRange] = useState('1d');
    const [loading, setLoading] = useState(false);

    const ranges = [
        { label: '1H', value: '1h' },
        { label: '6H', value: '6h' },
        { label: '24H', value: '1d' },
        { label: '7D', value: '7d' },
        { label: '30D', value: '30d' }
    ];

    const fetchRangeData = async (newRange) => {
        setRange(newRange);
        setLoading(true);
        try {
            const data = await adminDashboardService.getPerformance(newRange);
            setPerformance(data);
        } catch (error) {
            console.error('Failed to fetch range data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Update performance if prop changes (initial load)
    useEffect(() => {
        setPerformance(initialData);
    }, [initialData]);

    const maxVal = performance?.chartData ? Math.max(...performance.chartData, 1) : 1;

    return (
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Uptime & Performance</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Response time trends over the last {range}</p>
                </div>
                <div className="flex gap-2 text-slate-800 dark:text-slate-200">
                    {ranges.map((r) => (
                        <button
                            key={r.value}
                            onClick={() => fetchRangeData(r.value)}
                            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                                range === r.value 
                                    ? 'bg-primary text-white shadow-sm shadow-primary/40' 
                                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                        >
                            {r.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className={`p-6 flex-1 flex flex-col gap-6 transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}>
                <div className="flex gap-8">
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Avg. Response Time</p>
                        <p className="text-2xl font-bold text-blue-500">{performance?.avgResponseTime || '---'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Uptime %</p>
                        <p className="text-2xl font-bold text-emerald-500">{performance?.uptimePercentage || '---'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Error Rate</p>
                        <p className="text-2xl font-bold text-red-400">{performance?.errorRate || '---'}</p>
                    </div>
                </div>
                <div className="relative h-64 w-full bg-gradient-to-b from-blue-500/5 to-transparent rounded-lg border-l border-b border-slate-200 dark:border-slate-800 flex items-end px-4 gap-1 overflow-hidden group">
                    {performance?.chartData?.map((val, i) => (
                        <div 
                            key={i} 
                            className="flex-1 transition-all opacity-80 group-hover:opacity-100 rounded-t bg-blue-500/30 hover:bg-blue-500/60 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                            style={{ height: `${(val / maxVal) * 100}%` }}
                            title={`${val}ms`}
                        ></div>
                    ))}
                    {!performance?.chartData && (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm italic">
                            No data available for this range
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UptimePerformance;
