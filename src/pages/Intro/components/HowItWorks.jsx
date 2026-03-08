import React from 'react';

const HowItWorks = () => {
    return (
        <section className="py-24 bg-white dark:bg-slate-900/50" id="how-it-works">
            <div className="mx-auto max-w-7xl px-6 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-16">
                    How It Works
                </h2>
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 hidden md:block"></div>
                    <div className="relative flex flex-col items-center bg-white dark:bg-slate-900 p-4">
                        <div className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-black z-10 mb-6 shadow-lg shadow-primary/30">1</div>
                        <h3 className="text-xl font-bold mb-2">Add API endpoint</h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xs">Plug in your URL or import from Postman/Swagger collections.</p>
                    </div>
                    <div className="relative flex flex-col items-center bg-white dark:bg-slate-900 p-4">
                        <div className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-black z-10 mb-6 shadow-lg shadow-primary/30">2</div>
                        <h3 className="text-xl font-bold mb-2">System monitors</h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xs">We send requests continuously from 12 global regions.</p>
                    </div>
                    <div className="relative flex flex-col items-center bg-white dark:bg-slate-900 p-4">
                        <div className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-black z-10 mb-6 shadow-lg shadow-primary/30">3</div>
                        <h3 className="text-xl font-bold mb-2">Receive alerts</h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xs">Get notified immediately when downtime or latency is detected.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
