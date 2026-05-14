import React from 'react';

const SystemHealthPanel = ({ healthStats, loading, onFlush, loadingActions }) => {
    // Helper function to get color based on usage percentage
    const getStatusColor = (percentage) => {
        if (percentage >= 90) return 'from-red-500 to-rose-600';
        if (percentage >= 70) return 'from-amber-500 to-orange-600';
        return 'from-emerald-500 to-teal-600';
    };

    const getStatusText = (percentage) => {
        if (percentage >= 90) return 'Critical';
        if (percentage >= 70) return 'High';
        return 'Healthy';
    };

    const getStatusBg = (percentage) => {
        if (percentage >= 90) return 'bg-red-500/10 text-red-500';
        if (percentage >= 70) return 'bg-amber-500/10 text-amber-500';
        return 'bg-emerald-500/10 text-emerald-500';
    };

    if (loading && !healthStats) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-slate-100 dark:bg-slate-700/50"></div>
            </div>
        );
    }

    const metrics = [
        {
            id: 'cpu',
            label: 'CPU Usage',
            value: healthStats?.cpuUsage || 0,
            icon: 'memory',
            unit: '%'
        },
        {
            id: 'ram',
            label: 'RAM (Heap)',
            value: healthStats?.ramUsage || 0,
            icon: 'memory_alt',
            unit: '%'
        },
        {
            id: 'disk',
            label: 'Disk Space',
            value: healthStats?.diskUsage || 0,
            icon: 'storage',
            unit: '%'
        }
    ];

    return (
        <div className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden relative">
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>

            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <span className="material-symbols-outlined text-primary text-[20px]">analytics</span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white tracking-tight">System Health</h3>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Live</span>
                </div>
            </div>

            <div className="p-6 space-y-8 relative">
                {/* Resource Metrics */}
                <div className="grid gap-6">
                    {metrics.map((metric) => (
                        <div key={metric.id} className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px] text-slate-400 dark:text-slate-500">
                                        {metric.icon}
                                    </span>
                                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                                        {metric.label}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusBg(metric.value)}`}>
                                        {getStatusText(metric.value)}
                                    </span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                        {metric.value.toFixed(1)}{metric.unit}
                                    </span>
                                </div>
                            </div>

                            <div className="relative h-2 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden shadow-inner">
                                <div
                                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getStatusColor(metric.value)} transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                                    style={{ width: `${metric.value}%` }}
                                >
                                    <div className="absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] animate-shimmer"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Queue & Status Info */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 group/item hover:border-primary/30 transition-colors">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">RabbitMQ Queue</span>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-slate-900 dark:text-white">{healthStats?.pendingQueue || 0}</span>
                                <span className="material-symbols-outlined text-primary/40 group-hover/item:text-primary transition-colors">hub</span>
                            </div>
                            <span className="text-[9px] text-slate-500">Messages pending</span>
                        </div>
                    </div>

                    <div className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border transition-colors group/item ${
                        (healthStats?.isWorkersRunning || healthStats?.workersRunning)
                        ? 'border-slate-100 dark:border-slate-800 hover:border-emerald-500/30' 
                        : 'border-amber-200 dark:border-amber-900/30 hover:border-amber-500/30'
                    }`}>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Execution Workers</span>
                            <div className="flex items-center justify-between">
                                <span className={`text-lg font-bold ${(healthStats?.isWorkersRunning || healthStats?.workersRunning) ? 'text-emerald-500' : 'text-amber-500'}`}>
                                    {(healthStats?.isWorkersRunning || healthStats?.workersRunning) ? 'ACTIVE' : 'STANDBY'}
                                </span>
                                <span className={`material-symbols-outlined ${
                                    (healthStats?.isWorkersRunning || healthStats?.workersRunning) 
                                    ? 'text-emerald-500/40 group-hover/item:text-emerald-500' 
                                    : 'text-amber-500/40 group-hover/item:text-amber-500'
                                } transition-colors`}>
                                    {(healthStats?.isWorkersRunning || healthStats?.workersRunning) ? 'smart_toy' : 'pause_circle'}
                                </span>
                            </div>
                            <span className="text-[9px] text-slate-500">
                                {(healthStats?.isWorkersRunning || healthStats?.workersRunning) ? 'Running smoothly' : 'Workers are idle'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="pt-2">
                    <button
                        onClick={onFlush}
                        disabled={loadingActions}
                        className="w-full group/btn relative flex items-center justify-center gap-2 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-slate-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        {loadingActions ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10"></div>
                        ) : (
                            <span className="material-symbols-outlined text-[18px] relative z-10 group-hover/btn:rotate-12 transition-transform">cleaning_services</span>
                        )}
                        <span className="relative z-10">{loadingActions ? 'Flushing...' : 'Flush System Queue'}</span>
                    </button>
                    <p className="text-center mt-3 text-[10px] text-slate-400 dark:text-slate-500">
                        Last synced: {new Date().toLocaleTimeString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SystemHealthPanel;
