import React from 'react';
import { formatDate } from '../utils';

const ApiDetailsPanel = ({ monitor, onClose }) => {
    if (!monitor) return null;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border-l-4 border-primary shadow-xl overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{monitor.name}</h3>
                    <p className="text-[10px] font-mono text-slate-400">ID: {monitor.id}</p>
                </div>
                <button 
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Uptime</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                            {monitor.uptimePercentage !== undefined ? `${monitor.uptimePercentage.toFixed(2)}%` : '--'}
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Last Latency</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                            {monitor.lastLatencyMs ? `${monitor.lastLatencyMs}ms` : '--'}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Information</p>
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Method</span>
                            <span className="font-bold text-primary">{monitor.method}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Check Interval</span>
                            <span className="font-medium text-slate-900 dark:text-white">{monitor.checkInterval}s</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-500">Target URL</span>
                            <span className="text-xs font-mono break-all bg-slate-50 dark:bg-slate-900/50 p-2 rounded border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                                {monitor.url}
                            </span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Last Checked</span>
                            <span className="text-slate-700 dark:text-slate-300 font-medium">{formatDate(monitor.lastCheckAt)}</span>
                        </div>
                        {monitor.lastErrorMessage && (
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-red-500 font-bold">Last Error</span>
                                <span className="text-[10px] bg-red-50 dark:bg-red-900/10 text-red-600 p-2 rounded border border-red-100 dark:border-red-900/30">
                                    {monitor.lastErrorMessage}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-4 flex flex-col gap-2">
                    <button className="w-full py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">
                        View Detailed Logs
                    </button>
                    <button 
                        className={`w-full py-2.5 font-bold rounded-lg text-sm transition-all text-white ${
                            monitor.isActive ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'
                        }`}
                    >
                        {monitor.isActive ? 'Pause Monitoring' : 'Resume Monitoring'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApiDetailsPanel;
