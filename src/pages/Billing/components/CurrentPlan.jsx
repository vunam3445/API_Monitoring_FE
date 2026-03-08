import React from 'react';

const CurrentPlan = () => {
    return (
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors">
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Active Plan</span>
                        <h3 className="text-2xl font-black">Pro Plan</h3>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">You are currently using our most popular plan for scaling teams.</p>
                    <div className="flex flex-wrap gap-6">
                        <div>
                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Monthly Cost</p>
                            <p className="text-lg font-bold">$49.00 <span className="text-sm font-normal text-slate-500">/mo</span></p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Next Billing Date</p>
                            <p className="text-lg font-bold">Oct 24, 2023</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Status</p>
                            <div className="flex items-center gap-1.5 text-emerald-500">
                                <span className="material-symbols-outlined text-base">check_circle</span>
                                <p className="text-sm font-bold">In Good Standing</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-auto">
                    <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 text-sm">Upgrade Plan</button>
                    <button className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold py-2.5 px-6 rounded-xl transition-all text-sm">Cancel Subscription</button>
                </div>
            </div>
        </div>
    );
};

export default CurrentPlan;
