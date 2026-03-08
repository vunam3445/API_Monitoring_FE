import React from 'react';

const UptimeGauge = () => {
    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <h3 className="font-bold mb-6 text-left">API Uptime</h3>
            <div className="relative inline-flex items-center justify-center">
                <svg className="size-48 transform -rotate-90">
                    <circle className="text-slate-100 dark:text-slate-800" cx="96" cy="96"
                        fill="transparent" r="84" stroke="currentColor" strokeWidth="16"></circle>
                    <circle className="text-primary" cx="96" cy="96" fill="transparent" r="84"
                        stroke="currentColor" strokeDasharray="527" strokeDashoffset="15"
                        strokeLinecap="round" strokeWidth="16"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">99.2</span>
                    <span className="text-xs text-slate-500 font-bold">%</span>
                </div>
            </div>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                System performance is <span className="text-emerald-500 font-bold italic">Optimal</span>
            </p>
        </div>
    );
};

export default UptimeGauge;
