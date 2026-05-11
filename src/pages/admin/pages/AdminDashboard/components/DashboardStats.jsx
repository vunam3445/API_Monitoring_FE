import React from 'react';

const DashboardStats = () => {
    const stats = [
        {
            label: 'Total Revenue (MRR)',
            value: '$98.5k',
            trend: '+8%',
            trendUp: true,
            icon: 'payments',
            color: 'emerald',
            link: '/admin/revenue'
        },
        {
            label: 'Total Users',
            value: '14,289',
            subValue: '+124 today',
            trend: '+12%',
            trendUp: true,
            icon: 'group',
            color: 'blue',
            link: '/admin/users'
        },
        {
            label: 'APIs Monitored',
            value: '156',
            subValue: '154 Online',
            trend: 'Stable',
            trendUp: true,
            icon: 'hub',
            color: 'purple',
            link: '/admin/monitoring'
        },
        {
            label: 'APIs Down',
            value: '2',
            subValue: 'Action Required',
            trend: '+2',
            trendUp: false,
            icon: 'error',
            color: 'red',
            link: '/admin/monitoring'
        },
        {
            label: 'Alerts Today',
            value: '28',
            trend: '-15%',
            trendUp: true,
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
                            <span className="material-symbols-outlined text-sm">
                                {stat.trend === 'Stable' ? 'check_circle' : (stat.trendUp ? 'trending_up' : 'trending_down')}
                            </span>
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <p className={`text-2xl font-bold ${stat.color === 'red' ? 'text-red-500' : 'text-slate-800 dark:text-slate-100'}`}>
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
