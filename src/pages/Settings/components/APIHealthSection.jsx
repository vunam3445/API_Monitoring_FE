import React from 'react';

const Tooltip = ({ text }) => (
    <div className="group relative inline-flex items-center ml-1.5">
        <span className="material-symbols-outlined text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-[15px] cursor-help leading-none select-none">help</span>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-52 p-2 bg-slate-950/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 dark:border-slate-600/30 text-white text-[10.5px] rounded-lg shadow-lg z-50 pointer-events-none transition-all font-normal normal-case leading-normal tracking-wide text-center">
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950/95 dark:border-t-slate-800/95"></div>
        </div>
    </div>
);

const APIHealthSection = ({ data, onChange }) => {
    if (!data) return null;

    return (
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">analytics</span>
                <h2 className="text-lg font-bold">API Health Calculation</h2>
            </div>
            <div className="space-y-4">
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">Uptime Window</label>
                        <Tooltip text="Khoảng thời gian (24h, 7 ngày, 30 ngày) được dùng làm cơ sở dữ liệu tính toán tỉ lệ hoạt động (% Uptime) của API." />
                    </div>
                    <select
                        value={data.uptimeWindow || '24h'}
                        onChange={(e) => onChange('uptimeWindow', e.target.value)}
                        className="w-full text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary">
                        <option value="24h">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">Latency Averaging</label>
                        <Tooltip text="Thuật toán tính toán độ trễ trung bình của API. MEAN (trung bình cộng), P95 (95% phản hồi nhanh hơn mức này), P99 (99% nhanh hơn)." />
                    </div>
                    <select
                        value={data.latencyAveraging || 'MEAN'}
                        onChange={(e) => onChange('latencyAveraging', e.target.value)}
                        className="w-full text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary">
                        <option value="MEAN">Arithmetic Mean (Standard)</option>
                        <option value="P95">95th Percentile (P95)</option>
                        <option value="P99">99th Percentile (P99)</option>
                    </select>
                </div>
            </div>
        </section>
    );
};

export default APIHealthSection;
