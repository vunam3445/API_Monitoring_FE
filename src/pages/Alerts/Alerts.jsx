import React from 'react';
import AlertsHeader from './components/AlertsHeader';
import AlertSummaryCards from './components/AlertSummaryCards';
import AlertsTableSection from './components/AlertsTableSection';
import { useAlerts } from '../../hooks/useAlerts';

const Alerts = () => {
    const alertsState = useAlerts();
    
    return (
        <div className="space-y-8 pb-8">
            <AlertsHeader {...alertsState} />
            <AlertSummaryCards 
                summary={alertsState.summary} 
                loading={alertsState.summaryLoading} 
            />
            <AlertsTableSection {...alertsState} />
        </div>
    );
};

export default Alerts;
