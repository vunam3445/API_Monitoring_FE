import React from 'react';

const Charts = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Response Time Chart */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold">Avg. Response Time</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last 24h</span>
                </div>
                <div className="h-40 flex items-end gap-2 px-2">
                    <div className="flex-1 bg-primary/20 rounded-t w-full" style={{ height: '40%' }}></div>
                    <div className="flex-1 bg-primary/20 rounded-t w-full" style={{ height: '55%' }}></div>
                    <div className="flex-1 bg-primary/20 rounded-t w-full" style={{ height: '45%' }}></div>
                    <div className="flex-1 bg-primary/20 rounded-t w-full" style={{ height: '70%' }}></div>
                    <div className="flex-1 bg-primary rounded-t w-full" style={{ height: '85%' }}></div>
                    <div className="flex-1 bg-primary/20 rounded-t w-full" style={{ height: '60%' }}></div>
                    <div className="flex-1 bg-primary/20 rounded-t w-full" style={{ height: '40%' }}></div>
                    <div className="flex-1 bg-primary/20 rounded-t w-full" style={{ height: '35%' }}></div>
                    <div className="flex-1 bg-primary/20 rounded-t w-full" style={{ height: '50%' }}></div>
                    <div className="flex-1 bg-primary/20 rounded-t w-full" style={{ height: '45%' }}></div>
                </div>
                <div className="flex justify-between mt-3 text-[10px] text-slate-400 font-bold">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>23:59</span>
                </div>
            </div>

            {/* Error Rate Bar Chart */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold">Error Rate (%)</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global</span>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Auth Service</span>
                            <span className="font-bold">0.12%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: '12%' }}></div>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Payments</span>
                            <span className="font-bold">4.85%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500" style={{ width: '48%' }}></div>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Inventory</span>
                            <span className="font-bold">12.4%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500" style={{ width: '82%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Charts;
