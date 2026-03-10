import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/admin/login');
    };

    const navItemClass = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive
            ? 'bg-orange-500/10 text-orange-600 font-semibold border-r-4 border-orange-500'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
        }`;

    return (
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3">
                <div className="bg-orange-500 rounded-lg p-1.5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">monitoring</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">API Monitor</h1>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                <NavLink to="/admin/dashboard" className={navItemClass}>
                    <span className="material-symbols-outlined">dashboard</span>
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/admin/users" className={navItemClass}>
                    <span className="material-symbols-outlined">group</span>
                    <span>Users</span>
                </NavLink>
                <NavLink to="/admin/apis" className={navItemClass}>
                    <span className="material-symbols-outlined">api</span>
                    <span>APIs</span>
                </NavLink>
                <NavLink to="/admin/monitoring" className={navItemClass}>
                    <span className="material-symbols-outlined">insights</span>
                    <span>Monitoring</span>
                </NavLink>
                <NavLink to="/admin/alerts" className={navItemClass}>
                    <span className="material-symbols-outlined">notifications_active</span>
                    <span>Alerts</span>
                </NavLink>
                <NavLink to="/admin/pricing-plans" className={navItemClass}>
                    <span className="material-symbols-outlined">payments</span>
                    <span>Pricing Plans</span>
                </NavLink>
                <NavLink to="/admin/subscriptions" className={navItemClass}>
                    <span className="material-symbols-outlined">event_repeat</span>
                    <span>Subscriptions</span>
                </NavLink>
                <NavLink to="/admin/revenue-analytics" className={navItemClass}>
                    <span className="material-symbols-outlined">analytics</span>
                    <span>Revenue Analytics</span>
                </NavLink>
                <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">System</div>
                <NavLink to="/admin/system-logs" className={navItemClass}>
                    <span className="material-symbols-outlined">terminal</span>
                    <span>System Logs</span>
                </NavLink>
                <NavLink to="/admin/settings" className={navItemClass}>
                    <span className="material-symbols-outlined">settings</span>
                    <span>Settings</span>
                </NavLink>
            </nav>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
                >
                    <span className="material-symbols-outlined">logout</span>
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
