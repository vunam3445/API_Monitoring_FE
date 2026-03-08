import React from 'react';

const DangerZoneSection = () => {
    return (
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border-2 border-red-100 dark:border-red-900/30">
            <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-red-500">dangerous</span>
                <h2 className="text-lg font-bold text-red-600 dark:text-red-400">Danger Zone</h2>
            </div>
            <div className="space-y-3">
                <button
                    className="w-full flex items-center justify-between px-4 py-2.5 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400 text-sm font-bold transition-colors">
                    <span>Reset monitoring data</span>
                    <span className="material-symbols-outlined text-[18px]">history</span>
                </button>
                <button
                    className="w-full flex items-center justify-between px-4 py-2.5 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400 text-sm font-bold transition-colors">
                    <span>Clear all active alerts</span>
                    <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
                </button>
                <button
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-bold transition-colors shadow-lg shadow-red-500/20 active:scale-95">
                    <span>Delete Organization</span>
                    <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                </button>
            </div>
        </section>
    );
};

export default DangerZoneSection;
