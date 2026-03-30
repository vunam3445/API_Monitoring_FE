import React from 'react';

const APITable = ({ apis = [], loading = false, pagination = {}, sortConfig = {}, onPageChange, onSort, onDelete, onEdit, onView, onToggleActive }) => {

    // Fallback status text/colors based on boolean or textual logic from BE
    const getStatusInfo = (status) => {
        switch (status?.toLowerCase()) {
            case 'healthy':
            case 'up':
                return { label: 'Healthy', bgClass: 'bg-emerald-100 dark:bg-emerald-900/20', textClass: 'text-emerald-600 dark:text-emerald-400', dotClass: 'bg-emerald-500 ring-emerald-500/10' };
            case 'warning':
                return { label: 'Warning', bgClass: 'bg-amber-100 dark:bg-amber-900/20', textClass: 'text-amber-600 dark:text-amber-400', dotClass: 'bg-amber-500 ring-amber-500/10' };
            case 'down':
            case 'error':
                return { label: 'Down', bgClass: 'bg-red-100 dark:bg-red-900/20', textClass: 'text-red-600 dark:text-red-400', dotClass: 'bg-red-500 ring-red-500/10 animate-pulse' };
            case 'paused':
                return { label: 'Paused', bgClass: 'bg-slate-200 dark:bg-slate-700/50', textClass: 'text-slate-500 dark:text-slate-400', dotClass: 'bg-slate-300 ring-slate-300/10' };
            default:
                return { label: 'Unknown', bgClass: 'bg-slate-100 dark:bg-slate-800/80', textClass: 'text-slate-600 dark:text-slate-400', dotClass: 'bg-slate-400 ring-slate-400/10' };
        }
    };

    const mapToStandardStatus = (item) => {
        if (!item.isActive) return 'paused'; // Optional status
        if (item.lastStatus === null || item.lastStatus === undefined) return 'unknown'; // TBD

        const statusString = String(item.lastStatus).toLowerCase();
        if (statusString === 'true' || statusString === 'up' || statusString === 'healthy') return 'healthy';
        if (statusString === 'false' || statusString === 'down' || statusString === 'error') return 'down';

        return 'unknown';
    };

    // Style mapping for Http Methods
    const getMethodStyle = (method) => {
        switch (method?.toUpperCase()) {
            case 'GET': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
            case 'POST': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800';
            case 'PUT': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800';
            case 'DELETE': return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800';
            default: return 'bg-slate-100 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800';
        }
    };

    // Calculate smart array pagination digits [...]
    const generatePageArray = () => {
        const { page = 0, totalPages = 1 } = pagination || {};
        if (totalPages <= 1) return [0];

        let pages = [];
        for (let i = 0; i < totalPages; i++) {
            if (i === 0 || i === totalPages - 1 || Math.abs(i - page) <= 1) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...');
            }
        }
        return pages;
    };

    const renderSortableHeader = (label, field, align = 'left') => {
        const isSorted = sortConfig?.field === field;
        const alignClass = align === 'center' ? 'justify-center text-center' : align === 'right' ? 'justify-end text-right' : 'justify-start text-left';
        
        return (
            <th 
                className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors select-none group`}
                onClick={() => onSort && onSort(field)}
            >
                <div className={`flex items-center gap-1 ${alignClass}`}>
                    {label}
                    <span className={`material-symbols-outlined text-[14px] transition-transform ${isSorted ? 'text-primary' : 'text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100'} ${isSorted && sortConfig?.direction === 'desc' ? 'rotate-180' : ''}`}>
                        arrow_upward
                    </span>
                </div>
            </th>
        );
    };

    const emptyArrayFallback = !apis || apis.length === 0;
    const pageObj = pagination || { page: 0, totalPages: 1, totalElements: 0, size: 10 };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm relative min-h-[400px]">

            {/* Loading Overlay Blanket */}
            {loading && (
                <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
                    <span className="material-symbols-outlined xl animate-spin text-4xl text-primary">progress_activity</span>
                </div>
            )}

            <div className="w-full overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            {renderSortableHeader('API Name', 'name')}
                            {renderSortableHeader('Method & Endpoint', 'method')}
                            {renderSortableHeader('Active', 'isActive', 'center')}
                            {renderSortableHeader('Status', 'lastStatus', 'center')}
                            {renderSortableHeader('Latency', 'lastLatencyMs')}
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 relative min-h-[150px]">
                        {emptyArrayFallback && !loading ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-16 text-center text-slate-500 dark:text-slate-400 border-none relative z-0">
                                    <span className="material-symbols-outlined text-6xl mb-4 opacity-50 block">api</span>
                                    <p className="text-lg">No endpoints registered in API Monitoring.</p>
                                    <p className="text-sm mt-1">Click the "Add API" button above to register your first endpoint.</p>
                                </td>
                            </tr>
                        ) : (
                            (apis || []).map((item) => {
                                const statusInfo = getStatusInfo(mapToStandardStatus(item));
                                const latency = item.lastLatencyMs || 0;
                                const uptimePct = typeof item.uptimePercentage === 'number' ? item.uptimePercentage : 0;

                                return (
                                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`size-2.5 rounded-full ring-4 ${statusInfo.dotClass}`}></div>
                                                <span className="font-bold text-slate-900 dark:text-slate-100 truncate max-w-[200px]" title={item.name}>
                                                    {item.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter border ${getMethodStyle(item.method)}`}>
                                                    {item.method || 'GET'}
                                                </span>
                                                <span className="text-sm font-mono text-slate-500 dark:text-slate-400 truncate max-w-[250px]" title={item.url}>
                                                    {item.url}
                                                </span>
                                            </div>
                                        </td>
                                        {/* Active Toggle */}
                                        <td className="px-6 py-5 text-center">
                                            <button
                                                type="button"
                                                role="switch"
                                                aria-checked={item.isActive}
                                                onClick={() => onToggleActive && onToggleActive(item.id, item.isActive)}
                                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${item.isActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                                                    }`}
                                                title={item.isActive ? 'Click to pause monitor' : 'Click to activate monitor'}
                                            >
                                                <span
                                                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${item.isActive ? 'translate-x-[18px]' : 'translate-x-[3px]'
                                                        }`}
                                                />
                                            </button>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusInfo.bgClass} ${statusInfo.textClass}`}>
                                                {statusInfo.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <span className={`text-sm font-semibold ${item.maxResponseTimeMs && latency > item.maxResponseTimeMs ? 'text-red-500' : ''}`}>
                                                    {latency > 0 ? `${latency}ms` : '--'}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 text-right whitespace-nowrap">
                                            <div className="flex justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => onView && onView(item)}
                                                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"
                                                    title="View Details"
                                                >
                                                    <span className="material-symbols-outlined text-sm">visibility</span>
                                                </button>
                                                <button
                                                    onClick={() => onEdit && onEdit(item)}
                                                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"
                                                    title="Edit Properties"
                                                >
                                                    <span className="material-symbols-outlined text-sm">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => onDelete && onDelete(item.id)}
                                                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-500 transition-colors group/del"
                                                    title="Delete API Endpoint"
                                                >
                                                    <span className="material-symbols-outlined text-sm group-hover/del:scale-110 transition-transform">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Layer bottom */}
            {pageObj.totalPages > 1 && (
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-500">
                        Showing <span className="text-slate-900 dark:text-slate-200">{pageObj.page * pageObj.size + 1}-{Math.min((pageObj.page + 1) * pageObj.size, pageObj.totalElements)}</span> of <span className="text-slate-900 dark:text-slate-200">{pageObj.totalElements}</span> APIs
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onPageChange(pageObj.page - 1)}
                            disabled={pageObj.page === 0}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors disabled:opacity-50 disabled:hover:text-slate-400"
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>

                        <div className="flex items-center gap-1">
                            {generatePageArray().map((pId, idx) => (
                                pId === '...' ? (
                                    <span key={`dots-${idx}`} className="px-1 text-slate-400">...</span>
                                ) : (
                                    <button
                                        key={pId}
                                        onClick={() => onPageChange(pId)}
                                        className={`size-8 rounded-lg text-xs font-bold transition-colors ${pId === pageObj.page
                                                ? 'bg-primary text-white'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                            }`}
                                    >
                                        {pId + 1}
                                    </button>
                                )
                            ))}
                        </div>

                        <button
                            onClick={() => onPageChange(pageObj.page + 1)}
                            disabled={pageObj.page >= pageObj.totalPages - 1}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors disabled:opacity-50 disabled:hover:text-slate-400"
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default APITable;
