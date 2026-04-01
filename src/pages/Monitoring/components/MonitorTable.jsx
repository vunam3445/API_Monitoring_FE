import React from 'react';

const MonitorTable = ({ onSelectMonitor }) => {
    // Dummy operational data
    const monitors = [
        { id: 1, name: 'User Auth Service', url: 'https://auth.api.v1/login', method: 'POST', status: 'UP', latency: '42ms', interval: '1m', lastCheck: '24s ago', fails: 0 },
        { id: 2, name: 'Payment Gateway', url: 'https://pay.gateway.v2/charge', method: 'POST', status: 'WARNING', latency: '645ms', interval: '5m', lastCheck: '1m ago', fails: 0 },
        { id: 3, name: 'Inventory API', url: 'https://inventory.v1/stock/status', method: 'GET', status: 'DOWN', latency: 'Timeout', interval: '30s', lastCheck: '12s ago', fails: 3 },
        { id: 4, name: 'Search Engine', url: 'https://search.api/v2/query', method: 'GET', status: 'UP', latency: '12ms', interval: '2m', lastCheck: '5m ago', fails: 0 },
        { id: 5, name: 'Notification Hub', url: 'https://notify.push/send', method: 'POST', status: 'UNKNOWN', latency: '--', interval: '10m', lastCheck: 'Never', fails: 0 },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'UP': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'WARNING': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'DOWN': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
            default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
                            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Monitor Name & URL</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Interval</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Response</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Last Check</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {monitors.map((mon) => (
                            <tr 
                                key={mon.id} 
                                onClick={() => onSelectMonitor(mon)}
                                className="group hover:bg-slate-50 dark:hover:bg-slate-800/20 cursor-pointer transition-colors"
                            >
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="relative inline-block">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${getStatusStyle(mon.status)}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${mon.status === 'UP' ? 'bg-emerald-500' : mon.status === 'DOWN' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
                                            {mon.status}
                                        </span>
                                        {mon.fails > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-lg">
                                                {mon.fails}x FAIL
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{mon.name}</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-black text-slate-500 uppercase tracking-tighter">{mon.method}</span>
                                            <span className="text-xs font-mono text-slate-400 truncate max-w-[200px]">{mon.url}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-slate-400 text-sm">schedule</span>
                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 lowercase italic">every {mon.interval}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="text-sm font-black text-slate-900 dark:text-white">{mon.latency}</div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="text-[11px] font-bold text-slate-400 italic font-mono">{mon.lastCheck}</div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap text-right">
                                    <div className="flex justify-end items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="Edit Monitor">
                                            <span className="material-symbols-outlined text-xl">edit_note</span>
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all" title="Delete Monitor">
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                                            <span className="material-symbols-outlined text-xl">more_vert</span>
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
                    Showing <span className="text-slate-900 dark:text-white">5</span> operational monitors
                </p>
            </div>
        </div>
    );
};

export default MonitorTable;
