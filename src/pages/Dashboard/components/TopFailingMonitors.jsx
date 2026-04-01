import React from 'react';

const TopFailingMonitors = () => {
    // Dummy data for visualization
    const monitors = [
        { id: 1, name: 'Inventory API', downtime: '4h 12m', count: 12, status: 'DOWN', color: 'rose' },
        { id: 2, name: 'Payment Gateway', downtime: '1h 45m', count: 5, status: 'WARNING', color: 'amber' },
        { id: 3, name: 'Analytics Push', downtime: '45m', count: 3, status: 'HEALTHY', color: 'emerald' },
        { id: 4, name: 'User Info v2', downtime: '12m', count: 2, status: 'HEALTHY', color: 'emerald' },
        { id: 5, name: 'Stock Sync', downtime: '5m', count: 1, status: 'HEALTHY', color: 'emerald' }
    ];

    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Performance Insight</p>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Top 5 Unstable Monitors</h3>
                </div>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline transition-all">View All Alerts</button>
            </div>

            <div className="space-y-6">
                {monitors.map((mon, idx) => (
                    <div key={mon.id} className="flex items-center gap-6 group">
                        <div className="text-sm font-black text-slate-300 dark:text-slate-700 w-4">0{idx + 1}</div>
                        
                        <div className="flex-1">
                            <div className="flex justify-between items-end mb-2.5">
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">{mon.name}</span>
                                <div className="text-right">
                                    <span className="text-xs font-black text-slate-900 dark:text-white">{mon.downtime}</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight ml-1.5">downtime</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full bg-${mon.color}-500 rounded-full group-hover:opacity-80 transition-all duration-1000 ease-out`} 
                                        style={{ width: `${100 - mon.count * 8}%` }}
                                    ></div>
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter w-12 text-right">
                                    {mon.count} Incidents
                                </span>
                            </div>
                        </div>

                        <div className={`shrink-0 w-2.5 h-2.5 rounded-full ring-4 ring-${mon.color}-500/10 bg-${mon.color}-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]`}></div>
                    </div>
                ))}
            </div>
            
            <div className="mt-10 p-5 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center gap-4 group cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-sm">tips_and_updates</span>
                </div>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                    <span className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tight mr-1">System Suggestion:</span>
                    Inventory API has the highest error rate. Consider reviewing check interval and expected status.
                </p>
            </div>
        </div>
    );
};

export default TopFailingMonitors;
