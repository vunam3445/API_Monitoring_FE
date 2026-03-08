import React from 'react';

const BillingHistory = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-bold">Billing History</h3>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <span className="material-symbols-outlined text-sm">filter_list</span>
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Export All
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Date</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Invoice ID</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Amount</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Sep 24, 2023</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">INV-092423-45</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">$49.00</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full">Paid</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                </button>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Aug 24, 2023</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">INV-082423-12</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">$49.00</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full">Paid</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                </button>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Jul 24, 2023</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">INV-072423-88</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">$49.00</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full">Paid</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                </button>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Jun 24, 2023</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">INV-062423-19</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">$49.00</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full">Pending</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 text-center">
                <button className="text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">View All Transaction History</button>
            </div>
        </div>
    );
};

export default BillingHistory;
