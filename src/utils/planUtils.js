/**
 * Utility functions dùng chung cho các components trong AdminPricingPlans
 * Tuân thủ SRP: tách logic xử lý dữ liệu ra khỏi component
 */

/**
 * Parse features JSON string từ backend thành object
 * @param {string|object} featuresStr - JSON string hoặc object features
 * @returns {object} Features object
 */
export const parseFeatures = (featuresStr) => {
    if (!featuresStr) return {};
    try {
        return typeof featuresStr === 'string' ? JSON.parse(featuresStr) : featuresStr;
    } catch {
        return {};
    }
};

/**
 * Lấy label interval từ giá trị số (giây)
 * @param {number} seconds - Số giây
 * @returns {string} Label dạng "30s", "5m", "1h"
 */
export const getIntervalLabel = (seconds) => {
    if (!seconds) return '--';
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    return `${Math.floor(seconds / 3600)}h`;
};
