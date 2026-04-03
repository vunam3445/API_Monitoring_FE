import { useState, useEffect, useCallback } from 'react';
import dashboardService from '../services/dashboardService';

const useDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [range, setRange] = useState('24h');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Using overview API as recommended for better performance
            const overviewData = await dashboardService.getOverview(range);
            setData(overviewData);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError(err.message || 'Failed to fetch dashboard data');
        } finally {
            setLoading(false);
        }
    }, [range]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData, refreshTrigger]);

    const refreshData = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const updateRange = (newRange) => {
        setRange(newRange);
    };

    return {
        data,
        loading,
        error,
        range,
        updateRange,
        refreshData
    };
};

export default useDashboard;
