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

const MonitoringSection = ({ data, onChange }) => {
    if (!data) return null;

    return (
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">satellite_alt</span>
                <h2 className="text-lg font-bold">Monitoring Settings</h2>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-sm font-medium">Check Interval (seconds)</span>
                        <Tooltip text="Tần suất gửi request để tự động kiểm tra trạng thái API. Tần suất tối thiểu phụ thuộc vào Gói dịch vụ hiện tại của bạn." />
                    </div>
                    <select
                        value={data.checkInterval || 300}
                        onChange={(e) => onChange('checkInterval', parseInt(e.target.value))}
                        className="text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 px-2 outline-none focus:ring-1 focus:ring-primary">
                        <option value={30}>Every 30 seconds</option>
                        <option value={60}>Every 1 minute</option>
                        <option value={300}>Every 5 minutes</option>
                        <option value={600}>Every 10 minutes</option>
                        <option value={900}>Every 15 minutes</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-sm font-medium">Retry Attempts</span>
                        <Tooltip text="Số lần tự động kiểm tra lại ngay lập tức khi phát hiện lỗi mạng tạm thời, giúp giảm thiểu cảnh báo giả." />
                    </div>
                    <input
                        className="w-20 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 px-2 outline-none focus:ring-1 focus:ring-primary text-center"
                        type="number"
                        value={data.retryAttempts || 0}
                        onChange={(e) => onChange('retryAttempts', parseInt(e.target.value))}
                    />
                </div>
            </div>
        </section>
    );
};

export default MonitoringSection;
