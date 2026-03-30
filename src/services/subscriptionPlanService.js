import { apiClient } from './apiClient';

const BASE_URL = 'api/subscription-plans';

/**
 * Service layer cho Subscription Plan - Tuân thủ SRP (Single Responsibility)
 * Mỗi method chỉ chịu trách nhiệm 1 thao tác CRUD duy nhất.
 * 
 * Tuân thủ ISP (Interface Segregation) - chỉ expose các method cần thiết.
 */
export const subscriptionPlanService = {
    /**
     * Lấy danh sách plans có phân trang
     * @param {Object} params - { page, size, sort }
     * @returns {Promise} Spring Page response
     */
    getPaging: async ({ page = 0, size = 10, sort = 'name,asc' } = {}) => {
        return apiClient.get(`${BASE_URL}/paging`, {
            params: { page, size, sort },
        });
    },

    /**
     * Lấy plan theo ID
     * @param {string} id - UUID của plan
     * @returns {Promise} SubscriptionPlan object
     */
    getById: async (id) => {
        return apiClient.get(`${BASE_URL}/${id}`);
    },

    /**
     * Tạo mới plan
     * @param {Object} planData - Dữ liệu plan mới
     * @returns {Promise} SubscriptionPlan đã tạo
     */
    create: async (planData) => {
        return apiClient.post(BASE_URL, planData);
    },

    /**
     * Cập nhật plan
     * @param {string} id - UUID của plan
     * @param {Object} planData - Dữ liệu cần cập nhật
     * @returns {Promise} SubscriptionPlan đã cập nhật
     */
    update: async (id, planData) => {
        return apiClient.put(`${BASE_URL}/${id}`, planData);
    },

    /**
     * Xoá plan (soft delete)
     * @param {string} id - UUID của plan
     * @returns {Promise}
     */
    delete: async (id) => {
        return apiClient.delete(`${BASE_URL}/${id}`);
    },
    /**
     * Lấy plan cụ thể của user
     * @param {string} userId - UUID của user
     * @returns {Promise} SubscriptionPlan object
     */
    getByUser: async (userId) => {
        return apiClient.get(`${BASE_URL}/user/${userId}`);
    },
};
