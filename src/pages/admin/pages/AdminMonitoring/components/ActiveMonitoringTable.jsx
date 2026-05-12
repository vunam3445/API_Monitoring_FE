import React from 'react';
import { formatDate } from '../utils';

const ActiveMonitoringTable = ({ monitors = [], loading = false, onSelectMonitor, onToggleBlock }) => {
    console.log("DEBUG - Dữ liệu Monitors nhận được:", monitors);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">DEBUG: Active Monitoring</h3>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                    <input className="pl-9 pr-4 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg w-full sm:w-64 focus:ring-primary focus:border-primary outline-none" placeholder="Search APIs..." type="text" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900/50">
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">API Name</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Owner</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Method</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Latency</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Uptime</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-xs font-bold">Đang tải dữ liệu...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : monitors.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-12 text-center text-slate-400 text-xs font-bold">
                                    Không có API nào đang được giám sát
                                </td>
                            </tr>
                        ) : monitors.map((monitor) => (
                            <tr 
                                key={monitor.id} 
                                onClick={() => onSelectMonitor?.(monitor)}
                                className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold shadow-sm ${
                                            monitor.lastStatus === 'DOWN' 
                                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                                            : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                                        }`}>
                                            {monitor.name?.substring(0, 2).toUpperCase() || 'API'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                                {monitor.name}
                                                {monitor.lastStatus === 'DOWN' && (
                                                    <span className="text-[9px] bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded font-bold border border-red-200 dark:border-red-800 uppercase">Down</span>
                                                )}
                                            </p>
                                            <p className="text-[10px] text-slate-400 truncate max-w-[200px]">{monitor.url}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-600">
                                            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(monitor.ownerName || monitor.owner?.fullName || 'U')}&background=random`} alt="Avatar" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                            {monitor.ownerName || monitor.owner?.fullName || monitor.owner || 'Unknown'}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                        monitor.method === 'GET' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                                        monitor.method === 'POST' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600' :
                                        'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                    }`}>
                                        {monitor.method}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`flex items-center gap-1.5 text-xs font-bold ${
                                        monitor.lastStatus === 'HEALTHY' ? 'text-emerald-600' :
                                        monitor.lastStatus === 'DOWN' ? 'text-red-600' : 'text-amber-600'
                                    }`}>
                                        <span className={`w-2 h-2 rounded-full ${
                                            monitor.lastStatus === 'HEALTHY' ? 'bg-emerald-500' :
                                            monitor.lastStatus === 'DOWN' ? 'bg-red-500' : 'bg-amber-500'
                                        }`}></span> 
                                        {monitor.lastStatus || 'Unknown'}
                                    </span>
                                </td>
                                <td className={`px-6 py-4 text-sm font-bold ${
                                    (monitor.lastLatencyMs || 0) > monitor.maxResponseTimeMs ? 'text-amber-600' : 'text-slate-600 dark:text-slate-300'
                                }`}>
                                    {monitor.lastLatencyMs ? `${monitor.lastLatencyMs}ms` : '--'}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                    {monitor.uptimePercentage !== undefined ? `${monitor.uptimePercentage.toFixed(2)}%` : '--'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); onSelectMonitor?.(monitor); }}
                                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-primary"
                                        >
                                            <span className="material-symbols-outlined text-sm">visibility</span>
                                        </button>
                                        <button 
                                            type="button"
                                            role="switch"
                                            aria-checked={!monitor.isBlock}
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                onToggleBlock?.(monitor.id); 
                                            }}
                                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none ${!monitor.isBlock ? 'bg-emerald-500' : 'bg-red-500'}`}
                                            title={monitor.isBlock ? "Mở khóa API" : "Khóa API"}
                                        >
                                            <span
                                                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${!monitor.isBlock ? 'translate-x-[18px]' : 'translate-x-[3px]'}`}
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActiveMonitoringTable;
