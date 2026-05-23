import React from 'react';
import MonitorTableRow from './MonitorTableRow';

const MonitorTable = ({ monitors, pagination, onPageChange, selectedMonitor, onSelectMonitor, onToggleActive, onDeleteMonitor }) => {
    // Logic to generate page numbers with dots for large sets
    const generatePageArray = () => {
        const { page = 0, totalPages = 1 } = pagination || {};
        if (totalPages <= 7) return [...Array(totalPages).keys()];

        let pages = [];
        // Always show first page
        pages.push(0);

        if (page > 3) {
            pages.push('...');
        }

        // Show pages around current page
        const start = Math.max(1, page - 1);
        const end = Math.min(totalPages - 2, page + 1);

        for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) pages.push(i);
        }

        if (page < totalPages - 4) {
            pages.push('...');
        }

        // Always show last page
        if (totalPages > 1 && !pages.includes(totalPages - 1)) {
            pages.push(totalPages - 1);
        }

        return pages;
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/80 dark:bg-slate-800/50 text-slate-500 uppercase text-[10px] font-bold tracking-widest border-b border-slate-200 dark:border-slate-800">
                            <th className="px-6 py-4">Monitor Name</th>
                            <th className="px-6 py-4">Endpoint</th>
                            <th className="px-6 py-4">Owner</th>
                            <th className="px-6 py-4">Last Status</th>
                            <th className="px-6 py-4">Latency</th>
                            <th className="px-6 py-4">Uptime</th>
                            <th className="px-6 py-4">Activity</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                        {monitors.length > 0 ? (
                            monitors.map((monitor) => (
                                <MonitorTableRow
                                    key={monitor.id}
                                    monitor={monitor}
                                    isSelected={selectedMonitor?.id === monitor.id}
                                    onClick={onSelectMonitor}
                                    onToggleActive={onToggleActive}
                                    onDelete={onDeleteMonitor}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center justify-center text-slate-400">
                                        <span className="material-symbols-outlined text-5xl mb-2 opacity-20">search_off</span>
                                        <p className="text-sm font-medium">No monitors found matching your filters.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Layer */}
            <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs font-semibold text-slate-500 order-2 sm:order-1">
                    Showing <span className="text-slate-900 dark:text-slate-200">{pagination.page * pagination.size + 1}-{Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)}</span> of <span className="text-slate-900 dark:text-slate-200">{pagination.totalElements}</span> monitors
                </p>

                {pagination.totalPages > 1 && (
                    <div className="flex items-center gap-1.5 order-1 sm:order-2">
                        <button
                            onClick={() => onPageChange(pagination.page - 1)}
                            disabled={pagination.page === 0}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:text-orange-500 transition-all disabled:opacity-30 disabled:hover:text-slate-400 active:scale-90"
                        >
                            <span className="material-symbols-outlined text-lg">chevron_left</span>
                        </button>

                        <div className="flex items-center gap-1">
                            {generatePageArray().map((pId, idx) => (
                                pId === '...' ? (
                                    <span key={`dots-${idx}`} className="px-1 text-slate-400 text-xs font-bold">...</span>
                                ) : (
                                    <button
                                        key={pId}
                                        onClick={() => onPageChange(pId)}
                                        className={`size-8 rounded-lg text-xs font-black transition-all active:scale-90 ${pId === pagination.page
                                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent'
                                            }`}
                                    >
                                        {pId + 1}
                                    </button>
                                )
                            ))}
                        </div>

                        <button
                            onClick={() => onPageChange(pagination.page + 1)}
                            disabled={pagination.page >= pagination.totalPages - 1}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-orange-500 transition-all disabled:opacity-30 disabled:hover:text-slate-400 active:scale-90"
                        >
                            <span className="material-symbols-outlined text-lg">chevron_right</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MonitorTable;
