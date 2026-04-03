import React from 'react';

const MonitoringHeader = ({ summary }) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase tracking-tight">Active Monitors</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">Detailed operation and health management for your endpoints.</p>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl p-1.5 shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center px-4 gap-2 border-r border-slate-200 dark:border-slate-700">
                        <span className="material-symbols-outlined text-emerald-500 text-sm">verified</span>
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                            {summary ? `${summary.healthyCount || 0} HEALTHY` : '...'}
                        </span>
                    </div>
                    <div className="flex items-center px-4 gap-2 border-r border-slate-200 dark:border-slate-700">
                        <span className="material-symbols-outlined text-rose-500 text-sm">error</span>
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                            {summary ? `${summary.downCount || 0} DOWN` : '...'}
                        </span>
                    </div>
                    <div className="flex items-center px-4 gap-2">
                        <span className="material-symbols-outlined text-blue-500 text-sm">api</span>
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                            {summary ? `${summary.totalMonitors || 0} TOTAL` : '...'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonitoringHeader;
