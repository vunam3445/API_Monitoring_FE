import { useState, useEffect, useCallback } from 'react';
import revenueService from '../services/revenueService';

export const useRevenueData = () => {
    const [stats, setStats] = useState(null);
    const [charts, setCharts] = useState(null);
    const [subscriptionAnalytics, setSubscriptionAnalytics] = useState(null);
    const [planBreakdown, setPlanBreakdown] = useState([]);
    const [transactionsPage, setTransactionsPage] = useState({ content: [], totalElements: 0, totalPages: 0 });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [period, setPeriod] = useState('last_30_days');

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [statsRes, chartsRes, subAnalyticsRes, breakdownRes, transactionsRes] = await Promise.all([
                revenueService.getStats(),
                revenueService.getCharts(period),
                revenueService.getSubscriptionAnalytics(),
                revenueService.getPlanBreakdown(),
                revenueService.getRecentTransactions(page)
            ]);

            console.log('Revenue Stats:', statsRes);
            console.log('Revenue Charts:', chartsRes);
            console.log('Sub Analytics:', subAnalyticsRes);
            console.log('Plan Breakdown:', breakdownRes);
            console.log('Transactions:', transactionsRes);

            // Handle potential API wrapper { success, data, message }
            setStats(statsRes?.data || statsRes);
            setCharts(chartsRes?.data || chartsRes);
            setSubscriptionAnalytics(subAnalyticsRes?.data || subAnalyticsRes);
            
            // Extract array from Breakdown - could be direct list, wrapped in .data, or Page object with .content
            const rawBreakdown = breakdownRes?.data || breakdownRes;
            setPlanBreakdown(Array.isArray(rawBreakdown) ? rawBreakdown : (rawBreakdown?.content || []));
            
            setTransactionsPage(transactionsRes?.data || transactionsRes);
            setError(null);
        } catch (err) {
            console.error('Error fetching revenue data:', err);
            setError('Failed to load revenue data');
        } finally {
            setLoading(false);
        }
    }, [page, period]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePeriodChange = (newPeriod) => {
        setPeriod(newPeriod);
        setPage(0); // Reset to first page when period changes
    };

    return {
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
        handlePeriodChange,
        refresh: fetchData
    };
};
