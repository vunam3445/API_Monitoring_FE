import { useState, useCallback, useEffect } from 'react';
import { paymentLogService } from '../../../services/paymentLogService';

/**
 * Custom hook to manage payment logs state and fetching logic
 * @param {number} initialPage - Starting page (0-indexed)
 * @param {number} initialSize - Page size
 * @returns {Object} { logs, loading, error, pagination, refresh, fetchDetails }
 */
const usePaymentLogs = (initialPage = 0, initialSize = 10) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        pageNumber: initialPage,
        pageSize: initialSize,
        totalPages: 0,
        totalElements: 0,
        isLast: true,
        isFirst: true
    });

    const fetchLogs = useCallback(async (page = 0, size = 10) => {
        setLoading(true);
        setError(null);
        try {
            const data = await paymentLogService.getPaymentLogs(page, size);
            
            // Handle Spring Pageable structure
            // If data is just a list or in content field
            setLogs(data.content || []);
            setPagination({
                pageNumber: data.number,
                pageSize: data.size,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                isLast: data.last,
                isFirst: data.first
            });
        } catch (err) {
            setError(err.message || 'Failed to fetch payment history');
            console.error('Error fetching billing history:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchDetails = async (id) => {
        try {
            return await paymentLogService.getPaymentLogByDetails(id);
        } catch (err) {
            console.error(`Error fetching payment log details for ID ${id}:`, err);
            throw err;
        }
    };

    const refresh = useCallback(() => {
        fetchLogs(pagination.pageNumber, pagination.pageSize);
    }, [fetchLogs, pagination.pageNumber, pagination.pageSize]);

    const setPage = useCallback((newPage) => {
        if (newPage >= 0 && newPage < pagination.totalPages) {
            fetchLogs(newPage, pagination.pageSize);
        }
    }, [fetchLogs, pagination.totalPages, pagination.pageSize]);

    const setSize = useCallback((newSize) => {
        fetchLogs(0, newSize);
    }, [fetchLogs]);

    // Initial fetch
    useEffect(() => {
        fetchLogs(initialPage, initialSize);
    }, [fetchLogs, initialPage, initialSize]);

    return {
        logs,
        loading,
        error,
        pagination,
        refresh,
        setPage,
        setSize,
        fetchDetails
    };
};

export default usePaymentLogs;
