import React from 'react';

const SummaryCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                        <span className="material-symbols-outlined">api</span>
                    </div>
                    <span className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-sm">trending_up</span> 4%
                    </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total APIs</p>
                <h3 className="text-3xl font-bold mt-1">128</h3>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                        <span className="material-symbols-outlined">check_circle</span>
                    </div>
                    <span className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-sm">trending_up</span> 2%
                    </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active APIs</p>
                <h3 className="text-3xl font-bold mt-1">124</h3>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-lg">
                        <span className="material-symbols-outlined">error</span>
                    </div>
                    <span className="flex items-center text-xs font-bold text-rose-500 bg-rose-100 dark:bg-rose-900/30 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-sm">trending_down</span> 50%
                    </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Failed APIs</p>
                <h3 className="text-3xl font-bold mt-1">4</h3>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <span className="material-symbols-outlined">speed</span>
                    </div>
                    <span className="flex items-center text-xs font-bold text-rose-500 bg-rose-100 dark:bg-rose-900/30 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-sm">trending_up</span> 12%
                    </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Avg Response Time</p>
                <h3 className="text-3xl font-bold mt-1">245ms</h3>
            </div>
        </div>
    );
};

export default SummaryCards;
