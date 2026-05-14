import React from 'react';

const MonitoringStats = ({ stats, loading }) => {
    // Default values if stats is null or loading
    const displayStats = stats || {};

    const totalApis = displayStats.totalApis ?? 0;
    const healthy = displayStats.healthy ?? displayStats.healthyApis ?? 0;
    const warning = displayStats.warning ?? displayStats.warningApis ?? 0;
    const down = displayStats.down ?? displayStats.downApis ?? 0;
    const avgLatency = displayStats.avgLatencyMs ?? displayStats.avgLatency ?? 0;
    const checksPerMin = displayStats.checksPerMin ?? 0;

    const StatCard = ({ title, value, icon, iconColor, trend, trendColor, trendIcon }) => (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-2">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{title}</p>
                <span className={`material-symbols-outlined ${iconColor || 'text-slate-400'}`}>{icon}</span>
            </div>
            {loading ? (
                <div className="h-8 w-16 bg-slate-100 dark:bg-slate-700 animate-pulse rounded"></div>
            ) : (
                <p className={`text-2xl font-bold ${title === 'Down' && value > 0 ? 'text-red-600' : 'text-slate-900 dark:text-white'}`}>
                    {typeof value === 'number' && title !== 'Avg Latency' ? value.toLocaleString() : value}
                </p>
            )}
            <div className={`mt-2 flex items-center gap-1 text-[10px] font-bold ${trendColor || 'text-slate-400'}`}>
                {trendIcon && <span className="material-symbols-outlined text-xs">{trendIcon}</span>}
                {trend || 'STABLE'}
            </div>
        </div>
    );

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 px-8 pt-8 pb-4">
            <StatCard
                title="Total APIs"
                value={totalApis}
                icon="api"
            />
            <StatCard
                title="Healthy"
                value={healthy}
                icon="check_circle"
                iconColor="text-emerald-500"
            />
            <StatCard
                title="Warning"
                value={warning}
                icon="warning"
                iconColor="text-orange-500"
            />
            <StatCard
                title="Down"
                value={down}
                icon="error"
                iconColor="text-red-500"
            />
            <StatCard
                title="Avg Latency"
                value={`${avgLatency.toFixed(1)}ms`}
                icon="timer"
            />
            <StatCard
                title="Checks/min"
                value={checksPerMin.toLocaleString()}
                icon="speed"
            />
        </section>
    );
};

export default MonitoringStats;
