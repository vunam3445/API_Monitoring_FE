import React from 'react';

const SystemInfrastructure = ({ infrastructureData }) => {
    const getQueueBadgeColor = (type) => {
        switch (type) {
            case 'HEALTHY': return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30';
            case 'WARNING': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30';
            case 'CRITICAL': return 'bg-red-100 text-red-600 dark:bg-red-900/30';
            default: return 'bg-slate-100 text-slate-600 dark:bg-slate-800';
        }
    };

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
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 font-bold uppercase tracking-tight">
                        Active ({infrastructureData?.workers?.active || 0}/{infrastructureData?.workers?.total || 0})
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-400">database</span>
                        <span className="text-sm font-medium">Main Cluster DB</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 font-bold uppercase tracking-tight">
                        {infrastructureData?.dbLoad || '0%'} Loaded
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-400">timer</span>
                        <span className="text-sm font-medium">Server Uptime</span>
                    </div>
                    <span className="text-sm font-bold">{infrastructureData?.serverUptime || '---'}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-400">queue</span>
                        <span className="text-sm font-medium">Queue Processing</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase tracking-tight ${getQueueBadgeColor(infrastructureData?.queueStatus?.type)}`}>
                        {infrastructureData?.queueStatus?.label || 'Unknown'}
                    </span>
                </div>
                
                <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-primary">info</span>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Infrastructure Note</p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        System health is calculated based on worker availability and database load metrics.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SystemInfrastructure;
