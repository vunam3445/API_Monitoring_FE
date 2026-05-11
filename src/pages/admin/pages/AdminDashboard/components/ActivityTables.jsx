import React from 'react';

const ActivityTables = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-slate-800 dark:text-slate-100">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900">
                    <h2 className="text-lg font-bold">Latest API Activity</h2>
                    <button className="text-primary text-sm font-semibold hover:underline">View All Activity</button>
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
                                    <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-all shadow-sm">Resolve</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ActivityTables;
