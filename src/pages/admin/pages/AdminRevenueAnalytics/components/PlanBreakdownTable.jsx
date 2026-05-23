import React from 'react';

const PlanBreakdownTable = ({ plans }) => {
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
                        {(!Array.isArray(plans) || plans.length === 0) ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-10 text-center text-slate-500 italic">No plan data available</td>
                            </tr>
                        ) : (
                            plans.map((plan) => (
                                <tr key={plan.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-slate-400">
                                                    {(plan?.name || '').toLowerCase().includes('free') ? 'eco' : 
                                                     (plan?.name || '').toLowerCase().includes('enterprise') ? 'apartment' : 'rocket_launch'}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-black text-sm text-slate-900 dark:text-white">{plan?.name || 'Unknown'}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    {(plan?.monthlyRevenue || 0) > 0 ? `${((plan?.monthlyRevenue || 0) / (plan?.activeSubscribers || 1)).toLocaleString('vi-VN')} ₫/tháng` : 'Miễn phí'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center text-sm font-black text-slate-900 dark:text-white">{(plan?.activeSubscribers || 0).toLocaleString()}</td>
                                    <td className="px-6 py-5 text-center text-sm font-black text-slate-900 dark:text-white">{(plan?.monthlyRevenue || 0).toLocaleString('vi-VN')} ₫</td>
                                    <td className="px-6 py-5 text-center text-sm font-bold text-rose-500">{plan?.churned30d || 0}</td>
                                    <td className="px-6 py-5 text-center text-sm font-bold text-emerald-500">{plan?.retention || 0}%</td>
                                    <td className="px-6 py-5 text-right">
                                        <span className={`font-bold text-xs px-2 py-1 rounded-full ${
                                            (plan?.growth || 0) >= 0 ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'
                                        }`}>
                                            {(plan?.growth || 0) >= 0 ? '+' : ''}{plan?.growth || 0}%
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlanBreakdownTable;
