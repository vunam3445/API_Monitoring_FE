import React from 'react';

const SystemInfrastructure = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">System Infrastructure</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Global service status</p>
            </div>
            <div className="p-6 space-y-6 flex-1 text-slate-800 dark:text-slate-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-400">memory</span>
                        <span className="text-sm font-medium">Monitoring Workers</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 font-bold uppercase tracking-tight">Active (12/12)</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-400">database</span>
                        <span className="text-sm font-medium">Main Cluster DB</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 font-bold uppercase tracking-tight">92% Loaded</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-400">timer</span>
                        <span className="text-sm font-medium">Server Uptime</span>
                    </div>
                    <span className="text-sm font-bold">142 Days</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-400">queue</span>
                        <span className="text-sm font-medium">Queue Processing</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 font-bold uppercase tracking-tight">Slight Lag</span>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-tighter">Region Health</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm font-medium">
                            <span>US East (N. Virginia)</span>
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map(i => <div key={i} className="size-2 bg-emerald-500 rounded-sm"></div>)}
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm font-medium">
                            <span>EU Central (Frankfurt)</span>
                            <div className="flex gap-0.5">
                                {[1, 2, 3].map(i => <div key={i} className="size-2 bg-emerald-500 rounded-sm"></div>)}
                                <div className="size-2 bg-red-500 rounded-sm"></div>
                                <div className="size-2 bg-emerald-500 rounded-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemInfrastructure;
