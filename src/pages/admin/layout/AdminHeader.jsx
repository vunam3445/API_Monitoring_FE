import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Đọc user từ localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                setUser(null);
            }
        }
    }, []);

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Tạo chữ cái đầu từ tên để hiển thị default avatar
    const getInitials = (name) => {
        if (!name) return 'AD';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    const displayName = user?.fullName || 'Administrator';
    const displayRole = user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Administrator';
    const avatarUrl = user?.avatarUrl;

    return (
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30 shrink-0">
            <div className="flex flex-1 items-center gap-4 max-w-xl">
                <div className="relative w-full">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                        search
                    </span>
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border-none rounded-xl bg-slate-50 dark:bg-slate-800 focus:ring-orange-500 focus:border-orange-500 text-sm transition-all text-slate-900 dark:text-slate-100"
                        placeholder="Search across logs, endpoints, or users..."
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase transition-transform hover:scale-105 cursor-default">
                    <span className="size-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    System Healthy
                </div>
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 relative text-slate-600 dark:text-slate-400 transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 size-2 bg-orange-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                </button>

                {/* User Profile Section */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800 hover:opacity-80 transition-opacity"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{displayName}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{displayRole}</p>
                        </div>

                        {/* Avatar: hiển thị ảnh nếu có, không thì hiển thị chữ cái đầu */}
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt="Admin Avatar"
                                className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 object-cover ring-2 ring-primary/20"
                            />
                        ) : (
                            <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-primary/20 shadow-md">
                                {getInitials(displayName)}
                            </div>
                        )}
                        <span className="material-symbols-outlined text-slate-400">
                            {dropdownOpen ? 'expand_less' : 'expand_more'}
                        </span>
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            {/* User Info */}
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                <div className="flex items-center gap-3">
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt="Admin Avatar" className="size-10 rounded-full object-cover" />
                                    ) : (
                                        <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                            {getInitials(displayName)}
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{displayName}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email || 'admin@example.com'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <span className="material-symbols-outlined text-lg text-slate-400">person</span>
                                    Hồ sơ cá nhân
                                </button>
                                <button
                                    onClick={() => { setDropdownOpen(false); navigate('/admin/settings'); }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg text-slate-400">settings</span>
                                    Cài đặt hệ thống
                                </button>
                            </div>

                            {/* Logout */}
                            <div className="border-t border-slate-100 dark:border-slate-800 py-2">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">logout</span>
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
