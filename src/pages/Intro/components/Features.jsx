import React from 'react';

const Features = () => {
    return (
        <section className="py-24 bg-background-light dark:bg-background-dark" id="features">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-16 max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Powerful Features for Developers
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Everything you need to maintain a reliable production environment.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all">
                        <span className="material-symbols-outlined text-primary text-3xl mb-4">bolt</span>
                        <h4 className="text-lg font-bold mb-2">Real-time API monitoring</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Sub-second precision on all incoming traffic and outgoing requests.</p>
                    </div>
                    <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all">
                        <span className="material-symbols-outlined text-primary text-3xl mb-4">query_stats</span>
                        <h4 className="text-lg font-bold mb-2">Response time analytics</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Visualize response distributions and identify slow-running routes.</p>
                    </div>
                    <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all">
                        <span className="material-symbols-outlined text-primary text-3xl mb-4">checklist_rtl</span>
                        <h4 className="text-lg font-bold mb-2">Status code tracking</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Monitor 2xx, 4xx, and 5xx distributions with automatic anomaly detection.</p>
                    </div>
                    <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all">
                        <span className="material-symbols-outlined text-primary text-3xl mb-4">list_alt</span>
                        <h4 className="text-lg font-bold mb-2">API logs viewer</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Powerful search and filtering for millions of log entries in milliseconds.</p>
                    </div>
                    <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all">
                        <span className="material-symbols-outlined text-primary text-3xl mb-4">hub</span>
                        <h4 className="text-lg font-bold mb-2">Alert notifications</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Seamless integration with Slack, Teams, PagerDuty, and custom endpoints.</p>
                    </div>
                    <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all">
                        <span className="material-symbols-outlined text-primary text-3xl mb-4">dashboard_customize</span>
                        <h4 className="text-lg font-bold mb-2">Performance dashboard</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Customizable TV-ready dashboards for your engineering war rooms.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
