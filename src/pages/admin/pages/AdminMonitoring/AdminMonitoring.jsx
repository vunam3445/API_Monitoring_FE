import React, { useState } from 'react';
import MonitoringStats from './components/MonitoringStats';
import PerformanceCharts from './components/PerformanceCharts';
import ActiveMonitoringTable from './components/ActiveMonitoringTable';
import SystemHealthPanel from './components/SystemHealthPanel';
import ApiDetailsPanel from './components/ApiDetailsPanel';
import { useAdminMonitors } from './hooks/useAdminMonitors';

const AdminMonitoring = () => {
    const { monitors, stats, loading, loadingStats, handleToggleBlock, refresh } = useAdminMonitors();
    const [selectedMonitor, setSelectedMonitor] = useState(null);

    return (
        <div className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-y-auto w-full">
            {/* Header */}
            <header className="p-8 pb-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Monitoring</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time monitoring of API uptime, response performance, and system health</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={refresh}
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm text-slate-700 dark:text-slate-300"
                        >
                            <span className="material-symbols-outlined text-sm">refresh</span> Refresh Monitoring
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-sm">pause_circle</span> Pause Global Monitoring
                        </button>
                    </div>
                </div>
            </header>

            {/* Stats Grid */}
            <MonitoringStats stats={stats} loading={loadingStats} />

            {/* Main Dashboard Content */}
            <div className="px-8 pb-8 flex flex-col xl:flex-row gap-8">
                <div className="flex-1 space-y-8 min-w-0">
                    {/* Performance Charts */}
                    <PerformanceCharts stats={stats} loading={loadingStats} />

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
                    <SystemHealthPanel healthStats={stats?.systemHealth} loading={loadingStats} />
                </div>
            </div>
        </div>
    );
};

export default AdminMonitoring;
