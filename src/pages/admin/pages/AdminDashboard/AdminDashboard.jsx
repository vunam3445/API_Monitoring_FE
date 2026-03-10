import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                            <span className="material-symbols-outlined">group</span>
                        </div>
                        <span className="text-emerald-500 text-xs font-bold flex items-center">+12% <span className="material-symbols-outlined text-sm">trending_up</span></span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Users</p>
                    <p className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">14,289</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                            <span className="material-symbols-outlined">hub</span>
                        </div>
                        <span className="text-emerald-500 text-xs font-bold flex items-center">+4 <span className="material-symbols-outlined text-sm">add</span></span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">APIs Monitored</p>
                    <p className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">156</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                            <span className="material-symbols-outlined">check_circle</span>
                        </div>
                        <span className="text-slate-400 text-xs font-bold">Stable</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">APIs Online</p>
                    <p className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">154</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                            <span className="material-symbols-outlined">error</span>
                        </div>
                        <span className="text-red-500 text-xs font-bold flex items-center">+2 <span className="material-symbols-outlined text-sm">trending_up</span></span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">APIs Down</p>
                    <p className="text-2xl font-bold mt-1 text-red-500">2</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                        <span className="text-emerald-500 text-xs font-bold flex items-center">-15% <span className="material-symbols-outlined text-sm">trending_down</span></span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Alerts Today</p>
                    <p className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">28</p>
                </div>
            </div>

            {/* Chart and Health Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Uptime &amp; Performance</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Response time trends over the last 24 hours</p>
                        </div>
                        <div className="flex gap-2 text-slate-800 dark:text-slate-200">
                            <button className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">1H</button>
                            <button className="px-3 py-1 text-xs font-semibold rounded-lg bg-orange-500 text-white shadow-sm shadow-orange-500/40 hover:bg-orange-600 transition-colors">24H</button>
                            <button className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">7D</button>
                        </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col gap-6">
                        <div className="flex gap-8">
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Avg. Response Time</p>
                                <p className="text-2xl font-bold text-blue-500">248 ms</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Uptime %</p>
                                <p className="text-2xl font-bold text-emerald-500">99.98%</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Error Rate</p>
                                <p className="text-2xl font-bold text-red-400">0.04%</p>
                            </div>
                        </div>
                        <div className="relative h-64 w-full bg-gradient-to-b from-blue-500/5 to-transparent rounded-lg border-l border-b border-slate-200 dark:border-slate-800 flex items-end px-4 gap-1 overflow-hidden group">
                            <div className="flex-1 bg-blue-500/30 rounded-t h-[60%] transition-all opacity-80 group-hover:opacity-100"></div>
                            <div className="flex-1 bg-blue-500/30 rounded-t h-[65%] transition-all opacity-80 group-hover:opacity-100"></div>
                            <div className="flex-1 bg-blue-500/30 rounded-t h-[58%] transition-all opacity-80 group-hover:opacity-100"></div>
                            <div className="flex-1 bg-blue-500/30 rounded-t h-[72%] transition-all opacity-80 group-hover:opacity-100"></div>
                            <div className="flex-1 bg-blue-500/30 rounded-t h-[80%] transition-all opacity-80 group-hover:opacity-100"></div>
                            <div className="flex-1 bg-blue-500/30 rounded-t h-[75%] transition-all opacity-80 group-hover:opacity-100"></div>
                            <div className="flex-1 bg-blue-500/30 rounded-t h-[62%] transition-all opacity-80 group-hover:opacity-100"></div>
                            <div className="flex-1 bg-blue-500/30 rounded-t h-[68%] transition-all opacity-80 group-hover:opacity-100"></div>
                            <div className="flex-1 bg-blue-500/30 rounded-t h-[55%] transition-all opacity-80 group-hover:opacity-100"></div>
                            <div className="flex-1 bg-blue-500/30 rounded-t h-[48%] transition-all opacity-80 group-hover:opacity-100"></div>
                            <div className="flex-1 bg-blue-500/30 rounded-t h-[52%] transition-all opacity-80 group-hover:opacity-100"></div>
                            <div className="flex-1 bg-blue-500/30 rounded-t h-[60%] transition-all opacity-80 group-hover:opacity-100"></div>
                            <div className="flex-1 bg-blue-500/30 rounded-t h-[65%] transition-all opacity-80 group-hover:opacity-100"></div>
                            <div className="flex-1 bg-blue-500/60 rounded-t h-[70%] border-t-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                            <div className="flex-1 bg-blue-500/30 rounded-t h-[64%] transition-all opacity-80 group-hover:opacity-100"></div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">System Infrastructure</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Global service status</p>
                    </div>
                    <div className="p-6 space-y-6 flex-1 text-slate-800 dark:text-slate-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-400">memory</span>
                                <span className="text-sm font-medium">Monitoring Workers</span>
                            </div>
                            <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 font-bold uppercase tracking-tight">Active (12/12)</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-400">database</span>
                                <span className="text-sm font-medium">Main Cluster DB</span>
                            </div>
                            <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 font-bold uppercase tracking-tight">92% Loaded</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-400">timer</span>
                                <span className="text-sm font-medium">Server Uptime</span>
                            </div>
                            <span className="text-sm font-bold">142 Days</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-400">queue</span>
                                <span className="text-sm font-medium">Queue Processing</span>
                            </div>
                            <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 font-bold uppercase tracking-tight">Slight Lag</span>
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-tighter">Region Health</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm font-medium">
                                    <span>US East (N. Virginia)</span>
                                    <div className="flex gap-0.5">
                                        <div className="size-2 bg-emerald-500 rounded-sm"></div>
                                        <div className="size-2 bg-emerald-500 rounded-sm"></div>
                                        <div className="size-2 bg-emerald-500 rounded-sm"></div>
                                        <div className="size-2 bg-emerald-500 rounded-sm"></div>
                                        <div className="size-2 bg-emerald-400 rounded-sm"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm font-medium">
                                    <span>EU Central (Frankfurt)</span>
                                    <div className="flex gap-0.5">
                                        <div className="size-2 bg-emerald-500 rounded-sm"></div>
                                        <div className="size-2 bg-emerald-500 rounded-sm"></div>
                                        <div className="size-2 bg-emerald-500 rounded-sm"></div>
                                        <div className="size-2 bg-red-500 rounded-sm"></div>
                                        <div className="size-2 bg-emerald-500 rounded-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Tables */}
            <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-slate-800 dark:text-slate-100">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900">
                        <h2 className="text-lg font-bold">Latest API Activity</h2>
                        <button className="text-orange-500 text-sm font-semibold hover:underline">View All Activity</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">API Name</th>
                                    <th className="px-6 py-4">Owner</th>
                                    <th className="px-6 py-4">Endpoint</th>
                                    <th className="px-6 py-4">Response</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Last Check</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-semibold">Stripe Connect</td>
                                    <td className="px-6 py-4">Finance Team</td>
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">/v1/payouts</td>
                                    <td className="px-6 py-4 font-medium">182ms</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold tracking-wider uppercase">HEALTHY</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">2 mins ago</td>
                                </tr>
                                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-semibold">Search Engine Core</td>
                                    <td className="px-6 py-4">Platform Engineering</td>
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">/api/v2/query</td>
                                    <td className="px-6 py-4 font-medium">490ms</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold tracking-wider uppercase">TIMEOUT</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">5 mins ago</td>
                                </tr>
                                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-semibold">Auth Service</td>
                                    <td className="px-6 py-4">Security Team</td>
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">/oauth/token</td>
                                    <td className="px-6 py-4 font-medium">95ms</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold tracking-wider uppercase">HEALTHY</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Just now</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-slate-800 dark:text-slate-100">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-900">
                        <span className="material-symbols-outlined text-amber-500 animate-pulse">emergency</span>
                        <h2 className="text-lg font-bold">Recent Alerts</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Time</th>
                                    <th className="px-6 py-4">API Name</th>
                                    <th className="px-6 py-4">Issue Type</th>
                                    <th className="px-6 py-4">Severity</th>
                                    <th className="px-6 py-4">Code</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">14:22:05</td>
                                    <td className="px-6 py-4 font-semibold">Data Sync Utility</td>
                                    <td className="px-6 py-4">High Latency spike (&gt;2s)</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold tracking-wider uppercase">WARNING</span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-amber-600 font-bold">499</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold hover:bg-orange-500 hover:text-white transition-all shadow-sm">Resolve</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">13:58:12</td>
                                    <td className="px-6 py-4 font-semibold">Inventory API</td>
                                    <td className="px-6 py-4">Database connection failed</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(220,38,38,0.3)]">CRITICAL</span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-red-600 font-bold">503</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-all shadow-sm">Escalate</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
