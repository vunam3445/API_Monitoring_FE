import React from 'react';

const AlertsTableSection = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-3 items-center">
                    <div className="relative min-w-[300px]">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">filter_list</span>
                        <input
                            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                            placeholder="Search API or alert message..." type="text" />
                    </div>
                    <select className="text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 focus:ring-1 focus:ring-primary outline-none">
                        <option>Status: All</option>
                        <option>Active</option>
                        <option>Resolved</option>
                    </select>
                    <select className="text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 focus:ring-1 focus:ring-primary outline-none">
                        <option>Severity: All</option>
                        <option>Critical</option>
                        <option>Warning</option>
                        <option>Info</option>
                    </select>
                    <select className="text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 focus:ring-1 focus:ring-primary outline-none">
                        <option>Last 24h</option>
                        <option>Last 5m</option>
                        <option>Last 1h</option>
                        <option>Last 7d</option>
                    </select>
                </div>
                <button className="text-slate-500 hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium">
                    <span className="material-symbols-outlined text-lg">download</span>
                    Export
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                        <tr>
                            <th className="px-6 py-4">Time</th>
                            <th className="px-6 py-4">API Name</th>
                            <th className="px-6 py-4">Endpoint</th>
                            <th className="px-6 py-4">Alert Type</th>
                            <th className="px-6 py-4">Severity</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Message</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {/* Row 1 */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">12:04:12 PM</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">Authentication Svc</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-500">/v1/auth/login</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">API Down</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 w-max">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                    CRITICAL
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded text-[11px] font-bold border border-primary/20 text-primary bg-primary/5">ACTIVE</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate">Service unreachable from us-east-1 region</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-primary">
                                        <span className="material-symbols-outlined text-lg">visibility</span>
                                    </button>
                                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-green-500">
                                        <span className="material-symbols-outlined text-lg">check_circle</span>
                                    </button>
                                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-red-500">
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        {/* Row 2 */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">11:58:34 AM</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">Payment Gateway</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-500">/v2/checkout</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Slow Response</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 w-max">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                    WARNING
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded text-[11px] font-bold border border-primary/20 text-primary bg-primary/5">ACTIVE</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate">Latency exceeds 1200ms threshold (Avg: 1450ms)</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-lg">visibility</span></button>
                                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-green-500"><span className="material-symbols-outlined text-lg">check_circle</span></button>
                                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-lg">delete</span></button>
                                </div>
                            </td>
                        </tr>
                        {/* Row 3 */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">11:45:01 AM</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">Data Analytics</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-500">/v1/metrics</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Timeout</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 w-max">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    INFO
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded text-[11px] font-bold border border-emerald-500/20 text-emerald-500 bg-emerald-500/5">RESOLVED</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate">Minor timeout issues during batch processing</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-lg">visibility</span></button>
                                    <button className="p-1.5 opacity-30 cursor-not-allowed"><span className="material-symbols-outlined text-lg">check_circle</span></button>
                                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-lg">delete</span></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm">
                <span className="text-slate-500">Showing 3 of 1,284 alerts</span>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">Previous</button>
                    <button className="px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">1</button>
                    <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">2</button>
                    <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">3</button>
                    <span className="px-2 text-slate-400">...</span>
                    <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">Next</button>
                </div>
            </div>
        </div>
    );
};

export default AlertsTableSection;
