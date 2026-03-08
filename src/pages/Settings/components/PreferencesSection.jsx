import React from 'react';

const PreferencesSection = () => {
    return (
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">palette</span>
                <h2 className="text-lg font-bold">System Preferences</h2>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Interface Theme</span>
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <button className="px-3 py-1 bg-white dark:bg-slate-700 rounded-md shadow-sm text-xs font-bold text-slate-800 dark:text-white transition-all">Light</button>
                        <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Dark</button>
                        <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">System</button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Display Language</span>
                    <select
                        className="text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 px-3 outline-none focus:ring-1 focus:ring-primary">
                        <option defaultValue="English (US)">English (US)</option>
                        <option>German</option>
                        <option>Spanish</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Timezone</span>
                    <select
                        className="text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 px-3 max-w-[180px] outline-none focus:ring-1 focus:ring-primary">
                        <option defaultValue="(GMT-05:00) Eastern Time">(GMT-05:00) Eastern Time</option>
                        <option>(GMT+00:00) UTC</option>
                    </select>
                </div>
            </div>
        </section>
    );
};

export default PreferencesSection;
