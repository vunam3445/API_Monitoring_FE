import React, { useState } from 'react';
import MonitoringHeader from './components/MonitoringHeader';
import MonitoringSummaryCards from './components/MonitoringSummaryCards';
import MonitoringCharts from './components/MonitoringCharts';
import APIHealthGrid from './components/APIHealthGrid';
import RecentEventsTable from './components/RecentEventsTable';
import ApiSelectorModal from './components/ApiSelectorModal';

const Monitoring = () => {
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [selectedApi, setSelectedApi] = useState(null);

    const handleSelectApi = (api) => {
        setSelectedApi(api);
        console.log('Selected API for monitoring:', api);
        // You can trigger data re-fetch for specific charts here based on selectedApi.id
    };

    return (
        <div className="space-y-8 pb-8">
            <MonitoringHeader 
                onOpenSelector={() => setIsSelectorOpen(true)} 
                selectedApiName={selectedApi?.name}
            />
            <MonitoringSummaryCards />
            <MonitoringCharts />
            <APIHealthGrid />
            <RecentEventsTable />

            <ApiSelectorModal 
                isOpen={isSelectorOpen}
                onClose={() => setIsSelectorOpen(false)}
                onSelect={handleSelectApi}
            />
        </div>
    );
};

export default Monitoring;
