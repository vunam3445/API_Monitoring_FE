import React from 'react';

const PerformanceCharts = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Response Time Trend</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">LAST 24H</span>
                </div>
                <div className="h-32 flex items-end gap-1.5">
                    <div className="flex-1 bg-primary/20 rounded-t h-[40%]"></div>
                    <div className="flex-1 bg-primary/20 rounded-t h-[55%]"></div>
                    <div className="flex-1 bg-primary/20 rounded-t h-[45%]"></div>
                    <div className="flex-1 bg-primary/20 rounded-t h-[65%]"></div>
                    <div className="flex-1 bg-primary rounded-t h-[50%]"></div>
                    <div className="flex-1 bg-primary/20 rounded-t h-[75%]"></div>
                    <div className="flex-1 bg-primary/20 rounded-t h-[90%]"></div>
                    <div className="flex-1 bg-primary/20 rounded-t h-[60%]"></div>
                    <div className="flex-1 bg-primary/20 rounded-t h-[40%]"></div>
                    <div className="flex-1 bg-primary/20 rounded-t h-[55%]"></div>
                    <div className="flex-1 bg-primary/20 rounded-t h-[80%]"></div>
                    <div className="flex-1 bg-primary/20 rounded-t h-[30%]"></div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Uptime %</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">LIVE</span>
                </div>
                <div className="relative h-32 w-32 mx-auto">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle className="text-slate-100 dark:text-slate-700" cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" strokeWidth="8"></circle>
                        <circle className="text-primary" cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" strokeDasharray="339.29" strokeDashoffset="3.39" strokeWidth="8"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-slate-900 dark:text-white">99.9%</span>
                        <span className="text-[10px] text-slate-500">Global Avg</span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Error Rate</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-600">2 NEW ERRORS</span>
                </div>
                <div className="h-32 flex items-end justify-between px-2">
                    <div className="w-2 bg-slate-100 dark:bg-slate-700 h-2 rounded-full"></div>
                    <div className="w-2 bg-slate-100 dark:bg-slate-700 h-3 rounded-full"></div>
                    <div className="w-2 bg-red-500 h-8 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                    <div className="w-2 bg-slate-100 dark:bg-slate-700 h-2 rounded-full"></div>
                    <div className="w-2 bg-slate-100 dark:bg-slate-700 h-4 rounded-full"></div>
                    <div className="w-2 bg-red-500 h-6 rounded-full"></div>
                    <div className="w-2 bg-slate-100 dark:bg-slate-700 h-3 rounded-full"></div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Checks Activity</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">THROUGHPUT</span>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 text-xs text-slate-500">GET</div>
                        <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[75%] rounded-full"></div>
                        </div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">75%</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-16 text-xs text-slate-500">POST</div>
                        <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="bg-primary/60 h-full w-[20%] rounded-full"></div>
                        </div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">20%</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-16 text-xs text-slate-500">PUT/DEL</div>
                        <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="bg-primary/30 h-full w-[5%] rounded-full"></div>
                        </div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">5%</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceCharts;
