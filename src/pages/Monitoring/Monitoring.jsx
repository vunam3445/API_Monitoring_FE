import React, { useState } from 'react';
import MonitoringHeader from './components/MonitoringHeader';
import MonitorTable from './components/MonitorTable';
import MonitorDetail from './components/MonitorDetail';
import useMonitoring from './hooks/useMonitoring';

const Monitoring = () => {
    const { summary, keyHealth, events, loading, error, toggleStatus, refresh } = useMonitoring(8); // Limit last 8 events
    const [selectedMonitor, setSelectedMonitor] = useState(null);

    const handleBackToList = () => {
        setSelectedMonitor(null);
        refresh(); // Refresh overall data when returning to list
    };

    const handleToggleMonitor = async (id) => {
        try {
            await toggleStatus(id);
            // Re-fetch overall data to reflect the toggle in the list
            refresh();
        } catch (err) {
            console.error('Failed to toggle monitor status', err);
        }
    };

    return (
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-950/20">
            <div className="p-8 space-y-10 max-w-7xl mx-auto w-full">
                {selectedMonitor ? (
                    /* Detail View - Now receiving real data */
                    <MonitorDetail 
                        monitorId={selectedMonitor.id} 
                        onBack={handleBackToList} 
                        onToggleStatus={() => refresh()}
                    />
                ) : (
                    /* List View - Connecting real data */
                    <>
                        <MonitoringHeader 
                            summary={summary}
                        />
                        
                        <div className="space-y-10">
                            {error && (
                                <div className="p-4 bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 rounded-2xl flex items-center gap-3 text-rose-600 dark:text-rose-400">
                                   <span className="material-symbols-outlined">error</span>
                                   <p className="text-sm font-bold">{error}</p>
                                </div>
                            )}
                            
                            <MonitorTable 
                                monitors={keyHealth} 
                                loading={loading}
                                onSelectMonitor={setSelectedMonitor} 
                                onToggleStatus={handleToggleMonitor}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Monitoring;
