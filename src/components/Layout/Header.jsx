import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onOpenSignup, onOpenLogin }) => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                try {
                    const user = JSON.parse(userStr);
                    if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
                        navigate('/admin/dashboard');
                        return;
                    }
                } catch (e) {
                    // ignore
                }
            }
            navigate('/dashboard');
        } else {
            if (onOpenLogin) onOpenLogin();
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-3xl font-bold">monitoring</span>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">APIMonitor</h2>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <a className="text-sm font-medium hover:text-primary transition-colors" href="#features">Features</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors" href="#how-it-works">How It Works</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors" href="#pricing">Pricing</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Docs</a>
                </nav>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLoginClick}
                        className="hidden sm:block text-sm font-bold px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
                    >
                        Login
                    </button>
                    <button
                        onClick={onOpenSignup}
                        className="bg-primary hover:bg-primary/90 text-white rounded-xl px-5 py-2.5 text-sm font-bold shadow-lg shadow-primary/20 transition-all"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
