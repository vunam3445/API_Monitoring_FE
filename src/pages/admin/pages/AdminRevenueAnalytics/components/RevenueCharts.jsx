import React from 'react';

const RevenueCharts = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Monthly Revenue Trend */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-900 dark:text-white">Monthly Revenue Trend</h3>
                    <div className="flex gap-2">
                        <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-[10px] font-bold px-3 py-1.5 outline-none text-slate-900 dark:text-white">
                            <option>Gross Revenue</option>
                            <option>Net Revenue</option>
                        </select>
                        <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-[10px] font-bold px-3 py-1.5 outline-none text-slate-900 dark:text-white">
                            <option>Last 12 Months</option>
                            <option>Last 6 Months</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                </div>
                <div className="h-64 flex items-end justify-between gap-2 px-2 relative group">
                    <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[40%] transition-all"></div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[45%] transition-all"></div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[55%] transition-all"></div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[50%] transition-all"></div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[65%] transition-all"></div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[60%] transition-all"></div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[75%] transition-all"></div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[85%] transition-all"></div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[80%] transition-all"></div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/30 rounded-t h-[90%] transition-all"></div>
                    <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t h-[95%] transition-all"></div>
                    <div className="flex-1 bg-primary hover:bg-primary rounded-t h-[100%] transition-all relative cursor-pointer">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                            $98.5k (Dec)
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                </div>
            </div>

            {/* Revenue by Plan */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                <h3 className="font-bold mb-6 text-slate-900 dark:text-white">Revenue by Plan</h3>
                <div className="flex-1 flex items-center justify-center relative">
                    <div className="w-40 h-40 rounded-full border-[12px] border-slate-100 dark:border-slate-800 flex items-center justify-center relative"
                        style={{ background: "conic-gradient(#ec5b13 0% 60%, #f4a261 60% 90%, #e2e8f0 90% 100%)" }}>
                        <div className="w-32 h-32 rounded-full bg-white dark:bg-slate-900 flex flex-col items-center justify-center">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Total</p>
                            <p className="text-xl font-black text-slate-900 dark:text-white">$1.2M</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 font-medium">
                            <span className="w-3 h-3 rounded-full bg-primary"></span>
                            <span className="text-slate-900 dark:text-white">Pro Plan</span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">60%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-400">
                            <span className="w-3 h-3 rounded-full bg-[#f4a261]"></span>
                            <span>Enterprise</span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">35%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-400">
                            <span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></span>
                            <span>Legacy/Other</span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">5%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueCharts;
