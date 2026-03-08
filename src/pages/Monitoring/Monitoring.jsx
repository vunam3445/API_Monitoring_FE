import React from 'react';
import MonitoringHeader from './components/MonitoringHeader';
import MonitoringSummaryCards from './components/MonitoringSummaryCards';
import MonitoringCharts from './components/MonitoringCharts';
import APIHealthGrid from './components/APIHealthGrid';
import RecentEventsTable from './components/RecentEventsTable';

const Monitoring = () => {
    return (
        <div className="space-y-8 pb-8">
            <MonitoringHeader />
            <MonitoringSummaryCards />
            <MonitoringCharts />
            <APIHealthGrid />
            <RecentEventsTable />
        </div>
    );
};

export default Monitoring;
