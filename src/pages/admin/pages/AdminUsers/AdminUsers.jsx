import React, { useState, useEffect } from 'react';
import { useAdminUsers } from './hooks/useAdminUsers';
import UserStatsCards from './components/UserStatsCards';
import UserFilterBar from './components/UserFilterBar';
import UserTable from './components/UserTable';
import UserPagination from './components/UserPagination';
import UserDetails from './components/UserDetails';

const AdminUsers = () => {
    const {
        users,
        loading,
        stats,
        loadingStats,
        pagination,
        filters,
        handleBlockUser,
        handleActiveUser,
        handlePageChange,
        handleFilterChange,
        refresh
    } = useAdminUsers();

    const [selectedUser, setSelectedUser] = useState(null);
    const [activeMenuId, setActiveMenuId] = useState(null);

    // Local filter state for inputs
    const [localFilters, setLocalFilters] = useState({
        fullName: '',
        email: '',
        planType: '',
        status: '',
        role: ''
    });

    // Update local filters when global filters change (e.g. on reset)
    useEffect(() => {
        setLocalFilters({
            fullName: filters.fullName || '',
            email: filters.email || '',
            planType: filters.planType || '',
            status: filters.status || '',
            role: filters.role || ''
        });
    }, [filters]);

    const handleApplyFilters = () => {
        handleFilterChange(localFilters);
    };

    const handleResetFilters = () => {
        const reseted = {
            fullName: '',
            email: '',
            planType: '',
            status: '',
            role: ''
        };
        setLocalFilters(reseted);
        handleFilterChange(reseted);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeMenuId && !event.target.closest('.user-action-menu')) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeMenuId]);

    return (
        <div className="p-8 space-y-8 max-w-[1400px] mx-auto w-full relative">
            {selectedUser ? (
                <UserDetails
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    handleBlockUser={handleBlockUser}
                    handleActiveUser={handleActiveUser}
                />
            ) : (
                <>
                    {/* Page Heading */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Quản lý người dùng</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium text-sm">
                                Quản lý tất cả người dùng, gói đăng ký và quyền hạn trên hệ thống.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={refresh}
                                disabled={loading}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all disabled:opacity-50">
                                <span className={`material-symbols-outlined text-[18px] ${loading ? 'animate-spin' : ''}`}>refresh</span>
                                Làm mới
                            </button>
                            {/* <button
                                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-md shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
                                <span className="material-symbols-outlined text-[18px]">person_add</span>
                                Thêm User
                            </button> */}
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <UserStatsCards stats={stats} loadingStats={loadingStats} />

                    {/* Filter Bar */}
                    <UserFilterBar
                        localFilters={localFilters}
                        setLocalFilters={setLocalFilters}
                        handleApplyFilters={handleApplyFilters}
                        handleResetFilters={handleResetFilters}
                        loading={loading}
                    />

                    {/* User Table and Pagination wrapper */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative z-10">
                        <UserTable
                            users={users}
                            loading={loading}
                            activeMenuId={activeMenuId}
                            setActiveMenuId={setActiveMenuId}
                            setSelectedUser={setSelectedUser}
                            handleBlockUser={handleBlockUser}
                            handleActiveUser={handleActiveUser}
                        />

                        <UserPagination
                            pagination={pagination}
                            loading={loading}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminUsers;
