import React, { useState, useEffect } from 'react';
import { useAdminUsers } from './hooks/useAdminUsers';

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

    const [activeMenuId, setActiveMenuId] = useState(null);

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

    const getStatusBadge = (status) => {
        switch (status) {
            case 'ACTIVE':
                return {
                    bg: 'bg-green-500',
                    text: 'text-green-600',
                    lightBg: 'bg-green-50'
                };
            case 'SUSPENDED':
                return {
                    bg: 'bg-red-500',
                    text: 'text-red-600',
                    lightBg: 'bg-red-50'
                };
            case 'PENDING':
                return {
                    bg: 'bg-orange-500',
                    text: 'text-orange-600',
                    lightBg: 'bg-orange-50'
                };
            default:
                return {
                    bg: 'bg-slate-500',
                    text: 'text-slate-600',
                    lightBg: 'bg-slate-50'
                };
        }
    };

    const getPlanBadge = (planType) => {
        switch (planType) {
            case 'PRO':
                return 'bg-orange-50 dark:bg-primary/10 text-primary';
            case 'ENTERPRISE':
                return 'bg-slate-900 dark:bg-slate-700 text-white';
            case 'FREE':
            default:
                return 'bg-slate-100 dark:bg-slate-800 text-slate-500';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '--';
        try {
            return new Date(dateString).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        } catch (e) {
            return dateString;
        }
    };

    return (
        <div className="p-8 space-y-8 max-w-[1400px] mx-auto w-full relative">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight">Quản lý người dùng</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Quản lý tất cả người dùng, gói đăng ký và quyền hạn trên hệ thống.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={refresh}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all disabled:opacity-50">
                        <span className={`material-symbols-outlined text-[18px] ${loading ? 'animate-spin' : ''}`}>refresh</span>
                        Làm mới
                    </button>
                    <button
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                        <span className="material-symbols-outlined text-[18px]">person_add</span>
                        Thêm người dùng
                    </button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 relative z-10">
                {/* Main Stats */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 -mr-8 -mt-8 rounded-full transition-transform group-hover:scale-150"></div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Tổng người dùng</span>
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-[20px]">groups</span>
                        </div>
                    </div>
                    {loadingStats ? (
                        <div className="h-8 w-20 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg"></div>
                    ) : (
                        <div className="text-3xl font-black text-slate-900 dark:text-white">{stats?.totalUser || 0}</div>
                    )}
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 -mr-8 -mt-8 rounded-full transition-transform group-hover:scale-150"></div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Hoạt động</span>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                        </div>
                    </div>
                    {loadingStats ? (
                        <div className="h-8 w-16 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg"></div>
                    ) : (
                        <div className="text-3xl font-black text-emerald-600">{stats?.totalActiveUser || 0}</div>
                    )}
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 -mr-8 -mt-8 rounded-full transition-transform group-hover:scale-150"></div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Đã chặn</span>
                        <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-[20px]">block</span>
                        </div>
                    </div>
                    {loadingStats ? (
                        <div className="h-8 w-12 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg"></div>
                    ) : (
                        <div className="text-3xl font-black text-rose-600">{stats?.totalBlockUser || 0}</div>
                    )}
                </div>

                {/* Plan Stats */}
                {stats?.planStatistics?.map((plan) => (
                    <div key={plan.planName} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative group">
                        <div className="absolute bottom-0 right-0 w-16 h-16 bg-slate-500/5 -mr-4 -mb-4 rounded-full"></div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Plan: {plan.planName}</span>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[14px] ${getPlanBadge(plan.planName)}`}>
                                <span className="material-symbols-outlined text-[16px]">
                                    {plan.planName === 'ENTERPRISE' ? 'corporate_fare' : plan.planName === 'PRO' ? 'star' : 'person'}
                                </span>
                            </div>
                        </div>
                        {loadingStats ? (
                            <div className="h-8 w-16 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg"></div>
                        ) : (
                            <div className="text-2xl font-black">{plan.totalUser}</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-wrap items-end gap-4 relative z-10">
                <div className="flex-1 min-w-[200px] space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">Tìm theo tên</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">person</span>
                        <input
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            placeholder="Tên đầy đủ..."
                            type="text"
                            value={localFilters.fullName}
                            onChange={(e) => setLocalFilters({ ...localFilters, fullName: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex-1 min-w-[200px] space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">Tìm theo Email</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">mail</span>
                        <input
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            placeholder="Email..."
                            type="email"
                            value={localFilters.email}
                            onChange={(e) => setLocalFilters({ ...localFilters, email: e.target.value })}
                        />
                    </div>
                </div>
                <div className="w-40 space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">Gói</label>
                    <select
                        className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                        value={localFilters.planType}
                        onChange={(e) => setLocalFilters({ ...localFilters, planType: e.target.value })}
                    >
                        <option value="">Tất cả các gói</option>
                        <option value="FREE">Free</option>
                        <option value="PRO">Pro</option>
                        <option value="ENTERPRISE">Enterprise</option>
                    </select>
                </div>
                <div className="w-32 space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">Quyền</label>
                    <select
                        className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                        value={localFilters.role}
                        onChange={(e) => setLocalFilters({ ...localFilters, role: e.target.value })}
                    >
                        <option value="">Tất cả</option>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                    </select>
                </div>
                <div className="w-40 space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">Trạng thái</label>
                    <select
                        className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                        value={localFilters.status}
                        onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value })}
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="ACTIVE">Hoạt động</option>
                        <option value="SUSPENDED">Đã khóa</option>
                        <option value="PENDING">Chờ duyệt</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleApplyFilters}
                        disabled={loading}
                        className="px-5 py-2.5 bg-slate-900 dark:bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50">Lọc</button>
                    <button
                        onClick={handleResetFilters}
                        disabled={loading}
                        className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all disabled:opacity-50">Đặt lại</button>
                </div>
            </div>

            {/* User Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative z-10">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">User ID</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tên & Email</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Gói</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Quyền</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Trạng thái</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Đăng nhập cuối</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Ngày tạo</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading && (
                                <tr>
                                    <td colSpan="8" className="px-6 py-10 text-center text-slate-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="material-symbols-outlined animate-spin text-3xl">refresh</span>
                                            <p className="font-bold">Đang tải dữ liệu...</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {!loading && users.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="px-6 py-10 text-center text-slate-400">
                                        <p className="font-bold">Không tìm thấy người dùng nào.</p>
                                    </td>
                                </tr>
                            )}
                            {!loading && users.map((user) => (
                                <tr key={user.id} onClick={(e) => {
                                    if (e.target.closest('button')) return;
                                    setSelectedUser(user);
                                }} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                                    <td className="px-6 py-4 text-[10px] font-mono text-slate-400 max-w-[100px] truncate">{user.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700">
                                                <img
                                                    alt="User Avatar"
                                                    className="w-full h-full object-cover"
                                                    src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random`}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">{user.fullName}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${getPlanBadge(user.planType)}`}>
                                            {user.planType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${getStatusBadge(user.status).bg}`}></span>
                                            <span className={`text-xs font-bold ${getStatusBadge(user.status).text}`}>{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500 font-medium">{formatDate(user.lastLoginAt)}</td>
                                    <td className="px-6 py-4 text-xs text-slate-500 font-medium">{formatDate(user.createdAt)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end user-action-menu relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveMenuId(activeMenuId === user.id ? null : user.id);
                                                }}
                                                className={`p-1.5 rounded-lg transition-all ${activeMenuId === user.id ? 'bg-slate-100 dark:bg-slate-800 text-primary' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                            >
                                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                            </button>

                                            {activeMenuId === user.id && (
                                                <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl z-[100] py-2 animate-in fade-in zoom-in duration-150">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedUser(user);
                                                            setActiveMenuId(null);
                                                        }}
                                                        className="w-full px-4 py-2 text-left text-sm font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                                                        Xem chi tiết
                                                    </button>

                                                    {user.status === 'ACTIVE' ? (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleBlockUser(user.id);
                                                                setActiveMenuId(null);
                                                            }}
                                                            className="w-full px-4 py-2 text-left text-sm font-bold flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">block</span>
                                                            Khóa tài khoản
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleActiveUser(user.id);
                                                                setActiveMenuId(null);
                                                            }}
                                                            className="w-full px-4 py-2 text-left text-sm font-bold flex items-center gap-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                                            Kích hoạt tài khoản
                                                        </button>
                                                    )}

                                                    <div className="my-1 border-t border-slate-100 dark:border-slate-800"></div>

                                                    <button
                                                        className="w-full px-4 py-2 text-left text-sm font-bold flex items-center gap-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                                        Chỉnh sửa
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination.totalElements > 0 && (
                    <div className="px-6 py-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <p className="text-[13px] font-bold text-slate-500">
                                <span className="text-slate-900 dark:text-white">{pagination.page * pagination.size + 1}</span>
                                <span className="mx-1">-</span>
                                <span className="text-slate-900 dark:text-white">{Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)}</span>
                                <span className="mx-1">/</span>
                                <span className="text-primary">{pagination.totalElements}</span> người dùng
                            </p>
                            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter hidden sm:block">
                                Trang {pagination.page + 1} / {pagination.totalPages}
                            </p>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button
                                disabled={pagination.page === 0 || loading}
                                onClick={() => handlePageChange(pagination.page - 1)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-800 hover:text-primary hover:border-primary/30 transition-all shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                            </button>

                            <div className="flex items-center gap-1 mx-1">
                                {[...Array(pagination.totalPages)].map((_, i) => (
                                    (i === 0 || i === pagination.totalPages - 1 || (i >= pagination.page - 1 && i <= pagination.page + 1)) ? (
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(i)}
                                            disabled={loading}
                                            className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all ${pagination.page === i
                                                ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-primary transition-all'} disabled:opacity-50`}
                                        >
                                            {i + 1}
                                        </button>
                                    ) : (
                                        (i === 1 || i === pagination.totalPages - 2) ? (
                                            <span key={i} className="w-8 text-center text-slate-400 font-bold text-xs">...</span>
                                        ) : null
                                    )
                                ))}
                            </div>

                            <button
                                disabled={pagination.last || pagination.page === pagination.totalPages - 1 || loading}
                                onClick={() => handlePageChange(pagination.page + 1)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-800 hover:text-primary hover:border-primary/30 transition-all shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Slide-out Side Panel for User Details */}
            {selectedUser && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-slate-900/20 dark:bg-slate-900/50 backdrop-blur-sm z-40" onClick={() => setSelectedUser(null)}></div>
                    {/* Sidebar Model */}
                    <div className="fixed inset-y-0 right-0 w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 transform transition-transform translate-x-0 animate-in slide-in-from-right duration-300">
                        <div className="h-full flex flex-col">
                            {/* Panel Header */}
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <h3 className="font-bold text-lg">Chi tiết người dùng</h3>
                                <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {/* Panel Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                {/* Profile Section */}
                                <div className="text-center">
                                    <div className="w-24 h-24 rounded-3xl mx-auto overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4 ring-4 ring-primary/10 border border-slate-200 dark:border-slate-700">
                                        <img
                                            alt="Large User Avatar"
                                            className="w-full h-full object-cover"
                                            src={selectedUser.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.fullName)}&background=random`}
                                        />
                                    </div>
                                    <h4 className="text-xl font-black">{selectedUser.fullName}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{selectedUser.email}</p>
                                    <div className="mt-4 flex items-center justify-center gap-2">
                                        <span className={`px-3 py-1 ${getPlanBadge(selectedUser.planType)} text-[10px] font-black rounded-full uppercase`}>
                                            Gói {selectedUser.planType}
                                        </span>
                                        <span className={`px-3 py-1 ${getStatusBadge(selectedUser.status).lightBg} ${getStatusBadge(selectedUser.status).text} text-[10px] font-black rounded-full uppercase tracking-tighter`}>
                                            {selectedUser.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Information Section */}
                                <div className="space-y-4">
                                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest">Thông tin tài khoản</h5>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex justify-between items-center">
                                            <p className="text-xs font-bold text-slate-500">ID người dùng</p>
                                            <p className="text-xs font-mono font-bold text-slate-400">{selectedUser.id}</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex justify-between items-center">
                                            <p className="text-xs font-bold text-slate-500">Công ty</p>
                                            <p className="text-xs font-bold">{selectedUser.company || 'N/A'}</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex justify-between items-center">
                                            <p className="text-xs font-bold text-slate-500">Ngày gia nhập</p>
                                            <p className="text-xs font-bold">{formatDate(selectedUser.createdAt)}</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex justify-between items-center">
                                            <p className="text-xs font-bold text-slate-500">Đăng nhập cuối</p>
                                            <p className="text-xs font-bold">{formatDate(selectedUser.lastLoginAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Panel Footer */}
                            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 grid grid-cols-2 gap-3">
                                {selectedUser.status === 'ACTIVE' ? (
                                    <button
                                        onClick={() => handleBlockUser(selectedUser.id)}
                                        className="px-4 py-3 bg-white dark:bg-slate-800 border border-red-200 text-red-600 rounded-xl font-bold text-sm hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">block</span>
                                        Khóa User
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleActiveUser(selectedUser.id)}
                                        className="px-4 py-3 bg-white dark:bg-slate-800 border border-green-200 text-green-600 rounded-xl font-bold text-sm hover:bg-green-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                        Kích hoạt
                                    </button>
                                )}
                                <button className="px-4 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                                    Sửa thông tin
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminUsers;
