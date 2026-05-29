import { apiClient } from './apiClient';

const BASE_URL = 'api/features';

/**
 * Service layer cho Dynamic Feature Management - Tuân thủ SRP và SOLID.
 * Thực hiện tích hợp trực tiếp với REST API Spring Boot Backend.
 */
export const featureService = {
    /**
     * Lấy danh sách tính năng có phân trang
     * @param {Object} params - { page, size, sort }
     * @returns {Promise} Spring Page response
     */
    getPaging: async ({ page = 0, size = 10, sort = 'createdAt,desc' } = {}) => {
        return apiClient.get(`${BASE_URL}/paging`, {
            params: { page, size, sort }
        });
    },

    /**
     * Lấy toàn bộ danh sách tính năng (bằng cách lấy một trang kích thước lớn)
     * Thường dùng để lấy danh mục checkbox trong các màn hình cấu hình.
     * @returns {Promise<Array>} List of Features
     */
    getAll: async () => {
        const response = await apiClient.get(`${BASE_URL}/paging`, {
            params: { page: 0, size: 1000, sort: 'key,asc' }
        });
        return response.content || [];
    },

    /**
     * Lấy chi tiết tính năng theo ID
     * @param {string} id - UUID của feature
     * @returns {Promise} FeatureResponse object
     */
    getById: async (id) => {
        return apiClient.get(`${BASE_URL}/${id}`);
    },

    /**
     * Tạo mới tính năng
     * @param {Object} featureData - Dữ liệu tính năng mới { key, label, description, isActive }
     * @returns {Promise} Feature Response đã tạo
     */
    create: async (featureData) => {
        return apiClient.post(BASE_URL, featureData);
    },

    /**
     * Cập nhật tính năng (Không cho phép sửa key để đảm bảo toàn vẹn dữ liệu)
     * @param {string} id - UUID của feature cần chỉnh sửa
     * @param {Object} featureData - Dữ liệu cần cập nhật { label, description, isActive }
     * @returns {Promise} Feature Response đã cập nhật
     */
    update: async (id, featureData) => {
        return apiClient.put(`${BASE_URL}/${id}`, featureData);
    },

    /**
     * Xoá tính năng (Yêu cầu Admin và không bị ràng buộc bởi plan nào)
     * @param {string} id - UUID của feature
     * @returns {Promise} Response không có nội dung (240 No Content)
     */
    delete: async (id) => {
        return apiClient.delete(`${BASE_URL}/${id}`);
    }
};
