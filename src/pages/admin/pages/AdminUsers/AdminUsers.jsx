import React, { useState } from 'react';

const AdminUsers = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const users = [
        {
            id: '#USR-8921', name: 'Sarah Jenkins', email: 'sarah.j@acmetech.com',
            company: 'AcmeTech Inc.', plan: 'PRO', planClass: 'bg-orange-50 dark:bg-primary/10 text-primary',
            apisUsed: 24, status: 'Active', statusColor: 'bg-green-500', statusText: 'text-green-600',
            lastLogin: '2 hours ago', created: 'Oct 12, 2023',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-1jQ7oeXAwibENorxGgiP2IacYjhED7x1ZKRdopFUYlo_cTor18b92Gm3OHtffUeEQY4dY4xAwTTSMBiGs8nidnnTSBikTJ-P-vYd_dv1mHMq0HQjpIj6nHuBGBYYF5f1s6FVjmE8ntMMpA947bxHSxFCzdJqOmSAx0wiBq0Uh6RZdgOZY68kBjzJUscLSiDlAQrt3rIzf8GOBk40pixLlHDtEp9fI3ieppKWf7K_WhNV9AqSKe1NVC9J-P7Ml4JmEdBAMTH0ym5f'
        },
        {
            id: '#USR-7734', name: 'Marcus Thorne', email: 'm.thorne@gloden.io',
            company: 'Gloden.io', plan: 'FREE', planClass: 'bg-slate-100 dark:bg-slate-800 text-slate-500',
            apisUsed: 8, status: 'Active', statusColor: 'bg-green-500', statusText: 'text-green-600',
            lastLogin: 'Yesterday', created: 'Jan 05, 2024',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5GOTtQKqe1Ry5m32ruh_W5lx39_KiO1lfN-bpa_eAeBrhJ9u-zRgEEs333b_znLx8Z4n9a3jNzX602AFXOrDXfwBFQw9fEjEe-sjhFAInUfKE76_R3w66MelrUuCDEZor52XvMXGanHkNkFxpMAfMkyqbbgsttgJENJVveCZxf2_xxlCxIR0XWCpHcC-eA7oMfRGyXa1crdwbllydOUPH4JdPswy039op6RCslRLS7pd1FIFhXcPtH7Jv4Gh-b5pMADgyCL7jAm4X'
        },
        {
            id: '#USR-4410', name: 'Liam Peterson', email: 'liam@startup.co',
            company: 'Startup Co.', plan: 'ENTERPRISE', planClass: 'bg-slate-900 dark:bg-slate-700 text-white',
            apisUsed: 156, status: 'Suspended', statusColor: 'bg-red-500', statusText: 'text-red-600',
            lastLogin: '12 days ago', created: 'Aug 22, 2023',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1XYi5C8A-87wKunnxrvBi8tofUHthrKTnSnKPm37LRvbAZ6HgQvJdMnAS9aYKgc54hcs8BytI3Wgg4-hd5FrW1ipKb6I7fsZuuMV96IFZDVHOAs3PXVE4Vx12FqEXM3vpv08dUjy0ABeAvbkrt53VNJrhqevV9pweW-C7S1CQf90oZU8ehjsFS67AxkR89AwbHX1RpJcTU-BqH5qHM4iybdvPOnFXpuFiVbKc3Clf4l2nw8sI7pU2d9rmKIphAuROp_TfEkxRlLDm'
        },
        {
            id: '#USR-3199', name: 'Elena Rodriguez', email: 'elena.r@finops.com',
            company: 'FinOps Systems', plan: 'PRO', planClass: 'bg-orange-50 dark:bg-primary/10 text-primary',
            apisUsed: 42, status: 'Active', statusColor: 'bg-green-500', statusText: 'text-green-600',
            lastLogin: 'Just now', created: 'May 30, 2023',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChM4CusgXxbsKO7grDGuLd7v2EnAfUuXgoxjpBA1SiQCPVt4nr1OEJKJGSzqyy_avrzSq1Nx8AX_tIGhxtLMbeq9tUy3z8BvCb937yXRSrkPc0LGso4KPXGUsG3XwiDE_iN1OrGih6HZfFv_7_WEPoyFNhvhd9KLCy7ht2ZCloZd505bmPLWTUM5D978sk2r_FLIwNE_pdg39is0_BaeIizpRFFiSSlO8rRExXgy2Z2nQyBZ7Jcv7vOqzyenk_1FE71vHJuGcM8_tf'
        }
    ];

    return (
        <div className="p-8 space-y-8 max-w-[1400px] mx-auto w-full relative">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight">User Management</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Manage all users, subscriptions, and
                        API usage across the platform.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                        <span className="material-symbols-outlined text-[18px]">file_download</span>
                        Export Users
                    </button>
                    <button
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                        <span className="material-symbols-outlined text-[18px]">person_add</span>
                        Add New User
                    </button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Total Users</span>
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">groups</span>
                        </div>
                    </div>
                    <div className="text-2xl font-black">1,248</div>
                    <div className="text-[11px] text-green-500 mt-1 font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">trending_up</span> +12% this month
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Active Users</span>
                        <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                        </div>
                    </div>
                    <div className="text-2xl font-black">1,102</div>
                    <div className="text-[11px] text-slate-400 mt-1 font-bold">88% of total base</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Free Plan</span>
                        <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">person</span>
                        </div>
                    </div>
                    <div className="text-2xl font-black">840</div>
                    <div className="text-[11px] text-slate-400 mt-1 font-bold">Self-serve users</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Pro Plan</span>
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                        </div>
                    </div>
                    <div className="text-2xl font-black">320</div>
                    <div className="text-[11px] text-primary mt-1 font-bold">25.6% of base</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Suspended</span>
                        <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">block</span>
                        </div>
                    </div>
                    <div className="text-2xl font-black">8</div>
                    <div className="text-[11px] text-red-500 mt-1 font-bold">Requires attention</div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-wrap items-end gap-4 relative z-10">
                <div className="flex-1 min-w-[200px] space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">Search Users</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                        <input
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            placeholder="Name, email, company..." type="text" />
                    </div>
                </div>
                <div className="w-40 space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">Plan</label>
                    <select className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                        <option>All Plans</option>
                        <option>Free</option>
                        <option>Pro</option>
                        <option>Enterprise</option>
                    </select>
                </div>
                <div className="w-40 space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">Status</label>
                    <select className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Suspended</option>
                    </select>
                </div>
                <div className="w-48 space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">Date Range</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">calendar_today</span>
                        <input
                            className="w-full pl-4 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm cursor-pointer outline-none focus:ring-2 focus:ring-primary/20"
                            readOnly type="text" value="Last 30 Days" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-5 py-2.5 bg-slate-900 dark:bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all">Apply</button>
                    <button className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Reset</button>
                </div>
            </div>

            {/* User Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative z-10">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">User ID</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Name &amp; Email</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Company</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Plan</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">APIs Used</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Last Login</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Created</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {users.map((user, idx) => (
                                <tr key={idx} onClick={() => setSelectedUser(user)} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                                    <td className="px-6 py-4 text-xs font-mono text-slate-400">{user.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100">
                                                <img alt="User Avatar" className="w-full h-full object-cover" src={user.avatar} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">{user.company}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${user.planClass}`}>
                                            {user.plan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-sm">{user.apisUsed}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.statusColor}`}></span>
                                            <span className={`text-xs font-bold ${user.statusText}`}>{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500 font-medium">{user.lastLogin}</td>
                                    <td className="px-6 py-4 text-xs text-slate-500 font-medium">{user.created}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-500">Showing 1-10 of 1,248 users</p>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 disabled:opacity-50" disabled>
                            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800">3</button>
                        <span className="text-slate-400">...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800">125</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Slide-out Side Panel for User Details */}
            {selectedUser && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-slate-900/20 dark:bg-slate-900/50 backdrop-blur-sm z-40" onClick={() => setSelectedUser(null)}></div>
                    {/* Sidebar Model */}
                    <div className="fixed inset-y-0 right-0 w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 transform transition-transform translate-x-0 animate-in slide-in-from-right duration-300">
                        <div className="h-full flex flex-col">
                            {/* Panel Header */}
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <h3 className="font-bold text-lg">User Details</h3>
                                <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {/* Panel Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                {/* Profile Section */}
                                <div className="text-center">
                                    <div className="w-24 h-24 rounded-3xl mx-auto overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4 ring-4 ring-primary/10">
                                        <img alt="Large User Avatar" className="w-full h-full object-cover" src={selectedUser.avatar} />
                                    </div>
                                    <h4 className="text-xl font-black">{selectedUser.name}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{selectedUser.email}</p>
                                    <div className="mt-4 flex items-center justify-center gap-2">
                                        <span className={`px-3 py-1 ${selectedUser.planClass.replace('text-slate-500', 'text-white').replace('bg-slate-100', 'bg-slate-500')} text-[10px] font-black rounded-full uppercase`}>
                                            {selectedUser.plan} Plan
                                        </span>
                                        <span className={`px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 ${selectedUser.status === 'Suspended' ? 'bg-red-50 dark:bg-red-900/20 text-red-600' : ''} text-[10px] font-black rounded-full uppercase tracking-tighter`}>
                                            {selectedUser.status} Status
                                        </span>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">API Requests</p>
                                        <p className="text-xl font-bold">1.2M</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Endpoints</p>
                                        <p className="text-xl font-bold">{selectedUser.apisUsed}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Error Rate</p>
                                        <p className="text-xl font-bold text-green-500">0.02%</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Latency</p>
                                        <p className="text-xl font-bold text-primary">145ms</p>
                                    </div>
                                </div>

                                {/* Activity Timeline */}
                                <div className="space-y-4">
                                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest">Recent Activity</h5>
                                    <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                                        <div className="relative pl-8">
                                            <span className="absolute left-0 top-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white ring-4 ring-white dark:ring-slate-900">
                                                <span className="material-symbols-outlined text-[14px]">login</span>
                                            </span>
                                            <p className="text-sm font-bold">Successful login</p>
                                            <p className="text-xs text-slate-500 font-medium">May 15, 2024 at 10:42 AM</p>
                                        </div>
                                        <div className="relative pl-8">
                                            <span className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white ring-4 ring-white dark:ring-slate-900">
                                                <span className="material-symbols-outlined text-[14px]">api</span>
                                            </span>
                                            <p className="text-sm font-bold">New API Key generated</p>
                                            <p className="text-xs text-slate-500 font-medium">May 14, 2024 at 03:15 PM</p>
                                        </div>
                                        <div className="relative pl-8">
                                            <span className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white ring-4 ring-white dark:ring-slate-900">
                                                <span className="material-symbols-outlined text-[14px]">credit_card</span>
                                            </span>
                                            <p className="text-sm font-bold">Subscription renewed</p>
                                            <p className="text-xs text-slate-500 font-medium">May 12, 2024 at 09:00 AM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Panel Footer */}
                            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 grid grid-cols-2 gap-3">
                                <button className="px-4 py-3 bg-white dark:bg-slate-800 border border-red-200 text-red-600 rounded-xl font-bold text-sm hover:bg-red-50 transition-all">
                                    Suspend User
                                </button>
                                <button className="px-4 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminUsers;
