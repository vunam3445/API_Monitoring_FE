import React from 'react';

const PerformanceCharts = ({ stats, loading }) => {
    // Default values if stats is null or loading
    const uptimePct = stats?.globalUptimePercentage || 0;
    const methodStats = stats?.methodDistribution || { GET: 0, POST: 0, OTHER: 0 };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Response Time Trend - Static placeholder for now until history API exists */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Response Time Trend</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 uppercase">HISTORY</span>
                </div>
                <div className="h-32 flex items-end gap-1.5 justify-center text-slate-300 dark:text-slate-600 italic text-xs">
                    Trend data will be available soon
                </div>
            </div>

            {/* Global Uptime Chart */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Global Uptime %</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-600">LIVE</span>
                </div>
                <div className="relative h-32 w-32 mx-auto">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <>
                            <svg className="w-full h-full transform -rotate-90">
                                <circle className="text-slate-100 dark:text-slate-700" cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" strokeWidth="8"></circle>
                                <circle 
                                    className="text-primary transition-all duration-1000" 
                                    cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" 
                                    strokeWidth="8"
                                    strokeDasharray="339.29"
                                    strokeDashoffset={339.29 - (339.29 * uptimePct) / 100}
                                ></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl font-bold text-slate-900 dark:text-white">{uptimePct.toFixed(1)}%</span>
                                <span className="text-[10px] text-slate-500">System Wide</span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Error Rate - Placeholder */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Error Rate</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 uppercase">REAL-TIME</span>
                </div>
                <div className="h-32 flex items-center justify-center text-slate-300 dark:text-slate-600 italic text-xs">
                    No active errors detected
                </div>
            </div>

            {/* Checks Activity Distribution */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Method Distribution</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 uppercase">ACTIVITY</span>
                </div>
                <div className="space-y-4">
                    {['GET', 'POST', 'OTHER'].map(method => {
                        const val = methodStats[method] || 0;
                        return (
                            <div key={method} className="flex items-center gap-4">
                                <div className="w-16 text-xs text-slate-500">{method}</div>
                                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                    <div 
                                        className="bg-primary h-full transition-all duration-1000" 
                                        style={{ width: `${val}%` }}
                                    ></div>
                                </div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">{val}%</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PerformanceCharts;
