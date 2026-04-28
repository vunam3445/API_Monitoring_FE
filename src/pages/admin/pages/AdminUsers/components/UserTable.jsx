import React from 'react';
import { getStatusBadge, getPlanBadge, formatDate } from '../utils';

const UserTable = ({ users, loading, activeMenuId, setActiveMenuId, setSelectedUser, handleBlockUser, handleActiveUser }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">User ID</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Tên & Email</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Gói</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Quyền</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Trạng thái</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Đăng nhập cuối</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Ngày tạo</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80 dark:divide-slate-800">
                    {loading && (
                        <tr>
                            <td colSpan="8" className="px-6 py-12 text-center text-slate-400">
                                <div className="flex flex-col items-center gap-3">
                                    <span className="material-symbols-outlined animate-spin text-4xl text-primary">refresh</span>
                                    <p className="font-bold">Đang tải dữ liệu người dùng...</p>
                                </div>
                            </td>
                        </tr>
                    )}
                    {!loading && users.length === 0 && (
                        <tr>
                            <td colSpan="8" className="px-6 py-12 text-center text-slate-400">
                                <span className="material-symbols-outlined text-4xl mb-2 text-slate-300 dark:text-slate-600">group_off</span>
                                <p className="font-bold">Không tìm thấy người dùng nào phù hợp với bộ lọc.</p>
                            </td>
                        </tr>
                    )}
                    {!loading && users.map((user) => (
                        <tr key={user.id} onClick={(e) => {
                            if (e.target.closest('button')) return;
                            setSelectedUser(user);
                        }} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
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
                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-sm ${getPlanBadge(user.planType)}`}>
                                    {user.planType}
                                </span>
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
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end user-action-menu relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveMenuId(activeMenuId === user.id ? null : user.id);
                                        }}
                                        className={`p-1.5 rounded-lg transition-all ${activeMenuId === user.id ? 'bg-slate-100 dark:bg-slate-700 text-primary' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200'}`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                    </button>

                                    {activeMenuId === user.id && (
                                        <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl z-50 py-2 animate-in fade-in zoom-in duration-150 origin-top-right">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedUser(user);
                                                    setActiveMenuId(null);
                                                }}
                                                className="w-full px-4 py-2.5 text-left text-sm font-bold flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-slate-700 dark:text-slate-200"
                                            >
                                                <span className="material-symbols-outlined text-[18px] text-slate-400">visibility</span>
                                                Xem chi tiết
                                            </button>

                                            {user.status === 'ACTIVE' ? (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleBlockUser(user.id);
                                                        setActiveMenuId(null);
                                                    }}
                                                    className="w-full px-4 py-2.5 text-left text-sm font-bold flex items-center gap-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">lock</span>
                                                    Khóa tài khoản
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleActiveUser(user.id);
                                                        setActiveMenuId(null);
                                                    }}
                                                    className="w-full px-4 py-2.5 text-left text-sm font-bold flex items-center gap-3 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">lock_open</span>
                                                    Kích hoạt lại
                                                </button>
                                            )}

                                            <div className="my-1 border-t border-slate-100 dark:border-slate-700"></div>

                                            <button
                                                className="w-full px-4 py-2.5 text-left text-sm font-bold flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[18px] text-slate-400">edit</span>
                                                Chỉnh sửa
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
