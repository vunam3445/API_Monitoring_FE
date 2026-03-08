import React from 'react';

const APIHealthGrid = () => {
    return (
        <div>
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-primary">view_quilt</span>
                Key API Health
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* User Auth Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-black text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                            <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                            Healthy
                        </span>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">User Auth Service</h4>
                    <p className="text-sm font-mono text-slate-500 dark:text-slate-400 mb-6 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded inline-block">/v1/auth/login</p>
                    <div className="flex justify-between text-sm mb-4">
                        <div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Latency</p>
                            <p className="font-black text-slate-900 dark:text-white text-lg">32ms</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Uptime</p>
                            <p className="font-black text-emerald-600 text-lg">99.98%</p>
                        </div>
                    </div>
                    <div className="h-10 w-full mt-2">
                        <svg height="100%" viewBox="0 0 100 20" width="100%" className="-ml-1">
                            <path d="M0 15 L10 12 L20 16 L30 10 L40 12 L50 8 L60 14 L70 12 L80 15 L90 10 L100 12"
                                fill="none" stroke="#10b981" strokeWidth="2.5" className="group-hover:stroke-[3px] transition-all"></path>
                        </svg>
                    </div>
                </div>

                {/* Payment Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-black text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                            <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                            Warning
                        </span>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Payment Gateway</h4>
                    <p className="text-sm font-mono text-slate-500 dark:text-slate-400 mb-6 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded inline-block">/v2/payments/charge</p>
                    <div className="flex justify-between text-sm mb-4">
                        <div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Latency</p>
                            <p className="font-black text-amber-600 text-lg">412ms</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Uptime</p>
                            <p className="font-black text-emerald-600 text-lg">98.24%</p>
                        </div>
                    </div>
                    <div className="h-10 w-full mt-2">
                        <svg height="100%" viewBox="0 0 100 20" width="100%" className="-ml-1">
                            <path d="M0 10 L10 12 L20 8 L30 15 L40 5 L50 18 L60 10 L70 15 L80 8 L90 12 L100 10"
                                fill="none" stroke="#f59e0b" strokeWidth="2.5" className="group-hover:stroke-[3px] transition-all"></path>
                        </svg>
                    </div>
                </div>

                {/* Inventory Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-black text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                            <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                            Healthy
                        </span>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Inventory API</h4>
                    <p className="text-sm font-mono text-slate-500 dark:text-slate-400 mb-6 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded inline-block">/v1/stock/status</p>
                    <div className="flex justify-between text-sm mb-4">
                        <div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Latency</p>
                            <p className="font-black text-slate-900 dark:text-white text-lg">28ms</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Uptime</p>
                            <p className="font-black text-emerald-600 text-lg">99.99%</p>
                        </div>
                    </div>
                    <div className="h-10 w-full mt-2">
                        <svg height="100%" viewBox="0 0 100 20" width="100%" className="-ml-1">
                            <path d="M0 12 L10 14 L20 12 L30 13 L40 12 L50 14 L60 12 L70 13 L80 12 L90 14 L100 12"
                                fill="none" stroke="#10b981" strokeWidth="2.5" className="group-hover:stroke-[3px] transition-all"></path>
                        </svg>
                    </div>
                </div>

                {/* Analytics Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-red-500 animate-pulse"></div>
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-black text-red-600 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider animate-pulse">
                            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                            Down
                        </span>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Analytics Engine</h4>
                    <p className="text-sm font-mono text-slate-500 dark:text-slate-400 mb-6 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded inline-block">/v1/metrics/push</p>
                    <div className="flex justify-between text-sm mb-4">
                        <div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Latency</p>
                            <p className="font-black text-red-500 text-lg">Timeout</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Uptime</p>
                            <p className="font-black text-red-500 text-lg">92.4%</p>
                        </div>
                    </div>
                    <div className="h-10 w-full mt-2">
                        <svg height="100%" viewBox="0 0 100 20" width="100%" className="-ml-1">
                            <path d="M0 10 L20 10 L40 10 L50 10 L60 10 L80 10 L100 10" fill="none"
                                stroke="#ef4444" strokeDasharray="4" strokeWidth="2.5" className="group-hover:stroke-[3px] transition-all"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default APIHealthGrid;
