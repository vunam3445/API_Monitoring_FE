import React from 'react';

const AdminRevenueAnalytics = () => {
    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-background-light dark:bg-background-dark min-h-0 min-w-0 h-full">
            {/* Page Header Title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Revenue Analytics</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Track subscription revenue, financial performance, and business growth.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-sm hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-[20px]">description</span>
                        Export Financial Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                        <span className="material-symbols-outlined text-[20px]">download</span>
                        Download CSV
                    </button>
                </div>
            </div>

            {/* Revenue Statistics Cards */}
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
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Conversion</p>
                    <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-slate-900 dark:text-white">4.2%</span>
                        <span className="text-emerald-500 text-xs font-bold pb-1 flex items-center">
                            <span className="material-symbols-outlined text-sm">trending_up</span>1%
                        </span>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Monthly Revenue Trend (Placeholder Chart) */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900 dark:text-white">Monthly Revenue Trend</h3>
                        <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-xs font-bold px-3 py-1 outline-none text-slate-900 dark:text-white">
                            <option>Last 12 Months</option>
                            <option>Last 6 Months</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-2 px-2 relative group">
                        {/* Simple Bar/Area Chart Mockup with CSS */}
                        <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[40%] transition-all"></div>
                        <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[45%] transition-all"></div>
                        <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[55%] transition-all"></div>
                        <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[50%] transition-all"></div>
                        <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[65%] transition-all"></div>
                        <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[60%] transition-all"></div>
                        <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[75%] transition-all"></div>
                        <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[85%] transition-all"></div>
                        <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[80%] transition-all"></div>
                        <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[90%] transition-all"></div>
                        <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t h-[95%] transition-all"></div>
                        <div className="flex-1 bg-primary hover:bg-primary rounded-t h-[100%] transition-all relative cursor-pointer">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                $98.5k (Dec)
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

                {/* Revenue by Plan (Pie Chart Mockup) */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                    <h3 className="font-bold mb-6 text-slate-900 dark:text-white">Revenue by Plan</h3>
                    <div className="flex-1 flex items-center justify-center relative">
                        {/* Mock donut chart using CSS gradients */}
                        <div className="w-40 h-40 rounded-full border-[12px] border-slate-100 dark:border-slate-800 flex items-center justify-center relative"
                            style={{ background: "conic-gradient(#ec5b13 0% 60%, #f4a261 60% 90%, #e2e8f0 90% 100%)" }}>
                            <div className="w-32 h-32 rounded-full bg-white dark:bg-slate-900 flex flex-col items-center justify-center">
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Total</p>
                                <p className="text-xl font-black text-slate-900 dark:text-white">$1.2M</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 font-medium">
                                <span className="w-3 h-3 rounded-full bg-primary"></span>
                                <span className="text-slate-900 dark:text-white">Pro Plan</span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white">60%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-400">
                                <span className="w-3 h-3 rounded-full bg-[#f4a261]"></span>
                                <span>Enterprise</span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-slate-100">35%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-400">
                                <span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></span>
                                <span>Legacy/Other</span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-slate-100">5%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscription Analytics */}
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

            {/* Revenue Breakdown Table */}
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
        </div>
    );
};

export default AdminRevenueAnalytics;
