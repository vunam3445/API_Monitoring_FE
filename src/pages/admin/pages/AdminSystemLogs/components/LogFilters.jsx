import React from 'react';

const LogFilters = ({ 
    keyword, 
    setKeyword, 
    levelFilter, 
    setLevelFilter, 
    timeFilter, 
    setTimeFilter 
}) => {
    return (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tìm kiếm toàn văn</label>
                    <div className="relative">
                        <span className="material-symbols-outlined text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 text-lg">search</span>
                        <input 
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-white" 
                            placeholder="Tìm theo message, class, thread ID..." 
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cấp độ lỗi (Level)</label>
                    <select 
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-white"
                        value={levelFilter}
                        onChange={(e) => setLevelFilter(e.target.value)}
                    >
                        <option value="ALL">Tất cả cấp độ (ALL)</option>
                        <option value="INFO">INFO (Thông tin hệ thống)</option>
                        <option value="WARN">WARN (Cảnh báo)</option>
                        <option value="ERROR">ERROR (Lỗi nghiệp vụ)</option>
                        <option value="FATAL">FATAL (Lỗi hệ thống chí mạng)</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Khoảng thời gian</label>
                    <select 
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-white"
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                    >
                        <option value="ALL">Tất cả thời gian</option>
                        <option value="5m">5 phút gần nhất</option>
                        <option value="1h">1 giờ gần nhất</option>
                        <option value="24h">24 giờ gần nhất</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default LogFilters;
