import React from 'react';

const MonitoringStats = () => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 p-8">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total APIs</p>
                    <span className="material-symbols-outlined text-slate-400">api</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">124</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium">
                    <span className="material-symbols-outlined text-xs">trending_up</span> +2% this week
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Healthy</p>
                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">118</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-xs">remove</span> Stable
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Warning</p>
                    <span className="material-symbols-outlined text-yellow-500">warning</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">4</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium">
                    <span className="material-symbols-outlined text-xs">trending_down</span> -50% improvement
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Down</p>
                    <span className="material-symbols-outlined text-red-500">error</span>
                </div>
                <p className="text-2xl font-bold text-red-600">2</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-red-600 font-medium">
                    <span className="material-symbols-outlined text-xs">trending_up</span> +1 since yesterday
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Avg Latency</p>
                    <span className="material-symbols-outlined text-slate-400">timer</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">240ms</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium">
                    <span className="material-symbols-outlined text-xs">trending_down</span> -12ms lower
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Checks/min</p>
                    <span className="material-symbols-outlined text-slate-400">speed</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">1.2k</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium">
                    <span className="material-symbols-outlined text-xs">trending_up</span> +5% throughput
                </div>
            </div>
        </section>
    );
};

export default MonitoringStats;
