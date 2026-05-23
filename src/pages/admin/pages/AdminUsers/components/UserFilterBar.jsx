import React from 'react';

const UserFilterBar = ({ localFilters, setLocalFilters, handleApplyFilters, handleResetFilters, loading }) => {
    return (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-wrap items-end gap-4 relative z-10">
            <div className="flex-1 min-w-[200px] space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">Tìm theo tên</label>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">person</span>
                    <input
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
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
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        placeholder="Email..."
                        type="email"
                        value={localFilters.email}
                        onChange={(e) => setLocalFilters({ ...localFilters, email: e.target.value })}
                    />
                </div>
            </div>
            <div className="w-36 space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">Gói</label>
                <select
                    className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                    value={localFilters.planType}
                    onChange={(e) => setLocalFilters({ ...localFilters, planType: e.target.value })}
                >
                    <option value="">Tất cả</option>
                    <option value="FREE">Free</option>
                    <option value="PRO">Pro</option>
                    <option value="ENTERPRISE">Enterprise</option>
                </select>
            </div>
            <div className="w-36 space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">Quyền</label>
                <select
                    className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                    value={localFilters.role}
                    onChange={(e) => setLocalFilters({ ...localFilters, role: e.target.value })}
                >
                    <option value="">Tất cả</option>
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                </select>
            </div>
            <div className="w-36 space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">Trạng thái</label>
                <select
                    className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                    value={localFilters.status}
                    onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value })}
                >
                    <option value="">Tất cả</option>
                    <option value="ACTIVE">Hoạt động</option>
                    <option value="SUSPENDED">Đã khóa</option>
                    <option value="PENDING">Chờ duyệt</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={handleApplyFilters}
                    disabled={loading}
                    className="px-6 py-2.5 bg-slate-900 dark:bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 shadow-md">
                    Lọc
                </button>
                <button
                    onClick={handleResetFilters}
                    disabled={loading}
                    className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all disabled:opacity-50 shadow-sm">
                    Đặt lại
                </button>
            </div>
        </div>
    );
};

export default UserFilterBar;
