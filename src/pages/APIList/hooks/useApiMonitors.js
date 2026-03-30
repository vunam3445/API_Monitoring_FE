import { useState, useCallback, useMemo } from 'react';
import { apiEndpointService } from '../../../services/apiEndpointService';
import { apiClient, parseJwt } from '../../../services/apiClient';
import { useToast } from '../../../components/UI/Toast';
import { useConfirmDialog } from '../../../components/UI/ConfirmDialog/ConfirmDialog';

export const useApiMonitors = () => {
    const [apis, setApis] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
    });
    const [sortConfig, setSortConfig] = useState({ field: 'createdAt', direction: 'desc' });
    const [filterStatus, setFilterStatus] = useState('All');
    const [search, setSearch] = useState('');
    

    const { addToast } = useToast();
    const { confirm } = useConfirmDialog();

    // Dynamically decode userId from token
    const userId = useMemo(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = parseJwt(token);
            return decoded?.userId || null;
        }
        return null;
    }, []);

    // Fetch APIs safely
    const fetchApis = useCallback(async (
        pageIndex = pagination.page, 
        currentSort = sortConfig, 
        currentFilter = filterStatus,
        currentSearch = search
    ) => {
        if (!userId) {
            addToast('error', 'Authentication failed. Please login again.');
            return;
        }
        
        setLoading(true);
        try {
            const sortString = currentSort ? `${currentSort.field},${currentSort.direction}` : '';
            
            // Map UI filter to API params
            let isActive = null;
            let lastStatus = null;
            
            if (currentFilter === 'Paused') {
                isActive = false;
            } else if (currentFilter === 'Healthy') {
                lastStatus = 'Healthy';
                isActive = true; // Typically a healthy API must be active
            } else if (currentFilter === 'Down') {
                lastStatus = 'Down';
                isActive = true; // Typically a down API must be active
            }
            
            const response = await apiEndpointService.getApis(userId, pageIndex, pagination.size, sortString, isActive, lastStatus, currentSearch);
            
            // Map Spring Pageable structure
            if (response && response.content) {
                setApis(response.content);
                setPagination(prev => ({
                    ...prev,
                    page: response.number !== undefined ? response.number : pageIndex,
                    totalElements: response.totalElements || 0,
                    totalPages: response.totalPages || 0
                }));
            } else if (Array.isArray(response)) {
                // If it's pure array list
                setApis(response);
                setPagination(prev => ({
                    ...prev,
                    totalElements: response.length,
                    totalPages: 1
                }));
            } else if (response && response.data && Array.isArray(response.data.content)) {
                // Nested fallback format
                setApis(response.data.content);
                setPagination(prev => ({
                    ...prev,
                    page: response.data.number !== undefined ? response.data.number : pageIndex,
                    totalElements: response.data.totalElements || 0,
                    totalPages: response.data.totalPages || 0
                }));
            }
        } catch (error) {
            addToast('error', error.message || 'Failed to fetch API monitors');
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.size, sortConfig, filterStatus, search, addToast, userId]);

    // Handle pagination click
    const changePage = (newPage) => {
        if (newPage >= 0 && newPage < pagination.totalPages) {
            setPagination(prev => ({...prev, page: newPage}));
            fetchApis(newPage);
        }
    };

    // Handle sorting click
    const changeSort = (field, explicitDirection) => {
        setSortConfig(prev => {
            let nextDir = explicitDirection;
            if (!nextDir) {
                if (prev?.field === field) {
                    nextDir = prev.direction === 'asc' ? 'desc' : 'asc';
                } else {
                    nextDir = 'asc';
                }
            }
            const nextSort = { field, direction: nextDir };
            fetchApis(0, nextSort);
            return nextSort;
        });
    };

    // Handle filter click
    const changeFilter = (newStatus) => {
        setFilterStatus(newStatus);
        fetchApis(0, sortConfig, newStatus);
    };

    // Handle search click
    const changeSearch = (newSearch) => {
        setSearch(newSearch);
        fetchApis(0, sortConfig, filterStatus, newSearch);
    };

    // Mapping and creating API payload
    const createApi = async (formData) => {
        try {
            const payload = {
                name: formData.name,
                url: formData.url,
                method: formData.method,
                auth: formData.auth?.type !== 'none' ? formData.auth : null,
                headers: formData.headers?.filter(h => h.key && h.value) || [],
                queryParams: formData.queryParams?.filter(q => q.key && q.value) || [],
                body: formData.body,
                checkInterval: parseInt(formData.checkInterval, 10) || 60,
                isActive: formData.isActive ?? true,
                isMuted: formData.isMuted ?? false,
                expectedStatusCodes: formData.assertions.expectedStatus,
                maxResponseTimeMs: parseInt(formData.assertions.maxResponseTime, 10),
                userId: userId
            };
            
            await apiEndpointService.createApi(payload);
            addToast('success', 'API Monitor successfully created!');
            await fetchApis(0); // View the newest added item on page 1
            return true;
        } catch (error) {
            addToast('error', error.message || 'Failed to create API');
            throw error; // Throw error to block modal from closing
        }
    };

    const updateApi = async (id, formData) => {
        try {
             const payload = {
                name: formData.name,
                url: formData.url,
                method: formData.method,
                auth: formData.auth?.type !== 'none' ? formData.auth : null,
                headers: formData.headers?.filter(h => h.key && h.value) || [],
                queryParams: formData.queryParams?.filter(q => q.key && q.value) || [],
                body: formData.body,
                checkInterval: parseInt(formData.checkInterval, 10) || 60,
                isActive: formData.isActive ?? true,
                isMuted: formData.isMuted ?? false,
                expectedStatusCodes: formData.assertions.expectedStatus,
                maxResponseTimeMs: parseInt(formData.assertions.maxResponseTime, 10),
                userId: userId
            };
            
            await apiEndpointService.updateApi(id, payload);
            addToast('success', 'API Monitor successfully updated!');
            await fetchApis(pagination.page); // Stay on current page
            return true;
        } catch (error) {
            addToast('error', error.message || 'Failed to update API');
            throw error;
        }
    };

    // Delete single API
    const deleteApi = async (id) => {
        const isConfirmed = await confirm({
            title: 'Delete API Endpoint',
            message: 'Are you sure you want to permanently delete this API endpoint? This action cannot be undone.',
            confirmText: 'Delete',
            cancelText: 'Cancel',
            type: 'danger',
            icon: 'delete_forever'
        });

        if (isConfirmed) {
            try {
                await apiEndpointService.deleteApi(id);
                addToast('success', 'API deleted successfully');
                await fetchApis(pagination.page);
            } catch (error) {
                addToast('error', error.message || 'Error deleting API monitor');
            }
        }
    };

    // Toggle isActive status for a monitor
    const toggleActive = async (id, currentStatus) => {
        try {
            await apiEndpointService.toggleActive(id);
            // Optimistic update: update local state immediately
            setApis(prev => prev.map(api =>
                api.id === id ? { ...api, isActive: !currentStatus } : api
            ));
            addToast('success', `Monitor ${!currentStatus ? 'activated' : 'paused'} successfully`);
        } catch (error) {
            addToast('error', error.message || 'Failed to toggle monitor status');
            // Revert by re-fetching on error
            await fetchApis(pagination.page);
        }
    };

    return {
        apis,
        loading,
        pagination,
        sortConfig,
        filterStatus,
        search,
        fetchApis,
        changePage,
        changeSort,
        changeFilter,
        changeSearch,
        createApi,
        updateApi,
        deleteApi,
        toggleActive
    };
};
