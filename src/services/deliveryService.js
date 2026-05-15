import { apiClient } from './apiClient';

/**
 * Delivery Service
 * Handles notification delivery management for administrators
 */
export const deliveryService = {
    /**
     * Get summary statistics for notification deliveries in the last 24h
     * @returns {Promise<Object>} AlertDeliveryStatsDTO
     */
    getStats: async () => {
        return apiClient.get('/api/admin/delivery/stats');
    },

    /**
     * Get delivery logs with pagination and filters
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} Page<AlertDeliveryLogDTO>
     */
    getLogs: async (params) => {
        return apiClient.get('/api/admin/delivery/logs', { params });
    },

    /**
     * Retry all failed deliveries in the last 24h
     */
    retryAll: async () => {
        return apiClient.post('/api/admin/delivery/retry-all');
    },

    /**
     * Retry a specific delivery by ID
     * @param {string} id - UUID of AlertDelivery record
     */
    retrySingle: async (id) => {
        return apiClient.post(`/api/admin/delivery/${id}/retry`);
    }
};
