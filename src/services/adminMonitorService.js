import { apiClient } from './apiClient';

/**
 * Admin Monitor Service
 * Handles all administrator-specific monitor management API calls
 */
export const adminMonitorService = {
    /**
     * Get list of monitors with pagination and filtering
     * @param {Object} params - Filter and pagination params
     * @param {string} params.search - Search by monitor name
     * @param {string} params.lastStatus - Filter by status (UP, DOWN)
     * @param {boolean} params.isActive - Filter by active status
     * @param {string} params.userId - Filter by specific user UUID
     * @param {number} params.page - Page number (starts from 0)
     * @param {number} params.size - Number of records per page
     * @param {string} params.sort - Sorting (e.g., createdAt,desc)
     * @returns {Promise<Object>} - Spring Page object with monitor list
     */
    getMonitors: async (params) => {
        return apiClient.get('/api/v1/admin/monitors', { params });
    },

    /**
     * Get summary statistics for monitors
     */
    getMonitorStats: async () => {
        return apiClient.get('/api/v1/admin/monitors/stats');
    },

    /**
     * Toggle isActive status of a monitor
     * @param {string} id - Monitor UUID
     */
    toggleActive: async (id) => {
        return apiClient.put(`/api/Apis/${id}/status`);
    },

    /**
     * Block/unblock a monitor as an admin
     * @param {string} id - Monitor UUID
     */
    blockMonitor: async (id) => {
        return apiClient.put(`/api/v1/admin/monitors/${id}/block`);
    },

    /**
     * Delete an API monitor endpoint
     * @param {string} id - API UUID
     */
    deleteMonitor: async (id) => {
        return apiClient.delete(`/api/Apis/${id}`);
    }
};
