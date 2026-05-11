import React from 'react';
import Skeleton from '../../../../../components/UI/Skeleton';

const MonitorStats = ({ stats, isLoading }) => {
    const statItems = [
        { label: 'Total Monitors', value: stats.total, color: 'text-slate-800 dark:text-slate-100' },
        { label: 'Active Monitors', value: stats.active, color: 'text-slate-800 dark:text-slate-100' },
        { label: 'Monitors Down', value: stats.down, color: 'text-red-500' },
        { label: 'Platform Capacity', value: stats.total ? Math.round((stats.total / 1000) * 100) + '%' : '0%', color: 'text-blue-500', isPercent: true }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statItems.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1 flex flex-col justify-between">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                    <div className="flex items-end justify-between mt-2">
                        {isLoading ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div>
                                <h3 className={`text-2xl font-black ${stat.color}`}>
                                    {stat.isPercent ? stat.value : (stat.value || 0).toLocaleString()}
                                </h3>
                                {stat.isPercent && (
                                    <span className="text-[10px] font-semibold text-slate-400 block mt-1">Of 1,000 slots</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MonitorStats;
