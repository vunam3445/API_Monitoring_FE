import React from 'react';

const SubscriptionQuota = () => {
    // Dummy data for visualization
    const usage = 15;
    const limit = 20;
    const percentage = (usage / limit) * 100;

    return (
        <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-3xl text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-white/20 transition-all"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-10 -mb-10 blur-xl"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-primary-foreground/70 text-[10px] font-black uppercase tracking-widest mb-1">Current Plan</p>
                        <h3 className="text-2xl font-black tracking-tight">Professional</h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
                        <span className="material-symbols-outlined text-white">workspace_premium</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-bold">Monitor Usage</span>
                        <div className="text-right">
                            <span className="text-xl font-black leading-none">{usage}</span>
                            <span className="text-primary-foreground/60 text-xs font-bold leading-none ml-1">/ {limit}</span>
                        </div>
                    </div>
                    
                    <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000 ease-out" 
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                    
                    <p className="text-[10px] text-primary-foreground/70 font-medium leading-relaxed">
                        You have used {usage} out of {limit} available monitors in your plan. {limit - usage} slots remaining.
                    </p>

                    <button className="w-full mt-2 py-3 bg-white text-primary font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-lg">
                        Upgrade Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionQuota;
