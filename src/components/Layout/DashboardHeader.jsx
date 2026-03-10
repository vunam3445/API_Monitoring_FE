import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-10 shrink-0">
            <div className="flex items-center flex-1 max-w-xl">
                <div className="relative w-full group">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-primary transition-colors">search</span>
                    <input
                        className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                        placeholder="Search endpoints, status or logs..." type="text" />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="size-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2.5 size-2 bg-primary rounded-full ring-2 ring-white dark:ring-slate-900"></span>
                </button>
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
        </header>
    );
};

export default DashboardHeader;
