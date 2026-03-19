import React from 'react';

const MonitoringSection = () => {
    return (
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">satellite_alt</span>
                <h2 className="text-lg font-bold">Monitoring Settings</h2>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Check Interval</span>
                    <select
                        className="text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 px-2 outline-none focus:ring-1 focus:ring-primary">
                        <option>Every 1 minute</option>
                        <option defaultValue="Every 5 minutes">Every 5 minutes</option>
                        <option>Every 15 minutes</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Retry Attempts</span>
                    <input
                        className="w-20 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 px-2 outline-none focus:ring-1 focus:ring-primary text-center"
                        type="number" defaultValue="2" />
                </div>
                {/* <div className="flex items-center justify-between pt-2">
                    <div>
                        <p className="text-sm font-semibold">Regional Monitoring</p>
                        <p className="text-[11px] text-slate-500">Monitor from 8 global locations</p>
                    </div>
                    <input defaultChecked
                        className="w-10 h-5 rounded-full bg-slate-200 dark:bg-slate-700 appearance-none checked:bg-primary cursor-pointer relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all checked:after:left-[22px]"
                        type="checkbox" />
                </div> */}
            </div>
        </section>
    );
};

export default MonitoringSection;
