import React from 'react';

const Tooltip = ({ text }) => (
    <div className="group relative inline-flex items-center ml-1">
        <span className="material-symbols-outlined text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-[13px] cursor-help leading-none select-none">help</span>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-slate-950/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 dark:border-slate-600/30 text-white text-[10px] rounded-lg shadow-lg z-50 pointer-events-none transition-all font-normal normal-case leading-normal tracking-wide text-center">
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950/95 dark:border-t-slate-800/95"></div>
        </div>
    </div>
);

const AlertRulesSection = ({ data, onChange }) => {
    if (!data) return null;

    return (
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">rule</span>
                <h2 className="text-lg font-bold">Alert Rules</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">Timeout (ms)</label>
                        <Tooltip text="Thời gian chờ tối đa (ms) trước khi tính là lỗi timeout." />
                    </div>
                    <input
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium px-3 py-2 outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        type="number" 
                        value={data.defaultTimeoutMs || 0} 
                        onChange={(e) => onChange('defaultTimeoutMs', parseInt(e.target.value))}
                    />
                </div>
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">Latency (ms)</label>
                        <Tooltip text="Ngưỡng thời gian phản hồi chậm (ms) để hệ thống gửi cảnh báo." />
                    </div>
                    <input
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium px-3 py-2 outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        type="number" 
                        value={data.defaultLatencyMs || 0} 
                        onChange={(e) => onChange('defaultLatencyMs', parseInt(e.target.value))}
                    />
                </div>
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">Error Rate (%)</label>
                        <Tooltip text="Tỉ lệ phần trăm lỗi tối đa cho phép trên tổng số lượt quét trước khi cảnh báo." />
                    </div>
                    <input
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium px-3 py-2 outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        type="number" 
                        value={data.defaultErrorRate || 0} 
                        onChange={(e) => onChange('defaultErrorRate', parseInt(e.target.value))}
                    />
                </div>
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">Fail Count</label>
                        <Tooltip text="Số lần quét lỗi liên tiếp để xác nhận và gửi cảnh báo API sập (Down)." />
                    </div>
                    <input
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium px-3 py-2 outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        type="number" 
                        value={data.defaultFailCount || 0} 
                        onChange={(e) => onChange('defaultFailCount', parseInt(e.target.value))}
                    />
                </div>
            </div>
        </section>
    );
};

export default AlertRulesSection;
