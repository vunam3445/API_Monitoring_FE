import React from 'react';
import AlertsHeader from './components/AlertsHeader';
import AlertSummaryCards from './components/AlertSummaryCards';
import AlertsTableSection from './components/AlertsTableSection';

const Alerts = () => {
    return (
        <div className="space-y-8 pb-8">
            <AlertsHeader />
            <AlertSummaryCards />
            <AlertsTableSection />
        </div>
    );
};

export default Alerts;
