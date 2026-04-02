import React, { useState } from 'react';
import useMonitorDetail from '../hooks/useMonitorDetail';
import { useApiMonitors } from '../../APIList/hooks/useApiMonitors';
import { useToast } from '../../../components/UI/Toast';
import { useMonitorAlertConfigs } from '../../../hooks/useMonitorAlertConfigs';

const MonitorDetail = ({ monitorId, onBack, onToggleStatus }) => {
    const [currentRange, setCurrentRange] = useState('24h');
    const { overview, setOverview, trend, uptimeHistory, loading, error, refresh } = useMonitorDetail(monitorId, currentRange);
    const { toggleActive } = useApiMonitors();
    const { addToast } = useToast();
    
    // Alert configurations hook
    const { 
        configs: alertConfigs, 
        loading: configsLoading, 
        toggleConfig 
    } = useMonitorAlertConfigs(monitorId);

    const handleToggle = async () => {
        if (!overview || !setOverview) return;
        
        const currentActiveStatus = overview.isActive;
        try {
            // Use the AUTHENTIC toggle function from API list
            await toggleActive(monitorId, currentActiveStatus);
            
            // Sync local overview state for immediate visual feedback
            setOverview(prev => ({ ...prev, isActive: !currentActiveStatus }));
            
            // Inform parent to refresh the list
            if (onToggleStatus) onToggleStatus(monitorId);
        } catch (err) {
            // Error handling is already inside useApiMonitors toast, 
            // setOverview revert if needed would be done here but useApiMonitors re-fetches.
        }
    };

    const timeRanges = [
        { label: '1H', value: '1h' },
        { label: '6H', value: '6h' },
        { label: '24H', value: '24h' },
        { label: '7D', value: '7d' }
    ];

    if (loading && !overview) {
        return (
            <div className="p-20 flex flex-col items-center justify-center animate-pulse">
                <div className="w-16 h-16 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-6"></div>
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Synchronizing metrics...</p>
            </div>
        );
    }

    if (error || !overview) {
        return (
            <div className="p-20 text-center">
                <div className="inline-flex p-4 bg-rose-50 dark:bg-rose-900/10 rounded-full mb-6">
                    <span className="material-symbols-outlined text-4xl text-rose-500">error</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Failed to load data</h3>
                <p className="text-slate-500 mt-2 mb-8">{error || 'Could not retrieve monitor details'}</p>
                <button onClick={onBack} className="px-8 py-3 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl">Go Back</button>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
            {/* Detail Header */}
            <div className="flex flex-wrap items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-6">
                    <button
                        onClick={onBack}
                        className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 group"
                    >
                        <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">arrow_back</span>
                    </button>
                    <div>
                        <div className="flex items-center gap-3 mb-1.5 text-slate-900 dark:text-white">
                            <span className="text-3xl font-black tracking-tight">{(overview.baseInfo?.name) || overview.name}</span>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest leading-none flex items-center gap-1.5 ${overview.isActive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${overview.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                                {overview.isActive ? 'ACTIVE' : 'PAUSED'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-black text-slate-500 uppercase tracking-tighter">{overview.baseInfo?.method || 'GET'}</span>
                            <code className="text-xs font-mono text-slate-400">{overview.baseInfo?.url || overview.endpoint}</code>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 ml-auto bg-slate-50/50 dark:bg-slate-800/30 px-5 py-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</span>
                        <span className={`text-[10px] font-black uppercase tracking-widest leading-none ${overview.isActive ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {overview.isActive ? 'Active' : 'Paused'}
                        </span>
                    </div>
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={overview.isActive === true}
                        onClick={handleToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${overview.isActive === true ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                    >
                        <span
                            className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${overview.isActive === true ? 'translate-x-[22px]' : 'translate-x-[4px]'}`}
                        />
                    </button>
                </div>
            </div>

            {/* Performance Snapshot Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Current Latency</p>
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{overview.latestLatency ? `${overview.latestLatency}ms` : '--'}</h4>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">30d Uptime</p>
                    <h4 className="text-3xl font-black text-emerald-500 tracking-tight">{overview.uptimePercent || '0.0'}%</h4>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Status</p>
                    <h4 className={`text-3xl font-black tracking-tight ${overview.currentStatus === 'HEALTHY' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {overview.currentStatus || 'UNKNOWN'}
                    </h4>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Last Check</p>
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight font-mono lowercase text-sm">
                        {overview.lastCheckTime ? new Date(overview.lastCheckTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}
                    </h4>
                </div>
            </div>

            {/* Uptime History Bar (Standardized Item 3) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase tracking-tight">Uptime History (Last 24h)</h3>
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> UP</span>
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span> DOWN</span>
                    </div>
                </div>
                <div className="flex gap-1 h-12 bg-slate-50 dark:bg-slate-800/20 p-1.5 rounded-2xl items-center">
                    {uptimeHistory?.length > 0 ? (
                        uptimeHistory.map((item, idx) => (
                            <div
                                key={idx}
                                className={`flex-1 h-full rounded-md transition-all hover:scale-110 cursor-help ${item.isUp ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                title={`Check ${idx + 1}: ${item.isUp ? 'UP' : 'DOWN'} at ${new Date(item.time).toLocaleTimeString()}`}
                            ></div>
                        ))
                    ) : (
                        <div className="flex-1 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest italic pt-1">Collecting uptime history...</div>
                    )}
                </div>
                <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <span>24 hours ago</span>
                    <span>{overview.uptimePercent}% availability</span>
                    <span>Just now</span>
                </div>
            </div>

            {/* Charts & Operational History */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                <div className="xl:col-span-2 space-y-10">
                    {/* Performance Chart (Standardized Item 3) */}
                    <div className="min-h-[400px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 flex flex-col group mt-10">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Latency Trend</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Showing response times for {currentRange}</p>
                            </div>
                            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                                {timeRanges.map((range) => (
                                    <button
                                        key={range.value}
                                        onClick={() => setCurrentRange(range.value)}
                                        className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${currentRange === range.value ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex bg-slate-50/50 dark:bg-slate-800/20 rounded-3xl mt-10 p-6 min-h-[400px]">
                            {/* Fixed Y-Axis Labels */}
                            <div className="flex flex-col justify-between pt-10 pb-20 pr-4 text-[9px] font-black text-slate-400 border-r border-slate-200 dark:border-slate-800 shrink-0 select-none">
                                <span>2000ms</span>
                                <span>1500ms</span>
                                <span>1000ms</span>
                                <span>500ms</span>
                                <span className="text-emerald-500">0ms</span>
                            </div>

                            {/* Scrollable Chart Area */}
                            <div className="flex-1 overflow-x-auto custom-scrollbar">
                                {trend?.length > 0 ? (
                                    <div
                                        style={{
                                            width: `${Math.max(trend.length * 56, 800)}px`,
                                            minWidth: '100%',
                                            height: '350px',
                                            position: 'relative'
                                        }}
                                    >
                                        <svg width="100%" height="350" className="overflow-visible">
                                            {/* Horizontal Reference Lines */}
                                            {[500, 1000, 1500, 2000].map(val => {
                                                const y = 300 - (val / 2000) * 220;
                                                return (
                                                    <line key={val} x1="0" y1={y} x2="100%" y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="4 4" strokeWidth="1" />
                                                );
                                            })}

                                            {trend.map((item, i) => {
                                                const latency = typeof item === 'object' ? (item.latencyMs || item.value) : item;
                                                const timestamp = typeof item === 'object' ? item.time : null;
                                                const timeLabel = timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : `Point #${i + 1}`;

                                                const barHeight = Math.min(Math.max((latency / 2000) * 220, 25), 250);
                                                const barWidth = 40;
                                                const gap = 16;
                                                const startX = i * (barWidth + gap) + gap;

                                                return (
                                                    <g key={i} className="group/bar cursor-pointer">
                                                        <title>{`Timestamp: ${timeLabel}\nLatency: ${latency}ms`}</title>
                                                        <rect
                                                            x={startX}
                                                            y={300 - barHeight}
                                                            width={barWidth}
                                                            height={barHeight}
                                                            fill="#10b981"
                                                            fillOpacity="0.8"
                                                            rx="6"
                                                            className="transition-all hover:fill-emerald-400 hover:fill-opacity-100 duration-300 shadow-sm"
                                                        />
                                                        <text
                                                            x={startX + barWidth / 2}
                                                            y={325}
                                                            textAnchor="middle"
                                                            className="fill-slate-500 font-mono font-black text-[8px] opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none"
                                                        >
                                                            {timeLabel}
                                                        </text>
                                                    </g>
                                                );
                                            })}
                                            {/* Baseline */}
                                            <line x1="0" y1="300" x2="100%" y2="300" stroke="#10b981" strokeOpacity="0.2" strokeWidth="2" />
                                        </svg>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-[10px] uppercase tracking-widest animate-pulse italic">
                                        No latency data recorded yet
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 pt-6 border-t border-slate-100 dark:border-slate-800 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                            <span>{trend.length > 0 ? 'Oldest Recorded' : '--'}</span>
                            <span>{trend.length} samples recorded</span>
                            <span>Real-time Snapshot</span>
                        </div>
                    </div>

                    {/* Incident History (Last 10 Logs from Standardized Item 3) */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-8">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase tracking-tight">Recent Logs</h3>
                            <button className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">View All Logs</button>
                        </div>
                        <div className="space-y-6">
                            {overview.recentLogs?.length > 0 ? (
                                overview.recentLogs.map((log, idx) => (
                                    <div key={idx} className="flex items-start gap-6 group">
                                        <div className="text-xs font-black text-slate-400 italic pt-1 w-24 shrink-0">
                                            {new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className={`p-1 px-3 text-[10px] font-black rounded-full shrink-0 uppercase tracking-tighter self-start ${log.status === 'HEALTHY' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                            {log.status}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{log.message || 'Check completed'}</p>
                                            <p className="text-xs text-slate-500 mt-1">Latency: {log.responseTime}ms | Type: {log.eventType}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-slate-400 font-bold text-[10px] uppercase tracking-widest italic py-10">No recent logs available</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Vertical Panel: Configuration Sidebar */}
                <div className="space-y-10">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none">Alert Configurations</h3>
                            {configsLoading && <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>}
                        </div>
                        <div className="space-y-6">
                            {!configsLoading && alertConfigs.length === 0 ? (
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center py-4 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl italic">No notification channels</p>
                            ) : (
                                alertConfigs.map((config) => (
                                    <div key={config.id} className={`flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all ${!config.enabled && 'opacity-50 grayscale select-none'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-xl ${config.type === 'EMAIL' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                                                <span className="material-symbols-outlined text-[16px]">{config.type === 'EMAIL' ? 'mail' : 'alternate_email'}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">{config.type === 'EMAIL' ? 'Email Address' : 'Slack Webhook'}</span>
                                                <span className="text-[11px] text-slate-500 font-medium truncate max-w-[120px]" title={config.destination}>{config.destination}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleConfig(config.id)}
                                            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${config.enabled ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
                                        >
                                            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${config.enabled ? 'translate-x-[22px]' : 'translate-x-[4px]'}`} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                        <button className="w-full mt-10 py-3 text-[10px] font-black text-primary uppercase tracking-widest border-2 border-primary/20 rounded-xl hover:bg-primary/5 transition-all active:scale-95">
                            Manage Notifications
                        </button>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                        <h3 className="text-lg font-black tracking-tight mb-3">Monitoring Interval</h3>
                        <p className="text-xs text-white/50 leading-relaxed mb-8 font-medium italic">Every 60 seconds (1 minute). This setting affects your plan quota.</p>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={`flex-1 h-1.5 rounded-full ${i === 1 ? 'bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]' : 'bg-white/10'}`}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonitorDetail;
