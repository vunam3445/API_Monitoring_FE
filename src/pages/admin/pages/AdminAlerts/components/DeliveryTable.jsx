import React from 'react';

const DeliveryTable = ({ logs, loading, onSelectRow, onPageChange, filters }) => {
    const data = logs?.content || [];
    const totalPages = logs?.totalPages || 0;
    const currentPage = filters.page || 0;

    if (loading && data.length === 0) {
        return (
            <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Loading delivery logs...</p>
            </div>
        );
    }

    if (!loading && data.length === 0) {
        return (
            <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-slate-200 dark:text-slate-800 mb-4">search_off</span>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">No delivery logs found</p>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 uppercase text-[10px] font-black tracking-[0.15em] border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-5">Delivery ID</th>
                            <th className="px-6 py-5">Timestamp</th>
                            <th className="px-6 py-5">Target Context</th>
                            <th className="px-6 py-5">Channel</th>
                            <th className="px-6 py-5">Status</th>
                            <th className="px-6 py-5 text-right">Detail</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {data.map((row) => (
                            <tr 
                                key={row.id} 
                                onClick={() => onSelectRow?.(row)}
                                className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer ${row.status === 'FAILED' ? 'bg-red-50/10' : ''}`}
                            >
                                <td className="px-6 py-4 font-mono font-bold text-slate-500 dark:text-slate-400 text-xs tracking-tighter truncate max-w-[120px]">
                                    {row.id}
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">
                                    {new Date(row.timestamp).toLocaleDateString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>
                                <td className="px-6 py-4">
                                    <p className="font-black text-slate-900 dark:text-slate-200">{row.userName}</p>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">{row.monitorName}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold">
                                        <span className={`material-symbols-outlined text-[18px] ${row.channel === 'SLACK' ? 'text-[#4A154B]' : row.channel === 'EMAIL' ? 'text-blue-500' : 'text-purple-500'}`}>
                                            {row.channel === 'SLACK' ? 'forum' : row.channel === 'EMAIL' ? 'mail' : 'webhook'}
                                        </span>
                                        {row.channel}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                        row.status === 'SENT' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 border-emerald-200 dark:border-emerald-800' :
                                        row.status === 'FAILED' ? 'bg-red-100 dark:bg-red-900/20 text-red-600 border-red-200 dark:border-red-800' :
                                        'bg-amber-100 dark:bg-amber-900/20 text-amber-600 border-amber-200 dark:border-amber-800'
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'SENT' ? 'bg-emerald-500' : row.status === 'FAILED' ? 'bg-red-500' : 'bg-amber-500 animate-pulse'}`}></span>
                                        {row.status === 'SENT' ? 'Delivered' : row.status === 'FAILED' ? 'Failed' : 'Pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors group-hover:text-orange-500">
                                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-500">
                        Page <span className="text-slate-900 dark:text-white">{currentPage + 1}</span> of <span className="text-slate-900 dark:text-white">{totalPages}</span>
                    </p>
                    <div className="flex gap-2">
                        <button 
                            disabled={currentPage === 0}
                            onClick={() => onPageChange(currentPage - 1)}
                            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        <button 
                            disabled={currentPage >= totalPages - 1}
                            onClick={() => onPageChange(currentPage + 1)}
                            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliveryTable;
