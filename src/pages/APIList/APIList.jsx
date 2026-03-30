import React, { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import APITable from './components/APITable';
import FooterStats from './components/FooterStats';
import AddAPIModal from './components/AddAPIModal';
import ApiDetailModal from './components/ApiDetailModal';
import { useApiMonitors } from './hooks/useApiMonitors';

const APIList = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingApi, setEditingApi] = useState(null); // Trạng thái dùng để edit
    const [viewingApi, setViewingApi] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // Custom Hook Data Manager
    const {
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
    } = useApiMonitors();

    // Lifecycle Fetch on first mount
    useEffect(() => {
        fetchApis(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenAddModal = () => {
        setEditingApi(null);
        setIsAddModalOpen(true);
    };

    const handleEditApi = (apiData) => {
        setEditingApi(apiData);
        setIsAddModalOpen(true);
    };

    const handleViewApi = (apiData) => {
        setViewingApi(apiData);
        setIsViewModalOpen(true);
    };

    // Handlers
    const handleSaveApi = async (formData) => {
        try {
            if (editingApi) {
                await updateApi(editingApi.id, formData);
            } else {
                await createApi(formData);
            }
            // Modal closes ONLY when Promise resolves success!
            setIsAddModalOpen(false);
        } catch (error) {
            // Unhandled errors will be automatically notified via Toast in Hook
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            {/* Page Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">API List</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and monitor all registered API endpoints in real-time.</p>
                </div>
                <button
                    onClick={handleOpenAddModal}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined">add</span>
                    Add API
                </button>
            </div>

            <Toolbar
                currentSort={sortConfig}
                onSortChange={changeSort}
                currentFilter={filterStatus}
                onFilterChange={changeFilter}
                onSearch={changeSearch}
            />

            {/* List View Container */}
            <APITable
                apis={apis}
                loading={loading}
                pagination={pagination}
                sortConfig={sortConfig}
                onPageChange={changePage}
                onSort={changeSort}
                onDelete={deleteApi}
                onEdit={handleEditApi}
                onView={handleViewApi}
                onToggleActive={toggleActive}
            />

            <FooterStats count={pagination.totalElements || apis.length} />

            {/* Forms Layer */}
            <AddAPIModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveApi}
                initialData={editingApi}
            />

            <ApiDetailModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                apiData={viewingApi}
            />
        </div>
    );
};

export default APIList;
