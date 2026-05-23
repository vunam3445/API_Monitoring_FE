import React, { useState, useEffect } from 'react';

const MonitorFilters = ({ filters, onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState(filters.search);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onFilterChange({ search: searchTerm });
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4 shadow-sm">
            <div className="flex-1 min-w-[240px] relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl pl-10 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/50"
                    placeholder="Search monitor name, URL..."
                />
            </div>

            <select
                value={filters.lastStatus}
                onChange={(e) => onFilterChange({ lastStatus: e.target.value })}
                className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/50"
            >
                <option value="">All Statuses</option>
                <option value="HEALTHY">Healthy (UP)</option>
                <option value="WARNING">Degraded (WARNING)</option>
                <option value="DOWN">Down (DOWN)</option>
            </select>

            <select
                value={filters.isActive === null ? '' : filters.isActive}
                onChange={(e) => onFilterChange({ isActive: e.target.value === '' ? null : e.target.value === 'true' })}
                className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/50"
            >
                <option value="">All Activity</option>
                <option value="true">Running</option>
                <option value="false">Paused</option>
            </select>
        </div>
    );
};

export default MonitorFilters;
