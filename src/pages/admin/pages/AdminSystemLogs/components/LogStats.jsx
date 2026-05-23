import React from 'react';

const LogStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
                    <span className="material-symbols-outlined text-2xl">database</span>
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng logs hiển thị</p>
                    <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">{stats.total}</span>
                </div>
            </div>
            {/* <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-emerald-200/50 dark:border-emerald-900/30 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-lg">
                    <span className="material-symbols-outlined text-2xl">info</span>
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mức INFO</p>
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">{stats.infos}</span>
                </div>
            </div> */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-amber-200/50 dark:border-amber-900/30 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
                    <span className="material-symbols-outlined text-2xl">warning</span>
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mức WARNING</p>
                    <span className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 block">{stats.warnings}</span>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-rose-200/50 dark:border-rose-900/30 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-rose-500/10 text-rose-500 rounded-lg">
                    <span className="material-symbols-outlined text-2xl">error</span>
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mức ERROR</p>
                    <span className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1 block">{stats.errors}</span>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-red-950 dark:border-red-900/30 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-red-500/10 text-red-500 rounded-lg">
                    <span className="material-symbols-outlined text-2xl">gavel</span>
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mức FATAL</p>
                    <span className="text-2xl font-black text-red-600 dark:text-red-400 mt-1 block">{stats.fatals}</span>
                </div>
            </div>
        </div>
    );
};

export default LogStats;
