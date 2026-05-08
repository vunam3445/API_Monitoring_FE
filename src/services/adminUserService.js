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
    },

    /**
     * Update user subscription plan
     * @param {string} userId - UUID of the user
     * @param {string} planId - UUID of the plan
     * @returns {Promise<Object>} - Action result
     */
    updateUserPlan: async (userId, planId) => {
        return apiClient.put(`/api/v1/admin/users/${userId}/subscription-plan/${planId}`);
    },

    /**
     * Get user's APIs (monitors)
     */
    getUserApis: async (userId, params) => {
        return apiClient.get(`/api/Apis/user/${userId}`, { params });
    },

    /**
     * Get user's Alerts
     */
    getUserAlerts: async (userId, params) => {
        return apiClient.get(`/api/v1/alerts/users/${userId}`, { params });
    },

    /**
     * Get user's Uptime Logs
     */
    getUserUptimeLogs: async (userId, params) => {
        return apiClient.get(`/api/uptime-logs/user/${userId}`, { params });
    },

    /**
     * Renew user subscription manually (Admin only)
     * @param {string} userId - UUID of the user
     * @param {Object} data - Renewal data { type, time, note, amount }
     */
    renewSubscriptionManual: async (userId, data) => {
        return apiClient.post(`/api/subscriptions/users/${userId}/manual`, data);
    }
};
