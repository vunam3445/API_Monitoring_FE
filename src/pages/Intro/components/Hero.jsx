import React from 'react';

const Hero = ({ onOpenSignup }) => {
    return (
        <section className="relative px-6 py-16 md:py-24 lg:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-8">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider w-max">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Now supporting gRPC &amp; WebSockets
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                            Monitor Your APIs in <span className="text-primary">Real-Time</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                            Track uptime, performance, and errors with precision. Ensure your services are always available and blazing fast for your global users.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={onOpenSignup}
                                className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-4 text-base font-bold shadow-xl shadow-primary/20 transition-all"
                            >
                                Get Started Free
                            </button>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex -space-x-2">
                                <img alt="User 1" className="h-8 w-8 rounded-full border-2 border-background-light"
                                    data-alt="Profile picture of a female developer"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ2JNq4MRaCUnScMFqBz2aDMiw7hvS326WuRQfDH4HRftkk9S56BcIK3aKImyfV8djTaQo4E_zfTuQUZPAO9f_6uucbA1-S2ezbziWvS1nJGubhjx5dYVVEB46FOlmpBbxU4IRw2_6IYM9ZMS3gPqhErVAb7Fvz0_SPEdirWjOtdQdflasbaKa_rq955uJzRgBRl9wbqOdNUPQvOcHtRvoeLYCteMbUYxu6WKixC-lLqWi9GJfvZz3ztuSi8dZfuyFwTL_XeAsxFVI" />
                                <img alt="User 2" className="h-8 w-8 rounded-full border-2 border-background-light"
                                    data-alt="Profile picture of a male software engineer"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCePHBW8Y0-Pqp0vgFLSD1S93dBwA5c0QkJBkHiafvg4PnIXdIFqlJl0h9AcZN5ZS93E-qVr6P6QMJ3jiiDH-sLVxXxRYpd0q12o9nqbW166CcF6IL50OGN3J4dBPAfZSILDx8Dci_XY7LYVpb_hCEQptOEQZgm0Qp96qNJXRAy_6UXAUBS5ERmd4DbwUGsJEZjBcIByRFPvCbUs4DDHO53muOFgCxRlaxXmLBeRBYZki2OMq0BgpFlBx6opVYT0lAuiXH4RN9eeTgc" />
                                <img alt="User 3" className="h-8 w-8 rounded-full border-2 border-background-light"
                                    data-alt="Profile picture of a system architect"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe3IDPTe_0XN-Veo1aF8_Rkap-DbCFd99b8ZKXkkTPdbJWxKnyBFAJfPq9jQ_VfP0OLlHuCLNz1C6RBtsKZnJxs-wVNHDCckVgXg12dpVLwyjDJUdML4-xruh_e_x03p7t2AeQo0C7AMU-zP-Lmci7yb9i_4d3VMK0qbpgvV31eJFouF3aNKKwTUQWzvY9OfF-sMwEcx__MSmUNpeNpetyiAYiHHeoYAaZZg2THgkd7n_Keo_Y3PS6Y5avJhT0bPDYranJ5W-SKD1F" />
                            </div>
                            <span>Trusted by 2,000+ developers worldwide</span>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 shadow-2xl">
                            <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 aspect-[16/10] relative">
                                <div className="absolute inset-0 bg-cover bg-center"
                                    data-alt="Advanced API monitoring dashboard with line charts and status indicators"
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGqa2mwqfztfLiphYj1T98flYGqjskiXy9CYG_DIRjeLCYYYXP9hshpzqxGeC-fyIrto6Bvt6ynG2pLGzPU_FgfU6lqh2mT_3s-PiQwDZBLEtGozi9d4x5dJU_W7l_8XAWTMLxLjEaPA2RCatTSE4A5KzR4Wn_wPeNDaEYQeJP---7tGeb2MIHZ2VB7nTyPcdR1G6PL3XjpYu-oluNRHtofO7SrBgYh0AioRekXL5pC4MYeIp4TFRMpaIOqvjQ5B2kepq7HZhz_iHX')" }}>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
