import React, { useState } from 'react';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General', icon: 'settings' },
        { id: 'security', label: 'Security', icon: 'security' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications' },
        { id: 'billing', label: 'Billing & Plans', icon: 'credit_card' },
        { id: 'advanced', label: 'Advanced', icon: 'build' }
    ];

    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-background-light dark:bg-background-dark min-h-0 min-w-0 h-full">
            {/* Page Header */}
            <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Admin Settings</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage global system configurations and platform settings.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Settings Navigation */}
                <aside className="lg:w-64 shrink-0">
                    <nav className="flex flex-col gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${activeTab === tab.id
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-primary/5 hover:text-primary'
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-xl ${activeTab === tab.id ? 'text-white' : ''}`}>
                                    {tab.icon}
                                </span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Settings Content Section */}
                <div className="flex-1 bg-white dark:bg-primary/5 rounded-2xl border border-slate-200 dark:border-primary/20 shadow-sm p-6 lg:p-10">
                    {/* General Settings */}
                    {activeTab === 'general' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Platform Identity</h3>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Platform Name</label>
                                            <input
                                                type="text"
                                                defaultValue="API Monitor Cloud"
                                                className="w-full bg-slate-50 dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-900 dark:text-white transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Support Email</label>
                                            <input
                                                type="email"
                                                defaultValue="support@apimonitor.com"
                                                className="w-full bg-slate-50 dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-900 dark:text-white transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Company Logo URL</label>
                                        <div className="flex gap-3">
                                            <input
                                                type="text"
                                                defaultValue="https://example.com/logo.png"
                                                className="flex-1 bg-slate-50 dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-900 dark:text-white transition-all"
                                            />
                                            <button className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                                Browse
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-200 dark:border-primary/20" />

                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Registration & Users</h3>
                                <div className="space-y-4">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-center mt-0.5">
                                            <input type="checkbox" defaultChecked className="peer sr-only" />
                                            <div className="w-10 h-6 bg-slate-300 dark:bg-slate-700 rounded-full peer-checked:bg-primary transition-colors"></div>
                                            <div className="absolute left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow-sm"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Open User Registration</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Allow public users to sign up and create accounts.</p>
                                        </div>
                                    </label>

                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-center mt-0.5">
                                            <input type="checkbox" defaultChecked className="peer sr-only" />
                                            <div className="w-10 h-6 bg-slate-300 dark:bg-slate-700 rounded-full peer-checked:bg-primary transition-colors"></div>
                                            <div className="absolute left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow-sm"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Require Email Verification</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">New users must verify their email before accessing APIs.</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Settings Placeholder */}
                    {activeTab === 'security' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Authentication Settings</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Manage login limits, MFA requirements, and password policies.</p>
                                {/* Add form here */}
                            </div>
                        </div>
                    )}

                    {/* Notifications Placeholder */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">SMTP Email Config</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Setup email server for sending global system alerts to users.</p>
                            </div>
                        </div>
                    )}

                    {/* Placeholder for others */}
                    {(activeTab !== 'general' && activeTab !== 'security' && activeTab !== 'notifications') && (
                        <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in-95 duration-300">
                            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">{tabs.find(t => t.id === activeTab)?.icon}</span>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{tabs.find(t => t.id === activeTab)?.label} Settings</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm">This configuration section is currently under development.</p>
                        </div>
                    )}

                    {/* Form Actions */}
                    {activeTab === 'general' && (
                        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-primary/20 flex items-center justify-end gap-3">
                            <button className="px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                Discard Changes
                            </button>
                            <button className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                                Save Configuration
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
