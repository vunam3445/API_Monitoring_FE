import React from 'react';

const MonitoringStats = ({ stats, loading }) => {
    // Default values if stats is null or loading
    const displayStats = stats || {
        totalApis: 0,
        healthyApis: 0,
        warningApis: 0,
        downApis: 0,
        avgLatency: 0,
        checksPerMin: '0'
    };

    const StatCard = ({ title, value, icon, iconColor, trend, trendColor, trendIcon }) => (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{title}</p>
                <span className={`material-symbols-outlined ${iconColor || 'text-slate-400'}`}>{icon}</span>
            </div>
            {loading ? (
                <div className="h-8 w-16 bg-slate-100 dark:bg-slate-700 animate-pulse rounded"></div>
            ) : (
                <p className={`text-2xl font-bold ${title === 'Down' && value > 0 ? 'text-red-600' : 'text-slate-900 dark:text-white'}`}>
                    {value}
                </p>
            )}
            <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${trendColor || 'text-slate-400'}`}>
                {trendIcon && <span className="material-symbols-outlined text-xs">{trendIcon}</span>}
                {trend || 'Stable'}
            </div>
        </div>
    );

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 p-8">
            <StatCard 
                title="Total APIs" 
                value={displayStats.totalApis} 
                icon="api" 
            />
            <StatCard 
                title="Healthy" 
                value={displayStats.healthyApis} 
                icon="check_circle" 
                iconColor="text-green-500" 
            />
            <StatCard 
                title="Warning" 
                value={displayStats.warningApis} 
                icon="warning" 
                iconColor="text-yellow-500" 
            />
            <StatCard 
                title="Down" 
                value={displayStats.downApis} 
                icon="error" 
                iconColor="text-red-500" 
            />
            <StatCard 
                title="Avg Latency" 
                value={`${displayStats.avgLatency}ms`} 
                icon="timer" 
            />
            <StatCard 
                title="Checks/min" 
                value={displayStats.checksPerMin} 
                icon="speed" 
            />
        </section>
    );
};

export default MonitoringStats;
