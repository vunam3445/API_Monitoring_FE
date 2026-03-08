import React from 'react';

const AlertsHeader = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Alerts</h2>
                <p className="text-slate-500 mt-1">Monitor and manage API alerts and incidents in real-time</p>
            </div>
            <div className="flex items-center gap-3">
                <button className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    Resolve All
                </button>
                <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">add_circle</span>
                    Create Alert Rule
                </button>
            </div>
        </div>
    );
};

export default AlertsHeader;
