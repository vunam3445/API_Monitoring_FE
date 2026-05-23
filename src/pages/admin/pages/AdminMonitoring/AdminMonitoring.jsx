import React, { useState } from 'react';
import MonitoringStats from './components/MonitoringStats';
import PerformanceCharts from './components/PerformanceCharts';
import ActiveMonitoringTable from './components/ActiveMonitoringTable';
import SystemHealthPanel from './components/SystemHealthPanel';
import ApiDetailsPanel from './components/ApiDetailsPanel';
import { useAdminMonitors } from './hooks/useAdminMonitors';

const AdminMonitoring = () => {
    const { 
        monitors, 
        stats, 
        charts,
        systemHealth,
        isGlobalPaused,
        timeRange,
        setTimeRange,
        loading, 
        loadingStats, 
        loadingCharts,
        loadingActions,
        handleToggleBlock, 
        handleToggleGlobalPause,
        handleFlushQueue,
        refresh 
    } = useAdminMonitors();
    
    const [selectedMonitor, setSelectedMonitor] = useState(null);

    return (
        <div className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-y-auto w-full">
            {/* Header */}
            <header className="p-8 pb-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">System Overview</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time metrics, trend analysis, and administrative system controls</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Time Range Selector */}
                        <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 shadow-sm">
                            {['1h', '6h', '1d', '7d', '30d'].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range)}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                                        timeRange === range 
                                        ? 'bg-orange-500 text-white shadow-sm' 
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                    }`}
                                >
                                    {range.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        {/* Control Actions */}
                        <div className="flex items-center gap-2 ml-2">
                            <button 
                                onClick={handleFlushQueue}
                                disabled={loadingActions}
                                title="Flush Job Queue"
                                className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50 group"
                            >
                                <span className="material-symbols-outlined text-[20px] group-hover:rotate-180 transition-transform duration-500">cleaning_services</span>
                            </button>
                            
                            <button 
                                onClick={refresh}
                                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm text-slate-700 dark:text-slate-300"
                            >
                                <span className="material-symbols-outlined text-sm">refresh</span> Refresh
                            </button>
                            
                            <button 
                                onClick={handleToggleGlobalPause}
                                disabled={loadingActions}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                                    isGlobalPaused 
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white animate-pulse' 
                                    : 'bg-red-600 hover:bg-red-700 text-white'
                                } disabled:opacity-50`}
                            >
                                <span className="material-symbols-outlined text-sm">
                                    {isGlobalPaused ? 'play_circle' : 'pause_circle'}
                                </span> 
                                {isGlobalPaused ? 'Resume Monitoring' : 'Pause Global'}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Grid */}
            <MonitoringStats stats={stats} loading={loadingStats} />

            {/* Main Dashboard Content */}
            <div className="px-8 pb-8 flex flex-col xl:flex-row gap-8">
                <div className="flex-1 space-y-8 min-w-0">
                    {/* Performance Charts */}
                    <PerformanceCharts 
                        charts={charts} 
                        stats={stats}
                        loading={loadingCharts} 
                    />

                    {/* Active Monitoring Table */}
                    <ActiveMonitoringTable 
                        monitors={monitors} 
                        loading={loading} 
                        onSelectMonitor={setSelectedMonitor} 
                        onToggleBlock={handleToggleBlock}
                    />
                </div>

                {/* Right Sidebar Panel: Details + System Health */}
                <div className="w-full xl:w-96 space-y-8">
                    {/* API Details Panel - Only shown when a monitor is selected */}
                    <ApiDetailsPanel 
                        monitor={selectedMonitor} 
                        onClose={() => setSelectedMonitor(null)} 
                    />

                    {/* System Health Panel */}
                    <SystemHealthPanel 
                        healthStats={systemHealth} 
                        loading={loadingStats} 
                        onFlush={handleFlushQueue}
                        loadingActions={loadingActions}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminMonitoring;
