import React from 'react';

const RecentEventsTable = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Monitoring Events</h3>
                <button className="flex items-center gap-1 text-primary text-sm font-bold hover:text-primary/80 transition-colors">
                    View All Logs
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 border-b border-slate-100 dark:border-slate-800">
                            <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Time</th>
                            <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">API Name</th>
                            <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Event Type</th>
                            <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-center">Response Time</th>
                            <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Message</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group">
                            <td className="px-6 py-4 text-slate-500 font-mono text-xs whitespace-nowrap">10:48:22</td>
                            <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">User Auth</td>
                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">Health Check Passed</td>
                            <td className="px-6 py-4 text-center font-bold">31ms</td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider rounded-lg border border-emerald-200 dark:border-emerald-800">Healthy</span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 truncate max-w-xs group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">Connection stable, latency optimal</td>
                        </tr>

                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group">
                            <td className="px-6 py-4 text-slate-500 font-mono text-xs whitespace-nowrap">10:47:15</td>
                            <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Payment Gateway</td>
                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">Slow Response</td>
                            <td className="px-6 py-4 text-center text-amber-600 font-black">1.2s</td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider rounded-lg border border-amber-200 dark:border-amber-800">Warning</span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 truncate max-w-xs group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">Upstream provider latency spike</td>
                        </tr>

                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group">
                            <td className="px-6 py-4 text-red-500 dark:text-red-400 font-mono text-xs whitespace-nowrap">10:45:02</td>
                            <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Analytics Engine</td>
                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">API Failure</td>
                            <td className="px-6 py-4 text-center text-red-600 font-black">Timeout</td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-wider rounded-lg border border-red-200 dark:border-red-800 animate-pulse">Down</span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 truncate max-w-xs group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">Service unavailable (503)</td>
                        </tr>

                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group">
                            <td className="px-6 py-4 text-slate-500 font-mono text-xs whitespace-nowrap">10:44:30</td>
                            <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Inventory API</td>
                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">Health Check Passed</td>
                            <td className="px-6 py-4 text-center font-bold">27ms</td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider rounded-lg border border-emerald-200 dark:border-emerald-800">Healthy</span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 truncate max-w-xs group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">All systems operational</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentEventsTable;
