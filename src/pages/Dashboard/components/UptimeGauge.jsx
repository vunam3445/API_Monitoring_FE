import React from 'react';

const UptimeGauge = ({ data, loading }) => {
    const percentage = typeof data === 'number' ? data : parseFloat(data) || 0;
    
    // SVG properties
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
                <div className="w-24 h-4 bg-slate-100 dark:bg-slate-800 rounded mb-8"></div>
                <div className="flex justify-center py-4">
                    <div className="w-40 h-40 bg-slate-50 dark:bg-slate-800 rounded-full border-8 border-slate-100 dark:border-slate-700"></div>
                </div>
            </div>
        );
    }

    const isOptimal = percentage >= 99;
    const statusColor = percentage >= 99 ? 'emerald' : percentage >= 95 ? 'amber' : 'rose';
    const statusIcon = percentage >= 99 ? 'verified_user' : 'error';

    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 group text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-5xl text-slate-400">pulse</span>
            </div>

            <h3 className="font-black text-slate-800 dark:text-white mb-8 text-left flex items-center gap-2">
                Overall Uptime
            </h3>

            <div className="relative inline-flex items-center justify-center group/gauge">
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-full bg-${statusColor}-500/20 blur-2xl group-hover/gauge:scale-110 transition-transform duration-700`}></div>
                
                <svg className="w-48 h-48 transform -rotate-90 relative z-10">
                    {/* Background Track */}
                    <circle 
                        className="text-slate-100 dark:text-slate-800" 
                        cx="96" cy="96" r={radius}
                        fill="transparent" stroke="currentColor" strokeWidth="12"
                    ></circle>
                    
                    {/* Progress Bar */}
                    <circle 
                        className={`text-${statusColor}-500 transition-all duration-1000 ease-out`} 
                        cx="96" cy="96" r={radius} 
                        fill="transparent" 
                        stroke="currentColor" 
                        strokeWidth="12"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                    ></circle>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <div className="flex items-baseline">
                        <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {percentage.toFixed(1)}
                        </span>
                        <span className="text-lg font-black text-slate-400 ml-0.5">%</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 text-slate-400`}>
                        Reliability
                    </span>
                </div>
            </div>

            <div className={`mt-10 p-3 rounded-2xl bg-${statusColor}-50/50 dark:bg-${statusColor}-900/10 border border-${statusColor}-100 dark:border-${statusColor}-900/30 flex items-center justify-center gap-2.5`}>
                <span className={`material-symbols-outlined text-xl text-${statusColor}-600 dark:text-${statusColor}-400`}>{statusIcon}</span>
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Status: <span className={`text-${statusColor}-600 dark:text-${statusColor}-400 uppercase tracking-wide`}>
                        {percentage >= 99 ? 'Optimal' : percentage >= 95 ? 'Degraded' : 'Critical'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default UptimeGauge;

