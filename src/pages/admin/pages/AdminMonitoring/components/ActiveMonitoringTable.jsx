import React from 'react';

const ActiveMonitoringTable = () => {
    return (
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
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Owner</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Method</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Latency</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Uptime</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer bg-red-50/50 dark:bg-red-900/10 border-l-2 border-red-500 relative overflow-hidden group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-xs font-bold text-red-600 dark:text-red-400">SC</div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">Stripe Connect <span className="text-[9px] bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded font-bold animate-pulse border border-red-200 dark:border-red-800">BOTTLENECK</span></p>
                                        <p className="text-[10px] text-slate-400">api.stripe.com/v1/...</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                                        <img src="https://ui-avatars.com/api/?name=Stripe+Inc&background=random" alt="Avatar" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Stripe Inc</p>
                                        <span className="text-[9px] font-bold text-purple-600 bg-purple-100 dark:bg-purple-900/30 px-1.5 rounded">PRO</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-[10px] font-bold">POST</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="flex items-center gap-1.5 text-red-600 text-xs font-bold">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Worker Blocked
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-bold text-red-600 dark:text-red-400">15,000ms+</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">99.98%</td>
                            <td className="px-6 py-4 text-right">
                                <button className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-red-500 hover:text-white text-red-600 border border-red-200 dark:border-red-800 rounded text-xs font-bold transition-colors flex items-center gap-1 ml-auto shadow-sm">
                                    <span className="material-symbols-outlined text-[14px]">lock</span> Force Pause
                                </button>
                            </td>
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
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                                        <img src="https://ui-avatars.com/api/?name=Internal+Ops&background=random" alt="Avatar" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Internal Ops</p>
                                        <span className="text-[9px] font-bold text-slate-600 bg-slate-100 dark:bg-slate-700 px-1.5 rounded">FREE</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold">GET</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="flex items-center gap-1.5 text-green-600 text-xs font-bold">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Operational
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">45ms</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">99.99%</td>
                            <td className="px-6 py-4 text-right">
                                <button className="px-3 py-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 rounded text-xs font-bold transition-colors">
                                    Details
                                </button>
                            </td>
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
    );
};

export default ActiveMonitoringTable;
