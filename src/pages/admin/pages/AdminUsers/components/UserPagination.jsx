import React from 'react';

const UserPagination = ({ pagination, loading, handlePageChange }) => {
    if (pagination.totalElements === 0) return null;

    return (
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
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-800 hover:text-primary hover:border-primary/30 transition-all shadow-sm"
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
                                className={`w-9 h-9 flex items-center justify-center rounded-xl font-bold text-sm transition-all ${pagination.page === i
                                    ? 'bg-primary text-white shadow-md shadow-primary/30 scale-105'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-primary transition-all'} disabled:opacity-50`}
                            >
                                {i + 1}
                            </button>
                        ) : (
                            (i === 1 || i === pagination.totalPages - 2) ? (
                                <span key={i} className="w-6 text-center text-slate-400 font-bold text-xs">...</span>
                            ) : null
                        )
                    ))}
                </div>

                <button
                    disabled={pagination.last || pagination.page === pagination.totalPages - 1 || loading}
                    onClick={() => handlePageChange(pagination.page + 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-800 hover:text-primary hover:border-primary/30 transition-all shadow-sm"
                >
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
            </div>
        </div>
    );
};

export default UserPagination;
