import React from 'react';

const MonitorTable = ({ monitors = [], loading, onSelectMonitor, onToggleStatus }) => {
    const getStatusStyle = (status) => {
        switch (status?.toUpperCase()) {
            case 'HEALTHY':
            case 'UP': 
                return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'WARNING': 
                return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'DOWN': 
                return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
            default: 
                return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
        }
    };

    // Helper to generate sparkline path
    const generateSparkline = (data) => {
        if (!data || data.length < 2) return '';
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;
        const width = 80;
        const height = 20;
        const step = width / (data.length - 1);
        
        return data.map((val, i) => {
            const x = i * step;
            const y = height - ((val - min) / range) * height;
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    };

    if (loading && monitors.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-20 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-[10px]">Synchronizing with global nodes...</p>
            </div>
        );
    }

    if (monitors.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-20 flex flex-col items-center justify-center text-center">
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
                    <span className="material-symbols-outlined text-4xl text-slate-400">api_off</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No Monitors Active</h3>
                <p className="text-sm text-slate-500 max-w-xs">Your monitoring list is empty. Add a new endpoint to start tracking performance.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Endpoint</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Active</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Response Time</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Trend</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {monitors.map((item) => (
                            <tr 
                                key={item.id} 
                                className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
                                onClick={() => onSelectMonitor({ id: item.id, name: item.name })}
                            >
                                <td className="px-6 py-5">
                                    <div>
                                        <div className="text-sm font-black text-slate-900 dark:text-white truncate max-w-xs">{item.name || 'Unnamed API'}</div>
                                        <div className="text-[10px] font-bold text-slate-400 truncate max-w-xs mt-1 uppercase tracking-tighter opacity-60 italic">{item.url}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.lastStatus === 'HEALTHY' || item.lastStatus === 'UP' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : item.lastStatus === 'WARNING' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${item.lastStatus === 'HEALTHY' || item.lastStatus === 'UP' ? 'bg-emerald-500' : item.lastStatus === 'WARNING' ? 'bg-amber-500' : 'bg-rose-500'}`}></span>
                                        {item.lastStatus || 'UNKNOWN'}
                                    </span>
                                </td>
                                {/* Active Toggle Column - STRICTLY USING isActive FROM API */}
                                <td className="px-6 py-5 text-center" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={item.isActive === true}
                                        onClick={() => onToggleStatus && onToggleStatus(item.id)}
                                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${item.isActive === true ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                                    >
                                        <span
                                            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${item.isActive === true ? 'translate-x-[18px]' : 'translate-x-[3px]'}`}
                                        />
                                    </button>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col items-start">
                                        <span className={`text-sm font-black tabular-nums text-slate-900 dark:text-white`}>
                                            {item.lastLatencyMs ? `${item.lastLatencyMs}ms` : '--'}
                                        </span>
                                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Uptime: {item.uptimePercentage || '--'}%</div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="w-20 h-6">
                                        <svg width="80" height="20" className="overflow-visible">
                                            <path 
                                                d={generateSparkline(item.miniTrendData || [])}
                                                fill="none"
                                                stroke={item.lastStatus === 'HEALTHY' || item.lastStatus === 'UP' ? '#10b981' : '#f43f5e'}
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex justify-end gap-1">
                                        <button
                                            onClick={() => onSelectMonitor({ id: item.id, name: item.name })}
                                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-primary transition-all active:scale-90"
                                            title="View Details"
                                        >
                                            <span className="material-symbols-outlined text-lg">visibility</span>
                                        </button>
                                        <button
                                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-amber-500 transition-all active:scale-90"
                                            title="Edit Monitor"
                                        >
                                            <span className="material-symbols-outlined text-lg">edit_note</span>
                                        </button>
                                        <button
                                            className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl text-slate-400 hover:text-rose-500 transition-all active:scale-90"
                                            title="Delete Monitor"
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/10 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Showing <span className="text-slate-900 dark:text-white">{monitors.length}</span> operational monitors
                </p>
            </div>
        </div>
    );
};

export default MonitorTable;
