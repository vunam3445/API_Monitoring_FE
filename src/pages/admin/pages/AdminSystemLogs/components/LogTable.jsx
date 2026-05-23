import React from 'react';

const LogTable = ({ 
    paginatedLogs, 
    filteredLogsLength, 
    currentPage, 
    setCurrentPage, 
    totalPages, 
    itemsPerPage, 
    setSelectedLog,
    formatTimestamp,
    getLevelBadgeClass,
    getMessageTextClass,
    getShortClassName
}) => {
    return (
        <div className="flex-1 w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                            <th className="px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Timestamp</th>
                            <th className="px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider w-[100px]">Level</th>
                            <th className="px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Component / Class</th>
                            <th className="px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Thread ID</th>
                            <th className="px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Message</th>
                            <th className="px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right w-[80px]">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {paginatedLogs.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-4 py-12 text-center text-slate-400 font-medium">
                                    <span className="material-symbols-outlined text-4xl block mb-2">find_in_page</span>
                                    Không tìm thấy dòng log nào khớp với bộ lọc.
                                </td>
                            </tr>
                        ) : (
                            paginatedLogs.map((log) => (
                                <tr 
                                    key={log.id} 
                                    onClick={() => setSelectedLog(log)}
                                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer ${
                                        log.isNew 
                                        ? 'bg-emerald-500/10 dark:bg-emerald-500/5 shadow-inner' 
                                        : log.level === 'FATAL' 
                                        ? 'bg-red-500/5 dark:bg-red-500/5' 
                                        : log.level === 'ERROR'
                                        ? 'bg-rose-50/50 dark:bg-rose-950/5'
                                        : ''
                                    }`}
                                >
                                    <td className="px-4 py-3 text-xs font-mono text-slate-400 whitespace-nowrap">
                                        {formatTimestamp(log.timestamp)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${getLevelBadgeClass(log.level)}`}>
                                            {log.level}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-xs font-mono text-slate-900 dark:text-white max-w-[200px] truncate" title={log.component}>
                                        {getShortClassName(log.component)}
                                    </td>
                                    <td className="px-4 py-3 text-xs font-mono text-slate-400 whitespace-nowrap">
                                        [{log.threadId}]
                                    </td>
                                    <td className={`px-4 py-3 text-xs font-mono truncate max-w-[300px] ${getMessageTextClass(log.level)}`}>
                                        {log.message}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button 
                                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedLog(log);
                                            }}
                                        >
                                            <span className="material-symbols-outlined text-lg leading-none">visibility</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Panel */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-950/20">
                <p className="text-xs text-slate-400">
                    Hiển thị {filteredLogsLength > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} đến {Math.min(currentPage * itemsPerPage, filteredLogsLength)} trong tổng số <span className="font-bold">{filteredLogsLength}</span> log tìm thấy.
                </p>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:text-primary disabled:opacity-30 dark:disabled:opacity-20 transition-all"
                    >
                        <span className="material-symbols-outlined text-sm leading-none">chevron_left</span>
                    </button>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center px-1">
                        Trang {currentPage} / {totalPages}
                    </span>
                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:text-primary disabled:opacity-30 dark:disabled:opacity-20 transition-all"
                    >
                        <span className="material-symbols-outlined text-sm leading-none">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogTable;
