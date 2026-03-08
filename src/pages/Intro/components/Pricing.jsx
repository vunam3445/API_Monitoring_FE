import React from 'react';

const Pricing = ({ onOpenSignup }) => {
    return (
        <section className="py-24 bg-background-light dark:bg-background-dark" id="pricing">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Scale your monitoring as your traffic grows.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="flex flex-col p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-500 mb-2 uppercase tracking-widest">Free</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-black text-slate-900 dark:text-white">$0</span>
                            <span className="text-slate-500">/month</span>
                        </div>
                        <ul className="flex flex-col gap-4 mb-8 flex-grow">
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> 5 APIs
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> 5m monitoring interval
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> Basic uptime checks
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> 24h log history
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> Email alerts only
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> Community support
                            </li>
                        </ul>
                        <button
                            onClick={onOpenSignup}
                            className="w-full py-3 px-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            Start Free
                        </button>
                    </div>
                    <div className="flex flex-col p-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-primary shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black uppercase px-4 py-1.5 rotate-45 translate-x-4 translate-y-2">
                            Popular
                        </div>
                        <h3 className="text-lg font-bold text-primary mb-2 uppercase tracking-widest">Pro</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-black text-slate-900 dark:text-white">$49</span>
                            <span className="text-slate-500">/month</span>
                        </div>
                        <ul className="flex flex-col gap-4 mb-8 flex-grow">
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span> Unlimited APIs
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span> 30s monitoring interval
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span> Advanced payload logs
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span> 30-day log history
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span> Slack & Webhook alerts
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span> Priority support
                            </li>
                        </ul>
                        <button
                            onClick={onOpenSignup}
                            className="w-full py-3 px-6 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all"
                        >
                            Go Pro
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
