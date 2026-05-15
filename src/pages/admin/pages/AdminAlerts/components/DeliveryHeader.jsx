import React from 'react';

const DeliveryHeader = ({ onRetryAll, isRetryingAll }) => {
    return (
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Notification Delivery</h2>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 text-[10px] font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">System Live</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Monitor and troubleshoot outbound alert deliveries across all channels</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={onRetryAll}
                        disabled={isRetryingAll}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95 disabled:opacity-50"
                    >
                        <span className={`material-symbols-outlined text-sm ${isRetryingAll ? 'animate-spin' : ''}`}>
                            {isRetryingAll ? 'sync' : 'replay'}
                        </span>
                        {isRetryingAll ? 'Retrying...' : 'Retry All Failed'}
                    </button>
                    {/* <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Export Logs
                    </button> */}
                </div>
            </div>
        </header>
    );
};

export default DeliveryHeader;
