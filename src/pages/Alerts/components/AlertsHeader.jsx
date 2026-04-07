import React from 'react';

const AlertsHeader = ({ filters, handleFilterChange, refresh }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    Alerts Center
                    <span className="flex h-3 w-3 rounded-full bg-primary animate-pulse"></span>
                </h2>
                <p className="text-slate-500 mt-1 font-medium">Real-time incident monitoring and notification management</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                    {['24h', '7d', '30d'].map((r) => (
                        <button
                            key={r}
                            onClick={() => handleFilterChange({ range: r })}
                            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${filters.range === r
                                    ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            {r.toUpperCase()}
                        </button>
                    ))}
                </div>

                <button
                    onClick={refresh}
                    className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary rounded-xl transition-all shadow-sm"
                    title="Refresh Data"
                >
                    <span className="material-symbols-outlined text-xl font-bold">refresh</span>
                </button>
            </div>
        </div>
    );
};

export default AlertsHeader;
