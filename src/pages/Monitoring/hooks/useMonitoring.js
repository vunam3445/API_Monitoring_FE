import { useState, useCallback, useEffect, useMemo } from 'react';
import { monitoringService } from '../../../services/monitoringService';
import { parseJwt } from '../../../services/apiClient';

/**
 * Custom hook to manage global monitoring state
 * Connects to /api/monitoring/ summary, key-health, and events
 */
const useMonitoring = (limit = 10) => {
    const [summary, setSummary] = useState(null);
    const [keyHealth, setKeyHealth] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userId = useMemo(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = parseJwt(token);
            return decoded?.userId || null;
        }
        return null;
    }, []);

    const fetchMonitoringData = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        setError(null);
        try {
            // Parallel fetches for efficiency
            const [summaryRes, userMonitorsRes, eventsRes] = await Promise.all([
                monitoringService.getSummary(),
                monitoringService.getUserMonitors(userId, { size: 10, sort: 'createdAt,desc' }),
                monitoringService.getRecentEvents(limit)
            ]);

            // Handle paged or raw array responses
            const healthData = userMonitorsRes?.content || userMonitorsRes || [];
            const summaryData = summaryRes || null;
            const eventsData = eventsRes?.content || eventsRes || [];

            setSummary(summaryData);
            setKeyHealth(healthData);
            setEvents(eventsData);
        } catch (err) {
            console.error('Monitoring data fetch error:', err);
            setError(err.message || 'Failed to fetch monitoring overview');
        } finally {
            setLoading(false);
        }
    }, [limit, userId]);

    const toggleStatus = async (id) => {
        try {
            await monitoringService.toggleMonitorStatus(id);
            // Refresh and extract content correctly using userId-based fetch
            if (userId) {
                const updatedHealthRes = await monitoringService.getUserMonitors(userId, { size: 10, sort: 'createdAt,desc' });
                const healthData = updatedHealthRes?.content || updatedHealthRes || [];
                setKeyHealth(healthData);
            }
        } catch (err) {
            console.error(`Toggle status error for ID ${id}:`, err);
            throw err;
        }
    };

    useEffect(() => {
        fetchMonitoringData();
    }, [fetchMonitoringData]);

    return {
        summary,
        keyHealth,
        events,
        loading,
        error,
        userId,
        refresh: fetchMonitoringData,
        toggleStatus
    };
};

export default useMonitoring;
