import React, { useState } from 'react';
import { useAdminMonitors } from '../../../../hooks/useAdminMonitors';
import MonitorStats from './components/MonitorStats';
import MonitorFilters from './components/MonitorFilters';
import MonitorTable from './components/MonitorTable';
import MonitorDetails from './components/MonitorDetails';
import MonitorSkeleton from './components/MonitorSkeleton';

const AdminApis = () => {
    const [selectedMonitorId, setSelectedMonitorId] = useState(null);
    const {
        monitors,
        pagination,
        filters,
        isLoading,
        stats,
        handleFilterChange,
        handlePageChange,
        handleToggleActive,
        handleDeleteMonitor,
        refresh
    } = useAdminMonitors();

    // Find the currently selected monitor from the monitors list to ensure sync
    const selectedMonitor = React.useMemo(() => 
        monitors.find(m => m.id === selectedMonitorId), 
    [monitors, selectedMonitorId]);

    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            {/* Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">APIs Management</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium text-sm">Monitor and manage all APIs registered by users on the platform.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={refresh}
                        className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors"
                    >
                        <span className={`material-symbols-outlined text-[18px] ${isLoading ? 'animate-spin' : ''}`}>refresh</span>
                        Refresh
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <MonitorStats stats={stats} isLoading={isLoading} />

            <div className="flex flex-col xl:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4 min-w-0 w-full">
                    {/* Filters */}
                    <MonitorFilters filters={filters} onFilterChange={handleFilterChange} />

                    {/* Table / Loading State */}
                    {isLoading && monitors.length === 0 ? (
                        <MonitorSkeleton />
                    ) : (
                        <MonitorTable 
                            monitors={monitors}
                            pagination={pagination}
                            onPageChange={handlePageChange}
                            selectedMonitor={selectedMonitor}
                            onSelectMonitor={(m) => setSelectedMonitorId(m.id)}
                            onToggleActive={handleToggleActive}
                            onDeleteMonitor={handleDeleteMonitor}
                        />
                    )}
                </div>

                {/* Monitor Details Panel */}
                {selectedMonitor && (
                    <MonitorDetails
                        monitor={selectedMonitor}
                        onClose={() => setSelectedMonitorId(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminApis;

