import React from 'react'; // Refresh for Vite
import RevenueStats from './components/RevenueStats';
import RevenueCharts from './components/RevenueCharts';
import SubscriptionAnalytics from './components/SubscriptionAnalytics';
import PlanBreakdownTable from './components/PlanBreakdownTable';
import RecentTransactions from './components/RecentTransactions';
import { useRevenueData } from '../../../../hooks/useRevenueData';

const AdminRevenueAnalytics = () => {
    const {
        stats,
        charts,
        subscriptionAnalytics,
        planBreakdown,
        transactionsPage,
        loading,
        error,
        page,
        period,
        handlePageChange,
        handlePeriodChange
    } = useRevenueData();

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="text-center">
                    <span className="material-symbols-outlined text-rose-500 text-5xl mb-4">error</span>
                    <p className="text-slate-900 dark:text-white font-bold">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-background-light dark:bg-background-dark min-h-0 min-w-0 h-full">
            {/* Page Header Title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Revenue Analytics</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Track subscription revenue, financial performance, and business growth.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    {/* Global Date Filter */}
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 shadow-sm">
                        <span className="material-symbols-outlined text-slate-400 text-[20px]">calendar_today</span>
                        <select 
                            value={period}
                            onChange={(e) => handlePeriodChange(e.target.value)}
                            className="bg-transparent border-none text-xs font-bold outline-none text-slate-700 dark:text-slate-200 pr-4"
                        >
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="last_7_days">Last 7 Days</option>
                            <option value="last_30_days">Last 30 Days</option>
                            <option value="last_90_days">Last 90 Days</option>
                            <option value="this_year">This Year</option>
                        </select>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-sm hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-[20px]">description</span>
                        Export Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                        <span className="material-symbols-outlined text-[20px]">download</span>
                        CSV
                    </button>
                </div>
            </div>

            {loading && !stats ? (
                <div className="flex-1 flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <>
                    {/* Revenue Statistics Cards */}
                    <RevenueStats stats={stats} />

                    {/* Charts Section */}
                    <RevenueCharts data={charts} planData={planBreakdown} />

                    {/* Subscription Analytics & Recent Transactions */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2 space-y-6">
                            <SubscriptionAnalytics analytics={subscriptionAnalytics} />
                            <PlanBreakdownTable plans={planBreakdown} />
                        </div>
                        <div className="xl:col-span-1">
                            <RecentTransactions 
                                transactionsPage={transactionsPage} 
                                onPageChange={handlePageChange}
                                currentPage={page}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminRevenueAnalytics;
