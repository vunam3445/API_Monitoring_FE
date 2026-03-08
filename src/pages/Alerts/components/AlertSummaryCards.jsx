import React from 'react';

const AlertSummaryCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500 text-sm font-medium">Total Alerts</span>
                    <span className="material-symbols-outlined text-slate-400">equalizer</span>
                </div>
                <div className="text-2xl font-bold">1,284</div>
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                    <span className="text-green-500 flex items-center font-bold">
                        <span className="material-symbols-outlined text-[14px]">trending_up</span> 12%
                    </span>
                    vs last 24h
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500 text-sm font-medium">Active Alerts</span>
                    <span className="material-symbols-outlined text-primary">sensors</span>
                </div>
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                    <span className="text-primary flex items-center font-bold">
                        <span className="material-symbols-outlined text-[14px]">warning</span> 2
                    </span>
                    urgent incidents
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-red-500">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500 text-sm font-medium">Critical Alerts</span>
                    <span className="material-symbols-outlined text-red-500">error</span>
                </div>
                <div className="text-2xl font-bold text-red-500">6</div>
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                    <span className="text-red-500 font-bold">Action required</span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-green-500">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500 text-sm font-medium">Resolved Alerts</span>
                    <span className="material-symbols-outlined text-green-500">task_alt</span>
                </div>
                <div className="text-2xl font-bold text-green-500">1,254</div>
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                    <span className="text-green-500 font-bold">98% success rate</span>
                </div>
            </div>
        </div>
    );
};

export default AlertSummaryCards;
