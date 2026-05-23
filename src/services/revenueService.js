import { apiClient } from './apiClient';

const API_BASE_URL = '/api/admin/revenue';

const revenueService = {
    getStats: async () => {
        return apiClient.get(`${API_BASE_URL}/stats`);
    },

    getCharts: async (period = 'last_30_days') => {
        return apiClient.get(`${API_BASE_URL}/charts`, { params: { period } });
    },

    getSubscriptionAnalytics: async () => {
        return apiClient.get(`${API_BASE_URL}/subscription-analytics`);
    },

    getPlanBreakdown: async () => {
        return apiClient.get(`${API_BASE_URL}/plan-breakdown`);
    },

    getRecentTransactions: async (page = 0, size = 10, sort = 'createdAt,desc') => {
        return apiClient.get(`${API_BASE_URL}/recent-transactions`, {
            params: { page, size, sort }
        });
    }
};

export default revenueService;
