import React, { useEffect } from 'react';

const Notification = ({ message, type = 'error', onClose, duration = 3000 }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!message) return null;

    const isError = type === 'error';
    const bgColorClass = isError ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30';
    const textColorClass = isError ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400';
    const icon = isError ? 'error' : 'check_circle';

    return (
        <div className={`flex items-center gap-2 p-3 rounded-lg text-sm mb-4 ${bgColorClass} ${textColorClass} animate-fade-in`}>
            <span className="material-symbols-outlined text-lg">{icon}</span>
            <span className="flex-1">{message}</span>
            <button type="button" onClick={onClose} className="hover:opacity-75 transition-opacity">
                <span className="material-symbols-outlined text-sm">close</span>
            </button>
        </div>
    );
};

export default Notification;
