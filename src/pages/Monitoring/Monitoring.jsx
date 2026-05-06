import React, { useState } from 'react';
import MonitoringHeader from './components/MonitoringHeader';
import MonitorTable from './components/MonitorTable';
import MonitorDetail from './components/MonitorDetail';
import useMonitoring from './hooks/useMonitoring';
import { useToast } from '../../components/UI/Toast';
import { useConfirmDialog } from '../../components/UI/ConfirmDialog/ConfirmDialog';
import { apiEndpointService } from '../../services/apiEndpointService';
import AddAPIModal from '../APIList/components/AddAPIModal';
import { useApiMonitors } from '../APIList/hooks/useApiMonitors';

const Monitoring = () => {
    const { summary, keyHealth, events, loading, error, toggleStatus, refresh } = useMonitoring(8); // Limit last 8 events
    const [selectedMonitor, setSelectedMonitor] = useState(null);
    const { addToast } = useToast();
    const { confirm } = useConfirmDialog();
    const { updateApi } = useApiMonitors();
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingApi, setEditingApi] = useState(null);

    const handleBackToList = () => {
        setSelectedMonitor(null);
        refresh(); // Refresh overall data when returning to list
    };

    const handleToggleMonitor = async (id) => {
        try {
            const monitor = keyHealth.find(m => m.id === id);
            const currentStatus = monitor ? monitor.isActive : false;
            
            // Optimistic behavior logic can be added in hook, but here we wait
            await toggleStatus(id);
            addToast('success', `Monitor ${!currentStatus ? 'activated' : 'paused'} successfully`);
            // Re-fetch overall data to reflect the toggle in the list
            refresh();
        } catch (err) {
            console.error('Failed to toggle monitor status', err);
            addToast('error', 'Failed to toggle monitor status');
        }
    };

    const handleDeleteMonitor = async (id) => {
        const isConfirmed = await confirm({
            title: 'Delete API Endpoint',
            message: 'Are you sure you want to permanently delete this API endpoint? This action cannot be undone.',
            confirmText: 'Delete',
            cancelText: 'Cancel',
            type: 'danger',
            icon: 'delete_forever'
        });

        if (isConfirmed) {
            try {
                await apiEndpointService.deleteApi(id);
                addToast('success', 'API deleted successfully');
                refresh();
            } catch (error) {
                console.error('Failed to delete API', error);
                addToast('error', error?.message || 'Error deleting API monitor');
            }
        }
    };

    const handleEditMonitor = (monitor) => {
        setEditingApi(monitor);
        setIsEditModalOpen(true);
    };

    const handleSaveApi = async (formData) => {
        try {
            if (editingApi) {
                await updateApi(editingApi.id, formData);
            }
            setIsEditModalOpen(false);
            refresh();
        } catch (error) {
            // Unhandled errors will be automatically notified via Toast in Hook
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
                                onDelete={handleDeleteMonitor}
                                onEdit={handleEditMonitor}
                            />
                        </div>
                    </>
                )}
            </div>

            {/* Forms Layer */}
            <AddAPIModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveApi}
                initialData={editingApi}
            />
        </div>
    );
};

export default Monitoring;
