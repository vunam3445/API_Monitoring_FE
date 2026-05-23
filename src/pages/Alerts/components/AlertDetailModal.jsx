import React, { useState } from 'react';

const AlertDetailModal = ({ isOpen, onClose, alertData, loading }) => {
    const [activeTab, setActiveTab] = useState('overview');

    if (!isOpen) return null;

    // Loading skeleton or empty state
    if (loading || !alertData) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
                <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center animate-pulse">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full mb-6"></div>
                    <div className="h-6 w-48 bg-slate-100 dark:bg-slate-800 rounded-lg mb-3"></div>
                    <div className="h-4 w-64 bg-slate-50 dark:bg-slate-800/50 rounded-lg"></div>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Tổng quan', icon: 'info' },
        { id: 'technical', label: 'Thông số kỹ thuật', icon: 'analytics' },
        { id: 'delivery', label: 'Lịch sử thông báo', icon: 'history' },
    ];

    const getSeverityStyle = (severity) => {
        switch (severity?.toUpperCase()) {
            case 'CRITICAL': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
            case 'WARNING': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
            default: return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
        }
    };

    const getStatusStyle = (status) => {
        switch (status?.toUpperCase()) {
            case 'ACTIVE': return 'bg-red-500 text-white';
            case 'RESOLVED': return 'bg-emerald-500 text-white';
            case 'ACKNOWLEDGED': return 'bg-slate-500 text-white';
            default: return 'bg-slate-300 text-slate-700';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const getDeliveryStatusIcon = (status) => {
        switch (status?.toUpperCase()) {
            case 'SENT': return { icon: 'check_circle', color: 'text-emerald-500' };
            case 'FAILED': return { icon: 'cancel', color: 'text-red-500' };
            case 'PENDING': return { icon: 'schedule', color: 'text-amber-500' };
            default: return { icon: 'help', color: 'text-slate-400' };
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl transition-all border border-slate-200 dark:border-slate-800 flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/30 flex-shrink-0">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-1">
                            <span className={`px-2 py-0.5 text-[10px] font-black rounded uppercase border ${getSeverityStyle(alertData.severity)}`}>
                                {alertData.severity}
                            </span>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                                {alertData.title}
                            </h3>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">#{alertData.id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all transform hover:rotate-90"
                    >
                        <span className="material-symbols-outlined text-2xl">close</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex px-8 space-x-6 border-b border-slate-100 dark:border-slate-800 overflow-x-auto flex-shrink-0 no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                    {/* OVERVIEW TAB */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Trạng thái hiện tại</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(alertData.status)}`}>
                                            {alertData.status}
                                        </span>
                                        {alertData.status === 'ACTIVE' && (
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Thời gian kích hoạt</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{formatDate(alertData.triggeredAt)}</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Chi tiết thông báo</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic border-l-4 border-primary/30 pl-4 py-1">
                                    "{alertData.message || 'Không có tin nhắn chi tiết'}"
                                </p>
                            </div>

                            <div className="bg-slate-900 dark:bg-black rounded-2xl p-6 text-white overflow-hidden relative shadow-xl">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <span className="material-symbols-outlined text-6xl">sensors</span>
                                </div>
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Monitor bị ảnh hưởng</h4>
                                <div className="space-y-3 relative z-10">
                                    <p className="text-lg font-black tracking-tight">{alertData.monitorName || 'N/A'}</p>
                                    <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10">
                                        <span className="material-symbols-outlined text-xs text-slate-400">link</span>
                                        <p className="text-xs font-mono text-slate-300 truncate">{alertData.monitorUrl || 'Không có URL'}</p>
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-medium">ID: {alertData.monitorId}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TECHNICAL TAB */}
                    {activeTab === 'technical' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                                    <span className="material-symbols-outlined text-red-500 mb-2">repeat</span>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Số lần lỗi liên tiếp</p>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{alertData.consecutiveFailCount || 0}</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                                    <span className="material-symbols-outlined text-blue-500 mb-2">speed</span>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Độ trễ khi xảy ra lỗi</p>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{alertData.avgLatencyMs || 0}<span className="text-xs font-normal text-slate-400 ml-1">ms</span></p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                                    <span className="material-symbols-outlined text-amber-500 mb-2">error</span>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Mã phản hồi lỗi</p>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-widest">{alertData.lastStatusCode || 'N/A'}</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                                    <span className="material-symbols-outlined text-emerald-500 mb-2">update</span>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Lần cuối thấy lỗi</p>
                                    <p className="text-xs font-bold text-slate-900 dark:text-white mt-3">{formatDate(alertData.lastSeenAt)}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DELIVERY TAB */}
                    {activeTab === 'delivery' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                             {!alertData.deliveryHistory || alertData.deliveryHistory.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                                    <span className="material-symbols-outlined text-4xl mb-2">forward_to_inbox</span>
                                    <p className="text-xs font-medium">Không có lịch sử gửi thông báo.</p>
                                </div>
                             ) : (
                                <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 dark:before:bg-slate-800">
                                    {alertData.deliveryHistory.map((delivery, index) => {
                                        const status = getDeliveryStatusIcon(delivery.status);
                                        return (
                                            <div key={delivery.id || index} className="relative">
                                                <div className={`absolute -left-[30px] top-1 rounded-full bg-white dark:bg-slate-900 p-0.5 z-10 ${status.color}`}>
                                                    <span className="material-symbols-outlined text-2xl">{status.icon}</span>
                                                </div>
                                                <div className="bg-white dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-500 dark:text-slate-400 rounded uppercase">
                                                                {delivery.channel}
                                                            </span>
                                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                                                {delivery.destination}
                                                            </span>
                                                        </div>
                                                        <span className="text-[10px] text-slate-400 font-medium">
                                                            {formatDate(delivery.sentAt)}
                                                        </span>
                                                    </div>
                                                    {delivery.errorMessage && (
                                                        <p className="text-[10px] text-red-500 mt-2 font-medium bg-red-50 dark:bg-red-900/10 p-2 rounded-lg">
                                                            Lỗi: {delivery.errorMessage}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                             )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-6 flex items-center justify-end border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex-shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertDetailModal;
