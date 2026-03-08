import React from 'react';

const MonitoringCharts = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Response Time Chart */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">API Response Time (ms)</h3>
                    <span className="text-xs font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg uppercase tracking-wider">Avg 45ms</span>
                </div>
                <div className="h-64 flex flex-col">
                    <svg className="flex-1 w-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                        <defs>
                            <linearGradient id="latencyGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#ec5b13" stopOpacity="0.2"></stop>
                                <stop offset="100%" stopColor="#ec5b13" stopOpacity="0"></stop>
                            </linearGradient>
                        </defs>
                        <path d="M0 120 Q 50 110, 100 130 T 200 100 T 300 140 T 400 90 L 400 150 L 0 150 Z"
                            fill="url(#latencyGradient)"></path>
                        <path d="M0 120 Q 50 110, 100 130 T 200 100 T 300 140 T 400 90" fill="none"
                            stroke="#ec5b13" strokeWidth="3"></path>
                    </svg>
                    <div className="flex justify-between mt-4 text-xs text-slate-400 font-bold uppercase tracking-wider">
                        <span>10:00</span><span>10:15</span><span>10:30</span><span>10:45</span><span>11:00</span>
                    </div>
                </div>
            </div>

            {/* Error Rate Chart */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Error Rate (%)</h3>
                    <span className="text-xs font-bold px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg uppercase tracking-wider">Peak 1.2%</span>
                </div>
                <div className="h-64 flex flex-col justify-end gap-1">
                    <div className="flex items-end gap-2 h-full px-2 w-full">
                        <div className="bg-slate-200 dark:bg-slate-800 w-full rounded-t-sm transition-all duration-500 hover:bg-slate-300 dark:hover:bg-slate-700" style={{ height: '10%' }}></div>
                        <div className="bg-slate-200 dark:bg-slate-800 w-full rounded-t-sm transition-all duration-500 hover:bg-slate-300 dark:hover:bg-slate-700" style={{ height: '15%' }}></div>
                        <div className="bg-red-400 dark:bg-red-500 w-full rounded-t-sm transition-all duration-500 hover:bg-red-500 dark:hover:bg-red-400" style={{ height: '60%' }}></div>
                        <div className="bg-slate-200 dark:bg-slate-800 w-full rounded-t-sm transition-all duration-500 hover:bg-slate-300 dark:hover:bg-slate-700" style={{ height: '12%' }}></div>
                        <div className="bg-slate-200 dark:bg-slate-800 w-full rounded-t-sm transition-all duration-500 hover:bg-slate-300 dark:hover:bg-slate-700" style={{ height: '8%' }}></div>
                        <div className="bg-slate-200 dark:bg-slate-800 w-full rounded-t-sm transition-all duration-500 hover:bg-slate-300 dark:hover:bg-slate-700" style={{ height: '20%' }}></div>
                        <div className="bg-red-400 dark:bg-red-500 w-full rounded-t-sm transition-all duration-500 hover:bg-red-500 dark:hover:bg-red-400" style={{ height: '45%' }}></div>
                        <div className="bg-slate-200 dark:bg-slate-800 w-full rounded-t-sm transition-all duration-500 hover:bg-slate-300 dark:hover:bg-slate-700" style={{ height: '10%' }}></div>
                        <div className="bg-slate-200 dark:bg-slate-800 w-full rounded-t-sm transition-all duration-500 hover:bg-slate-300 dark:hover:bg-slate-700" style={{ height: '14%' }}></div>
                        <div className="bg-slate-200 dark:bg-slate-800 w-full rounded-t-sm transition-all duration-500 hover:bg-slate-300 dark:hover:bg-slate-700" style={{ height: '5%' }}></div>
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-400 font-bold uppercase tracking-wider">
                        <span>10:00</span><span>10:15</span><span>10:30</span><span>10:45</span><span>11:00</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonitoringCharts;
