import { apiClient } from './apiClient';

/**
 * Admin User Service
 * Handles all administrator-specific user management API calls
 */
export const adminUserService = {
    /**
     * Get list of users with pagination and filtering
     * @param {Object} params - Filter and pagination params
     * @returns {Promise<Object>} - Spring Page object with user list
     */
    getUsers: async (params) => {
        return apiClient.get('/api/v1/admin/users', { params });
    },

    /**
     * Block a user (status -> SUSPENDED)
     * @param {string} userId - UUID of the user
     * @returns {Promise<Object>} - Action result
     */
    blockUser: async (userId) => {
        return apiClient.patch(`/api/v1/admin/users/${userId}/block`);
    },

    /**
     * Activate a user (status -> ACTIVE)
     * @param {string} userId - UUID of the user
     * @returns {Promise<Object>} - Action result
     */
    activeUser: async (userId) => {
        return apiClient.patch(`/api/v1/admin/users/${userId}/active`);
    },

    /**
     * Get user statistics
     * @returns {Promise<Object>} - User statistics data
     */
    getUserStats: async () => {
        return apiClient.get('/api/v1/admin/users/stats');
    },

    /**
     * Get specific user monitor statistics
     * @param {string} userId - UUID of the user
     * @returns {Promise<Object>} - Monitor statistics (totalMonitor, totalActiveMonitor)
     */
    getUserMonitorStats: async (userId) => {
        return apiClient.get(`/api/v1/admin/users/${userId}/monitors`);
    },

    /**
     * Lấy tổng số lượng cảnh báo (Alert) đã gửi và sự cố (Incident) phát sinh trong tháng hiện tại
     * @param {string} userId - UUID của người dùng
     * @returns {Promise<Object>} - Object chứa totalAlert và totalIncident
     */
    getUserMonthlyAlertStats: async (userId) => {
        return apiClient.get(`/api/v1/alerts/users/${userId}/monthly-stats`);
    }
};
