import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useLogin } from '../../hooks/useLogin';
import Notification from '../UI/Notification';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup, initialEmail = '' }) => {
    const navigate = useNavigate();
    const { login, loginWithGoogle, isLoading } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            await loginWithGoogle({
                token: credentialResponse.credential,
                idToken: credentialResponse.credential,
                credential: credentialResponse.credential,
                tokenString: credentialResponse.credential
            });
            onClose();
            navigate('/dashboard');
        } catch (err) {
            setFormError(err.message || 'Google Login API failed');
        }
    };

    const handleGoogleError = () => {
        setFormError('Google Login failed to initialize');
    };

    useEffect(() => {
        if (isOpen) {
            const token = localStorage.getItem('accessToken');
            if (token) {
                onClose();
                navigate('/dashboard');
                return;
            }
            setEmail(initialEmail);
            setPassword('');
            setFormError('');
        }
    }, [initialEmail, isOpen, navigate, onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!email || !password) {
            setFormError('Email and password are required');
            return;
        }

        try {
            await login({ email, password });
            onClose(); // Close modal
            navigate('/dashboard'); // Navigate to dashboard
        } catch (err) {
            setFormError(err.message || 'Login failed');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl transition-all border border-slate-200 dark:border-slate-800">
                <div className="px-8 py-8">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                        disabled={isLoading}
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>

                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center gap-2 text-primary mb-4">
                            <span className="material-symbols-outlined text-3xl font-bold">monitoring</span>
                        </div>
                        <h3 className="text-2xl font-bold leading-6 text-slate-900 dark:text-white mb-2">
                            Welcome Back
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Please sign in to your API Monitor account
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {formError && (
                            <Notification
                                type="error"
                                message={formError}
                                onClose={() => setFormError('')}
                                duration={5000}
                            />
                        )}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <span className="material-symbols-outlined text-sm">mail</span>
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setFormError('');
                                    }}
                                    className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-3 pl-10 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <span className="material-symbols-outlined text-sm">lock</span>
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setFormError('');
                                    }}
                                    className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-3 pl-10 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                                <span className="text-slate-600 dark:text-slate-400">Remember me</span>
                            </label>
                            <a href="#" className="font-medium text-primary hover:text-primary/80">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`flex w-full items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl px-4 py-3 font-bold shadow-lg shadow-primary/20 transition-all mt-6 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </>
                            ) : 'Sign in'}
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-between">
                        <span className="w-1/5 border-b border-slate-200 dark:border-slate-700 lg:w-1/4"></span>
                        <span className="text-xs text-center text-slate-500 uppercase">or continue with</span>
                        <span className="w-1/5 border-b border-slate-200 dark:border-slate-700 lg:w-1/4"></span>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            theme="outline"
                            size="large"
                            width="100%"
                            text="continue_with"
                        />
                    </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-4 text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Don't have an account? <button type="button" onClick={onSwitchToSignup} className="font-bold text-primary hover:text-primary/80">Sign up</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
