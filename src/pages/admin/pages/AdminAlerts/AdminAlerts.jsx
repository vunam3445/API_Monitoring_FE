import React from 'react';

const AdminAlerts = () => {
    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Header */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Alerts</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track and manage all API monitoring alerts across the platform</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl font-semibold text-sm hover:bg-primary/20 transition-colors border border-primary/20">
                            <span className="material-symbols-outlined text-sm">done_all</span>
                            Acknowledge All Alerts
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
                            <span className="material-symbols-outlined text-sm">download</span>
                            Export Alerts
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Today</p>
                        <div className="mt-2 flex items-end justify-between">
                            <span className="text-2xl font-bold">142</span>
                            <span className="text-green-600 text-xs font-medium flex items-center"><span className="material-symbols-outlined text-xs">trending_up</span> 12%</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border-l-4 border-l-red-500 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-xs font-bold text-red-600 uppercase tracking-wider">Critical</p>
                        <div className="mt-2 flex items-end justify-between">
                            <span className="text-2xl font-bold text-red-600">12</span>
                            <span className="text-slate-400 text-xs">High Priority</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border-l-4 border-l-amber-500 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Warning</p>
                        <div className="mt-2 flex items-end justify-between">
                            <span className="text-2xl font-bold text-amber-600">28</span>
                            <span className="text-slate-400 text-xs">Needs Review</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border-l-4 border-l-emerald-500 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Resolved</p>
                        <div className="mt-2 flex items-end justify-between">
                            <span className="text-2xl font-bold text-emerald-600">102</span>
                            <span className="text-emerald-600 text-xs font-medium flex items-center"><span className="material-symbols-outlined text-xs">check</span> Clean</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active APIs</p>
                        <div className="mt-2 flex items-end justify-between">
                            <span className="text-2xl font-bold">8</span>
                            <span className="text-slate-400 text-xs">Impacted</span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Search</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
                            <input className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Name or endpoint..." type="text" />
                        </div>
                    </div>
                    <div className="w-40">
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Severity</label>
                        <select className="w-full py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                            <option>All Severities</option>
                            <option>Critical</option>
                            <option>Warning</option>
                            <option>Info</option>
                        </select>
                    </div>
                    <div className="w-40">
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Status</label>
                        <select className="w-full py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                            <option>All Statuses</option>
                            <option>Active</option>
                            <option>Acknowledged</option>
                            <option>Resolved</option>
                        </select>
                    </div>
                    <div className="w-40">
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Owner</label>
                        <select className="w-full py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                            <option>All Teams</option>
                            <option>DevOps</option>
                            <option>Backend</option>
                            <option>Security</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90">Apply</button>
                        <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg font-bold text-sm">Reset</button>
                    </div>
                </div>

                {/* Main Grid with Table and Side Panel */}
                <div className="flex gap-6 overflow-hidden">
                    {/* Table Section */}
                    <div className="flex-1 overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                        <table className="w-full text-left text-sm border-collapse min-w-[700px]">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-slate-200 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Triggered</th>
                                    <th className="px-6 py-4">API / Endpoint</th>
                                    <th className="px-6 py-4">Severity</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Owner</th>
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer bg-red-50/20 dark:bg-red-900/10">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-600 dark:text-slate-300">ALT-9821</td>
                                    <td className="px-6 py-4">2 mins ago</td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold">Stripe Webhook</p>
                                        <p className="text-xs text-slate-500 truncate max-w-[12rem]">/v1/payments</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase">Critical</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1.5 text-red-600">
                                            <span className="size-2 rounded-full bg-red-600 animate-pulse"></span> Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">DevOps</td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary hover:underline font-bold">Details</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-600 dark:text-slate-300">ALT-9819</td>
                                    <td className="px-6 py-4">15 mins ago</td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold">Auth Service</p>
                                        <p className="text-xs text-slate-500 truncate max-w-[12rem]">/auth/login</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase">Warning</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                                            <span className="size-2 rounded-full bg-slate-300 dark:bg-slate-600"></span> Ack
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">Backend</td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary hover:underline font-bold">Details</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-600 dark:text-slate-300">ALT-9815</td>
                                    <td className="px-6 py-4">1h ago</td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold">Inventory API</p>
                                        <p className="text-xs text-slate-500 truncate max-w-[12rem]">/v2/stock/check</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase">Info</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1.5 text-emerald-600">
                                            <span className="size-2 rounded-full bg-emerald-600"></span> Resolved
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">Platform</td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary hover:underline font-bold">Details</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer bg-red-50/10 dark:bg-red-900/5">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-600 dark:text-slate-300">ALT-9812</td>
                                    <td className="px-6 py-4">2h ago</td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold">Payment Gateway</p>
                                        <p className="text-xs text-slate-500 truncate max-w-[12rem]">/v1/charge</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase">Critical</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1.5 text-red-600">
                                            <span className="size-2 rounded-full bg-red-600 animate-pulse"></span> Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">SRE Team</td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary hover:underline font-bold">Details</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Side Panel Detail (Desktop only) */}
                    <aside className="hidden lg:flex w-96 flex-shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg flex-col h-fit overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-red-50/30 dark:bg-red-900/10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">Alert Detail</span>
                                <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-slate-600">close</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white">ALT-9821</h3>
                                <span className="px-2 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold uppercase">Critical</span>
                            </div>
                            <p className="text-sm text-red-600 font-semibold mt-1">High Error Rate (500 Internal Server Error)</p>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-y-4 text-sm">
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase">API Name</p>
                                    <p className="font-semibold text-slate-700 dark:text-slate-300">Stripe Webhook</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase">Triggered</p>
                                    <p className="font-semibold text-slate-700 dark:text-slate-300">2 mins ago</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs text-slate-400 font-bold uppercase">Endpoint</p>
                                    <p className="font-mono text-xs bg-slate-50 dark:bg-slate-800 p-2 rounded mt-1 overflow-x-auto">https://api.stripe.com/v1/payments</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase mb-3">Monitoring Data</p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm text-blue-500">timer</span>
                                            <span className="text-sm">Response Time</span>
                                        </div>
                                        <span className="text-sm font-bold">142ms</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm text-emerald-500">bolt</span>
                                            <span className="text-sm">Uptime</span>
                                        </div>
                                        <span className="text-sm font-bold">99.98%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 space-y-3">
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined text-sm">check_circle</span> Acknowledge Alert
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-700">
                                    <span className="material-symbols-outlined text-sm">task_alt</span> Mark as Resolved
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-slate-500 dark:text-slate-400 font-bold hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-sm">list_alt</span> View Related Logs
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default AdminAlerts;
