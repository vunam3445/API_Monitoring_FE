import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-display">
            <AdminSidebar />
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto overflow-x-hidden">
                <AdminHeader />
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
