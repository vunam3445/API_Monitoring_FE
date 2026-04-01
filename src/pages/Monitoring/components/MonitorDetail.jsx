import React from 'react';

const MonitorDetail = ({ monitor, onBack }) => {
    return (
        <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
            {/* Detail Header */}
            <div className="flex flex-wrap items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={onBack}
                        className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 group"
                    >
                        <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">arrow_back</span>
                    </button>
                    <div>
                        <div className="flex items-center gap-3 mb-1.5 text-slate-900 dark:text-white">
                            <span className="text-3xl font-black tracking-tight">{monitor.name}</span>
                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest leading-none flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                Monitoring Active
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-black text-slate-500 uppercase tracking-tighter">{monitor.method}</span>
                           <code className="text-xs font-mono text-slate-400">{monitor.url}</code>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 ml-auto">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm hover:shadow-md transition-all active:scale-95 group">
                        <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-primary transition-colors">play_circle</span>
                        Run now
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm hover:shadow-md transition-all active:scale-95 group">
                        <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-primary transition-colors">notifications_off</span>
                        Mute
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:opacity-90 transition-all active:scale-95">
                        <span className="material-symbols-outlined text-sm">settings</span>
                        Configure
                    </button>
                </div>
            </div>

            {/* Performance Snapshot Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Response Time</p>
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{monitor.latency}</h4>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">24h Uptime</p>
                    <h4 className="text-3xl font-black text-emerald-500 tracking-tight">99.98%</h4>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Fail count</p>
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{monitor.fails || 0}</h4>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Next Check</p>
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight font-mono">~35s</h4>
                </div>
            </div>

            {/* Charts & Operational History */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                <div className="xl:col-span-2 space-y-10">
                    {/* Placeholder Chart */}
                    <div className="h-96 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 flex flex-col group">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Latency & Uptime Breakdown</h3>
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">
                                    <span className="w-2.5 h-2.5 rounded bg-primary"></span> Latency
                                </span>
                                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">
                                    <span className="w-2.5 h-2.5 rounded bg-slate-200 dark:bg-slate-700"></span> Avg.
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 flex items-end gap-3 px-4">
                            {[40, 55, 45, 70, 85, 30, 95, 20, 60, 45, 80, 50].map((h, i) => (
                                <div key={i} className="flex-1 bg-primary/20 hover:bg-primary rounded-t-xl group/bar relative transition-all duration-300" style={{ height: `${h}%` }}>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                       {h}ms
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                           <span>12:00 PM</span>
                           <span>04:00 PM</span>
                           <span>08:00 PM</span>
                           <span>12:00 AM</span>
                        </div>
                    </div>

                    {/* Incident History Placeholder */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-8">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase tracking-tight">Incident History</h3>
                            <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Archive</span>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-start gap-6 group">
                                <div className="text-xs font-black text-slate-400 italic pt-1 w-20 shrink-0">Oct 24, 08:32</div>
                                <div className="p-1 px-3 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 text-[10px] font-black rounded-full shrink-0 uppercase tracking-tighter self-start">Resolved</div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Timeout occurred for /v1/stock/status</p>
                                    <p className="text-xs text-slate-500 mt-1">Duration: 12m 4s | System returned automatically</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6 group">
                                <div className="text-xs font-black text-slate-400 italic pt-1 w-20 shrink-0">Oct 22, 14:15</div>
                                <div className="p-1 px-3 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 text-[10px] font-black rounded-full shrink-0 uppercase tracking-tighter self-start">Resolved</div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Expected status code: 200, but got 503</p>
                                    <p className="text-xs text-slate-500 mt-1">Duration: 1h 22m | Incident reported to DevOps</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical Panel: Configuration Sidebar */}
                <div className="space-y-10">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-8">Alert Configurations</h3>
                        <div className="space-y-6">
                           <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 border-dashed">
                               <div className="flex items-center gap-3">
                                   <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl">
                                        <span className="material-symbols-outlined text-sm">mail</span>
                                   </div>
                                   <span className="text-xs font-bold">Email Alert</span>
                               </div>
                               <div className="w-10 h-5 bg-emerald-500 rounded-full relative shadow-lg shadow-emerald-500/20">
                                   <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                               </div>
                           </div>
                           <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 border-dashed opacity-50">
                               <div className="flex items-center gap-3">
                                   <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                                        <span className="material-symbols-outlined text-sm">sms</span>
                                   </div>
                                   <span className="text-xs font-bold">Slack Webhook</span>
                               </div>
                               <div className="w-10 h-5 bg-slate-300 dark:bg-slate-700 rounded-full relative">
                                   <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow"></div>
                               </div>
                           </div>
                        </div>
                        <button className="w-full mt-10 py-3 text-[10px] font-black text-primary uppercase tracking-widest border-2 border-primary/20 rounded-xl hover:bg-primary/5 transition-all">
                           Manage Notifications
                        </button>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                        <h3 className="text-lg font-black tracking-tight mb-3">Monitoring Interval</h3>
                        <p className="text-xs text-white/50 leading-relaxed mb-8 font-medium italic">Every 60 seconds (1 minute). This setting affects your plan quota.</p>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={`flex-1 h-1.5 rounded-full ${i === 1 ? 'bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]' : 'bg-white/10'}`}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonitorDetail;
