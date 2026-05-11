import React from 'react';

const ApiDetailsPanel = () => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border-l-4 border-primary shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Stripe Connect</h3>
                    <p className="text-xs text-slate-500">ID: monitor-9821</p>
                </div>
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Uptime 24h</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">99.98%</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Avg Latency</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">142ms</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-bold mb-3 flex items-center justify-between text-slate-900 dark:text-white">
                        <span>Recent Latency (ms)</span>
                        <span className="text-green-600 text-[10px]">Normal Range</span>
                    </p>
                    <div className="h-24 bg-slate-50 dark:bg-slate-900/50 rounded-lg flex items-end gap-1 p-2">
                        <div className="flex-1 bg-primary/40 h-[30%] rounded-sm"></div>
                        <div className="flex-1 bg-primary/40 h-[35%] rounded-sm"></div>
                        <div className="flex-1 bg-primary/40 h-[32%] rounded-sm"></div>
                        <div className="flex-1 bg-primary/40 h-[40%] rounded-sm"></div>
                        <div className="flex-1 bg-primary/40 h-[90%] rounded-sm bg-orange-200"></div>
                        <div className="flex-1 bg-primary/40 h-[38%] rounded-sm"></div>
                        <div className="flex-1 bg-primary/40 h-[30%] rounded-sm"></div>
                        <div className="flex-1 bg-primary/40 h-[32%] rounded-sm"></div>
                        <div className="flex-1 bg-primary/40 h-[28%] rounded-sm"></div>
                        <div className="flex-1 bg-primary/40 h-[31%] rounded-sm"></div>
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Monitoring Config</p>
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Check Interval</span>
                            <span className="font-medium bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-900 dark:text-white">30s</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Request Timeout</span>
                            <span className="font-medium bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-900 dark:text-white">5s</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Check From</span>
                            <span className="font-medium text-slate-900 dark:text-white">US-East, EU-West, Asia-SE</span>
                        </div>
                    </div>
                </div>
                <button className="w-full py-2.5 bg-primary text-white font-bold rounded-lg text-sm hover:bg-primary/90 transition-all">
                    Configure API Check
                </button>
            </div>
        </div>
    );
};

export default ApiDetailsPanel;
