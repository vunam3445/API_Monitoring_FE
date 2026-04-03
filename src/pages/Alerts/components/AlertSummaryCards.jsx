import React from 'react';

const AlertSummaryCards = ({ summary, loading }) => {
    if (loading && !summary) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 h-[120px]" />
                ))}
            </div>
        );
    }

    // Helper function to safely render numeric values from API response
    // Handles direct numbers, strings, or { value: 10 } objects
    const renderValue = (val) => {
        if (val === null || val === undefined) return '0';
        if (typeof val === 'object' && val.value !== undefined) return val.value.toLocaleString();
        if (typeof val === 'object') return '0'; // Fallback for pure objects
        return val.toLocaleString();
    };

    const {
        totalAlerts = 0,
        activeAlerts = 0,
        criticalAlerts = 0,
        resolvedAlerts = 0,
        changePercentage = 0,
        successRate = 0
    } = summary || {};

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Alerts</span>
                    <span className="material-symbols-outlined text-slate-400 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">equalizer</span>
                </div>
                <div className="text-2xl font-black">{renderValue(totalAlerts)}</div>
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                    <span className={`${renderValue(changePercentage) >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center font-bold`}>
                        <span className="material-symbols-outlined text-[14px]">
                            {renderValue(changePercentage) >= 0 ? 'trending_up' : 'trending_down'}
                        </span> {Math.abs(parseFloat(renderValue(changePercentage)))}%
                    </span>
                    vs last period
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md border-b-4 border-b-primary">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Active Alerts</span>
                    <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">sensors</span>
                </div>
                <div className="text-2xl font-black text-primary">{renderValue(activeAlerts)}</div>
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <span className="text-primary flex items-center font-bold">
                        <span className="material-symbols-outlined text-[14px]">notifications_active</span>
                    </span>
                    monitoring incidents
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md border-l-4 border-l-red-500">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Critical Alerts</span>
                    <span className="material-symbols-outlined text-red-500 p-2 bg-red-50 dark:bg-red-900/10 rounded-lg">error</span>
                </div>
                <div className="text-2xl font-black text-red-500">{renderValue(criticalAlerts)}</div>
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1 font-bold">
                    <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded leading-none">ACTION REQUIRED</span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md border-l-4 border-l-green-500">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Resolved Alerts</span>
                    <span className="material-symbols-outlined text-green-500 p-2 bg-green-50 dark:bg-green-900/10 rounded-lg">task_alt</span>
                </div>
                <div className="text-2xl font-black text-green-500">{renderValue(resolvedAlerts)}</div>
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1 font-bold">
                    <span className="text-green-600">{renderValue(successRate)}% resolution rate</span>
                </div>
            </div>
        </div>
    );
};

export default AlertSummaryCards;
