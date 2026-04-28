import React from 'react';
import { getPlanBadge } from '../utils';

const UserStatsCards = ({ stats, loadingStats }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 relative z-10">
            {/* Main Stats */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative group transition-transform hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 -mr-8 -mt-8 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Tổng user</span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">groups</span>
                    </div>
                </div>
                {loadingStats ? (
                    <div className="h-8 w-20 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg"></div>
                ) : (
                    <div className="text-3xl font-black text-slate-900 dark:text-white">{stats?.totalUser || 0}</div>
                )}
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative group transition-transform hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 -mr-8 -mt-8 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Hoạt động</span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                    </div>
                </div>
                {loadingStats ? (
                    <div className="h-8 w-16 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg"></div>
                ) : (
                    <div className="text-3xl font-black text-emerald-600">{stats?.totalActiveUser || 0}</div>
                )}
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative group transition-transform hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 -mr-8 -mt-8 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Đã chặn</span>
                    <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">block</span>
                    </div>
                </div>
                {loadingStats ? (
                    <div className="h-8 w-12 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg"></div>
                ) : (
                    <div className="text-3xl font-black text-rose-600">{stats?.totalBlockUser || 0}</div>
                )}
            </div>

            {/* Plan Stats */}
            {stats?.planStatistics?.map((plan) => (
                <div key={plan.planName} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative group transition-transform hover:-translate-y-1">
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-slate-500/5 -mr-4 -mb-4 rounded-full"></div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Plan: {plan.planName}</span>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[14px] ${getPlanBadge(plan.planName)}`}>
                            <span className="material-symbols-outlined text-[16px]">
                                {plan.planName === 'ENTERPRISE' ? 'corporate_fare' : plan.planName === 'PRO' ? 'star' : 'person'}
                            </span>
                        </div>
                    </div>
                    {loadingStats ? (
                        <div className="h-8 w-16 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg"></div>
                    ) : (
                        <div className="text-2xl font-black">{plan.totalUser}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default UserStatsCards;
