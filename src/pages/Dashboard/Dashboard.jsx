import React, { useState } from 'react';
import useDashboard from '../../hooks/useDashboard';
import SummaryCards from './components/SummaryCards';
import Charts from './components/Charts';
import UptimeGauge from './components/UptimeGauge';
import SubscriptionQuota from './components/SubscriptionQuota';
import TopFailingMonitors from './components/TopFailingMonitors';

const Dashboard = () => {
    const { data, loading, error, range, updateRange, refreshData } = useDashboard();
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const handleRefresh = () => {
        refreshData();
        setLastUpdated(new Date());
    };

    const rangeOptions = [
        { label: 'Last 1h', value: '1h' },
        { label: 'Last 6h', value: '6h' },
        { label: 'Last 24h', value: '24h' },
        { label: 'Last 7d', value: '7d' },
        { label: 'Last 30d', value: '30d' },
    ];

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/50 dark:bg-slate-950/20">
                <div className="text-center p-10 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-red-100 dark:border-red-900/30 max-w-md w-full">
                    <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-4xl text-red-500 font-black">error</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Something went wrong</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">{error}</p>
                    <button 
                        onClick={handleRefresh}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-xl">refresh</span>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-950/20">
            <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto w-full">
                
                {/* Enhanced Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="animate-in fade-in slide-in-from-left duration-700">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">System Overview</h1>
                            {loading && <span className="material-symbols-outlined text-indigo-500 animate-spin">refresh</span>}
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-md">
                            Real-time intelligence across your entire infrastructure.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-right duration-700">
                        {/* Range Selector with Glassmorphism */}
                        <div className="flex bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                            {rangeOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => updateRange(option.value)}
                                    className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 ${
                                        range === option.value
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>

                        {/* Status/Refresh Info */}
                        <div className="hidden sm:flex items-center gap-4">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">Last Synced</span>
                                <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                            </div>
                            <button 
                                onClick={handleRefresh}
                                disabled={loading}
                                className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
                                title="Refresh Dashboard"
                            >
                                <span className={`material-symbols-outlined text-slate-600 dark:text-slate-300 ${loading ? 'animate-spin' : ''}`}>refresh</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* System Suggestions - High Visibility Section */}
                {data?.suggestion?.message && (
                    <div className="bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/30 p-5 rounded-3xl flex items-start gap-4 animate-in zoom-in duration-500">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl shrink-0 h-fit">
                            <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">info</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-1">{data.suggestion.title || 'System Intelligence Insights'}</h4>
                            <p className="text-indigo-700/80 dark:text-indigo-400/80 text-sm">
                                {data.suggestion.message}
                            </p>
                        </div>
                    </div>
                )}

                {/* Summary Section */}
                <SummaryCards data={data?.summary} loading={loading} />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left: Charts & Detailed Statistics */}
                    <div className="xl:col-span-2 space-y-8">
                        {/* Response Time Chart */}
                        <Charts 
                            data={data?.responseTimeChart?.points} 
                            summary={data?.summary}
                            loading={loading} 
                            range={range} 
                        />
                        
                        {/* Failing/At Risk Monitors */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <TopFailingMonitors data={data?.errorRate?.items} loading={loading} title="Highest Error Rate" />
                             {/* Unstable Monitors Section */}
                             <TopFailingMonitors 
                                data={data?.unstableMonitors?.items} 
                                loading={loading} 
                                title="Needs Attention" 
                                subtitle="Top monitors by lowest stability score"
                                isStability={true}
                             />
                        </div>
                    </div>

                    {/* Right: Health & Quota */}
                    <div className="space-y-8">
                        <UptimeGauge data={data?.uptimeGauge?.uptimePercentage} loading={loading} />
                        <SubscriptionQuota data={data?.planUsage} loading={loading} />
                    </div>
                </div>

            </div>
            
            <div className="p-8"></div>
        </div>
    );
};

export default Dashboard;
