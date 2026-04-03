import React from 'react';

const Charts = ({ data, summary, loading, range }) => {
    // Process charts data for Response Time
    const chartData = data || [];
    const maxValue = Math.max(...chartData.map(d => d.avgLatencyMs), 0) || 500;

    // Calculate real health metrics based on summary data
    const total = summary?.totalMonitors || 0;
    const down = summary?.currentlyDown || 0;
    const uptime = summary?.uptime24h || 0;
    const avgLatency = summary?.avgLatencyMs || 0;

    // 1. Availability Score: % of monitors that are UP
    const availabilityScore = total > 0 ? Math.round(((total - down) / total) * 100) : 0;
    
    // 2. Uptime Score: Directly from summary uptime
    const uptimeScore = Math.round(uptime);

    // 3. Performance Score: Inverse of latency (threshold 1s = 0%)
    const performanceScore = avgLatency > 0 ? Math.max(0, Math.min(100, Math.round(100 - (avgLatency / 10)))) : 0;

    const healthMetrics = [
        { 
            label: 'Monitor Availability', 
            description: `Tỉ lệ các API đang hoạt động bình thường (${total - down}/${total} Monitor).`,
            value: availabilityScore, color: 'emerald', icon: 'check_circle' 
        },
        { 
            label: 'Average Uptime', 
            description: 'Tỉ lệ thời gian hoạt động trung bình của bạn trong 24 giờ qua.',
            value: uptimeScore, color: 'indigo', icon: 'verified' 
        },
        { 
            label: 'Performance Rating', 
            description: `Điểm số phản hồi (tính trên độ trễ trung bình ${avgLatency.toFixed(1)}ms).`,
            value: performanceScore, color: 'amber', icon: 'speed' 
        }
    ];

    const generateStatusMessage = () => {
        if (down > 0) return `Alert: ${down} monitors are currently down. System health slightly impacted.`;
        if (uptimeScore < 99) return `Notice: Uptime has dipped to ${uptimeScore}%. Investigate stability.`;
        if (performanceScore < 90) return `Warning: Latency is higher than usual. Review endpoint efficiency.`;
        return `System is currently operating within optimal parameters with 100% availability.`;
    };

    const formatFullTime = (timeStr) => {
        try {
            const date = new Date(timeStr);
            return date.toLocaleString('vi-VN', { 
                hour: '2-digit', 
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            });
        } catch (e) {
            return timeStr;
        }
    };

    const renderSkeletons = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map(i => (
                <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
                    <div className="flex justify-between mb-8">
                        <div className="w-40 h-6 bg-slate-100 dark:bg-slate-800 rounded"></div>
                        <div className="w-16 h-4 bg-slate-100 dark:bg-slate-800 rounded"></div>
                    </div>
                    <div className="h-48 flex items-end gap-3 px-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(j => (
                            <div key={j} className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-xl" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    if (loading) return renderSkeletons();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Avg. Response Time Chart */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 group relative overflow-hidden">
                <div className="flex items-center justify-between mb-8 relative z-10">
                    <div>
                        <h3 className="font-black text-slate-800 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-amber-500">bolt</span>
                            Avg. Latency
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">System Response Speed</p>
                    </div>
                    <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 dark:border-slate-700">
                        {range}
                    </span>
                </div>

                <div className="h-48 flex items-end gap-3 px-2 relative z-10">
                    {chartData.length > 0 ? (
                        chartData.map((d, i) => {
                            const heightPercentage = (d.avgLatencyMs / maxValue) * 100;
                            const isHigh = d.avgLatencyMs > maxValue * 0.8;
                            const isMid = d.avgLatencyMs > maxValue * 0.5;
                            
                            const colorClass = isHigh 
                                ? 'bg-rose-500 from-rose-500 to-rose-400' 
                                : isMid 
                                ? 'bg-amber-500 from-amber-500 to-amber-400'
                                : 'bg-indigo-600 from-indigo-600 to-indigo-500';

                            return (
                                <div 
                                    key={i} 
                                    className="flex-1 group/bar relative h-full flex items-end"
                                >
                                    <div 
                                        className={`w-full rounded-t-xl transition-all duration-700 bg-gradient-to-t ${colorClass} group-hover/bar:scale-x-110 group-hover/bar:brightness-110 origin-bottom shadow-lg shadow-black/5`}
                                        style={{ height: `${Math.max(heightPercentage, 8)}%` }}
                                    ></div>
                                    
                                    {/* Tooltip on hover */}
                                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md text-white py-2 px-3 rounded-xl opacity-0 group-hover/bar:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none z-20 shadow-2xl border border-white/10 flex flex-col items-center gap-0.5 min-w-[100px]">
                                        <span className="text-[11px] font-black tracking-tight text-amber-400">{d.avgLatencyMs.toFixed(1)}ms</span>
                                        <span className="text-[9px] font-medium text-slate-400">{formatFullTime(d.time)}</span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center gap-3 text-slate-400 h-full">
                            <span className="material-symbols-outlined text-4xl opacity-20">pulse</span>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-50">No Data Available</span>
                        </div>
                    )}
                </div>

                
                {/* Removed bottom labels as per request */}
                <div className="mt-4 border-t border-slate-50 dark:border-slate-800/50"></div>

            </div>

            {/* Throughput / Performance Insights */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 group">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="font-black text-slate-800 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-emerald-500">health_and_safety</span>
                            Monitoring Health
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time Service Stability</p>
                    </div>
                </div>
                
                <div className="space-y-6">
                    {healthMetrics.map((item, idx) => (
                        <div key={idx} className="space-y-2">
                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-2">
                                    <span className={`material-symbols-outlined text-xs text-${item.color}-500`}>{item.icon}</span>
                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{item.label}</span>
                                    
                                    {/* Health Tooltip */}
                                    <div className="relative group/tooltip inline-flex items-center">
                                        <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 hover:text-indigo-500 transition-colors cursor-help text-[14px]">info</span>
                                        <div className="absolute bottom-full left-0 mb-2 w-48 p-2.5 bg-slate-900 dark:bg-slate-800 text-white text-[10px] leading-relaxed font-medium rounded-xl hidden group-hover/tooltip:block pointer-events-none shadow-2xl border border-white/10 z-50 text-center">
                                            {item.description}
                                            <div className="absolute top-full left-4 border-[5px] border-transparent border-t-slate-900 dark:border-t-slate-800"></div>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-sm font-black text-slate-800 dark:text-white">{item.value}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-50 dark:bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-100 dark:border-slate-800 shadow-inner">
                                <div 
                                    className={`h-full rounded-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-400 shadow-lg shadow-${item.color}-500/20 transition-all duration-1000`}
                                    style={{ width: `${item.value}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed italic">
                        "{generateStatusMessage()}"
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Charts;

