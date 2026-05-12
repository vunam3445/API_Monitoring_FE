import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { getStatusBadge, getPlanBadge, formatDate } from '../utils';

// Dropdown dùng Portal để thoát khỏi overflow container
const ActionMenu = ({ user, triggerRef, onClose, setSelectedUser, handleBlockUser, handleActiveUser, onOpenRenewal, onOpenCustomLimit }) => {
    const [pos, setPos] = useState({ top: 0, right: 0 });

    useEffect(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPos({
                top: rect.bottom + window.scrollY + 4,
                right: window.innerWidth - rect.right,
            });
        }
    }, [triggerRef]);

    return createPortal(
        <div
            className="fixed w-48 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl z-[9999] py-2 animate-in fade-in zoom-in duration-150 origin-top-right user-action-menu"
            style={{ top: pos.top, right: pos.right }}
        >
            <button
                onClick={(e) => { e.stopPropagation(); setSelectedUser(user); onClose(); }}
                className="w-full px-4 py-2.5 text-left text-sm font-bold flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-slate-700 dark:text-slate-200"
            >
                <span className="material-symbols-outlined text-[18px] text-slate-400">visibility</span>
                Xem chi tiết
            </button>

            {user.status === 'ACTIVE' ? (
                <button
                    onClick={(e) => { e.stopPropagation(); handleBlockUser(user.id); onClose(); }}
                    className="w-full px-4 py-2.5 text-left text-sm font-bold flex items-center gap-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    Khóa tài khoản
                </button>
            ) : (
                <button
                    onClick={(e) => { e.stopPropagation(); handleActiveUser(user.id); onClose(); }}
                    className="w-full px-4 py-2.5 text-left text-sm font-bold flex items-center gap-3 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">lock_open</span>
                    Kích hoạt lại
                </button>
            )}

            <div className="my-1 border-t border-slate-100 dark:border-slate-700"></div>

            <button
                onClick={(e) => { e.stopPropagation(); onOpenRenewal(user); onClose(); }}
                className="w-full px-4 py-2.5 text-left text-sm font-bold flex items-center gap-3 text-primary hover:bg-primary/5 transition-colors"
            >
                <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                Gia hạn gói cước
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); if (onOpenCustomLimit) onOpenCustomLimit(user); onClose(); }}
                className="w-full px-4 py-2.5 text-left text-sm font-bold flex items-center gap-3 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
            >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                Thay đổi giới hạn
            </button>

            <button
                className="w-full px-4 py-2.5 text-left text-sm font-bold flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
                <span className="material-symbols-outlined text-[18px] text-slate-400">edit</span>
                Chỉnh sửa
            </button>
        </div>,
        document.body
    );
};

// Row với trigger button giữ ref
const UserRow = ({ user, activeMenuId, setActiveMenuId, setSelectedUser, handleBlockUser, handleActiveUser, onOpenRenewal, onOpenCustomLimit }) => {
    const btnRef = useRef(null);
    const isOpen = activeMenuId === user.id;

    return (
        <tr
            onClick={(e) => { if (e.target.closest('button')) return; setSelectedUser(user); }}
            className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
        >
            <td className="px-6 py-4 text-[10px] font-mono text-slate-400 max-w-[100px] truncate">{user.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700 shadow-sm relative">
                        <img
                            alt="User Avatar"
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                            src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random`}
                        />
                        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white dark:border-slate-900 rounded-full ${getStatusBadge(user.status).bg}`}></div>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">{user.fullName}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-center">
                <div className="flex flex-col items-center gap-1.5">
                    {user.role === 'ADMIN' ? (
                        <span className="text-slate-300 dark:text-slate-600 font-bold">--</span>
                    ) : (
                        <>
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-sm ${getPlanBadge(user.planType)}`}>
                                {user.planType}
                            </span>
                            {user.billingStatus === 'OVERDUE' && (
                                <span className="text-[9px] font-bold text-red-600 bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded uppercase border border-red-200 dark:border-red-800">
                                    Overdue
                                </span>
                            )}
                            {user.billingStatus === 'TRIAL' && (
                                <span className="text-[9px] font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-1.5 py-0.5 rounded uppercase border border-blue-200 dark:border-blue-800">
                                    Trial
                                </span>
                            )}
                        </>
                    )}
                </div>
            </td>
            <td className="px-6 py-4">
                {user.role === 'ADMIN' ? (
                    <div className="text-center text-slate-300 dark:text-slate-600 font-bold">--</div>
                ) : (
                    <div className="flex flex-col gap-1 w-24 mx-auto">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500">
                            <span>Monitors</span>
                            <span className={user.monitors >= user.maxMonitors ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}>
                                {user.monitors || 0}/{user.maxMonitors || 0}
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                            <div
                                className={`h-1.5 rounded-full ${user.monitors >= user.maxMonitors ? 'bg-red-500' : 'bg-emerald-500'}`}
                                style={{ width: `${Math.min(100, ((user.monitors || 0) / (user.maxMonitors || 1)) * 100)}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </td>
            <td className="px-6 py-4 text-center">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'} shadow-sm`}>
                    {user.role}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusBadge(user.status).bg} text-white shadow-sm`}>
                        {user.status}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap">{formatDate(user.lastLoginAt)}</td>
            <td className="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap">{formatDate(user.createdAt)}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                {user.currentPeriodEnd ? (() => {
                    const exp = new Date(user.currentPeriodEnd);
                    const now = new Date();
                    const daysLeft = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
                    const isExpired = daysLeft < 0;
                    const isSoon = daysLeft >= 0 && daysLeft <= 30;
                    return (
                        <div className="flex flex-col gap-0.5">
                            <span className={`text-xs font-bold ${isExpired ? 'text-red-500' : isSoon ? 'text-amber-500' : 'text-slate-600 dark:text-slate-300'}`}>
                                {formatDate(user.currentPeriodEnd)}
                            </span>
                            <span className={`text-[10px] font-semibold ${isExpired ? 'text-red-400' : isSoon ? 'text-amber-400' : 'text-slate-400'}`}>
                                {isExpired ? `Hết hạn ${Math.abs(daysLeft)} ngày trước` : `Còn ${daysLeft} ngày`}
                            </span>
                        </div>
                    );
                })() : <span className="text-xs text-slate-300 dark:text-slate-600">--</span>}
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end relative">
                    <button
                        ref={btnRef}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(isOpen ? null : user.id);
                        }}
                        className={`p-1.5 rounded-lg transition-all ${isOpen ? 'bg-slate-100 dark:bg-slate-700 text-primary' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200'}`}
                    >
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>

                    {isOpen && (
                        <ActionMenu
                            user={user}
                            triggerRef={btnRef}
                            onClose={() => setActiveMenuId(null)}
                            setSelectedUser={setSelectedUser}
                            handleBlockUser={handleBlockUser}
                            handleActiveUser={handleActiveUser}
                            onOpenRenewal={onOpenRenewal}
                            onOpenCustomLimit={onOpenCustomLimit}
                        />
                    )}
                </div>
            </td>
        </tr>
    );
};

const UserTable = ({ users, loading, activeMenuId, setActiveMenuId, setSelectedUser, handleBlockUser, handleActiveUser, onOpenRenewal, onOpenCustomLimit }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">User ID</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Tên & Email</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Gói</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Sử dụng</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Quyền</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Trạng thái</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Đăng nhập cuối</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Ngày tạo</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Hết hạn gói</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80 dark:divide-slate-800">
                    {loading && (
                        <tr>
                            <td colSpan="10" className="px-6 py-12 text-center text-slate-400">
                                <div className="flex flex-col items-center gap-3">
                                    <span className="material-symbols-outlined animate-spin text-4xl text-primary">refresh</span>
                                    <p className="font-bold">Đang tải dữ liệu người dùng...</p>
                                </div>
                            </td>
                        </tr>
                    )}
                    {!loading && users.length === 0 && (
                        <tr>
                            <td colSpan="10" className="px-6 py-12 text-center text-slate-400">
                                <span className="material-symbols-outlined text-4xl mb-2 text-slate-300 dark:text-slate-600">group_off</span>
                                <p className="font-bold">Không tìm thấy người dùng nào phù hợp với bộ lọc.</p>
                            </td>
                        </tr>
                    )}
                    {!loading && users.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            activeMenuId={activeMenuId}
                            setActiveMenuId={setActiveMenuId}
                            setSelectedUser={setSelectedUser}
                            handleBlockUser={handleBlockUser}
                            handleActiveUser={handleActiveUser}
                            onOpenRenewal={onOpenRenewal}
                            onOpenCustomLimit={onOpenCustomLimit}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
