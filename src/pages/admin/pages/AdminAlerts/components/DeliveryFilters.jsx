import React from 'react';

const DeliveryFilters = ({ filters, onFilterChange }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

    const handleApply = () => {
        onFilterChange({ ...filters, page: 0 }); // Reset to first page on apply
    };

    return (
        <div className="flex flex-wrap gap-4 items-end bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex-1 min-w-[240px]">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Search Logs</label>
                <div className="relative group">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm group-focus-within:text-orange-500 transition-colors">search</span>
                    <input 
                        name="search"
                        value={filters.search || ''}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-slate-400 shadow-sm" 
                        placeholder="Delivery ID, User, or Monitor name..." 
                        type="text" 
                    />
                </div>
            </div>
            <div className="w-48">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Channel</label>
                <select 
                    name="channel"
                    value={filters.channel || ''}
                    onChange={handleInputChange}
                    className="w-full py-3 pl-4 pr-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold focus:border-orange-500 outline-none appearance-none cursor-pointer shadow-sm text-slate-700 dark:text-slate-200"
                >
                    <option value="">All Channels</option>
                    <option value="SLACK">Slack Webhook</option>
                    <option value="EMAIL">Email (SMTP)</option>
                    <option value="WEBHOOK">Custom Webhook</option>
                    <option value="DISCORD">Discord</option>
                </select>
            </div>
            <div className="w-48">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Delivery Status</label>
                <select 
                    name="status"
                    value={filters.status || ''}
                    onChange={handleInputChange}
                    className="w-full py-3 pl-4 pr-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold focus:border-orange-500 outline-none appearance-none cursor-pointer shadow-sm text-slate-700 dark:text-slate-200"
                >
                    <option value="">All Statuses</option>
                    <option value="SENT">Delivered</option>
                    <option value="FAILED">Failed</option>
                    <option value="PENDING">Pending</option>
                </select>
            </div>
            <button 
                onClick={handleApply}
                className="px-8 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-black text-sm hover:shadow-lg transition-all active:scale-95 shadow-sm"
            >
                Apply
            </button>
        </div>
    );
};

export default DeliveryFilters;
