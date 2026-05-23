import React from 'react';

const MonitorTableRow = ({ monitor, isSelected, onClick, onToggleActive, onDelete }) => {
    const getStatusStyles = (status) => {
        switch (status) {
            case 'UP':
                return 'text-green-600 bg-green-100 dark:bg-green-900/30';
            case 'WARNING':
                return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
            case 'DOWN':
                return 'text-red-600 bg-red-100 dark:bg-red-900/30';
            default:
                return 'text-slate-600 bg-slate-100 dark:bg-slate-800';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'UP': return 'bg-green-500';
            case 'WARNING': return 'bg-amber-500';
            case 'DOWN': return 'bg-red-500';
            default: return 'bg-slate-400';
        }
    };

    const renderSparkline = (data) => {
        if (!data || data.length === 0) return <div className="text-slate-300 dark:text-slate-700 font-mono text-[10px]">No Data</div>;
        
        const width = 60;
        const height = 20;
        const max = 100;
        
        // Simple SVG path generation
        const points = data.map((value, index) => {
            const x = (index / (data.length - 1)) * width;
            // Cap value between 0 and 100
            const cappedVal = Math.max(0, Math.min(100, value));
            const y = height - (cappedVal / max) * height;
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');

        // Color based on latest status
        const isHealthy = data[data.length - 1] >= 80;
        const strokeColor = isHealthy ? '#10b981' : '#ef4444'; // emerald-500 or red-500

        return (
            <div className="flex flex-col items-start gap-1">
                <svg width={width} height={height} className="overflow-visible">
                    <path
                        d={points}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">24h Trend</span>
            </div>
        );
    };

    return (
        <tr
            onClick={() => onClick(monitor)}
            className={`transition-colors cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-800/50 ${isSelected ? 'bg-orange-50/50 dark:bg-orange-900/10' : ''}`}
        >
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className={`size-2.5 ${getStatusColor(monitor.lastStatus)} rounded-full opacity-80`}></div>
                    <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{monitor.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">ID: {monitor.id.substring(0, 8)}...</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded shadow-sm">{monitor.method}</span>
                    <span className="text-xs font-mono truncate max-w-[150px]" title={monitor.url}>{monitor.url}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {monitor.ownerName || monitor.user?.username || 'Unknown'}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${getStatusStyles(monitor.lastStatus)}`}>
                    {monitor.lastStatus || 'UNKNOWN'}
                </span>
            </td>
            <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">
                {monitor.lastLatencyMs ? `${monitor.lastLatencyMs}ms` : '—'}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-4">
                    <span>{monitor.uptimePercentage != null ? `${monitor.uptimePercentage}%` : '—'}</span>
                    {renderSparkline(monitor.sparkline)}
                </div>
            </td>
            <td className="px-6 py-4">
                {monitor.isBlock ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold text-red-600 bg-red-100 dark:bg-red-900/30 flex items-center gap-1 w-fit border border-red-200 dark:border-red-800">
                        <span className="material-symbols-outlined text-[12px]">lock</span> LOCKED
                    </span>
                ) : (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${monitor.isActive ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/20' : 'text-slate-500 bg-slate-100 dark:bg-slate-800'}`}>
                        {monitor.isActive ? 'RUNNING' : 'USER PAUSED'}
                    </span>
                )}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-3">
                    {/* Toggle Switch controls Admin Lock */}
                    <button
                        type="button"
                        role="switch"
                        aria-checked={!monitor.isBlock}
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleActive(monitor.id, monitor.isBlock);
                        }}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${!monitor.isBlock ? 'bg-orange-500' : 'bg-red-500'}`}
                        title={!monitor.isBlock ? 'Lock Monitor (Force Pause)' : 'Unlock Monitor'}
                    >
                        <span
                            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${!monitor.isBlock ? 'translate-x-[18px]' : 'translate-x-[3px]'}`}
                        />
                        {monitor.isBlock && (
                            <span className="material-symbols-outlined absolute text-[10px] text-white top-1/2 right-[5px] -translate-y-1/2">lock</span>
                        )}
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(monitor.id);
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete Monitor"
                    >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default MonitorTableRow;
