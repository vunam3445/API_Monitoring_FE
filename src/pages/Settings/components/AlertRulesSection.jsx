import React from 'react';

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
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Timeout (ms)</label>
                    <input
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium px-3 py-2 outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        type="number" 
                        value={data.defaultTimeoutMs || 0} 
                        onChange={(e) => onChange('defaultTimeoutMs', parseInt(e.target.value))}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Latency (ms)</label>
                    <input
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium px-3 py-2 outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        type="number" 
                        value={data.defaultLatencyMs || 0} 
                        onChange={(e) => onChange('defaultLatencyMs', parseInt(e.target.value))}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Error Rate (%)</label>
                    <input
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium px-3 py-2 outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        type="number" 
                        value={data.defaultErrorRate || 0} 
                        onChange={(e) => onChange('defaultErrorRate', parseInt(e.target.value))}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Fail Count</label>
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
