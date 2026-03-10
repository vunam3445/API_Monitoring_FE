import React from 'react';

const AdminPricingPlans = () => {
    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-background-light dark:bg-background-dark h-full">
            {/* Page Title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Pricing Plans</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">Manage subscription plans, pricing, and feature limits for the platform.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        Update Pricing
                    </button>
                    <button className="px-4 py-2 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                        Create New Plan
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-500 text-sm font-medium">Total Plans</p>
                    <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">3</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-500 text-sm font-medium">Active Plans</p>
                    <p className="text-2xl font-bold mt-1 text-green-500">3</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-500 text-sm font-medium">Free Plan Users</p>
                    <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">1,240</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-500 text-sm font-medium">Paid Plan Users</p>
                    <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">850</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-500 text-sm font-medium">Monthly Revenue</p>
                    <p className="text-2xl font-bold mt-1 text-primary">$42,500</p>
                </div>
            </div>

            {/* Grid & Side Panel */}
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Cards Grid */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {/* Free Plan */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-lg uppercase tracking-wider">Active</span>
                                <span className="material-symbols-outlined text-slate-400">info</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Free Plan</h3>
                            <div className="mt-2 flex items-baseline">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">$0</span>
                                <span className="text-slate-500 ml-1">/mo</span>
                            </div>
                        </div>
                        <div className="p-6 flex-1 space-y-4">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    <span>5 APIs Tracked</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    <span>5m Check Interval</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    <span>Basic Logs (24h)</span>
                                </li>
                            </ul>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <p className="text-xs text-slate-500 font-medium uppercase">Performance</p>
                                <p className="text-sm font-semibold mt-1 text-slate-900 dark:text-white">1,240 active users</p>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap gap-2">
                            <button className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300">Edit</button>
                            <button className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300">Disable</button>
                            <button className="w-full px-3 py-2 text-primary text-xs font-bold rounded-lg hover:bg-primary/5 transition-colors">View Subscribers</button>
                        </div>
                    </div>

                    {/* Pro Plan (Highligted) */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border-2 border-primary overflow-hidden flex flex-col relative">
                        <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">Selected</div>
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-primary/5">
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-2.5 py-1 bg-primary/20 text-primary text-xs font-bold rounded-lg uppercase tracking-wider">Active</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pro Plan</h3>
                            <div className="mt-2 flex items-baseline">
                                <span className="text-3xl font-black text-primary">$49</span>
                                <span className="text-slate-500 ml-1">/mo</span>
                            </div>
                        </div>
                        <div className="p-6 flex-1 space-y-4">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    <span>50 APIs Tracked</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    <span>30s Check Interval</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    <span>Advanced Analytics</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    <span>Real-time Alerts</span>
                                </li>
                            </ul>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <p className="text-xs text-slate-500 font-medium uppercase">Performance</p>
                                <p className="text-sm font-semibold mt-1 text-slate-900 dark:text-white">620 active users</p>
                            </div>
                        </div>
                        <div className="p-4 bg-primary/10 flex flex-wrap gap-2">
                            <button className="flex-1 px-3 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors">Edit</button>
                            <button className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-primary/20 text-xs font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300">Disable</button>
                            <button className="w-full px-3 py-2 text-primary text-xs font-bold rounded-lg hover:bg-primary/5 transition-colors">View Subscribers</button>
                        </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-lg uppercase tracking-wider">Active</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Enterprise</h3>
                            <div className="mt-2 flex items-baseline">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">$199</span>
                                <span className="text-slate-500 ml-1">/mo</span>
                            </div>
                        </div>
                        <div className="p-6 flex-1 space-y-4">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    <span>Unlimited APIs</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    <span>Custom Interval (1s)</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    <span>Priority Support</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    <span>Webhooks Integration</span>
                                </li>
                            </ul>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <p className="text-xs text-slate-500 font-medium uppercase">Performance</p>
                                <p className="text-sm font-semibold mt-1 text-slate-900 dark:text-white">230 active users</p>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap gap-2">
                            <button className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300">Edit</button>
                            <button className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300">Disable</button>
                            <button className="w-full px-3 py-2 text-primary text-xs font-bold rounded-lg hover:bg-primary/5 transition-colors">View Subscribers</button>
                        </div>
                    </div>
                </div>

                {/* Configuration Side Panel */}
                <div className="xl:w-96 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col h-fit">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Plan Configuration</h3>
                        <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-lg">Editing: Pro Plan</span>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-slate-500">Plan Name</label>
                                <input className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 text-sm outline-none text-slate-900 dark:text-white" type="text" defaultValue="Pro Plan" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-slate-500">Price ($)</label>
                                    <input className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 text-sm outline-none text-slate-900 dark:text-white" type="number" defaultValue="49" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-slate-500">Currency</label>
                                    <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 text-sm outline-none text-slate-900 dark:text-white" defaultValue="USD">
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-slate-500">API Limit</label>
                                <input className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 text-sm outline-none text-slate-900 dark:text-white" type="number" defaultValue="50" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-slate-500">Monitoring Interval</label>
                                <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 text-sm outline-none text-slate-900 dark:text-white" defaultValue="30 seconds">
                                    <option value="10 seconds">10 seconds</option>
                                    <option value="30 seconds">30 seconds</option>
                                    <option value="1 minute">1 minute</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase text-slate-500">Feature Toggles</label>
                            <div className="space-y-2">
                                <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl cursor-pointer">
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">Slack Notifications</span>
                                    <input defaultChecked className="form-checkbox text-primary rounded border-slate-300" type="checkbox" />
                                </label>
                                <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl cursor-pointer">
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">Webhook Support</span>
                                    <input defaultChecked className="form-checkbox text-primary rounded border-slate-300" type="checkbox" />
                                </label>
                                <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl cursor-pointer">
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">White-label Reports</span>
                                    <input className="form-checkbox text-primary rounded border-slate-300" type="checkbox" />
                                </label>
                            </div>
                        </div>
                        <div className="pt-4 flex flex-col gap-2">
                            <button className="w-full py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors">Save Changes</button>
                            <button className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Discard</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPricingPlans;
