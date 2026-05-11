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
                {/* Unified Stats Banner: Delivery Health */}
                <div className="flex flex-col lg:flex-row gap-6 bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8">
                    {/* Primary Focus: Delivery Failures */}
                    <div className="lg:w-1/3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 pb-6 lg:pb-0 lg:pr-8">
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                </span>
                                Delivery Failures
                            </p>
                            <div className="mt-4 flex items-baseline gap-3">
                                <span className="text-6xl font-black text-red-600 dark:text-red-500 tracking-tighter">12</span>
                                <span className="text-sm font-bold text-red-600/70 uppercase tracking-wide">Failed<br/>Alerts</span>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-slate-500 mt-6 lg:mt-0">Alerts failed to deliver to user endpoints (Slack/Email) in the last 24h.</p>
                    </div>

                    {/* Secondary Metrics */}
                    <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 lg:pl-4">
                        <div className="flex flex-col justify-between space-y-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Success Rate</p>
                            <div>
                                <p className="text-3xl font-black text-emerald-600 tracking-tight">98.5%</p>
                                <span className="text-emerald-600 text-xs font-bold flex items-center gap-1 mt-1">
                                    <span className="material-symbols-outlined text-[14px]">trending_up</span> Healthy
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between space-y-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Sent</p>
                            <div>
                                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">1,452</p>
                                <span className="text-slate-400 text-xs font-medium mt-1 block">Last 24 hours</span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between space-y-4">
                            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">In Queue</p>
                            <div>
                                <p className="text-3xl font-black text-amber-600 tracking-tight">5</p>
                                <span className="text-amber-600 text-xs font-bold flex items-center gap-1 mt-1">
                                    <span className="material-symbols-outlined text-[14px]">sync</span> Pending
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between space-y-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Latency</p>
                            <div>
                                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">1.2s</p>
                                <span className="text-slate-400 text-xs font-medium mt-1 block">Trigger to Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 items-end mb-2">
                    <div className="flex-1 min-w-[240px]">
                        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Search Alerts</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3.5 top-3 text-slate-400 text-sm">search</span>
                            <input className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all hover:border-slate-300 dark:hover:border-slate-700 placeholder:text-slate-400 shadow-sm" placeholder="Search by API name, ID or endpoint..." type="text" />
                        </div>
                    </div>
                    <div className="w-44">
                        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Severity</label>
                        <div className="relative">
                            <select className="w-full py-3 pl-4 pr-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all hover:border-slate-300 dark:hover:border-slate-700 appearance-none cursor-pointer shadow-sm text-slate-700 dark:text-slate-300">
                                <option>All Severities</option>
                                <option>Critical</option>
                                <option>Warning</option>
                                <option>Info</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 pointer-events-none">expand_more</span>
                        </div>
                    </div>
                    <div className="w-44">
                        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Status</label>
                        <div className="relative">
                            <select className="w-full py-3 pl-4 pr-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all hover:border-slate-300 dark:hover:border-slate-700 appearance-none cursor-pointer shadow-sm text-slate-700 dark:text-slate-300">
                                <option>All Statuses</option>
                                <option>Active</option>
                                <option>Acknowledged</option>
                                <option>Resolved</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 pointer-events-none">expand_more</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-sm">Apply Filters</button>
                        <button className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">Clear</button>
                    </div>
                </div>

                {/* Main Grid with Table and Side Panel */}
                <div className="flex gap-6 overflow-hidden">
                    {/* Table Section */}
                    <div className="flex-1 overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                        <table className="w-full text-left text-sm border-collapse min-w-[700px]">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-slate-200 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4">Delivery ID</th>
                                    <th className="px-6 py-4">Sent At</th>
                                    <th className="px-6 py-4">User / Monitor</th>
                                    <th className="px-6 py-4">Channel</th>
                                    <th className="px-6 py-4">Delivery Status</th>
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer bg-red-50/20 dark:bg-red-900/10">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-600 dark:text-slate-300">DLV-9821</td>
                                    <td className="px-6 py-4">2 mins ago</td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold">vunam3445</p>
                                        <p className="text-xs text-slate-500 truncate max-w-[12rem]">Stripe Webhook</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                                            <span className="material-symbols-outlined text-sm text-[#4A154B]">forum</span> Slack
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase flex items-center gap-1 w-fit">
                                            <span className="material-symbols-outlined text-[12px]">error</span> Failed
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary hover:underline font-bold">Details</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-600 dark:text-slate-300">DLV-9819</td>
                                    <td className="px-6 py-4">15 mins ago</td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold">acmecorp</p>
                                        <p className="text-xs text-slate-500 truncate max-w-[12rem]">Auth Service</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                                            <span className="material-symbols-outlined text-sm text-blue-500">mail</span> Email
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase flex items-center gap-1 w-fit">
                                            <span className="material-symbols-outlined text-[12px]">check_circle</span> Delivered
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary hover:underline font-bold">Details</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-600 dark:text-slate-300">DLV-9815</td>
                                    <td className="px-6 py-4">1h ago</td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold">startup_inc</p>
                                        <p className="text-xs text-slate-500 truncate max-w-[12rem]">Inventory API</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                                            <span className="material-symbols-outlined text-sm text-[#4A154B]">forum</span> Slack
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase flex items-center gap-1 w-fit">
                                            <span className="material-symbols-outlined text-[12px]">check_circle</span> Delivered
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary hover:underline font-bold">Details</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer bg-amber-50/20 dark:bg-amber-900/10">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-600 dark:text-slate-300">DLV-9812</td>
                                    <td className="px-6 py-4">Just now</td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold">devteam_alpha</p>
                                        <p className="text-xs text-slate-500 truncate max-w-[12rem]">Payment Gateway</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                                            <span className="material-symbols-outlined text-sm text-purple-500">webhook</span> Webhook
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase flex items-center gap-1 w-fit">
                                            <span className="material-symbols-outlined text-[12px] animate-spin">sync</span> Pending
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary hover:underline font-bold">Details</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Side Panel Detail (Desktop only) */}
                    <aside className="hidden lg:flex w-[400px] flex-shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl flex-col h-fit overflow-hidden animate-in slide-in-from-right-8 fade-in duration-500">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-red-50/50 dark:bg-red-500/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-bl-full -mr-8 -mt-8 blur-2xl pointer-events-none"></div>
                            <div className="flex justify-between items-center mb-6 relative">
                                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Delivery Detail</span>
                                <button className="material-symbols-outlined text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full p-1 cursor-pointer">close</button>
                            </div>
                            <div className="flex items-center justify-between relative">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">DLV-9821</h3>
                                <span className="px-3 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold uppercase shadow-sm shadow-red-600/20">Failed</span>
                            </div>
                            <p className="text-sm text-red-600 dark:text-red-400 font-bold mt-2 relative">401 Unauthorized from Slack API</p>
                        </div>
                        <div className="p-6 space-y-8">
                            <div className="grid grid-cols-2 gap-y-6 text-sm">
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">User Account</p>
                                    <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-slate-400">person</span> vunam3445</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Sent At</p>
                                    <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px] text-slate-400">schedule</span> 2 mins ago
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Target Channel</p>
                                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-3 rounded-xl mt-1 overflow-hidden">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                                            <span className="material-symbols-outlined text-sm text-[#4A154B]">forum</span> Slack Webhook
                                        </p>
                                        <p className="font-mono text-xs text-slate-500 dark:text-slate-400 truncate">https://hooks.slack.com/services/HIDDEN_BY_ADMIN_FOR_SECURITY</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">Incident Context</p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">API Monitor</span>
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">Stripe Webhook</span>
                                        </div>
                                        <span className="px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase">Down</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2 space-y-3">
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-primary text-white rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined text-sm">replay</span> Retry Delivery
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm">
                                    <span className="material-symbols-outlined text-sm">settings</span> View User Config
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-slate-500 dark:text-slate-400 font-bold hover:text-primary transition-colors mt-2">
                                    <span className="material-symbols-outlined text-sm">terminal</span> View System Logs
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
