import React from 'react';

const SystemHealthPanel = () => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">System Health Panel</h3>
            </div>
            <div className="p-6 space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Monitoring Workers</span>
                        <span className="font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded">Locked (24/24)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Job Queue</span>
                        <div className="flex flex-col items-end">
                            <span className="font-bold text-red-600">1.2k pending</span>
                            <span className="text-[10px] text-slate-500">⚠️ 85% from Stripe Connect</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Main DB</span>
                        <span className="font-bold text-green-600">Connected</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Core Engine</span>
                        <span className="font-bold text-green-600">Online</span>
                    </div>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                    <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">delete_sweep</span> Flush Job Queue
                    </button>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                            <span>CPU Usage</span>
                            <span>42%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[42%]"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                            <span>RAM Usage</span>
                            <span>68%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[68%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemHealthPanel;
