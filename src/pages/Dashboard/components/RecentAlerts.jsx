import React from 'react';

const RecentAlerts = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[500px]">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
                <h3 className="font-bold">Recent Alerts</h3>
                <button className="size-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500">
                    <span className="material-symbols-outlined text-sm">filter_list</span>
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="p-4 rounded-xl border-l-4 border-rose-500 bg-rose-50 dark:bg-rose-900/10 space-y-1">
                    <div className="flex justify-between items-start">
                        <p className="text-xs font-bold text-rose-600 dark:text-rose-400">CRITICAL FAILURE</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase">12:42 PM</p>
                    </div>
                    <p className="text-sm font-bold">Inventory API /v1/stocks</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">Connection timeout while connecting to database cluster-01-a.</p>
                </div>

                <div className="p-4 rounded-xl border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/10 space-y-1">
                    <div className="flex justify-between items-start">
                        <p className="text-xs font-bold text-amber-600 dark:text-amber-400">HIGH LATENCY</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase">12:35 PM</p>
                    </div>
                    <p className="text-sm font-bold">Payment Gateway /v2/charge</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">Response time exceeded 800ms threshold (current: 852ms).</p>
                </div>

                <div className="p-4 rounded-xl border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/10 space-y-1">
                    <div className="flex justify-between items-start">
                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400">INFO</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase">11:50 AM</p>
                    </div>
                    <p className="text-sm font-bold">Auth Service</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">Deployment of v1.2.4 completed successfully across 3 nodes.</p>
                </div>

                <div className="p-4 rounded-xl border-l-4 border-rose-500 bg-rose-50 dark:bg-rose-900/10 space-y-1">
                    <div className="flex justify-between items-start">
                        <p className="text-xs font-bold text-rose-600 dark:text-rose-400">CRITICAL FAILURE</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase">10:15 AM</p>
                    </div>
                    <p className="text-sm font-bold">Inventory API /v1/stocks</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">503 Service Unavailable returned by load balancer.</p>
                </div>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-center">
                <button className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">Clear All History</button>
            </div>
        </div>
    );
};

export default RecentAlerts;
