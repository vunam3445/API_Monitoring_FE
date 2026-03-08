import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
        { name: 'API List', icon: 'language', path: '/apis' },
        { name: 'Monitoring', icon: 'insights', path: '/monitoring' },
        { name: 'Alerts', icon: 'notifications_active', badge: 12, path: '/alerts' },
        { name: 'Logs', icon: 'list_alt', path: '/logs' },
        { name: 'Billing', icon: 'payments', path: '/billing' },
    ];

    return (
        <aside className="w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full shrink-0">
            <div className="p-6 flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-2xl">monitoring</span>
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-tight leading-none">NetGuard</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">DevOps Dashboard</p>
                </div>
            </div>
            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${isActive
                                ? "bg-primary text-white font-medium"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span>{item.name}</span>
                            {item.badge && (
                                <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isActive ? "bg-white/20 text-white" : "bg-primary/20 text-primary"
                                    }`}>
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}

            </nav>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <Link
                    to="/settings"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${location.pathname === '/settings'
                        ? "bg-primary text-white font-medium"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                >
                    <span className="material-symbols-outlined">settings</span>
                    <span>Settings</span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
