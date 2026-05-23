import React from 'react';

const RevenueStats = ({ stats }) => {
    if (!stats) return null;

    const formatVND = (value) => {
        if (value >= 1000000000) return `${(value / 1000000000).toFixed(2)} Tỷ`;
        if (value >= 1000000) return `${(value / 1000000).toFixed(2)} Tr`;
        return value.toLocaleString('vi-VN') + ' ₫';
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {/* Row 1: Revenue Metrics */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Tổng doanh thu</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                        {formatVND(stats?.totalRevenue || 0)}
                    </span>
                    <span className={`text-xs font-black flex items-center gap-0.5 px-2 py-0.5 rounded-full ${(stats?.revenueGrowth || 0) >= 0 ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
                        <span className="material-symbols-outlined text-[14px]">
                            {(stats?.revenueGrowth || 0) >= 0 ? 'trending_up' : 'trending_down'}
                        </span>
                        {Math.abs(stats?.revenueGrowth || 0)}%
                    </span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Lifetime Earnings</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Doanh thu định kỳ (MRR)</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                        {formatVND(stats?.mrr || 0)}
                    </span>
                    <span className={`text-xs font-black flex items-center gap-0.5 px-2 py-0.5 rounded-full ${(stats?.mrrGrowth || 0) >= 0 ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
                        <span className="material-symbols-outlined text-[14px]">
                            {(stats?.mrrGrowth || 0) >= 0 ? 'trending_up' : 'trending_down'}
                        </span>
                        {Math.abs(stats?.mrrGrowth || 0)}%
                    </span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">ARPU: {(stats?.arpu || 0).toLocaleString('vi-VN')} ₫</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Gói đang hoạt động</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                        {(stats?.activeSubscriptions || 0).toLocaleString()}
                    </span>
                    <span className={`text-xs font-black flex items-center gap-0.5 px-2 py-0.5 rounded-full ${(stats?.subsGrowth || 0) >= 0 ? 'text-blue-500 bg-blue-500/10' : 'text-slate-500 bg-slate-500/10'}`}>
                        <span className="material-symbols-outlined text-[14px]">group</span>
                        {(stats?.subsGrowth || 0) >= 0 ? '+' : ''}{stats?.subsGrowth || 0}%
                    </span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Across all paid tiers</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Sắp hết hạn (7 ngày)</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-amber-500 tracking-tighter">{stats?.expiringSoon || 0}</span>
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                        Cảnh báo
                    </span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">LTV: {(stats?.ltv || 0).toLocaleString('vi-VN')} ₫</p>
            </div>
        </div>
    );
};

export default RevenueStats;
