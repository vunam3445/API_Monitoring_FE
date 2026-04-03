import { useState, useCallback, useEffect } from 'react';
import { monitoringService } from '../../../services/monitoringService';
import { apiEndpointService } from '../../../services/apiEndpointService';

/**
 * Custom hook to manage per-monitor detailed monitoring state
 * Connects to /api/monitoring/{id}/overview, /api/monitoring/{id}/trend, and /api/monitoring/{id}/uptime
 */
const useMonitorDetail = (id, range = '24h') => {
    const [overview, setOverview] = useState(null);
    const [trend, setTrend] = useState([]);
    const [uptimeHistory, setUptimeHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDetailData = useCallback(async (monitorId, statsRange) => {
        if (!monitorId) return;
        setLoading(true);
        setError(null);
        try {
            // Parallel fetches for speed and accuracy
            const [overviewRes, detailRes, trendRes, uptimeRes] = await Promise.all([
                monitoringService.getMonitorOverview(monitorId),
                apiEndpointService.getMonitorDetail(monitorId), // Use the specific API detail 
                monitoringService.getMonitorTrend(monitorId, statsRange),
                monitoringService.getMonitorUptimeHistory(monitorId, statsRange)
            ]);

            // Merge data with priority on detailRes for config fields
            const mergedOverview = {
                ...overviewRes,
                ...detailRes,
                isActive: detailRes?.isActive ?? overviewRes?.isActive
            };

            setOverview(mergedOverview);
            
            // Prefer statusHistory if available as it contains full objects with time and latency
            const trendData = (uptimeRes?.statusHistory && uptimeRes.statusHistory.length > 0) 
                ? uptimeRes.statusHistory 
                : (trendRes?.points || []);
            
            const uptimeData = uptimeRes?.statusHistory || [];
            
            setTrend(trendData);
            setUptimeHistory(uptimeData);
        } catch (err) {
            console.error(`Detail fetch error for monitor ${monitorId}:`, err);
            setError(err.message || 'Failed to fetch detailed monitor data');
        } finally {
            setLoading(false);
        }
    }, []);

    const refresh = () => {
        fetchDetailData(id, range);
    };

    const toggleStatus = async (monitorId) => {
        try {
            // Use the same toggleActive logic as API List
            await apiEndpointService.toggleActive(monitorId);
            
            // Brief pause to allow backend processing if needed
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Refresh with merged data to stay accurate
            const [overviewRes, detailRes] = await Promise.all([
                monitoringService.getMonitorOverview(monitorId),
                apiEndpointService.getMonitorDetail(monitorId)
            ]);

            setOverview({
                ...overviewRes,
                ...detailRes,
                isActive: detailRes?.isActive ?? overviewRes?.isActive
            });
        } catch (err) {
            console.error(`Toggle status error for ID ${monitorId}:`, err);
            throw err;
        }
    };

    useEffect(() => {
        fetchDetailData(id, range);
    }, [id, range, fetchDetailData]);

    return {
        overview,
        setOverview, // Exporting to allow optimistic updates
        trend,
        uptimeHistory,
        loading,
        error,
        refresh,
        toggleStatus
    };
};

export default useMonitorDetail;
