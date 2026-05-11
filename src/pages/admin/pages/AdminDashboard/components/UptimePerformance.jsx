import React from 'react';

const UptimePerformance = () => {
    return (
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Uptime & Performance</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Response time trends over the last 24 hours</p>
                </div>
                <div className="flex gap-2 text-slate-800 dark:text-slate-200">
                    <button className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">1H</button>
                    <button className="px-3 py-1 text-xs font-semibold rounded-lg bg-primary text-white shadow-sm shadow-primary/40 hover:bg-primary/90 transition-colors">24H</button>
                    <button className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">7D</button>
                </div>
            </div>
            <div className="p-6 flex-1 flex flex-col gap-6">
                <div className="flex gap-8">
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Avg. Response Time</p>
                        <p className="text-2xl font-bold text-blue-500">248 ms</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Uptime %</p>
                        <p className="text-2xl font-bold text-emerald-500">99.98%</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Error Rate</p>
                        <p className="text-2xl font-bold text-red-400">0.04%</p>
                    </div>
                </div>
                <div className="relative h-64 w-full bg-gradient-to-b from-blue-500/5 to-transparent rounded-lg border-l border-b border-slate-200 dark:border-slate-800 flex items-end px-4 gap-1 overflow-hidden group">
                    {[60, 65, 58, 72, 80, 75, 62, 68, 55, 48, 52, 60, 65, 70, 64].map((h, i) => (
                        <div 
                            key={i} 
                            className={`flex-1 transition-all opacity-80 group-hover:opacity-100 rounded-t ${
                                i === 13 ? 'bg-blue-500/60 border-t-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-blue-500/30'
                            }`}
                            style={{ height: `${h}%` }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UptimePerformance;
