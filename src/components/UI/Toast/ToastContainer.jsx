import React from 'react';
import { useToast } from './ToastContext';

const TOAST_CONFIG = {
    success: {
        icon: 'check_circle',
        bgClass: 'bg-emerald-500',
        borderClass: 'border-emerald-400',
        progressClass: 'bg-emerald-300',
    },
    error: {
        icon: 'error',
        bgClass: 'bg-rose-500',
        borderClass: 'border-rose-400',
        progressClass: 'bg-rose-300',
    },
    warning: {
        icon: 'warning',
        bgClass: 'bg-amber-500',
        borderClass: 'border-amber-400',
        progressClass: 'bg-amber-300',
    },
    info: {
        icon: 'info',
        bgClass: 'bg-blue-500',
        borderClass: 'border-blue-400',
        progressClass: 'bg-blue-300',
    },
};

const ToastContainer = () => {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-[200] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
            {toasts.map((toast) => {
                const config = TOAST_CONFIG[toast.type] || TOAST_CONFIG.info;
                return (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-xl shadow-2xl border text-white backdrop-blur-sm transition-all duration-300 ${config.bgClass} ${config.borderClass} ${
                            toast.isExiting
                                ? 'opacity-0 translate-x-8 scale-95'
                                : 'opacity-100 translate-x-0 scale-100 animate-toast-in'
                        }`}
                    >
                        <span className="material-symbols-outlined text-xl mt-0.5 shrink-0">{config.icon}</span>
                        <p className="text-sm font-medium flex-1 leading-relaxed">{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="shrink-0 text-white/70 hover:text-white transition-colors mt-0.5"
                        >
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>
                );
            })}

            <style>{`
                @keyframes toast-in {
                    from {
                        opacity: 0;
                        transform: translateX(100%) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                }
                .animate-toast-in {
                    animation: toast-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
            `}</style>
        </div>
    );
};

export default ToastContainer;
