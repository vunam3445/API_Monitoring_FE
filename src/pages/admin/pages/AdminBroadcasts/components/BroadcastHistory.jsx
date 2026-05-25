import React from 'react';

const getLevelBadge = (level) => {
    switch (level) {
        case 'SYSTEM':
            return 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900/50';
        case 'WARNING':
            return 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-100 dark:border-amber-900/50';
        case 'INFO':
        default:
            return 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900/50';
    }
};

const getTargetBadge = (type, value) => {
    switch (type) {
        case 'ALL':
            return (
                <span className="flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    <span className="material-symbols-outlined text-[14px]">public</span>
                    Tất cả
                </span>
            );
        case 'PLAN':
            return (
                <span className="flex items-center gap-1 text-[11px] font-black text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 px-2 py-0.5 rounded border border-orange-100 dark:border-orange-900/40">
                    <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                    Gói {value}
                </span>
            );
        case 'SINGLE':
        default:
            return (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/40 max-w-[150px] truncate" title={value}>
                    <span className="material-symbols-outlined text-[14px]">person</span>
                    {value}
                </span>
            );
    }
};

const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    const d = new Date(dateStr);
    return d.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const BroadcastHistory = ({ broadcasts, loading, onSelect }) => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <span className="material-symbols-outlined text-orange-500 text-[22px]">history</span>
                        Lịch sử gửi thông báo
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">Tổng số thông báo đã phát đi: {broadcasts.length}</p>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto min-h-[300px]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                            <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mức độ</th>
                            <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Người nhận</th>
                            <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kênh</th>
                            <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tiêu đề</th>
                            <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ngày gửi</th>
                            <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {loading && (
                            <tr>
                                <td colSpan="6" className="py-12 text-center text-slate-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="material-symbols-outlined animate-spin text-3xl text-primary">refresh</span>
                                        <span className="text-sm font-semibold">Đang tải lịch sử...</span>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {!loading && broadcasts.length === 0 && (
                            <tr>
                                <td colSpan="6" className="py-16 text-center text-slate-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700">chat_bubble_outline</span>
                                        <span className="text-sm font-bold">Chưa có thông báo nào được gửi đi</span>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {!loading && broadcasts.map((bc) => (
                            <tr
                                key={bc.id}
                                onClick={() => onSelect(bc)}
                                className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                            >
                                <td className="py-3.5 px-4">
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getLevelBadge(bc.level)}`}>
                                        {bc.level}
                                    </span>
                                </td>
                                <td className="py-3.5 px-4">
                                    {getTargetBadge(bc.targetType, bc.targetValue)}
                                </td>
                                <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                                        {bc.sendWeb !== false && (
                                            <span className="material-symbols-outlined text-[16px] text-orange-500 cursor-help" title="Ứng dụng Web (SSE)">desktop_windows</span>
                                        )}
                                        {bc.sendEmail !== false && (
                                            <span className="material-symbols-outlined text-[16px] text-orange-500 cursor-help" title="Thư điện tử (Email)">mail</span>
                                        )}
                                    </div>
                                </td>
                                <td className="py-3.5 px-4 font-bold text-slate-700 dark:text-slate-200 text-sm group-hover:text-primary transition-colors max-w-[200px] truncate">
                                    {bc.title}
                                </td>
                                <td className="py-3.5 px-4 text-xs font-semibold text-slate-400">
                                    {formatDate(bc.createdAt)}
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSelect(bc);
                                        }}
                                        className="p-1 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BroadcastHistory;
