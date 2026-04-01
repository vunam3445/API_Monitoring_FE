import React from 'react';

const SummaryCards = () => {
    const stats = [
        { id: 1, label: 'Total Monitors', value: '128', change: '+4', trend: 'up', icon: 'api', color: 'blue' },
        { id: 2, label: 'Currently Down', value: '04', change: '-2', trend: 'down', icon: 'error', color: 'rose' },
        { id: 3, label: '24h Uptime', value: '99.98%', change: '+0.02%', trend: 'up', icon: 'verified', color: 'emerald' },
        { id: 4, label: 'Avg Latency', value: '245ms', change: '+12ms', trend: 'down', icon: 'speed', color: 'primary' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
                <div key={stat.id} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20 group relative overflow-hidden">
                    {/* Background Icon Watermark */}
                    <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-300 pointer-events-none">
                        <span className={`material-symbols-outlined text-8xl text-${stat.color}-600 font-black`}>{stat.icon}</span>
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 bg-${stat.color === 'primary' ? 'primary/10' : `${stat.color}-100 dark:bg-${stat.color}-900/30`} text-${stat.color === 'primary' ? 'primary' : `${stat.color}-600`} rounded-2xl shadow-sm group-hover:scale-110 transition-transform origin-left`}>
                                <span className="material-symbols-outlined text-2xl font-black">{stat.icon}</span>
                            </div>
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-rose-600 bg-rose-50 dark:bg-rose-900/20'}`}>
                                <span className="material-symbols-outlined text-xs font-black">{stat.trend === 'up' ? 'trending_up' : 'trending_down'}</span>
                                {stat.change}
                            </div>
                        </div>

                        <div className="mt-auto">
                            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{stat.value}</h3>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;
