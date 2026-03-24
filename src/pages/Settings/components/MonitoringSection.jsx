import React from 'react';

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
                    <span className="text-sm font-medium">Check Interval (seconds)</span>
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
                    <span className="text-sm font-medium">Retry Attempts</span>
                    <input
                        className="w-20 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 px-2 outline-none focus:ring-1 focus:ring-primary text-center"
                        type="number"
                        value={data.retryAttempts || 0}
                        onChange={(e) => onChange('retryAttempts', parseInt(e.target.value))}
                    />
                </div>
                {/* <div className="flex items-center justify-between pt-2">
                    <div>
                         <p className="text-sm font-semibold">Regional Monitoring</p>
                         <p className="text-[11px] text-slate-500">Monitor from 8 global locations</p>
                    </div>
                    <input 
                        checked={data.regionalMonitoringEnabled || false}
                        onChange={(e) => onChange('regionalMonitoringEnabled', e.target.checked)}
                        className="w-10 h-5 rounded-full bg-slate-200 dark:bg-slate-700 appearance-none checked:bg-primary cursor-pointer relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all checked:after:left-[22px]"
                        type="checkbox" 
                    />
                </div> */}
            </div>
        </section>
    );
};

export default MonitoringSection;
