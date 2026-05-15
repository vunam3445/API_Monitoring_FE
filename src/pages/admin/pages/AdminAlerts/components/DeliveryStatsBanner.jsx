import React from 'react';

const DeliveryStatsBanner = ({ stats }) => {
    const displayStats = [
        { label: 'Success Rate', value: stats ? `${stats.successRate}%` : '0%', color: 'text-emerald-500', trend: 'Healthy', icon: 'check_circle' },
        { label: 'Total Sent', value: stats ? stats.totalSent24h?.toLocaleString() : '0', color: 'text-slate-900 dark:text-white', trend: 'Last 24h', icon: 'send' },
        { label: 'Queue Depth', value: stats ? stats.queueDepth : '0', color: 'text-amber-500', trend: 'Processing', icon: 'slow_motion_video' },
        { label: 'Avg Latency', value: stats ? `${stats.avgLatencyMs}ms` : '0ms', color: 'text-blue-500', trend: 'Trigger to End', icon: 'timer' }
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-6 bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8">
            <div className="lg:w-1/3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 pb-6 lg:pb-0 lg:pr-8">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        Delivery Failures
                    </p>
                    <div className="mt-4 flex items-baseline gap-3">
                        <span className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {stats ? stats.totalFailures24h : 0}
                        </span>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-red-500 uppercase">Critical</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Last 24h</span>
                        </div>
                    </div>
                </div>
                <div className="mt-8 p-3 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
                    <p className="text-xs font-semibold text-red-700 dark:text-red-400 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">warning</span>
                        Most common: {stats?.mostCommonError || 'None detected'}
                    </p>
                </div>
            </div>

            <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 lg:pl-4">
                {displayStats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{stat.label}</p>
                        <div>
                            <p className={`text-3xl font-black tracking-tight ${stat.color}`}>{stat.value}</p>
                            <span className={`text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 mt-1 ${stat.color.includes('slate') ? 'text-slate-400' : stat.color}`}>
                                {stat.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeliveryStatsBanner;
