import { apiClient } from './apiClient';

const DASHBOARD_BASE_URL = '/api/v1/dashboard';

const dashboardService = {
    /**
     * Get all dashboard overview data in one request
     * @param {string} range - Time range (1h, 6h, 24h, 7d, 30d)
     * @returns {Promise}
     */
    getOverview: async (range = '24h') => {
        try {
            const response = await apiClient.get(`${DASHBOARD_BASE_URL}/overview`, {
                params: { range }
            });
            return response; // No .data here because of interceptor returning data
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get summary cards data
     * @returns {Promise}
     */
    getSummary: async () => {
        try {
            const response = await apiClient.get(`${DASHBOARD_BASE_URL}/summary`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get latency chart data
     * @param {string} range - Time range
     * @param {string} bucket - Time bucket (minute, hour, day)
     * @returns {Promise}
     */
    getLatencyChart: async (range = '24h', bucket = 'hour') => {
        try {
            const response = await apiClient.get(`${DASHBOARD_BASE_URL}/charts/response-time`, {
                params: { range, bucket }
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get error rate data
     * @param {string} range - Time range
     * @param {number} limit - Limit number of items
     * @returns {Promise}
     */
    getErrorRate: async (range = '24h', limit = 5) => {
        try {
            const response = await apiClient.get(`${DASHBOARD_BASE_URL}/error-rate`, {
                params: { range, limit }
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get uptime gauge data
     * @param {string} range - Time range
     * @returns {Promise}
     */
    getUptimeGauge: async (range = '24h') => {
        try {
            const response = await apiClient.get(`${DASHBOARD_BASE_URL}/uptime-gauge`, {
                params: { range }
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get unstable monitors data
     * @param {string} range - Time range
     * @param {number} limit - Limit items
     * @returns {Promise}
     */
    getUnstableMonitors: async (range = '24h', limit = 5) => {
        try {
            const response = await apiClient.get(`${DASHBOARD_BASE_URL}/unstable-monitors`, {
                params: { range, limit }
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get plan usage data
     * @returns {Promise}
     */
    getPlanUsage: async () => {
        try {
            const response = await apiClient.get(`${DASHBOARD_BASE_URL}/plan-usage`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get system suggestions
     * @returns {Promise}
     */
    getSuggestions: async () => {
        try {
            const response = await apiClient.get(`${DASHBOARD_BASE_URL}/suggestions`);
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default dashboardService;
