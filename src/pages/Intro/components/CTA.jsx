import React from 'react';

const CTA = ({ onOpenSignup }) => {
    return (
        <section className="py-24 bg-white dark:bg-slate-950">
            <div className="mx-auto max-w-5xl px-6">
                <div className="rounded-3xl bg-slate-900 dark:bg-slate-800 p-8 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center gap-8">
                        <h2 className="text-3xl md:text-5xl font-black leading-tight max-w-2xl">
                            Start Monitoring Your APIs Today
                        </h2>
                        <p className="text-slate-400 text-lg max-w-xl">
                            Join thousands of developers who trust APIMonitor to keep their production systems running smoothly.
                        </p>
                        <button
                            onClick={onOpenSignup}
                            className="bg-primary hover:bg-primary/90 text-white rounded-xl px-10 py-5 text-lg font-bold shadow-2xl shadow-primary/20 transition-all"
                        >
                            Create Free Account
                        </button>
                        <p className="text-sm text-slate-500">No credit card required • 14-day Pro trial</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
