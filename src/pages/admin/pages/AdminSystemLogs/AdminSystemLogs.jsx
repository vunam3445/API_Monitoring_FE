import React from 'react';

const AdminSystemLogs = () => {
    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-background-light dark:bg-background-dark min-h-0 min-w-0 h-full">
            {/* Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">System Logs</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Monitor system activity, errors, and operational logs across the platform.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl hover:bg-slate-50 dark:hover:bg-primary/20 transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-lg">refresh</span>
                        Refresh
                    </button>
                    <button className="px-4 py-2 flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl hover:bg-slate-50 dark:hover:bg-primary/20 transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-lg">download</span>
                        Export
                    </button>
                    <button className="px-4 py-2 flex items-center gap-2 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-lg">delete_sweep</span>
                        Clear Old Logs
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white dark:bg-primary/5 p-5 rounded-xl border border-slate-200 dark:border-primary/20 shadow-sm">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Logs Today</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-2xl font-black text-slate-900 dark:text-white">5,240</span>
                        <span className="text-xs font-bold text-emerald-500 flex items-center">+5.2%</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-primary/5 p-5 rounded-xl border border-rose-100 dark:border-rose-900/30 shadow-sm">
                    <p className="text-xs font-bold text-rose-500 uppercase tracking-wider">Error Logs</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-2xl font-black text-rose-600 dark:text-rose-400">12</span>
                        <span className="text-xs font-bold text-rose-500 flex items-center">-2.1%</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-primary/5 p-5 rounded-xl border border-amber-100 dark:border-amber-900/30 shadow-sm">
                    <p className="text-xs font-bold text-amber-500 uppercase tracking-wider">Warning Logs</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-2xl font-black text-amber-600 dark:text-amber-400">45</span>
                        <span className="text-xs font-bold text-emerald-500 flex items-center">+0.5%</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-primary/5 p-5 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-sm">
                    <p className="text-xs font-bold text-blue-500 uppercase tracking-wider">Info Logs</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">4,850</span>
                        <span className="text-xs font-bold text-emerald-500 flex items-center">+10.4%</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-primary/5 p-5 rounded-xl border border-slate-200 dark:border-primary/20 shadow-sm">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">System Events</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-2xl font-black text-slate-900 dark:text-white">333</span>
                        <span className="text-xs font-bold text-emerald-500 flex items-center">+1.2%</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-primary/5 p-6 rounded-xl border border-slate-200 dark:border-primary/20 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Keyword</label>
                        <input className="w-full bg-slate-50 dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-white" placeholder="Search message, ID..." type="text" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Log Level</label>
                        <select className="w-full bg-slate-50 dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-white">
                            <option>All Levels</option>
                            <option>Error</option>
                            <option>Warning</option>
                            <option>Info</option>
                            <option>Debug</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Service</label>
                        <select className="w-full bg-slate-50 dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-white">
                            <option>All Services</option>
                            <option>API Server</option>
                            <option>Monitoring Worker</option>
                            <option>Alert Engine</option>
                            <option>Database</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Time Range</label>
                        <select className="w-full bg-slate-50 dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-white">
                            <option>Last 1 Hour</option>
                            <option>Last 6 Hours</option>
                            <option>Last 24 Hours</option>
                            <option>Last 7 Days</option>
                            <option>Custom Range</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-primary/10">
                    <button className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Reset Filters</button>
                    <button className="px-6 py-2 bg-primary/20 text-primary hover:bg-primary hover:text-white text-sm font-bold rounded-lg transition-all">Apply Filter</button>
                </div>
            </div>

            {/* Split View: Table + Detail */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Table Section */}
                <div className="flex-1 bg-white dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/20 shadow-sm overflow-hidden flex flex-col min-w-[300px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-primary/10 border-b border-slate-200 dark:border-primary/20">
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Timestamp</th>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Level</th>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Event</th>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Message</th>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-primary/10">
                                <tr className="hover:bg-primary/5 transition-colors cursor-pointer bg-rose-50/30 dark:bg-rose-900/10">
                                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">2023-10-27 10:15:30</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">Error</span>
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">Alert Engine</td>
                                    <td className="px-4 py-3"><span className="font-mono text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-1.5 py-0.5 rounded">SMS_DELIVERY_FAILED</span></td>
                                    <td className="px-4 py-3 text-sm font-mono truncate max-w-[200px] text-rose-700 dark:text-rose-300">Failed to send SMS alert to +123456789</td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="p-1 hover:bg-white dark:hover:bg-primary/20 rounded-lg text-slate-400 transition-colors">
                                            <span className="material-symbols-outlined text-lg">open_in_new</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-primary/5 transition-colors cursor-pointer">
                                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">2023-10-27 10:14:22</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">Info</span>
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">Monitoring Worker</td>
                                    <td className="px-4 py-3"><span className="font-mono text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-1.5 py-0.5 rounded">CHECK_COMPLETED</span></td>
                                    <td className="px-4 py-3 text-sm font-mono truncate max-w-[200px] text-slate-600 dark:text-slate-400">Health check completed for 'Stripe API'</td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="p-1 hover:bg-white dark:hover:bg-primary/20 rounded-lg text-slate-400 transition-colors">
                                            <span className="material-symbols-outlined text-lg">open_in_new</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-primary/5 transition-colors cursor-pointer bg-amber-50/20 dark:bg-amber-900/5">
                                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">2023-10-27 10:12:05</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">Warning</span>
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">Database</td>
                                    <td className="px-4 py-3"><span className="font-mono text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-1.5 py-0.5 rounded">SLOW_QUERY</span></td>
                                    <td className="px-4 py-3 text-sm font-mono truncate max-w-[200px] text-amber-700 dark:text-amber-300">Query took 1.2s: SELECT * FROM logs WHERE...</td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="p-1 hover:bg-white dark:hover:bg-primary/20 rounded-lg text-slate-400 transition-colors">
                                            <span className="material-symbols-outlined text-lg">open_in_new</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-primary/5 transition-colors cursor-pointer">
                                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">2023-10-27 10:10:45</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">Info</span>
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">API Server</td>
                                    <td className="px-4 py-3"><span className="font-mono text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-1.5 py-0.5 rounded">USER_LOGIN</span></td>
                                    <td className="px-4 py-3 text-sm font-mono truncate max-w-[200px] text-slate-600 dark:text-slate-400">User 'alex_admin' logged in via Web</td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="p-1 hover:bg-white dark:hover:bg-primary/20 rounded-lg text-slate-400 transition-colors">
                                            <span className="material-symbols-outlined text-lg">open_in_new</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-slate-100 dark:border-primary/10 flex items-center justify-between">
                        <p className="text-xs text-slate-500">Showing 1 to 4 of 5,240 results</p>
                        <div className="flex gap-2">
                            <button className="p-1.5 border border-slate-200 dark:border-primary/20 rounded-lg text-slate-400 hover:text-primary disabled:opacity-50" disabled>
                                <span className="material-symbols-outlined text-sm leading-none">chevron_left</span>
                            </button>
                            <button className="p-1.5 border border-slate-200 dark:border-primary/20 rounded-lg text-slate-400 hover:text-primary">
                                <span className="material-symbols-outlined text-sm leading-none">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Detail Panel */}
                <div className="lg:w-96 shrink-0 bg-white dark:bg-primary/5 rounded-xl border-2 border-primary/40 shadow-xl overflow-hidden flex flex-col h-fit">
                    <div className="p-4 bg-primary text-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined">description</span>
                            <span className="font-bold text-sm">Log Details</span>
                        </div>
                        <button className="hover:bg-white/20 p-1 rounded transition-colors text-white">
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <span className="px-2 py-1 rounded text-xs font-black uppercase bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">Error</span>
                                <span className="text-xs text-slate-500 font-mono">2023-10-27 10:15:30.452</span>
                            </div>
                            <h3 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">SMS_DELIVERY_FAILED</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-primary/10 font-mono">
                                Failed to send SMS alert to +123456789. Provider 'Twilio' returned status code 400: Invalid Number.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Metadata</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Service</p>
                                    <p className="text-xs font-semibold text-slate-900 dark:text-white">Alert Engine</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Node ID</p>
                                    <p className="text-xs font-mono text-slate-900 dark:text-white">alert-srv-01</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Request ID</p>
                                    <p className="text-xs font-mono text-primary">REQ-8812</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">IP Address</p>
                                    <p className="text-xs font-mono text-slate-900 dark:text-white">10.0.1.45</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stack Trace</h4>
                            <div className="text-[11px] font-mono bg-slate-900 text-emerald-400 p-4 rounded-lg overflow-x-auto whitespace-pre leading-relaxed border border-slate-800">
                                {`Error: SMS Delivery Failed
    at TwilioClient.send (clients/twilio.js:42:11)
    at AlertDispatcher.dispatch (services/alert.js:89:30)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async AlertEngine.handleEvent (engine.js:154:7)`}
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-primary/10">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Related Activity</h4>
                            <div className="space-y-2">
                                <a className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-primary/5 hover:bg-primary/10 transition-colors group" href="#">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-lg">api</span>
                                        <span className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">API Call Trace</span>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-sm transition-colors">arrow_forward</span>
                                </a>
                                <a className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-primary/5 hover:bg-primary/10 transition-colors group" href="#">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-lg">notifications_active</span>
                                        <span className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Triggered Alert</span>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-sm transition-colors">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSystemLogs;
