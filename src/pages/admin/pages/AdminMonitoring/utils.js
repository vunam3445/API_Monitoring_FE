/**
 * Format date string to Vietnamese locale
 * @param {string} dateString 
 * @returns {string}
 */
export const formatDate = (dateString) => {
    if (!dateString) return '--';
    try {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (e) {
        return dateString;
    }
};

/**
 * Get status badge styles
 * @param {string} status 
 * @returns {Object}
 */
export const getStatusColor = (status) => {
    switch (status) {
        case 'HEALTHY':
        case 'UP':
            return 'emerald';
        case 'DOWN':
            return 'red';
        case 'WARNING':
            return 'amber';
        default:
            return 'slate';
    }
};
