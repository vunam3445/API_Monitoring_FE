import React from 'react';

const SubscriptionPlans = () => {
    return (
        <div>
            <div className="flex items-end justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold">Choose a Plan</h3>
                    <p className="text-sm text-slate-500">Select the perfect plan for your monitoring needs.</p>
                </div>
                <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-lg">
                    <button className="px-4 py-1.5 text-xs font-bold bg-white dark:bg-slate-700 rounded-md shadow-sm">Monthly</button>
                    <button className="px-4 py-1.5 text-xs font-bold text-slate-500">Yearly (20% off)</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Free Plan */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                    <h4 className="text-lg font-bold mb-1">Free</h4>
                    <p className="text-sm text-slate-500 mb-6">For personal projects</p>
                    <div className="mb-6">
                        <span className="text-4xl font-black">$0</span>
                        <span className="text-slate-400">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                        <li className="flex items-center gap-2 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            5 APIs Monitored
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            24h Data Retention
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            Basic Email Alerts
                        </li>
                    </ul>
                    <button className="w-full py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all text-sm">Downgrade</button>
                </div>
                {/* Pro Plan (Recommended) */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border-2 border-primary shadow-xl shadow-primary/5 flex flex-col relative scale-105 z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                        Recommended</div>
                    <h4 className="text-lg font-bold mb-1">Pro</h4>
                    <p className="text-sm text-slate-500 mb-6">For professional teams</p>
                    <div className="mb-6">
                        <span className="text-4xl font-black">$49</span>
                        <span className="text-slate-400">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                        <li className="flex items-center gap-2 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            50 APIs Monitored
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            30-Day Data Retention
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            Advanced Alert Channels
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            Status Page Support
                        </li>
                    </ul>
                    <button className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-md text-sm">Current Plan</button>
                </div>
                {/* Enterprise Plan */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                    <h4 className="text-lg font-bold mb-1">Enterprise</h4>
                    <p className="text-sm text-slate-500 mb-6">For large scale operations</p>
                    <div className="mb-6">
                        <span className="text-4xl font-black">$199</span>
                        <span className="text-slate-400">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                        <li className="flex items-center gap-2 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            Unlimited APIs Monitored
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            1-Year Data Retention
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            Custom SSO/SAML
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            Dedicated Account Manager
                        </li>
                    </ul>
                    <button className="w-full py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all text-sm">Upgrade</button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPlans;
