import React, { useState, useEffect } from 'react';

const AlertsTableSection = ({ 
    alerts, 
    loading, 
    filters, 
    pagination, 
    acknowledge, 
    resolve, 
    remove,
    getDetail,
    exportData, 
    handleFilterChange, 
    handlePageChange 
}) => {
    const [localSearch, setLocalSearch] = useState(filters.search || '');

    useEffect(() => {
        setLocalSearch(filters.search || '');
    }, [filters.search]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (filters.search !== localSearch) {
                handleFilterChange({ search: localSearch });
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [localSearch, filters.search, handleFilterChange]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (filters.search !== localSearch) {
                handleFilterChange({ search: localSearch });
            }
        }
    };
    
    const getSeverityBadge = (severity) => {
        switch (severity) {
            case 'CRITICAL':
                return (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 w-max border border-red-200 dark:border-red-800/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        CRITICAL
                    </span>
                );
            case 'WARNING':
                return (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 w-max border border-amber-200 dark:border-amber-800/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        WARNING
                    </span>
                );
            case 'INFO':
                return (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 w-max border border-blue-200 dark:border-blue-800/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        INFO
                    </span>
                );
            default:
                return (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 w-max border border-slate-200 dark:border-slate-700">
                        {severity}
                    </span>
                );
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'ACTIVE':
                return <span className="px-2 py-0.5 rounded text-[10px] font-black border border-primary/30 text-primary bg-primary/5">ACTIVE</span>;
            case 'ACKNOWLEDGED':
                return <span className="px-2 py-0.5 rounded text-[10px] font-black border border-amber-500/30 text-amber-600 bg-amber-500/5">ACKNOWLEDGED</span>;
            case 'RESOLVED':
                return <span className="px-2 py-0.5 rounded text-[10px] font-black border border-emerald-500/30 text-emerald-600 bg-emerald-500/5">RESOLVED</span>;
            default:
                return <span className="px-2 py-0.5 rounded text-[10px] font-black border border-slate-300 text-slate-500">{status}</span>;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
            {/* Filters Area */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex flex-wrap gap-3 items-center flex-1">
                    <div className="relative flex-1 max-w-[300px]">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                        <input
                            className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="Search API or incident..." 
                            type="text" 
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    
                    <select 
                        className="text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                        value={filters.status}
                        onChange={(e) => handleFilterChange({ status: e.target.value })}
                    >
                        <option value="">All Statuses</option>
                        <option value="ACTIVE">Active</option>
                        <option value="ACKNOWLEDGED">Acknowledged</option>
                        <option value="RESOLVED">Resolved</option>
                    </select>

                    <select 
                        className="text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                        value={filters.severity}
                        onChange={(e) => handleFilterChange({ severity: e.target.value })}
                    >
                        <option value="">All Severities</option>
                        <option value="CRITICAL">Critical</option>
                        <option value="WARNING">Warning</option>
                        <option value="INFO">Info</option>
                    </select>
                </div>
                
                <button 
                    onClick={exportData}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary hover:border-primary px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm font-bold shadow-sm"
                >
                    <span className="material-symbols-outlined text-lg font-bold">download</span>
                    Export CSV
                </button>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto relative">
                {loading && (
                    <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading...</span>
                        </div>
                    </div>
                )}
                
                <table className="w-full text-left">
                    <thead className="bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-500 text-[10px] uppercase tracking-widest font-black">
                        <tr>
                            <th className="px-6 py-4">Time</th>
                            <th className="px-6 py-4">Monitor</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Severity</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Detail</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {!loading && alerts.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-12 text-center text-slate-500 font-medium">
                                    <div className="flex flex-col items-center gap-2 opacity-50">
                                        <span className="material-symbols-outlined text-4xl">notifications_off</span>
                                        <p>No alerts found matching your filters</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            alerts.map((alert) => (
                                <tr key={alert.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500 tracking-tight">
                                        {formatDate(alert.createdAt || alert.time)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                                {alert.monitorName || alert.apiName}
                                            </span>
                                            <span className="text-[11px] font-mono text-slate-400 truncate max-w-[150px]">
                                                {alert.endpoint}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[12px] font-bold text-slate-700 dark:text-slate-300">
                                        {alert.type?.replace(/_/g, ' ')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getSeverityBadge(alert.severity)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(alert.status)}
                                    </td>
                                    <td className="px-6 py-4 text-[12px] text-slate-600 dark:text-slate-400 max-w-xs font-medium">
                                        <div className="truncate" title={alert.message}>
                                            {alert.message}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => getDetail(alert.id)}
                                                className="p-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-all"
                                                title="Xem chi tiết"
                                            >
                                                <span className="material-symbols-outlined text-lg font-black">info</span>
                                            </button>
                                            {alert.status === 'ACTIVE' && (
                                                <button 
                                                    onClick={() => acknowledge(alert.id)}
                                                    className="p-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900/40 rounded-lg transition-all"
                                                    title="Xác nhận tiếp nhận"
                                                >
                                                    <span className="material-symbols-outlined text-lg">visibility</span>
                                                </button>
                                            )}
                                            {(alert.status === 'ACTIVE' || alert.status === 'ACKNOWLEDGED') && (
                                                <button 
                                                    onClick={() => resolve(alert.id)}
                                                    className="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-lg transition-all"
                                                    title="Giải quyết"
                                                >
                                                    <span className="material-symbols-outlined text-lg">check_circle</span>
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => remove(alert.id)}
                                                className="p-1.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                                title="Xóa vĩnh viễn"
                                            >
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Area */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm bg-slate-50/30 dark:bg-slate-900/30 backdrop-blur-sm">
                <span className="text-slate-500 font-medium">
                    Showing <span className="text-slate-900 dark:text-white font-bold">{alerts.length}</span> of <span className="text-slate-900 dark:text-white font-bold">{pagination.totalItems.toLocaleString()}</span> alerts
                </span>
                <div className="flex items-center gap-1.5">
                    <button 
                        disabled={pagination.page === 0}
                        onClick={() => handlePageChange(pagination.page - 1)}
                        className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary/50 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-xs flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                        Prev
                    </button>
                    
                    <div className="flex items-center gap-1">
                        {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                            // Simple pagination logic for 5 pages around current
                            let pageNum = i;
                            if (pagination.totalPages > 5) {
                                if (pagination.page > 2) pageNum = pagination.page - 2 + i;
                                if (pageNum >= pagination.totalPages) pageNum = pagination.totalPages - 5 + i;
                            }
                            if (pageNum < 0) return null;
                            
                            return (
                                <button 
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                                        pagination.page === pageNum 
                                            ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 hover:border-primary/50'
                                    }`}
                                >
                                    {pageNum + 1}
                                </button>
                            );
                        })}
                    </div>

                    <button 
                        disabled={pagination.page >= pagination.totalPages - 1}
                        onClick={() => handlePageChange(pagination.page + 1)}
                        className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary/50 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-xs flex items-center gap-1"
                    >
                        Next
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertsTableSection;
