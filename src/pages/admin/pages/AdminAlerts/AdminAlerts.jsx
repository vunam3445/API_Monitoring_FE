import React, { useState } from 'react';
import DeliveryHeader from './components/DeliveryHeader';
import DeliveryStatsBanner from './components/DeliveryStatsBanner';
import DeliveryFilters from './components/DeliveryFilters';
import DeliveryTable from './components/DeliveryTable';
import DeliveryDetailPanel from './components/DeliveryDetailPanel';
import { useDeliveryData } from '../../../../hooks/useDeliveryData';

const AdminAlerts = () => {
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const {
        stats,
        logs,
        loading,
        isRetryingAll,
        filters,
        handleRetryAll,
        handleRetrySingle,
        handleFilterChange,
        handlePageChange
    } = useDeliveryData();

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Header Section */}
            <DeliveryHeader 
                onRetryAll={handleRetryAll} 
                isRetryingAll={isRetryingAll} 
            />

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {/* Metrics Banner */}
                <DeliveryStatsBanner stats={stats} />

                {/* Search & Filter Section */}
                <DeliveryFilters 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                />

                {/* Main Content: Table & Detail Panel */}
                <div className="flex flex-col xl:flex-row gap-6">
                    <DeliveryTable 
                        logs={logs}
                        loading={loading}
                        filters={filters}
                        onSelectRow={setSelectedDelivery} 
                        onPageChange={handlePageChange}
                    />
                    
                    <DeliveryDetailPanel 
                        selectedDelivery={selectedDelivery} 
                        onClose={() => setSelectedDelivery(null)} 
                        onRetry={handleRetrySingle}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminAlerts;
