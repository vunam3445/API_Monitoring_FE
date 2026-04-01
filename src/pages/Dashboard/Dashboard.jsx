import React from 'react';
import SummaryCards from './components/SummaryCards';
import Charts from './components/Charts';
import UptimeGauge from './components/UptimeGauge';
import SubscriptionQuota from './components/SubscriptionQuota';
import TopFailingMonitors from './components/TopFailingMonitors';

const Dashboard = () => {
    return (
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-950/20">
            <div className="p-8 space-y-10 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">System Overview</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-md">Real-time aggregated metrics across all your configured API monitors and endpoints.</p>
                    </div>
                </div>

                {/* Summary Section */}
                <SummaryCards />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                    {/* Left: Aggregated Charts & Insights */}
                    <div className="xl:col-span-2 space-y-10">
                        <Charts />
                        <TopFailingMonitors />
                    </div>

                    {/* Right: Subscription & Real-time Gauges */}
                    <div className="space-y-10">
                        <UptimeGauge />
                        <SubscriptionQuota />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
