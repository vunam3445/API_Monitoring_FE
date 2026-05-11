import React from 'react';

const RevenueStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Total Revenue</p>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">$1.2M</span>
                    <span className="text-emerald-500 text-xs font-bold pb-1 flex items-center">
                        <span className="material-symbols-outlined text-sm">trending_up</span>12%
                    </span>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">MRR</p>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">$98.5k</span>
                    <span className="text-emerald-500 text-xs font-bold pb-1 flex items-center">
                        <span className="material-symbols-outlined text-sm">trending_up</span>8%
                    </span>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">ARR</p>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">$1.18M</span>
                    <span className="text-emerald-500 text-xs font-bold pb-1 flex items-center">
                        <span className="material-symbols-outlined text-sm">trending_up</span>10%
                    </span>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Paid Users</p>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">3,520</span>
                    <span className="text-emerald-500 text-xs font-bold pb-1 flex items-center">
                        <span className="material-symbols-outlined text-sm">trending_up</span>15%
                    </span>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">ARPU</p>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">$27.90</span>
                    <span className="text-slate-400 text-xs font-medium pb-1">avg</span>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">LTV</p>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">$1,450</span>
                    <span className="text-emerald-500 text-xs font-bold pb-1 flex items-center">
                        <span className="material-symbols-outlined text-sm">trending_up</span>4%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RevenueStats;
