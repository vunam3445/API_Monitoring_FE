import React from 'react';

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
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Uptime Window</label>
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
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Latency Averaging</label>
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
