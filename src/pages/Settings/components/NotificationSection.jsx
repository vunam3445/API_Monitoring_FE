import React from 'react';

const NotificationSection = () => {
    return (
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">notifications_active</span>
                <h2 className="text-lg font-bold">Notification Settings</h2>
            </div>
            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-slate-400">mail</span>
                            <span className="text-sm font-semibold">Email Alerts</span>
                        </div>
                        <input defaultChecked
                            className="w-10 h-5 rounded-full bg-slate-200 dark:bg-slate-700 appearance-none checked:bg-primary cursor-pointer relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all checked:after:left-[22px]"
                            type="checkbox" />
                    </div>
                    <input
                        className="w-full text-xs py-1.5 px-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        type="email" defaultValue="alerts@company.tech" />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-slate-400">forum</span>
                            <span className="text-sm font-semibold">Slack Webhook</span>
                        </div>
                        <input defaultChecked
                            className="w-10 h-5 rounded-full bg-slate-200 dark:bg-slate-700 appearance-none checked:bg-primary cursor-pointer relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all checked:after:left-[22px]"
                            type="checkbox" />
                    </div>
                    <input
                        className="w-full text-xs py-1.5 px-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        type="text" defaultValue="https://hooks.slack.com/services/..." />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-slate-400">send</span>
                        <span className="text-sm font-semibold">Telegram Bot</span>
                    </div>
                    <input
                        className="w-10 h-5 rounded-full bg-slate-200 dark:bg-slate-700 appearance-none checked:bg-primary cursor-pointer relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all checked:after:left-[22px]"
                        type="checkbox" />
                </div>
            </div>
        </section>
    );
};

export default NotificationSection;
