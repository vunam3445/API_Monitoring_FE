import React from 'react';

const PlanBreakdownTable = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white">Detailed Plan Breakdown</h3>
                <button className="text-primary text-sm font-bold hover:underline">View all plans</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                        <tr>
                            <th className="px-6 py-4 text-left">Plan Name</th>
                            <th className="px-6 py-4 text-center">Active Subscribers</th>
                            <th className="px-6 py-4 text-center">Monthly Revenue</th>
                            <th className="px-6 py-4 text-center">Churned (30d)</th>
                            <th className="px-6 py-4 text-center">Retention</th>
                            <th className="px-6 py-4 text-right">Growth</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-slate-400">eco</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-sm text-slate-900 dark:text-white">Free Plan</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">$0/mo</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-center text-sm font-black text-slate-900 dark:text-white">12,450</td>
                            <td className="px-6 py-5 text-center text-sm font-black text-slate-900 dark:text-white">$0</td>
                            <td className="px-6 py-5 text-center text-sm font-bold text-rose-500">452</td>
                            <td className="px-6 py-5 text-center text-sm font-bold text-slate-500">92%</td>
                            <td className="px-6 py-5 text-right">
                                <span className="text-slate-400 font-bold text-xs">--</span>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-orange-500">rocket_launch</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-sm text-slate-900 dark:text-white">Pro Plan</p>
                                        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">$49/mo</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-center text-sm font-black text-slate-900 dark:text-white">3,200</td>
                            <td className="px-6 py-5 text-center text-sm font-black text-slate-900 dark:text-white">$156,800</td>
                            <td className="px-6 py-5 text-center text-sm font-bold text-rose-500">12</td>
                            <td className="px-6 py-5 text-center text-sm font-bold text-emerald-500">99.2%</td>
                            <td className="px-6 py-5 text-right">
                                <span className="text-emerald-500 font-bold text-xs bg-emerald-500/10 px-2 py-1 rounded-full">+14%</span>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-700 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white">apartment</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-sm text-slate-900 dark:text-white">Enterprise</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Custom</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-center text-sm font-black text-slate-900 dark:text-white">320</td>
                            <td className="px-6 py-5 text-center text-sm font-black text-slate-900 dark:text-white">$64,000</td>
                            <td className="px-6 py-5 text-center text-sm font-bold text-rose-500">0</td>
                            <td className="px-6 py-5 text-center text-sm font-bold text-emerald-500">100%</td>
                            <td className="px-6 py-5 text-right">
                                <span className="text-emerald-500 font-bold text-xs bg-emerald-500/10 px-2 py-1 rounded-full">+9%</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlanBreakdownTable;
