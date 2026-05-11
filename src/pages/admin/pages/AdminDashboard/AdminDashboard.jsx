import React from 'react';
import DashboardStats from './components/DashboardStats';
import UptimePerformance from './components/UptimePerformance';
import SystemInfrastructure from './components/SystemInfrastructure';
import ActivityTables from './components/ActivityTables';

const AdminDashboard = () => {
    return (
        <div className="space-y-8 pb-8">
            {/* Header with Welcome Message */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Admin Overview</h1>
                    <p className="text-slate-500 text-sm mt-1">Welcome back, Admin. Here's what's happening with the platform today.</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">notifications</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                        <span className="material-symbols-outlined text-sm">campaign</span>
                        System Broadcast
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <DashboardStats />

            {/* Chart and Health Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <UptimePerformance />
                <SystemInfrastructure />
            </div>

            {/* Recent Activity Tables */}
            <ActivityTables />
        </div>
    );
};

export default AdminDashboard;
