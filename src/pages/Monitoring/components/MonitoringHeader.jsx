import React from 'react';

const MonitoringHeader = ({ onOpenSelector, selectedApiName }) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Monitoring</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Real-time API performance and health monitoring</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-800">
                    <button className="px-4 py-1.5 text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-700 shadow-sm rounded-lg transition-colors">Last 1h</button>
                    <button className="px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Last 6h</button>
                    <button className="px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Last 24h</button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-sm">refresh</span>
                    Refresh
                </button>
                <button 
                    onClick={onOpenSelector}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 min-w-[160px] justify-between"
                >
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">api</span>
                        <span className="truncate max-w-[150px]">{selectedApiName || 'Select API'}</span>
                    </div>
                    <span className="material-symbols-outlined text-sm leading-none ml-1">expand_more</span>
                </button>
            </div>
        </div>
    );
};

export default MonitoringHeader;
