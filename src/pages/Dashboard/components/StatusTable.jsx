import React from 'react';

const StatusTable = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-bold">Service Health Overview</h3>
                <button className="text-xs font-bold text-primary hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                            <th className="px-6 py-4">API Name</th>
                            <th className="px-6 py-4">Endpoint</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Response</th>
                            <th className="px-6 py-4 text-right">Last Check</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr>
                            <td className="px-6 py-4 text-sm font-semibold">User Auth Service</td>
                            <td className="px-6 py-4 text-xs font-mono text-slate-500">/v1/auth</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                    <span className="size-1.5 rounded-full bg-emerald-500"></span> Healthy
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm">120ms</td>
                            <td className="px-6 py-4 text-right text-xs text-slate-500">2m ago</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm font-semibold">Payment Gateway</td>
                            <td className="px-6 py-4 text-xs font-mono text-slate-500">/v2/charge</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                    <span className="size-1.5 rounded-full bg-amber-500"></span> Warning
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm">850ms</td>
                            <td className="px-6 py-4 text-right text-xs text-slate-500">1m ago</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm font-semibold">Inventory System</td>
                            <td className="px-6 py-4 text-xs font-mono text-slate-500">/v1/stocks</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                                    <span className="size-1.5 rounded-full bg-rose-500"></span> Down
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm">--</td>
                            <td className="px-6 py-4 text-right text-xs text-slate-500">30s ago</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm font-semibold">Analytics Hub</td>
                            <td className="px-6 py-4 text-xs font-mono text-slate-500">/v1/event</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                    <span className="size-1.5 rounded-full bg-emerald-500"></span> Healthy
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm">45ms</td>
                            <td className="px-6 py-4 text-right text-xs text-slate-500">5m ago</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StatusTable;
