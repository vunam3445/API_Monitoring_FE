import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-12">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-slate-100 dark:border-slate-800 pb-12 mb-12">
                    <div className="flex items-center gap-2 text-primary">
                        <span className="material-symbols-outlined text-3xl font-bold">monitoring</span>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">APIMonitor</h2>
                    </div>
                    <div className="flex gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                        <a className="hover:text-primary transition-colors" href="#">Contact Us</a>
                        <a className="hover:text-primary transition-colors" href="#">Status</a>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© 2024 APIMonitor Inc. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a className="hover:text-primary transition-colors" href="#">Twitter</a>
                        <a className="hover:text-primary transition-colors" href="#">GitHub</a>
                        <a className="hover:text-primary transition-colors" href="#">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
