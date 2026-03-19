import React from 'react';
import AccountSection from './components/AccountSection';
import NotificationSection from './components/NotificationSection';
import AlertRulesSection from './components/AlertRulesSection';
import MonitoringSection from './components/MonitoringSection';
import APIHealthSection from './components/APIHealthSection';
import SecuritySection from './components/SecuritySection';
import PreferencesSection from './components/PreferencesSection';
import DangerZoneSection from './components/DangerZoneSection';

const Settings = () => {
    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col gap-1 max-w-5xl mx-auto">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage system configuration, notifications, and account preferences</p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <AccountSection />
                <NotificationSection />
                <AlertRulesSection />
                <MonitoringSection />
                <APIHealthSection />
                {/* <SecuritySection /> */}
                {/* <PreferencesSection /> */}
                {/* <DangerZoneSection /> */}
            </div>

            <div className="max-w-5xl mx-auto flex justify-end gap-3 pb-8">
                <button className="px-6 py-2.5 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    Cancel
                </button>
                <button className="px-8 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Settings;
