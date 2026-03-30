import React, { useState } from 'react';

const Toolbar = ({ currentSort, onSortChange, currentFilter, onFilterChange, onSearch }) => {
    const [searchValue, setSearchValue] = useState('');
    // Computed value for select
    const sortValue = currentSort ? `${currentSort.field},${currentSort.direction}` : 'createdAt,desc';

    const handleSortChange = (e) => {
        const val = e.target.value;
        if (!val) return;
        const [field, direction] = val.split(',');
        if (field && direction && onSortChange) {
            onSortChange(field, direction);
        }
    };

    const handleFilterChange = (e) => {
        if (onFilterChange) {
            onFilterChange(e.target.value);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(searchValue);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px] relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                    placeholder="Search API name or endpoint..." type="text" />
            </div>
            <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Filter</label>
                <select
                    value={currentFilter || 'All'}
                    onChange={handleFilterChange}
                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2 focus:ring-2 focus:ring-primary/30 outline-none">
                    <option value="All">Status: All</option>
                    <option value="Healthy">Healthy</option>
                    <option value="Paused">Paused</option>
                    <option value="Down">Down</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Sort</label>
                <select
                    value={sortValue}
                    onChange={handleSortChange}
                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2 focus:ring-2 focus:ring-primary/30 outline-none">
                    <option value="createdAt,desc">Created At (Newest)</option>
                    <option value="createdAt,asc">Created At (Oldest)</option>
                    <option value="name,asc">Name (A-Z)</option>
                    <option value="name,desc">Name (Z-A)</option>
                    <option value="lastCheckAt,desc">Last Checked</option>
                    <option value="lastLatencyMs,desc">Highest Latency</option>
                    <option value="lastLatencyMs,asc">Lowest Latency</option>

                </select>
            </div>
        </div>
    );
};

export default Toolbar;
