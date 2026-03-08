import React from 'react';

const FooterStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Average
                        Latency</span>
                    <span className="text-emerald-500 text-xs font-bold flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-full">-12%
                        vs last hr</span>
                </div>
                <p className="text-2xl font-black">156 ms</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Uptime (24h)</span>
                    <span className="text-primary text-xs font-bold flex items-center bg-primary/10 px-2 py-0.5 rounded-full">Target
                        99.9%</span>
                </div>
                <p className="text-2xl font-black">98.24%</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Active
                        Incidents</span>
                    <span className="text-red-500 text-xs font-bold flex items-center bg-red-500/10 px-2 py-0.5 rounded-full">High
                        Priority</span>
                </div>
                <p className="text-2xl font-black text-red-500">2</p>
            </div>
        </div>
    );
};

export default FooterStats;
