import React from 'react';

const TopFailingMonitors = ({ data, loading, title = "Top Monitors", subtitle = "Performance Insight", isStability = false }) => {
    const list = data || [];

    const renderSkeletons = () => (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse h-full">
            <div className="flex items-center justify-between mb-8">
                <div className="space-y-2">
                    <div className="w-24 h-3 bg-slate-100 dark:bg-slate-800 rounded"></div>
                    <div className="w-48 h-6 bg-slate-100 dark:bg-slate-800 rounded"></div>
                </div>
            </div>
            <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-slate-100 dark:bg-slate-800 rounded"></div>
                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between">
                                <div className="w-32 h-3 bg-slate-100 dark:bg-slate-800 rounded"></div>
                                <div className="w-16 h-3 bg-slate-100 dark:bg-slate-800 rounded"></div>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (loading) return renderSkeletons();
    
    const tooltipText = isStability 
        ? "Đánh giá mức độ ổn định dựa trên số lượng sự cố (Incidents) và tổng thời gian chết máy (Downtime)." 
        : "Danh sách các Monitor có tỉ lệ kiểm tra thất bại cao nhất trong khoảng thời gian đã chọn.";

    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col relative overflow-visible">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1.5">{subtitle}</p>
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                            <span className={`material-symbols-outlined ${isStability ? 'text-indigo-500' : 'text-amber-500'}`}>
                                {isStability ? 'verified_user' : 'warning'}
                            </span>
                            {title}
                        </h3>
                        
                        {/* Legend/Info Tooltip */}
                        <div className="relative group/tooltip inline-flex items-center">
                            <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 hover:text-indigo-500 transition-colors cursor-help text-[16px]">info</span>
                            <div className="absolute bottom-full left-0 mb-3 w-56 p-3 bg-slate-900 dark:bg-slate-800 text-white text-[10px] leading-relaxed font-medium rounded-2xl hidden group-hover/tooltip:block pointer-events-none shadow-2xl border border-white/10 z-50 text-center">
                                {tooltipText}
                                <div className="absolute top-full left-4 border-[6px] border-transparent border-t-slate-900 dark:border-t-slate-800"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-indigo-500">
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>

            <div className="space-y-6 flex-1">
                {list.length > 0 ? (
                    list.map((mon, idx) => {
                        const monitorName = mon.monitorName || 'Unknown Monitor';
                        const metricValue = isStability ? mon.stabilityScore : mon.errorRate;
                        const healthPercentage = isStability ? metricValue : Math.max(100 - metricValue, 0);
                        const displayMetric = `${(metricValue || 0).toFixed(1)}%`;
                        const statusColor = healthPercentage > 90 ? 'emerald' : healthPercentage > 70 ? 'amber' : 'rose';
                        const incidentCount = isStability ? mon.incidentCount : mon.failedChecks;

                        return (
                            <div key={idx} className="flex items-center gap-5 group cursor-pointer">
                                <div className="text-xs font-black text-slate-300 dark:text-slate-700 w-4 group-hover:text-indigo-400 transition-colors">
                                    {(idx + 1).toString().padStart(2, '0')}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors truncate pr-4">
                                            {monitorName}
                                        </span>
                                        <div className="shrink-0">
                                            <span className={`text-xs font-black text-${statusColor}-600 dark:text-${statusColor}-400`}>
                                                {displayMetric}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter ml-1">
                                                {isStability ? 'score' : 'err'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-1.5 bg-slate-50 dark:bg-slate-800 p-0.5 rounded-full border border-slate-100 dark:border-slate-800 overflow-hidden">
                                            <div 
                                                className={`h-full bg-${statusColor}-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(var(--tw-color-${statusColor}-500-rgb),0.3)]`} 
                                                style={{ width: `${healthPercentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter whitespace-nowrap min-w-[70px] text-right">
                                            {incidentCount || 0} {isStability ? 'Incidents' : 'Failed'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (

                    <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50 py-10">
                        <span className="material-symbols-outlined text-4xl mb-4">pulse</span>
                        <p className="text-xs font-black uppercase tracking-widest text-center">Perfect Health<br/>No Issues Detected</p>
                    </div>
                )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800/50">
                <button className="flex items-center justify-center w-full py-3 px-4 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all gap-2 border border-slate-100 dark:border-slate-700/50">
                    <span className="material-symbols-outlined text-sm">leaderboard</span>
                    Analyze Full Report
                </button>
            </div>
        </div>
    );
};

export default TopFailingMonitors;

