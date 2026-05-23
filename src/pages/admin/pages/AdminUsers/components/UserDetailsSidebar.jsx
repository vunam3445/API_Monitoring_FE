import React from 'react';
import { getStatusBadge, getPlanBadge, formatDate } from '../utils';

const UserDetailsSidebar = ({ selectedUser, setSelectedUser, handleBlockUser, handleActiveUser }) => {
    if (!selectedUser) return null;

    return (
        <>
            <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity" onClick={() => setSelectedUser(null)}></div>
            <div className="fixed inset-y-0 right-0 w-full max-w-[420px] bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out border-l border-slate-200/50 dark:border-slate-800 flex flex-col pt-safe">
                
                {/* Header Profile Area (Gradient & Avatar) */}
                <div className="relative pt-12 pb-8 px-8 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent">
                    <button onClick={() => setSelectedUser(null)} className="absolute top-4 right-4 p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md hover:bg-white dark:hover:bg-slate-700 rounded-full text-slate-500 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                    
                    <div className="flex flex-col items-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl relative z-10 bg-slate-100">
                                <img
                                    alt="Avatar"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src={selectedUser.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.fullName)}&background=random`}
                                />
                            </div>
                            <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 z-20 shadow-sm ${getStatusBadge(selectedUser.status).bg}`}></div>
                        </div>
                        <h3 className="mt-5 text-2xl font-black text-slate-900 dark:text-white tracking-tight">{selectedUser.fullName}</h3>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">{selectedUser.email}</p>
                        
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <span className={`px-4 py-1.5 ${getPlanBadge(selectedUser.planType)} text-[11px] font-black rounded-full uppercase tracking-wider shadow-sm`}>
                                Gói {selectedUser.planType}
                            </span>
                            <span className={`px-4 py-1.5 ${getStatusBadge(selectedUser.status).lightBg} ${getStatusBadge(selectedUser.status).text} text-[11px] font-black rounded-full uppercase tracking-wider shadow-sm`}>
                                {selectedUser.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-8 -mt-2">
                    {/* Information */}
                    <div className="space-y-3">
                        <h5 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Thông tin tài khoản</h5>
                        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-100 dark:border-slate-700/50 space-y-3 shadow-sm">
                            <div className="flex justify-between items-center pb-3 border-b border-slate-200/50 dark:border-slate-700/50">
                                <span className="text-xs font-bold text-slate-500">ID Người dùng</span>
                                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-md shadow-sm border border-slate-100 dark:border-slate-700">{selectedUser.id}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-slate-200/50 dark:border-slate-700/50">
                                <span className="text-xs font-bold text-slate-500">Công ty</span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedUser.company || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-slate-200/50 dark:border-slate-700/50">
                                <span className="text-xs font-bold text-slate-500">Ngày gia nhập</span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{formatDate(selectedUser.createdAt)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-500">Đăng nhập cuối</span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{formatDate(selectedUser.lastLoginAt)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between pl-1">
                            <h5 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Thống kê <span className="text-primary italic normal-case lowercase">(Mock)</span></h5>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800/50 p-4 rounded-2xl border border-blue-100/50 dark:border-blue-800/30 shadow-sm transition-transform hover:-translate-y-1 group">
                                <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
                                </div>
                                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Monitors</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-black text-slate-800 dark:text-white">{selectedUser.planType === 'ENTERPRISE' ? 124 : selectedUser.planType === 'PRO' ? 45 : 12}</span>
                                    <span className="text-[10px] font-bold text-slate-400">/ {selectedUser.planType === 'ENTERPRISE' ? '∞' : selectedUser.planType === 'PRO' ? 100 : 20}</span>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-slate-800/50 p-4 rounded-2xl border border-emerald-100/50 dark:border-emerald-800/30 shadow-sm transition-transform hover:-translate-y-1 group">
                                <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-800/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[18px]">task_alt</span>
                                </div>
                                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Active Monitors</p>
                                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{selectedUser.planType === 'ENTERPRISE' ? 120 : selectedUser.planType === 'PRO' ? 42 : 10}</span>
                            </div>

                            <div className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-slate-800/50 p-4 rounded-2xl border border-amber-100/50 dark:border-amber-800/30 shadow-sm transition-transform hover:-translate-y-1 group">
                                <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-800/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                                </div>
                                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Sent Alerts</p>
                                <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{selectedUser.planType === 'ENTERPRISE' ? '12.5k' : selectedUser.planType === 'PRO' ? '2.3k' : 156}</span>
                            </div>

                            <div className="bg-gradient-to-br from-rose-50 to-white dark:from-rose-900/20 dark:to-slate-800/50 p-4 rounded-2xl border border-rose-100/50 dark:border-rose-800/30 shadow-sm transition-transform hover:-translate-y-1 group">
                                <div className="w-9 h-9 rounded-full bg-rose-100 dark:bg-rose-800/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[18px]">warning</span>
                                </div>
                                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Incidents</p>
                                <span className="text-2xl font-black text-rose-600 dark:text-rose-400">{selectedUser.planType === 'ENTERPRISE' ? 45 : selectedUser.planType === 'PRO' ? 12 : 3}</span>
                            </div>
                        </div>

                        {/* Quota Progress */}
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 mt-3 shadow-sm">
                            <div className="flex justify-between items-end mb-3">
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Sử dụng API Quota</span>
                                <span className="text-xl font-black text-primary">65%</span>
                            </div>
                            <div className="w-full h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full relative" style={{ width: '65%' }}>
                                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Plan Management */}
                    <div className="space-y-3">
                        <h5 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Quản lý Plan</h5>
                        <div className="bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700 shadow-md relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                            
                            <div className="p-4 relative z-10">
                                <div className="flex justify-between items-center mb-5">
                                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Plan hết hạn:</span>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600">
                                        {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <select defaultValue="" className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer">
                                            <option value="" disabled>Thay đổi gói mới...</option>
                                            <option value="FREE">Gói Free</option>
                                            <option value="PRO">Gói Pro</option>
                                            <option value="ENTERPRISE">Gói Enterprise</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                    </div>
                                    <button className="px-5 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 shadow-md">
                                        Lưu
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    <button className="flex items-center justify-center gap-2 py-3 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-200 font-bold text-xs transition-all shadow-sm">
                                        <span className="material-symbols-outlined text-[18px]">autorenew</span>
                                        Gia hạn thêm
                                    </button>
                                    <button className="flex items-center justify-center gap-2 py-3 bg-white hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-900/20 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 font-bold text-xs transition-all shadow-sm">
                                        <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                                        Hạ cấp Free
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between gap-3 relative z-10">
                    {selectedUser.status === 'ACTIVE' ? (
                        <button
                            onClick={() => { handleBlockUser(selectedUser.id); setSelectedUser(null); }}
                            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900/50 text-rose-600 rounded-xl font-bold text-sm hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">lock</span>
                            Khóa User
                        </button>
                    ) : (
                        <button
                            onClick={() => { handleActiveUser(selectedUser.id); setSelectedUser(null); }}
                            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-900/50 text-emerald-600 rounded-xl font-bold text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">lock_open</span>
                            Mở khóa
                        </button>
                    )}
                    <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                        Sửa Info
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserDetailsSidebar;
