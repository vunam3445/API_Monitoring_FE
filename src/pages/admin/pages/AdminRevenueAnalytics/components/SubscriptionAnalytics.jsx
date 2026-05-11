import React from 'react';

const SubscriptionAnalytics = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-primary">groups</span>
                    <h3 className="font-bold text-slate-900 dark:text-white">Users Comparison</h3>
                </div>
                <div className="space-y-4 flex-1">
                    <div className="relative">
                        <div className="flex justify-between text-xs font-bold mb-1 mt-2">
                            <span className="text-slate-900 dark:text-white">Free Users</span>
                            <span className="text-slate-900 dark:text-white">12,450</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-400 w-[78%]"></div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="flex justify-between text-xs font-bold mb-1 mt-6">
                            <span className="text-slate-900 dark:text-white">Paid Users</span>
                            <span className="text-slate-900 dark:text-white">3,520</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[22%]"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-primary">trending_up</span>
                    <h3 className="font-bold text-slate-900 dark:text-white">Upgrade Trends</h3>
                </div>
                <p className="text-3xl font-black mb-1 text-slate-900 dark:text-white">245</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex-1">Upgrades from Free to Pro this month</p>
                <div className="mt-4 flex items-center gap-2 text-emerald-500 font-bold text-sm">
                    <span className="material-symbols-outlined">north_east</span>
                    <span>+18.4% vs last month</span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-rose-500">heart_minus</span>
                    <h3 className="font-bold text-slate-900 dark:text-white">Churn Metrics</h3>
                </div>
                <div className="flex items-center gap-4 flex-1 mt-2">
                    <div className="w-16 h-16 rounded-full border-4 border-rose-500 flex items-center justify-center text-lg font-black text-slate-900 dark:text-white shrink-0">
                        2.1%
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Monthly Churn Rate</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Well below industry benchmark of 5%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionAnalytics;
