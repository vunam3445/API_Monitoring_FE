import React from 'react';

const DashboardStats = ({ statsData }) => {
    const stats = [
        {
            label: 'Total Revenue (MRR)',
            value: statsData?.revenue?.value || '$0',
            trend: statsData?.revenue?.trend || '0%',
            trendUp: statsData?.revenue?.trendUp ?? true,
            icon: 'payments',
            color: 'emerald',
            link: '/admin/revenue'
        },
        {
            label: 'Total Users',
            value: statsData?.totalUsers?.value || '0',
            subValue: statsData?.totalUsers?.subValue || 'Total Registered',
            trend: statsData?.totalUsers?.trend || '0%',
            trendUp: statsData?.totalUsers?.trendUp ?? true,
            icon: 'group',
            color: 'blue',
            link: '/admin/users'
        },
        {
            label: 'APIs Monitored',
            value: statsData?.apisMonitored?.value || '0',
            subValue: statsData?.apisMonitored?.subValue || 'Active Monitors',
            trend: statsData?.apisMonitored?.trend || '0%',
            trendUp: statsData?.apisMonitored?.trendUp ?? true,
            icon: 'hub',
            color: 'purple',
            link: '/admin/monitoring'
        },
        {
            label: 'APIs Down',
            value: statsData?.apisDown?.value || '0',
            subValue: statsData?.apisDown?.subValue || 'Critical Issues',
            trend: statsData?.apisDown?.trend || '0',
            trendUp: statsData?.apisDown?.trendUp ?? false,
            icon: 'error',
            color: 'red',
            link: '/admin/monitoring'
        },
        {
            label: 'Alerts Today',
            value: statsData?.alertsToday?.value || '0',
            trend: statsData?.alertsToday?.trend || '0%',
            trendUp: statsData?.alertsToday?.trendUp ?? false,
            icon: 'warning',
            color: 'amber',
            link: '/admin/monitoring'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((stat, idx) => (
                <div 
                    key={idx} 
                    className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer group"
                    onClick={() => stat.link && (window.location.href = stat.link)}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-500 group-hover:scale-110 transition-transform`}>
                            <span className="material-symbols-outlined">{stat.icon}</span>
                        </div>
                        <span className={`${stat.trendUp ? 'text-emerald-500' : 'text-red-500'} text-xs font-bold flex items-center`}>
                            {stat.trend} 
                            <span className="material-symbols-outlined text-sm ml-0.5">
                                {stat.trend === 'Stable' ? 'check_circle' : (stat.trendUp ? 'trending_up' : 'trending_down')}
                            </span>
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <p className={`text-2xl font-bold ${stat.color === 'red' && parseInt(stat.value) > 0 ? 'text-red-500' : 'text-slate-800 dark:text-slate-100'}`}>
                            {stat.value}
                        </p>
                        {stat.subValue && <span className="text-[10px] text-slate-400 font-medium">{stat.subValue}</span>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;
