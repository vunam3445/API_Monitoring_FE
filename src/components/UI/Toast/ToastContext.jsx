import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext(null);

// Mỗi toast có: id, type ('success'|'error'|'warning'|'info'), message, duration
let toastIdCounter = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const timersRef = useRef({});

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        if (timersRef.current[id]) {
            clearTimeout(timersRef.current[id]);
            delete timersRef.current[id];
        }
    }, []);

    const addToast = useCallback((type, message, duration = 4000) => {
        const id = ++toastIdCounter;
        const toast = { id, type, message, isExiting: false };
        setToasts((prev) => [...prev, toast]);

        // Auto-remove sau duration
        timersRef.current[id] = setTimeout(() => {
            // Trigger exit animation trước khi remove
            setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, isExiting: true } : t)));
            setTimeout(() => removeToast(id), 300);
        }, duration);

        return id;
    }, [removeToast]);

    const success = useCallback((message, duration) => addToast('success', message, duration), [addToast]);
    const error = useCallback((message, duration) => addToast('error', message, duration), [addToast]);
    const warning = useCallback((message, duration) => addToast('warning', message, duration), [addToast]);
    const info = useCallback((message, duration) => addToast('info', message, duration), [addToast]);

    const value = { toasts, addToast, removeToast, success, error, warning, info };

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast phải được sử dụng bên trong ToastProvider');
    }
    return context;
};
