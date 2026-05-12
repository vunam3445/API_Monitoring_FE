import React from 'react';

const SystemHealthPanel = ({ healthStats, loading }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">System Resources</h3>
            </div>
            <div className="p-6 space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Monitoring Workers</span>
                        <span className={`font-bold px-2 py-0.5 rounded ${healthStats?.workersActive ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-amber-600 bg-amber-50'}`}>
                            {healthStats?.workersActive ? 'Active' : 'Standby'}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Job Queue</span>
                        <span className="font-bold text-slate-700 dark:text-slate-200">
                            {healthStats?.queueSize !== undefined ? `${healthStats.queueSize} pending` : '0 pending'}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Main Database</span>
                        <span className="font-bold text-emerald-600">Connected</span>
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
                            <span>{healthStats?.cpuUsage || 0}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                            <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${healthStats?.cpuUsage || 0}%` }}></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                            <span>RAM Usage</span>
                            <span>{healthStats?.ramUsage || 0}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                            <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${healthStats?.ramUsage || 0}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemHealthPanel;
