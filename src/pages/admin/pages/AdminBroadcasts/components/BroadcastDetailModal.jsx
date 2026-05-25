import React, { useEffect } from 'react';

const getLevelStyle = (level) => {
    switch (level) {
        case 'SYSTEM':
            return {
                badge: 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900/50',
                border: 'border-red-500',
                icon: 'gpp_maybe'
            };
        case 'WARNING':
            return {
                badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-100 dark:border-amber-900/50',
                border: 'border-amber-500',
                icon: 'warning'
            };
        case 'INFO':
        default:
            return {
                badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900/50',
                border: 'border-blue-500',
                icon: 'info'
            };
    }
};

const getTargetText = (type, value) => {
    switch (type) {
        case 'ALL':
            return 'Tất cả người dùng trên hệ thống (Broadcast)';
        case 'PLAN':
            return `Nhóm người dùng sử dụng Gói cước: ${value}`;
        case 'SINGLE':
        default:
            return `Người dùng cá nhân: ${value}`;
    }
};

const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    const d = new Date(dateStr);
    return d.toLocaleString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

const BroadcastDetailModal = ({ broadcast, onClose }) => {
    // Khóa cuộn trang nền khi mở Modal
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!broadcast) return null;
    const style = getLevelStyle(broadcast.level);

    return (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={onClose}></div>

            {/* Modal Card */}
            <div className={`relative bg-white dark:bg-slate-900 w-full max-w-2xl border-l-4 ${style.border} border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-200 z-10 flex flex-col max-h-[90vh]`}>
                {/* Header */}
                <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-black tracking-wider uppercase border ${style.badge} flex items-center gap-1`}>
                            <span className="material-symbols-outlined text-[13px]">{style.icon}</span>
                            {broadcast.level}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Tiêu đề lớn */}
                <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-snug">
                    {broadcast.title}
                </h3>

                {/* Sub-header meta thông tin */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-500 font-semibold">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-slate-400">group</span>
                        <span>Đến: {getTargetText(broadcast.targetType, broadcast.targetValue)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-slate-400">send_and_archive</span>
                        <span className="flex items-center gap-1">
                            Kênh gửi: 
                            {broadcast.sendWeb !== false && (
                                <span className="px-1.5 py-0.5 bg-orange-50 dark:bg-orange-950/10 text-orange-600 dark:text-orange-400 rounded text-[10px] font-bold border border-orange-100 dark:border-orange-900/30">Web (SSE)</span>
                            )}
                            {broadcast.sendEmail !== false && (
                                <span className="px-1.5 py-0.5 bg-orange-50 dark:bg-orange-950/10 text-orange-600 dark:text-orange-400 rounded text-[10px] font-bold border border-orange-100 dark:border-orange-900/30">Email</span>
                            )}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 md:col-span-2">
                        <span className="material-symbols-outlined text-[18px] text-slate-400">schedule</span>
                        <span>Thời gian: {formatDate(broadcast.createdAt)}</span>
                    </div>
                </div>

                {/* Nội dung thông báo */}
                <div className="flex-1 overflow-y-auto mt-6 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 rounded-xl p-5 md:p-6">
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium whitespace-pre-line break-words">
                        {broadcast.content}
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-3 shrink-0">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-sm transition-all"
                    >
                        Đóng cửa sổ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BroadcastDetailModal;
