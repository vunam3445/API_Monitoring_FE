import React from 'react';

const SummaryCards = ({ data, loading }) => {
    const stats = [
        { 
            id: 1, 
            label: 'Total Monitors', 
            description: 'Tổng số lượng API (Monitor) mà bạn đã tạo.',
            value: data?.totalMonitors ?? '0', 
            change: data?.trends?.totalMonitorsDelta !== undefined ? (data.trends.totalMonitorsDelta >= 0 ? `+${data.trends.totalMonitorsDelta}` : data.trends.totalMonitorsDelta) : '0', 
            trend: (data?.trends?.totalMonitorsDelta || 0) >= 0 ? 'up' : 'down', 
            icon: 'api', 
            color: 'blue' 
        },
        { 
            id: 2, 
            label: 'Currently Down', 
            description: 'Số lượng API hiện đang bị "chết" (không phản hồi).',
            value: data?.currentlyDown ?? '0', 
            change: data?.trends?.currentlyDownDelta !== undefined ? (data.trends.currentlyDownDelta >= 0 ? `+${data.trends.currentlyDownDelta}` : data.trends.currentlyDownDelta) : '0', 
            trend: (data?.trends?.currentlyDownDelta || 0) <= 0 ? 'up' : 'down', // Down going down is good
            icon: 'error', 
            color: 'rose' 
        },
        { 
            id: 3, 
            label: 'Uptime 24h', 
            description: 'Tỉ lệ hoạt động trung bình của tất cả Monitor trong 24 giờ qua.',
            value: data?.uptime24h !== undefined ? `${data.uptime24h}%` : '0%', 
            change: data?.trends?.uptime24hDelta !== undefined ? (data.trends.uptime24hDelta >= 0 ? `+${data.trends.uptime24hDelta}%` : `${data.trends.uptime24hDelta}%`) : '0%', 
            trend: (data?.trends?.uptime24hDelta || 0) >= 0 ? 'up' : 'down', 
            icon: 'verified', 
            color: 'emerald' 
        },
        { 
            id: 4, 
            label: 'Avg Latency', 
            description: 'Độ trễ trung bình của bạn trong 24 giờ qua.',
            value: data?.avgLatencyMs !== undefined ? `${data.avgLatencyMs}ms` : '0ms', 
            change: data?.trends?.avgLatencyDeltaMs !== undefined ? (data.trends.avgLatencyDeltaMs >= 0 ? `+${data.trends.avgLatencyDeltaMs}ms` : `${data.trends.avgLatencyDeltaMs}ms`) : '0ms', 
            trend: (data?.trends?.avgLatencyDeltaMs || 0) <= 0 ? 'up' : 'down', // Latency going down is good
            icon: 'speed', 
            color: 'indigo' 
        },
    ];


    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse">
                        <div className="flex justify-between mb-6">
                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
                            <div className="w-16 h-6 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                        </div>
                        <div className="space-y-3">
                            <div className="w-20 h-3 bg-slate-100 dark:bg-slate-800 rounded"></div>
                            <div className="w-32 h-10 bg-slate-100 dark:bg-slate-800 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
                <div key={stat.id} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-black/40 group relative overflow-visible">
                    {/* Background Icon Watermark clipped by a sub-container */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                        <div className="absolute -bottom-4 -right-4 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
                            <span className="material-symbols-outlined text-[120px] font-black">{stat.icon}</span>
                        </div>
                    </div>

                    {/* Tooltip Icon & Popup */}
                    <div className="absolute top-6 right-6 z-30 group/tooltip">
                        <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-help text-lg font-black transition-colors duration-300">info</span>
                        <div className="absolute bottom-full right-0 mb-3 w-48 p-3 bg-slate-900 dark:bg-slate-800 text-white text-[10px] leading-relaxed font-medium rounded-2xl hidden group-hover/tooltip:block pointer-events-none shadow-2xl border border-white/10 text-center">
                            {stat.description}
                            <div className="absolute top-full right-4 border-[6px] border-transparent border-t-slate-900 dark:border-t-slate-800"></div>
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 bg-slate-50 dark:bg-slate-800/50 text-indigo-600 dark:text-indigo-400 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500 bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-100 dark:border-slate-800`}>
                                <span className="material-symbols-outlined text-2xl font-black">{stat.icon}</span>
                            </div>
                            {stat.change !== '0' && stat.change !== '0%' && stat.change !== '0ms' && (
                                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-rose-600 bg-rose-50 dark:bg-rose-900/20'}`}>
                                    <span className="material-symbols-outlined text-xs font-black">{stat.trend === 'up' ? 'trending_up' : 'trending_down'}</span>
                                    {stat.change}
                                </div>
                            )}
                        </div>

                        <div className="mt-auto">
                            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">{stat.label}</p>
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none group-hover:translate-x-1 transition-transform duration-300">
                                {stat.value}
                            </h3>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;

