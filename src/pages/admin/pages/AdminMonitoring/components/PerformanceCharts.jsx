import React from 'react';

const PerformanceCharts = ({ charts, stats, loading }) => {
    // Default values if charts is null or loading
    const uptimeData = charts?.uptime || {};
    const uptimePct = uptimeData.uptimePercentage ?? 0;
    
    const methodData = charts?.methods?.distributions || [];
    const methodStats = methodData.reduce((acc, curr) => {
        acc[curr.method] = curr.percentage;
        return acc;
    }, { GET: 0, POST: 0, OTHER: 0 });

    const responseTimeData = charts?.responseTime?.points || [];

    // Calculate Error Rate from stats
    const totalApis = stats?.totalApis || 0;
    const down = stats?.down || 0;
    const errorRate = totalApis > 0 ? (down / totalApis) * 100 : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Response Time Trend */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Response Time Trend</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-600 uppercase">TREND</span>
                </div>
                {loading ? (
                    <div className="h-32 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : responseTimeData.length > 0 ? (
                    <div className="h-32 flex items-end gap-1 px-2">
                        {responseTimeData.map((point, i) => {
                            const maxLatency = Math.max(...responseTimeData.map(p => p.avgLatencyMs), 1);
                            const height = (point.avgLatencyMs / maxLatency) * 100;
                            return (
                                <div 
                                    key={i} 
                                    className="flex-1 bg-orange-500/20 hover:bg-orange-500 rounded-t-sm transition-all group relative cursor-help"
                                    style={{ height: `${height}%` }}
                                >
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 transition-opacity">
                                        {point.avgLatencyMs.toFixed(1)}ms
                                        <br />
                                        {new Date(point.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="h-32 flex items-center justify-center text-slate-300 dark:text-slate-600 italic text-xs">
                        Trend data unavailable
                    </div>
                )}
            </div>

            {/* Global Uptime Chart */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Global Uptime %</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-600">DASHBOARD</span>
                </div>
                <div className="relative h-32 w-32 mx-auto">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <>
                            <svg className="w-full h-full transform -rotate-90">
                                <circle className="text-slate-100 dark:text-slate-700" cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" strokeWidth="8"></circle>
                                <circle 
                                    className="text-emerald-500 transition-all duration-1000" 
                                    cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" 
                                    strokeWidth="8"
                                    strokeDasharray="339.29"
                                    strokeDashoffset={339.29 - (339.29 * uptimePct) / 100}
                                    strokeLinecap="round"
                                ></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl font-bold text-slate-900 dark:text-white">{uptimePct.toFixed(2)}%</span>
                                <span className="text-[10px] text-slate-500">System Wide</span>
                            </div>
                        </>
                    )}
                </div>
                <div className="mt-4 flex justify-center gap-4 text-[10px] font-bold text-slate-500">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span>Success: {uptimeData.successfulChecks?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                        <span>Total: {uptimeData.totalChecks?.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Error Rate Chart */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Error Rate</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${errorRate > 0 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {errorRate > 0 ? 'Warning' : 'Healthy'}
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center h-32 space-y-2">
                    {loading ? (
                        <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                                {errorRate.toFixed(1)}%
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-48 h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full transition-all duration-1000 ${errorRate > 0 ? 'bg-red-500' : 'bg-emerald-500'}`}
                                        style={{ width: `${errorRate}%` }}
                                    ></div>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-500 font-medium">
                                {down} of {totalApis} APIs are currently down
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Method Distribution Chart */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Method Distribution</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 uppercase">ACTIVITY</span>
                </div>
                <div className="space-y-4">
                    {loading ? (
                         <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-8 w-full bg-slate-50 dark:bg-slate-900 animate-pulse rounded"></div>
                            ))}
                         </div>
                    ) : (
                        ['GET', 'POST', 'OTHER'].map(method => {
                            const val = methodStats[method] || 0;
                            const colors = {
                                GET: 'bg-emerald-500',
                                POST: 'bg-blue-500',
                                OTHER: 'bg-slate-400'
                            };
                            return (
                                <div key={method} className="flex items-center gap-4">
                                    <div className="w-12 text-[10px] font-bold text-slate-500">{method}</div>
                                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                        <div 
                                            className={`${colors[method] || 'bg-primary'} h-full transition-all duration-1000`} 
                                            style={{ width: `${val}%` }}
                                        ></div>
                                    </div>
                                    <div className="w-10 text-[10px] font-bold text-slate-900 dark:text-white text-right">{val.toFixed(1)}%</div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default PerformanceCharts;
