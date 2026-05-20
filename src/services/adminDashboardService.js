import { apiClient } from './apiClient';

/**
 * Admin Dashboard V2 Service
 * Base Path: /api/v1/admin/dashboard
 */
export const adminDashboardService = {
    /**
     * Get summary stats (Revenue, Users, APIs, Alerts)
     * Endpoint: /api/v1/admin/dashboard/stats
     */
    getStats: async () => {
        return apiClient.get('/api/v1/admin/dashboard/stats');
    },

    /**
     * Get performance metrics and chart data
     * Endpoint: /api/v1/admin/dashboard/performance
     * @param {string} range - 1h, 6h, 1d, 7d, 30d
     */
    getPerformance: async (range = '1d') => {
        return apiClient.get('/api/v1/admin/dashboard/performance', { params: { range } });
    },

    /**
     * Get system infrastructure status
     * Endpoint: /api/v1/admin/dashboard/infrastructure
     */
    getInfrastructure: async () => {
        return apiClient.get('/api/v1/admin/dashboard/infrastructure');
    },

    /**
     * Get latest API activity
     * Endpoint: /api/v1/admin/dashboard/activity
     */
    getActivity: async () => {
        return apiClient.get('/api/v1/admin/dashboard/activity');
    }
};
