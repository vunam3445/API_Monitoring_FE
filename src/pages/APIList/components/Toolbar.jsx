import React from 'react';

const Toolbar = () => {
    return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px] relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                    placeholder="Search API name or endpoint..." type="text" />
            </div>
            <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Filter</label>
                <select
                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2 focus:ring-2 focus:ring-primary/30 outline-none">
                    <option>Status: All</option>
                    <option>Healthy</option>
                    <option>Warning</option>
                    <option>Down</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Sort</label>
                <select
                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2 focus:ring-2 focus:ring-primary/30 outline-none">
                    <option>Response Time</option>
                    <option>Last Checked</option>
                    <option>Name (A-Z)</option>
                </select>
            </div>
        </div>
    );
};

export default Toolbar;
