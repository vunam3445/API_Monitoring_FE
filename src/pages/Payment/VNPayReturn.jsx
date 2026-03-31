import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { paymentService } from '../../services/paymentService';
import { useToast } from '../../components/UI/Toast';

const VNPayReturn = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [status, setStatus] = useState('processing'); // processing, success, error
    const [message, setMessage] = useState('Verifying your payment...');

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                // Forward the entire query string to backend
                const response = await paymentService.handleVNPayReturn(location.search);
                
                if (response.success) {
                    setStatus('success');
                    setMessage(response.message || 'Payment successful! Your subscription has been activated.');
                    addToast('success', 'Subscription activated successfully!');
                } else {
                    setStatus('error');
                    setMessage(response.message || 'Payment verification failed. Please contact support.');
                    addToast('error', response.message || 'Payment failed');
                }
            } catch (err) {
                setStatus('error');
                setMessage(err.message || 'An unexpected error occurred while processing your payment.');
                addToast('error', 'Critical Error: ' + (err.message || 'Payment verification crashed'));
            }
        };

        if (location.search) {
            verifyPayment();
        } else {
            setStatus('error');
            setMessage('No payment info found in URL.');
        }
    }, [location.search, addToast]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 p-10 text-center relative overflow-hidden">
                
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-emerald-400 to-primary"></div>
                
                {status === 'processing' && (
                    <div className="space-y-6">
                        <div className="relative">
                            <div className="size-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                            <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary text-3xl">currency_exchange</span>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Verifying Payment</h2>
                        <p className="text-slate-500 dark:text-slate-400">{message}</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-6 animate-in zoom-in duration-500">
                        <div className="size-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                            <span className="material-symbols-outlined text-white text-5xl font-black">check</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Payment Success!</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">{message}</p>
                        </div>
                        <div className="pt-4 space-y-3">
                            <Link 
                                to="/dashboard" 
                                className="block w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 active:scale-95"
                            >
                                Go to Dashboard
                            </Link>
                            <Link 
                                to="/billing" 
                                className="block w-full py-4 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                            >
                                View Billing
                            </Link>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-6 animate-in zoom-in duration-500">
                        <div className="size-24 bg-red-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-red-500/20">
                            <span className="material-symbols-outlined text-white text-5xl font-black">close</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Payment Failed</h2>
                            <p className="text-red-500 font-bold mt-2">{message}</p>
                        </div>
                        <div className="pt-4 space-y-3">
                            <Link 
                                to="/billing" 
                                className="block w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
                            >
                                Try Again
                            </Link>
                            <button 
                                onClick={() => navigate('/dashboard')}
                                className="text-sm font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                Return to Dashboard
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VNPayReturn;
