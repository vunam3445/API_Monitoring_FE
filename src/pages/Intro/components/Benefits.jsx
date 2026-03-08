import React from 'react';

const Benefits = () => {
    return (
        <section className="py-20 bg-white dark:bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        What is API Monitoring?
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Total visibility into your backend infrastructure.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-background-light dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined">signal_cellular_alt</span>
                        </div>
                        <h3 className="text-xl font-bold">Uptime Monitoring</h3>
                        <p className="text-slate-600 dark:text-slate-400">Global health checks every 30 seconds to ensure your API is reachable from every continent.</p>
                    </div>
                    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-background-light dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined">timer</span>
                        </div>
                        <h3 className="text-xl font-bold">Performance Tracking</h3>
                        <p className="text-slate-600 dark:text-slate-400">Deep dive into TTFB, latency, and response time percentiles (P95, P99) across all endpoints.</p>
                    </div>
                    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-background-light dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined">description</span>
                        </div>
                        <h3 className="text-xl font-bold">Logs Analysis</h3>
                        <p className="text-slate-600 dark:text-slate-400">Detailed request/response body capture for debugging failed calls and performance bottlenecks.</p>
                    </div>
                    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-background-light dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined">notifications_active</span>
                        </div>
                        <h3 className="text-xl font-bold">Alert Notifications</h3>
                        <p className="text-slate-600 dark:text-slate-400">Instant multi-channel alerts via Slack, Discord, Email, and Webhooks when something goes wrong.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Benefits;
