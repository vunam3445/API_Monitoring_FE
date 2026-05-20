import React from 'react';

const MonitoringStats = ({ stats, loading }) => {
    const displayStats = stats || {};

    // Support both old flat numbers and new object structure
    const parseStat = (stat) => {
        if (typeof stat === 'object' && stat !== null) {
            return stat;
        }
        return { value: stat || 0, subValue: '', trend: '', trendUp: null };
    };

    const totalApis = parseStat(displayStats.totalApis);
    const warning = parseStat(displayStats.warningApis ?? displayStats.warning);
    const down = parseStat(displayStats.downApis ?? displayStats.down);
    
    // Calculate Healthy = Total - Warning - Down
    const totalVal = Number(totalApis.value) || 0;
    const warningVal = Number(warning.value) || 0;
    const downVal = Number(down.value) || 0;
    const healthy = {
        value: Math.max(0, totalVal - warningVal - downVal),
        subValue: 'Operational',
        trend: '',
        trendUp: true
    };
    const avgLatency = parseStat(displayStats.avgLatency ?? displayStats.avgLatencyMs);
    const checksPerMin = parseStat(displayStats.checksPerMin);

    const StatCard = ({ title, statObj, icon, iconColor }) => {
        const { value, subValue, trend, trendUp } = statObj;
        
        let displayValue = value;
        if (title === 'Avg Latency' && typeof value === 'number') {
            displayValue = `${value.toFixed(1)}ms`;
        } else if (title !== 'Avg Latency' && typeof value === 'number') {
            displayValue = value.toLocaleString();
        }

        const isDown = title === 'Down' && (Number(value) > 0 || value !== '0');

        return (
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{title}</p>
                    <span className={`material-symbols-outlined ${iconColor || 'text-slate-400'}`}>{icon}</span>
                </div>
                {loading ? (
                    <div className="h-8 w-16 bg-slate-100 dark:bg-slate-700 animate-pulse rounded"></div>
                ) : (
                    <p className={`text-2xl font-bold ${isDown ? 'text-red-600' : 'text-slate-900 dark:text-white'}`}>
                        {displayValue}
                    </p>
                )}
                
                <div className="mt-2 flex items-center justify-between text-[10px] font-bold">
                    <span className="text-slate-400">{subValue || 'STABLE'}</span>
                    {trend && (
                        <span className={`flex items-center gap-0.5 ${trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
                            {trend}
                            <span className="material-symbols-outlined text-[10px]">
                                {trendUp ? 'trending_up' : 'trending_down'}
                            </span>
                        </span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 px-8 pt-8 pb-4">
            <StatCard
                title="Total APIs"
                statObj={totalApis}
                icon="api"
            />
            <StatCard
                title="Healthy"
                statObj={healthy}
                icon="check_circle"
                iconColor="text-emerald-500"
            />
            <StatCard
                title="Warning"
                statObj={warning}
                icon="warning"
                iconColor="text-orange-500"
            />
            <StatCard
                title="Down"
                statObj={down}
                icon="error"
                iconColor="text-red-500"
            />
            <StatCard
                title="Avg Latency"
                statObj={avgLatency}
                icon="timer"
            />
            <StatCard
                title="Checks/min"
                statObj={checksPerMin}
                icon="speed"
            />
        </section>
    );
};

export default MonitoringStats;
