import React from 'react';

/**
 * StatusBadge - Badge hiển thị trạng thái Active/Inactive
 * Component nhỏ, tái sử dụng được ở nhiều nơi (table row, detail panel)
 */
const StatusBadge = ({ isActive }) => (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
        isActive
            ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
    }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
        {isActive ? 'Active' : 'Inactive'}
    </span>
);

export default StatusBadge;
