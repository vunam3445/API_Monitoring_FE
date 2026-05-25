import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserNotifications } from './hooks/useUserNotifications';

const getLevelIcon = (level) => {
    switch (level) {
        case 'SYSTEM':
            return {
                icon: 'gpp_maybe',
                color: 'text-red-500 bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30'
            };
        case 'WARNING':
            return {
                icon: 'warning',
                color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30'
            };
        case 'INFO':
        default:
            return {
                icon: 'info',
                color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30'
            };
    }
};

const formatTimeAgo = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} năm trước`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} tháng trước`;
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} ngày trước`;
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} giờ trước`;
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} phút trước`;
    
    return 'Vừa xong';
};

const DashboardHeader = () => {
    const [user, setUser] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();

    const {
        notifications,
        unreadCount,
        selectedNotification,
        markAllAsRead,
        handleSelectNotification,
        setSelectedNotification
    } = useUserNotifications();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/');
    };

    const getAvatar = () => {
        if (user?.avatarUrl) return user.avatarUrl;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || user?.email || 'User')}&background=random`;
    };

    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-30 shrink-0">
            <div className="flex items-center flex-1 max-w-xl">
                <div className="relative w-full group">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-primary transition-colors">search</span>
                    <input
                        className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                        placeholder="Search endpoints, status or logs..." type="text" />
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                {/* Notification Area */}
                <div className="relative">
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`size-10 rounded-full flex items-center justify-center transition-colors relative hover:bg-slate-100 dark:hover:bg-slate-800 ${showNotifications ? 'bg-slate-100 dark:bg-slate-800 text-primary' : 'text-slate-500'}`}
                    >
                        <span className="material-symbols-outlined">notifications</span>
                        {unreadCount > 0 && (
                            <>
                                <span className="absolute top-2 right-2.5 size-2 bg-orange-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-ping"></span>
                                <span className="absolute top-2 right-2.5 size-2 bg-orange-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
                            </>
                        )}
                    </button>

                    {/* Notification Dropdown Backdrop click outside */}
                    {showNotifications && (
                        <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                    )}

                    {/* Notification Dropdown List */}
                    {showNotifications && (
                        <div className="absolute right-0 mt-2.5 w-[380px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 flex flex-col max-h-[480px] overflow-hidden animate-in slide-in-from-top-3 duration-150">
                            {/* Dropdown Header */}
                            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20 shrink-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Thông báo</span>
                                    {unreadCount > 0 && (
                                        <span className="px-1.5 py-0.5 text-[10px] font-black bg-orange-500 text-white rounded-full">
                                            {unreadCount} mới
                                        </span>
                                    )}
                                </div>
                                {unreadCount > 0 && (
                                    <button 
                                        onClick={markAllAsRead}
                                        className="text-[11px] font-bold text-primary hover:text-primary-dark hover:underline flex items-center gap-0.5"
                                    >
                                        <span className="material-symbols-outlined text-[14px]">done_all</span>
                                        Đọc tất cả
                                    </button>
                                )}
                            </div>

                            {/* Dropdown List Items */}
                            <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800/60 max-h-[360px]">
                                {notifications.length === 0 ? (
                                    <div className="py-12 px-6 text-center text-slate-400 flex flex-col items-center gap-2">
                                        <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700">notifications_off</span>
                                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Hộp thư trống!</p>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500">Bạn không có thông báo nào từ quản trị viên.</p>
                                    </div>
                                ) : (
                                    notifications.map((n) => {
                                        const config = getLevelIcon(n.level);
                                        return (
                                            <div 
                                                key={n.id}
                                                onClick={() => {
                                                    handleSelectNotification(n);
                                                    setShowNotifications(false);
                                                }}
                                                className={`p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group relative ${!(n.isRead || n.read) ? 'bg-orange-50/20 dark:bg-orange-950/5' : ''}`}
                                            >
                                                {/* Status level icon */}
                                                <div className={`size-8 rounded-xl flex items-center justify-center border shrink-0 ${config.color}`}>
                                                    <span className="material-symbols-outlined text-[18px]">{config.icon}</span>
                                                </div>

                                                {/* Text detail */}
                                                <div className="flex-1 min-w-0 pr-2">
                                                    <h4 className={`text-xs font-bold truncate group-hover:text-primary transition-colors ${!(n.isRead || n.read) ? 'text-slate-900 dark:text-white font-extrabold' : 'text-slate-600 dark:text-slate-400'}`}>
                                                        {n.title}
                                                    </h4>
                                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                                        {n.content}
                                                    </p>
                                                    <span className="text-[10px] text-slate-400 font-semibold mt-1.5 block">
                                                        {formatTimeAgo(n.createdAt)}
                                                    </span>
                                                </div>

                                                {/* Unread dot */}
                                                {!(n.isRead || n.read) && (
                                                    <span className="absolute top-4 right-4 size-2 bg-orange-500 rounded-full shrink-0"></span>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-8 w-[1px] bg-slate-200 dark:border-slate-800"></div>
                
                <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-xl transition-colors relative group/profile">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold leading-none">{user?.fullName || user?.email?.split('@')[0] || 'Loading...'}</p>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">{user?.planType || 'FREE'} PLAN</p>
                    </div>
                    <img alt="Profile" className="size-9 rounded-full bg-slate-200 border-2 border-slate-200 dark:border-slate-700 object-cover"
                        data-alt="User profile avatar"
                        src={getAvatar()} />

                    {/* Logout Dropdown (appear on hover for simplicity, or click) */}
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-base">logout</span>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal hiển thị chi tiết Thông báo nhận được */}
            {selectedNotification && (
                <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="absolute inset-0" onClick={() => setSelectedNotification(null)}></div>
                    <div className={`relative bg-white dark:bg-slate-900 w-full max-w-lg border-l-4 ${getLevelIcon(selectedNotification.level).color.split(' ')[0].replace('text-', 'border-')} rounded-2xl shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-200 z-10 flex flex-col`}>
                        {/* Header */}
                        <div className="flex justify-between items-start gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase border ${getLevelIcon(selectedNotification.level).color} flex items-center gap-1`}>
                                    <span className="material-symbols-outlined text-[13px]">{getLevelIcon(selectedNotification.level).icon}</span>
                                    {selectedNotification.level}
                                </span>
                            </div>
                            <button
                                onClick={() => setSelectedNotification(null)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        {/* Tiêu đề */}
                        <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-snug">
                            {selectedNotification.title}
                        </h3>

                        {/* Thời gian */}
                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                            <span>Đã nhận: {new Date(selectedNotification.createdAt).toLocaleString('vi-VN')}</span>
                        </div>

                        {/* Nội dung */}
                        <div className="mt-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 rounded-xl p-4 max-h-[250px] overflow-y-auto">
                            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-medium whitespace-pre-line break-words">
                                {selectedNotification.content}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setSelectedNotification(null)}
                                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition-all"
                            >
                                Đóng cửa sổ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default DashboardHeader;
