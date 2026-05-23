import React, { useState, useEffect } from 'react';
import DashboardStats from './components/DashboardStats';
import UptimePerformance from './components/UptimePerformance';
import SystemInfrastructure from './components/SystemInfrastructure';
import ActivityTables from './components/ActivityTables';
import { useToast } from '../../../../components/UI/Toast';
import { adminDashboardService } from '../../../../services/adminDashboardService';

const AdminDashboard = () => {
    const toast = useToast();
    const [data, setData] = useState({
        stats: null,
        performance: null,
        infrastructure: null,
        activity: null
    });
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [stats, performance, infrastructure, activity] = await Promise.all([
                adminDashboardService.getStatsCards(),
                adminDashboardService.getPerformance('1d'),
                adminDashboardService.getInfrastructure(),
                adminDashboardService.getActivity()
            ]);

            setData({
                stats,
                performance,
                infrastructure,
                activity
            });
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            toast.error('Could not load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-8 animate-in fade-in duration-500">
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
            <DashboardStats statsData={data.stats} />

            {/* Chart and Health Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <UptimePerformance performanceData={data.performance} />
                <SystemInfrastructure infrastructureData={data.infrastructure} />
            </div>

            {/* Recent Activity Tables */}
            <ActivityTables activityData={data.activity} />
        </div>
    );
};

export default AdminDashboard;
