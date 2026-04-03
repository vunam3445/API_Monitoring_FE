import React from 'react';

const MonitoringSummaryCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 shrink-0">
                    <span className="material-symbols-outlined text-3xl">dns</span>
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-500 mb-1">Total APIs</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white leading-none">128</p>
                    <span className="text-xs text-emerald-500 font-bold mt-2 block">+2% from yesterday</span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl text-emerald-600 shrink-0">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-500 mb-1">Healthy</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white leading-none">124</p>
                    <span className="text-xs text-emerald-500 font-bold mt-2 block">96.8% Uptime</span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl text-slate-500 shrink-0">
                    <span className="material-symbols-outlined text-3xl">pause_circle</span>
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-500 mb-1">Paused</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white leading-none">3</p>
                    <span className="text-xs text-slate-400 font-bold mt-2 block">Monitor in standby</span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl text-red-600 shrink-0">
                    <span className="material-symbols-outlined text-3xl">error</span>
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-500 mb-1">Down</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white leading-none text-red-500">1</p>
                    <span className="text-xs text-red-500 font-bold mt-2 block flex items-center gap-1">
                        <span className="size-1.5 bg-red-500 rounded-full animate-ping block"></span>
                        Critical Failure
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MonitoringSummaryCards;
