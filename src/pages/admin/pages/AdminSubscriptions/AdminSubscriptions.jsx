import React from 'react';

const AdminSubscriptions = () => {
    return (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark overflow-x-hidden min-h-0 min-w-0">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Subscriptions</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Manage user subscriptions, billing status, and plan usage.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
                            <span className="material-symbols-outlined text-lg">file_download</span>
                            Export Subscriptions
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-shadow shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-lg">add_circle</span>
                            Add Manual Subscription
                        </button>
                    </div>
                </div>
            </header>

            <div className="p-8 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</p>
                        <div className="flex items-end justify-between mt-2">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">1,284</p>
                            <span className="text-emerald-500 text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center">+12%</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active</p>
                        <div className="flex items-end justify-between mt-2">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">1,150</p>
                            <span className="text-emerald-500 text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center">+5%</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Expired</p>
                        <div className="flex items-end justify-between mt-2">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">42</p>
                            <span className="text-rose-500 text-xs font-bold bg-rose-50 dark:bg-rose-500/10 px-1.5 py-0.5 rounded flex items-center">-2%</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Free Users</p>
                        <div className="flex items-end justify-between mt-2">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">850</p>
                            <span className="text-emerald-500 text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center">+8%</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Paid Users</p>
                        <div className="flex items-end justify-between mt-2">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">434</p>
                            <span className="text-emerald-500 text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center">+15%</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">MRR</p>
                        <div className="flex items-end justify-between mt-2">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">$24.5k</p>
                            <span className="text-emerald-500 text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center">+10%</span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="lg:col-span-1">
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Search</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                                <input className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 dark:text-white" placeholder="Name or email..." type="text" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Plan</label>
                            <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 dark:text-white">
                                <option>All Plans</option>
                                <option>Free</option>
                                <option>Pro</option>
                                <option>Enterprise</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Billing Status</label>
                            <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 dark:text-white">
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Expired</option>
                                <option>Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Payment Status</label>
                            <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 dark:text-white">
                                <option>All Payments</option>
                                <option>Paid</option>
                                <option>Pending</option>
                                <option>Failed</option>
                            </select>
                        </div>
                        <div className="flex items-end gap-2">
                            <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">Apply Filter</button>
                            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                <span className="material-symbols-outlined">restart_alt</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Grid Layout for Table and Side Panel */}
                <div className="flex gap-8 flex-col xl:flex-row">
                    {/* Subscriptions Table */}
                    <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                                        <th className="px-6 py-4">Subscription</th>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Plan &amp; Billing</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Next Billing</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {/* Row 1 (Selected) */}
                                    <tr className="bg-primary/5 border-l-4 border-l-primary cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">SUB-8821</p>
                                            <p className="text-xs text-slate-500">Started May 12, 2023</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-900 dark:text-white">AR</div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Alex Rivera</p>
                                                    <p className="text-xs text-slate-500">alex@rivera-inc.com</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">Pro</span>
                                                <span className="text-xs text-slate-500">Yearly • $490</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5">
                                                <span className="inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                                                </span>
                                                <span className="inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Paid
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">May 12, 2024</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Row 2 */}
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">SUB-8754</p>
                                            <p className="text-xs text-slate-500">Started June 01, 2023</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img alt="Sarah Chen profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIdwZedWwjl8yRfmqgt_a9_LYZEwSj84GVfCHH-I5WnzE6MsrEKXAh4VJcYaPsIITwY9lY5rUTBFOVzZD33vFuKkQ73ob0fMwOQvqZpnHM_LIzdSKuXMfxDORXjNko4qwtwtRUhy2gLJYRd_7gSd8LiNyEMg-ZZ8hK3pGriyo-kJBtjfzOXhSlDRVmMH_QdgscJfLHxqIpj7nR6dZRLKwgcEMSJ-v_hvZof7F-ACh0_XyJSuiuj9FFE8laFTX3283BWoXhUKHfTtX2" />
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Sarah Chen</p>
                                                    <p className="text-xs text-slate-500">schen@techflow.io</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">Enterprise</span>
                                                <span className="text-xs text-slate-500">Monthly • $199</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5">
                                                <span className="inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold uppercase">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Expired
                                                </span>
                                                <span className="inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 text-[10px] font-bold uppercase">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Failed
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-slate-400">--</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Row 3 */}
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">SUB-8742</p>
                                            <p className="text-xs text-slate-500">Started June 15, 2023</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-900 dark:text-white">MK</div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Marcus King</p>
                                                    <p className="text-xs text-slate-500">marcus@king.dev</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">Free</span>
                                                <span className="text-xs text-slate-500">Monthly • $0</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5">
                                                <span className="inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                                                </span>
                                                <span className="inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pending
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">July 15, 2024</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <p className="text-xs text-slate-500">Showing 1 to 10 of 1,284 results</p>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold disabled:opacity-50 text-slate-700 dark:text-slate-300" disabled>Previous</button>
                                <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">Next</button>
                            </div>
                        </div>
                    </div>

                    {/* Side Panel: User Details */}
                    <aside className="hidden lg:block w-full xl:w-96 space-y-6">
                        {/* User Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-fit flex flex-col">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Subscription Details</h3>
                                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>

                                {/* Profile Summary */}
                                <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100 dark:border-slate-800">
                                    <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mb-4">
                                        AR
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Alex Rivera</h4>
                                    <p className="text-sm text-slate-500">alex@rivera-inc.com</p>
                                    <span className="mt-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400">Rivera Systems Inc.</span>
                                </div>

                                {/* Plan Details */}
                                <div className="py-6 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-slate-500">Current Plan</p>
                                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-bold uppercase">Pro Tier</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-slate-500">Billing Cycle</p>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Yearly ($490.00)</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-slate-500">Start Date</p>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">May 12, 2023</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-slate-500">Next Billing</p>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">May 12, 2024</p>
                                    </div>
                                </div>

                                {/* Usage Progress */}
                                <div className="py-6 border-t border-slate-100 dark:border-slate-800 space-y-6">
                                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resource Usage</h5>
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-xs">
                                                <span className="font-semibold text-slate-900 dark:text-white">Monitored APIs</span>
                                                <span className="text-slate-500">32 / 50</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: "64%" }}></div>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-xs">
                                                <span className="font-semibold text-slate-900 dark:text-white">Alert Notifications</span>
                                                <span className="text-slate-500">450 / 1,000</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: "45%" }}></div>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-xs">
                                                <span className="font-semibold text-slate-900 dark:text-white">Uptime Checks</span>
                                                <span className="text-slate-500">12k / 15k</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-amber-500 rounded-full" style={{ width: "80%" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment History */}
                                <div className="py-6 border-t border-slate-100 dark:border-slate-800">
                                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Payments</h5>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                            <div>
                                                <p className="text-xs font-bold text-slate-900 dark:text-white">INV-9920</p>
                                                <p className="text-[10px] text-slate-500">May 12, 2023</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-slate-900 dark:text-white">$490.00</p>
                                                <span className="text-[10px] text-emerald-500 font-bold uppercase">Paid</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                            <div>
                                                <p className="text-xs font-bold text-slate-900 dark:text-white">INV-8122</p>
                                                <p className="text-[10px] text-slate-500">May 12, 2022</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-slate-900 dark:text-white">$490.00</p>
                                                <span className="text-[10px] text-emerald-500 font-bold uppercase">Paid</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-4 py-2 text-xs font-bold text-primary hover:underline">View All History</button>
                                </div>

                                {/* Quick Actions */}
                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                                    <button className="flex-1 bg-primary text-white py-2 rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors">Edit Plan</button>
                                    <button className="px-3 py-2 border border-rose-200 text-rose-500 rounded-lg text-xs font-bold hover:bg-rose-50 transition-colors">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default AdminSubscriptions;
