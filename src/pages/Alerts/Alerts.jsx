import React from 'react';
import AlertsHeader from './components/AlertsHeader';
import AlertSummaryCards from './components/AlertSummaryCards';
import AlertsTableSection from './components/AlertsTableSection';
import AlertDetailModal from './components/AlertDetailModal';
import { useAlerts } from '../../hooks/useAlerts';

const Alerts = () => {
    const alertsState = useAlerts();
    const { selectedAlert, detailLoading, closeDetail } = alertsState;
    
    return (
        <div className="space-y-8 pb-8">
            <AlertsHeader {...alertsState} />
            <AlertSummaryCards 
                summary={alertsState.summary} 
                loading={alertsState.summaryLoading} 
            />
            <AlertsTableSection {...alertsState} />

            <AlertDetailModal 
                isOpen={!!selectedAlert} 
                onClose={closeDetail} 
                alertData={selectedAlert} 
                loading={detailLoading}
            />
        </div>
    );
};

export default Alerts;
