import React from 'react';

const RevenueStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {/* Row 1: Revenue Metrics */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Total Revenue</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">$1.24M</span>
                    <span className="text-emerald-500 text-xs font-black flex items-center gap-0.5 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">trending_up</span>12%
                    </span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Lifetime Earnings</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Monthly Recurring (MRR)</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">$98.5k</span>
                    <span className="text-emerald-500 text-xs font-black flex items-center gap-0.5 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">trending_up</span>8%
                    </span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Target: $120k</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Active Subscriptions</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">3,842</span>
                    <span className="text-blue-500 text-xs font-black flex items-center gap-0.5 bg-blue-500/10 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">group</span>+15%
                    </span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Across all paid tiers</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Expiring Soon (7d)</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-amber-500 tracking-tighter">142</span>
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                        Alert
                    </span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Renewal candidates</p>
            </div>
        </div>
    );
};

export default RevenueStats;
