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
                            <th className="px-6 py-4">Plan Name</th>
                            <th className="px-6 py-4">Active Subscribers</th>
                            <th className="px-6 py-4">Monthly Revenue</th>
                            <th className="px-6 py-4">Annual Revenue</th>
                            <th className="px-6 py-4">ARPU</th>
                            <th className="px-6 py-4">Growth Rate</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                                    <span className="font-bold text-sm text-slate-900 dark:text-white">Free Plan</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">12,450 users</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">$0</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">$0</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">$0</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-400">--</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                                    <span className="font-bold text-sm text-slate-900 dark:text-white">Pro Plan</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">3,200 users</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$78,400</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$940,800</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">$24.5</td>
                            <td className="px-6 py-4">
                                <span className="text-emerald-500 font-bold text-xs bg-emerald-500/10 px-2 py-1 rounded">+14%</span>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white"></span>
                                    <span className="font-bold text-sm text-slate-900 dark:text-white">Enterprise</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">320 users</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$64,000</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$768,000</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">$200</td>
                            <td className="px-6 py-4">
                                <span className="text-emerald-500 font-bold text-xs bg-emerald-500/10 px-2 py-1 rounded">+9%</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlanBreakdownTable;
