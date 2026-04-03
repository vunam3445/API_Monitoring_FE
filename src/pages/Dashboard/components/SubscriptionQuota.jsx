import React from 'react';

const SubscriptionQuota = ({ data, loading }) => {
    const planName = data?.planName || 'Free';
    const usage = data?.usedMonitors || 0;
    const limit = data?.monitorLimit || 10;
    const percentage = data?.usagePercentage ?? Math.min((usage / limit) * 100, 100);

    if (loading) {
        return (
            <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-3xl animate-pulse h-64">
                <div className="flex justify-between mb-8">
                    <div className="space-y-2">
                        <div className="w-20 h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="w-32 h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                </div>
                <div className="space-y-4">
                    <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    <div className="w-full h-10 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-3xl text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-10 -mb-10 blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <p className="text-indigo-100/70 text-[10px] font-black uppercase tracking-[0.2em] mb-1.5">Current Tier</p>
                        <h3 className="text-3xl font-black tracking-tight">{planName}</h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <span className="material-symbols-outlined text-white text-2xl">workspace_premium</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between items-end">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-indigo-300 text-lg">bolt</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">Monitor Capacity</span>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-black leading-none">{usage}</span>
                                <span className="text-indigo-200/60 text-sm font-bold leading-none ml-1.5">/ {limit}</span>
                            </div>
                        </div>
                        
                        <div className="h-3 bg-black/20 rounded-full overflow-hidden p-0.5 border border-white/5">
                            <div 
                                className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-1000 ease-out" 
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                    </div>
                    
                    <p className="text-[11px] text-indigo-100/80 font-medium leading-relaxed italic border-l-2 border-indigo-400/30 pl-3">
                        {percentage >= 90 
                            ? "You've almost reached your limit. Consider upgrading to avoid service interruption." 
                            : `You have ${limit - usage} monitor slots remaining in your Professional quota.`}
                    </p>

                    <button className="group/btn w-full mt-2 py-4 bg-white text-indigo-700 font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all active:scale-95 shadow-xl shadow-black/10 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-lg group-hover/btn:translate-y-[-2px] transition-transform">upgrade</span>
                        Upgrade Workspace
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionQuota;

