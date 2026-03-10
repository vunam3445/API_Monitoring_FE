import React from 'react';

const AdminMonitoring = () => {
    return (
        <div className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-y-auto w-full">
            {/* Header */}
            <header className="p-8 pb-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Monitoring</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time monitoring of API uptime, response performance, and system health</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm text-slate-700 dark:text-slate-300">
                            <span className="material-symbols-outlined text-sm">refresh</span> Refresh Monitoring
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-sm">pause_circle</span> Pause Global Monitoring
                        </button>
                    </div>
                </div>
            </header>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 p-8">
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total APIs</p>
                        <span className="material-symbols-outlined text-slate-400">api</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">124</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium">
                        <span className="material-symbols-outlined text-xs">trending_up</span> +2% this week
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Healthy</p>
                        <span className="material-symbols-outlined text-green-500">check_circle</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">118</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-slate-400 font-medium">
                        <span className="material-symbols-outlined text-xs">remove</span> Stable
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Warning</p>
                        <span className="material-symbols-outlined text-yellow-500">warning</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">4</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium">
                        <span className="material-symbols-outlined text-xs">trending_down</span> -50% improvement
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Down</p>
                        <span className="material-symbols-outlined text-red-500">error</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600">2</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-red-600 font-medium">
                        <span className="material-symbols-outlined text-xs">trending_up</span> +1 since yesterday
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Avg Latency</p>
                        <span className="material-symbols-outlined text-slate-400">timer</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">240ms</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium">
                        <span className="material-symbols-outlined text-xs">trending_down</span> -12ms lower
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Checks/min</p>
                        <span className="material-symbols-outlined text-slate-400">speed</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">1.2k</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium">
                        <span className="material-symbols-outlined text-xs">trending_up</span> +5% throughput
                    </div>
                </div>
            </section>

            {/* Main Dashboard Content */}
            <div className="px-8 pb-8 flex flex-col xl:flex-row gap-8">
                <div className="flex-1 space-y-8 min-w-0">
                    {/* Performance Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Response Time Trend</h3>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">LAST 24H</span>
                            </div>
                            <div className="h-32 flex items-end gap-1.5">
                                <div className="flex-1 bg-primary/20 rounded-t h-[40%]"></div>
                                <div className="flex-1 bg-primary/20 rounded-t h-[55%]"></div>
                                <div className="flex-1 bg-primary/20 rounded-t h-[45%]"></div>
                                <div className="flex-1 bg-primary/20 rounded-t h-[65%]"></div>
                                <div className="flex-1 bg-primary rounded-t h-[50%]"></div>
                                <div className="flex-1 bg-primary/20 rounded-t h-[75%]"></div>
                                <div className="flex-1 bg-primary/20 rounded-t h-[90%]"></div>
                                <div className="flex-1 bg-primary/20 rounded-t h-[60%]"></div>
                                <div className="flex-1 bg-primary/20 rounded-t h-[40%]"></div>
                                <div className="flex-1 bg-primary/20 rounded-t h-[55%]"></div>
                                <div className="flex-1 bg-primary/20 rounded-t h-[80%]"></div>
                                <div className="flex-1 bg-primary/20 rounded-t h-[30%]"></div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Uptime %</h3>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">LIVE</span>
                            </div>
                            <div className="relative h-32 w-32 mx-auto">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle className="text-slate-100 dark:text-slate-700" cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" strokeWidth="8"></circle>
                                    <circle className="text-primary" cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" strokeDasharray="339.29" strokeDashoffset="3.39" strokeWidth="8"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-xl font-bold text-slate-900 dark:text-white">99.9%</span>
                                    <span className="text-[10px] text-slate-500">Global Avg</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Error Rate</h3>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-600">2 NEW ERRORS</span>
                            </div>
                            <div className="h-32 flex items-end justify-between px-2">
                                <div className="w-2 bg-slate-100 dark:bg-slate-700 h-2 rounded-full"></div>
                                <div className="w-2 bg-slate-100 dark:bg-slate-700 h-3 rounded-full"></div>
                                <div className="w-2 bg-red-500 h-8 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                                <div className="w-2 bg-slate-100 dark:bg-slate-700 h-2 rounded-full"></div>
                                <div className="w-2 bg-slate-100 dark:bg-slate-700 h-4 rounded-full"></div>
                                <div className="w-2 bg-red-500 h-6 rounded-full"></div>
                                <div className="w-2 bg-slate-100 dark:bg-slate-700 h-3 rounded-full"></div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Checks Activity</h3>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">THROUGHPUT</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 text-xs text-slate-500">GET</div>
                                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full w-[75%] rounded-full"></div>
                                    </div>
                                    <div className="text-xs font-bold text-slate-900 dark:text-white">75%</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 text-xs text-slate-500">POST</div>
                                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="bg-primary/60 h-full w-[20%] rounded-full"></div>
                                    </div>
                                    <div className="text-xs font-bold text-slate-900 dark:text-white">20%</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 text-xs text-slate-500">PUT/DEL</div>
                                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="bg-primary/30 h-full w-[5%] rounded-full"></div>
                                    </div>
                                    <div className="text-xs font-bold text-slate-900 dark:text-white">5%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Monitoring Table */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Active Monitoring</h3>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                                <input className="pl-9 pr-4 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg w-full sm:w-64 focus:ring-primary focus:border-primary outline-none" placeholder="Search APIs..." type="text" />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900/50">
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">API Name</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Method</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Latency</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Uptime</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Last Check</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer bg-primary/5 border-l-2 border-primary">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white">SC</div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Stripe Connect</p>
                                                    <p className="text-[10px] text-slate-400">api.stripe.com/v1/...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-[10px] font-bold">POST</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1.5 text-green-600 text-xs font-bold">
                                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Operational
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">142ms</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">99.98%</td>
                                        <td className="px-6 py-4 text-right text-xs text-slate-500">2s ago</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white">AS</div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Auth Service</p>
                                                    <p className="text-[10px] text-slate-400">auth.internal.sh/v2/verify</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold">GET</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1.5 text-red-600 text-xs font-bold">
                                                <span className="w-2 h-2 rounded-full bg-red-500"></span> Down
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">5000ms+</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">94.20%</td>
                                        <td className="px-6 py-4 text-right text-xs text-slate-500">12s ago</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white">IL</div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Inventory Lookup</p>
                                                    <p className="text-[10px] text-slate-400">prod.inventory.io/v1/stock</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold">GET</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1.5 text-yellow-600 text-xs font-bold">
                                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Warning
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">890ms</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">99.10%</td>
                                        <td className="px-6 py-4 text-right text-xs text-slate-500">45s ago</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar Panel: Details + System Health */}
                <div className="w-full xl:w-96 space-y-8">
                    {/* System Health Panel */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white">System Health Panel</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500">Monitoring Workers</span>
                                    <span className="font-bold text-green-600">Healthy (24/24)</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500">Job Queue</span>
                                    <span className="font-bold text-slate-900 dark:text-white">1.2k pending</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500">Main DB</span>
                                    <span className="font-bold text-green-600">Connected</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500">Core Engine</span>
                                    <span className="font-bold text-green-600">Online</span>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                                        <span>CPU Usage</span>
                                        <span>42%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full w-[42%]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                                        <span>RAM Usage</span>
                                        <span>68%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full w-[68%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* API Details Slide-over Panel (Simulated) */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border-l-4 border-primary shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Stripe Connect</h3>
                                <p className="text-xs text-slate-500">ID: monitor-9821</p>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold">Uptime 24h</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">99.98%</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold">Avg Latency</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">142ms</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold mb-3 flex items-center justify-between text-slate-900 dark:text-white">
                                    <span>Recent Latency (ms)</span>
                                    <span className="text-green-600 text-[10px]">Normal Range</span>
                                </p>
                                <div className="h-24 bg-slate-50 dark:bg-slate-900/50 rounded-lg flex items-end gap-1 p-2">
                                    <div className="flex-1 bg-primary/40 h-[30%] rounded-sm"></div>
                                    <div className="flex-1 bg-primary/40 h-[35%] rounded-sm"></div>
                                    <div className="flex-1 bg-primary/40 h-[32%] rounded-sm"></div>
                                    <div className="flex-1 bg-primary/40 h-[40%] rounded-sm"></div>
                                    <div className="flex-1 bg-primary/40 h-[90%] rounded-sm bg-orange-200"></div>
                                    <div className="flex-1 bg-primary/40 h-[38%] rounded-sm"></div>
                                    <div className="flex-1 bg-primary/40 h-[30%] rounded-sm"></div>
                                    <div className="flex-1 bg-primary/40 h-[32%] rounded-sm"></div>
                                    <div className="flex-1 bg-primary/40 h-[28%] rounded-sm"></div>
                                    <div className="flex-1 bg-primary/40 h-[31%] rounded-sm"></div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-slate-900 dark:text-white">Monitoring Config</p>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500">Check Interval</span>
                                        <span className="font-medium bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-900 dark:text-white">30s</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500">Request Timeout</span>
                                        <span className="font-medium bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-900 dark:text-white">5s</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500">Check From</span>
                                        <span className="font-medium text-slate-900 dark:text-white">US-East, EU-West, Asia-SE</span>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full py-2.5 bg-primary text-white font-bold rounded-lg text-sm hover:bg-primary/90 transition-all">
                                Configure API Check
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMonitoring;
