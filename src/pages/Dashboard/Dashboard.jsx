import React from 'react';
import SummaryCards from './components/SummaryCards';
import StatusTable from './components/StatusTable';
import Charts from './components/Charts';
import UptimeGauge from './components/UptimeGauge';
import RecentAlerts from './components/RecentAlerts';

const Dashboard = () => {
    return (
        <div className="space-y-8">
            <SummaryCards />

            {/* Main Grid: Tables and Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left: Status Table */}
                <div className="xl:col-span-2 space-y-8">
                    <StatusTable />
                    <Charts />
                </div>

                {/* Right Panel: Alerts and Uptime */}
                <div className="space-y-8">
                    <UptimeGauge />
                    <RecentAlerts />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
