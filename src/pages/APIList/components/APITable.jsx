import React from 'react';

const APITable = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">API Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Method & Endpoint</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Latency</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Uptime</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {/* Row 1 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="size-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/10"></div>
                                <span className="font-bold text-slate-900 dark:text-slate-100">User Authentication</span>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-tighter border border-blue-200 dark:border-blue-800">POST</span>
                                <span className="text-sm font-mono text-slate-500 dark:text-slate-400">/api/v1/auth/login</span>
                            </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">Healthy</span>
                        </td>
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">124ms</span>
                                <div className="flex items-end gap-0.5 h-6">
                                    <div className="w-1 bg-primary/20 h-2 rounded-full"></div>
                                    <div className="w-1 bg-primary/20 h-4 rounded-full"></div>
                                    <div className="w-1 bg-primary/20 h-3 rounded-full"></div>
                                    <div className="w-1 bg-primary h-5 rounded-full"></div>
                                    <div className="w-1 bg-primary/40 h-3 rounded-full"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <div className="w-32">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-bold text-slate-400">99.9%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full w-[99.9%]"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5 text-right whitespace-nowrap">
                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors">
                                    <span className="material-symbols-outlined text-sm">visibility</span>
                                </button>
                                <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors">
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                </button>
                                <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-500 transition-colors">
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                        </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="size-2.5 rounded-full bg-amber-500 ring-4 ring-amber-500/10"></div>
                                <span className="font-bold text-slate-900 dark:text-slate-100">Payment Processing</span>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-tighter border border-emerald-200 dark:border-emerald-800">GET</span>
                                <span className="text-sm font-mono text-slate-500 dark:text-slate-400">/payments/status/:id</span>
                            </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                            <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-bold">Warning</span>
                        </td>
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-amber-600">842ms</span>
                                <div className="flex items-end gap-0.5 h-6">
                                    <div className="w-1 bg-amber-500/20 h-3 rounded-full"></div>
                                    <div className="w-1 bg-amber-500/20 h-4 rounded-full"></div>
                                    <div className="w-1 bg-amber-500 h-6 rounded-full"></div>
                                    <div className="w-1 bg-amber-500 h-5 rounded-full"></div>
                                    <div className="w-1 bg-amber-500/40 h-4 rounded-full"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <div className="w-32">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-bold text-slate-400">92.4%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-amber-500 h-full w-[92.4%]"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5 text-right whitespace-nowrap">
                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><span className="material-symbols-outlined text-sm">visibility</span></button>
                                <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><span className="material-symbols-outlined text-sm">edit</span></button>
                                <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-500 transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
                            </div>
                        </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="size-2.5 rounded-full bg-red-500 ring-4 ring-red-500/10 animate-pulse"></div>
                                <span className="font-bold text-slate-900 dark:text-slate-100">Analytics Export</span>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-tighter border border-purple-200 dark:border-purple-800">PUT</span>
                                <span className="text-sm font-mono text-slate-500 dark:text-slate-400">/v2/stats/generate</span>
                            </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                            <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold">Down</span>
                        </td>
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-red-500">Timeout</span>
                                <div className="flex items-end gap-0.5 h-6">
                                    <div className="w-1 bg-slate-200 dark:bg-slate-700 h-1 rounded-full"></div>
                                    <div className="w-1 bg-slate-200 dark:bg-slate-700 h-1 rounded-full"></div>
                                    <div className="w-1 bg-slate-200 dark:bg-slate-700 h-1 rounded-full"></div>
                                    <div className="w-1 bg-slate-200 dark:bg-slate-700 h-1 rounded-full"></div>
                                    <div className="w-1 bg-slate-200 dark:bg-slate-700 h-1 rounded-full"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <div className="w-32">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-bold text-slate-400">45.0%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-red-500 h-full w-[45%]"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5 text-right whitespace-nowrap">
                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><span className="material-symbols-outlined text-sm">visibility</span></button>
                                <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><span className="material-symbols-outlined text-sm">edit</span></button>
                                <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-500 transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
                            </div>
                        </td>
                    </tr>

                    {/* Row 4 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="size-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/10"></div>
                                <span className="font-bold text-slate-900 dark:text-slate-100">Product Catalog</span>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-tighter border border-emerald-200 dark:border-emerald-800">GET</span>
                                <span className="text-sm font-mono text-slate-500 dark:text-slate-400">/v1/catalog/items</span>
                            </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">Healthy</span>
                        </td>
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">45ms</span>
                                <div className="flex items-end gap-0.5 h-6">
                                    <div className="w-1 bg-primary/20 h-1 rounded-full"></div>
                                    <div className="w-1 bg-primary/20 h-2 rounded-full"></div>
                                    <div className="w-1 bg-primary h-1 rounded-full"></div>
                                    <div className="w-1 bg-primary/40 h-1.5 rounded-full"></div>
                                    <div className="w-1 bg-primary/40 h-1 rounded-full"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <div className="w-32">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-bold text-slate-400">100%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full w-[100%]"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5 text-right whitespace-nowrap">
                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><span className="material-symbols-outlined text-sm">visibility</span></button>
                                <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><span className="material-symbols-outlined text-sm">edit</span></button>
                                <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-500 transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Pagination */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500">Showing <span className="text-slate-900 dark:text-slate-200">1-4</span> of <span className="text-slate-900 dark:text-slate-200">18</span> APIs</p>
                <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors disabled:opacity-50" disabled>
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <div className="flex items-center gap-1">
                        <button className="size-8 rounded-lg bg-primary text-white text-xs font-bold">1</button>
                        <button className="size-8 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold">2</button>
                        <button className="size-8 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold">3</button>
                        <span className="px-1 text-slate-400">...</span>
                        <button className="size-8 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold">5</button>
                    </div>
                    <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default APITable;
