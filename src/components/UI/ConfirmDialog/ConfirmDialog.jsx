import React, { createContext, useContext, useState, useCallback } from 'react';

const ConfirmDialogContext = createContext(null);

/**
 * ConfirmDialog Provider - Tuân thủ OCP (Open-Closed Principle)
 * Có thể mở rộng thêm type mới mà không cần sửa code cũ
 */
export const ConfirmDialogProvider = ({ children }) => {
    const [dialog, setDialog] = useState(null);

    const confirm = useCallback(({
        title = 'Xác nhận',
        message = 'Bạn có chắc chắn muốn thực hiện hành động này?',
        confirmText = 'Xác nhận',
        cancelText = 'Huỷ',
        type = 'danger', // 'danger' | 'warning' | 'info'
        icon = null,
    } = {}) => {
        return new Promise((resolve) => {
            setDialog({
                title,
                message,
                confirmText,
                cancelText,
                type,
                icon,
                onConfirm: () => {
                    setDialog(null);
                    resolve(true);
                },
                onCancel: () => {
                    setDialog(null);
                    resolve(false);
                },
            });
        });
    }, []);

    const close = useCallback(() => {
        if (dialog?.onCancel) dialog.onCancel();
    }, [dialog]);

    return (
        <ConfirmDialogContext.Provider value={{ confirm, close }}>
            {children}
            {dialog && <ConfirmDialogUI {...dialog} />}
        </ConfirmDialogContext.Provider>
    );
};

export const useConfirmDialog = () => {
    const context = useContext(ConfirmDialogContext);
    if (!context) {
        throw new Error('useConfirmDialog phải được sử dụng bên trong ConfirmDialogProvider');
    }
    return context;
};

// ==================== UI Component ====================

const TYPE_CONFIG = {
    danger: {
        icon: 'delete_forever',
        iconBg: 'bg-rose-100 dark:bg-rose-500/20',
        iconColor: 'text-rose-500',
        confirmBg: 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/20',
    },
    warning: {
        icon: 'warning',
        iconBg: 'bg-amber-100 dark:bg-amber-500/20',
        iconColor: 'text-amber-500',
        confirmBg: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20',
    },
    info: {
        icon: 'info',
        iconBg: 'bg-blue-100 dark:bg-blue-500/20',
        iconColor: 'text-blue-500',
        confirmBg: 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/20',
    },
};

const ConfirmDialogUI = ({ title, message, confirmText, cancelText, type, icon, onConfirm, onCancel }) => {
    const config = TYPE_CONFIG[type] || TYPE_CONFIG.danger;
    const displayIcon = icon || config.icon;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onCancel}
            ></div>

            {/* Dialog */}
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 animate-dialog-in overflow-hidden">
                <div className="p-6 text-center">
                    {/* Icon */}
                    <div className={`w-16 h-16 mx-auto rounded-2xl ${config.iconBg} flex items-center justify-center mb-4`}>
                        <span className={`material-symbols-outlined text-3xl ${config.iconColor}`}>
                            {displayIcon}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>

                    {/* Message */}
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                        {message}
                    </p>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 flex items-center justify-center gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-5 py-2.5 rounded-xl font-bold text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all active:scale-95 ${config.confirmBg}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
                @keyframes dialog-in {
                    from { opacity: 0; transform: scale(0.9) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-dialog-in {
                    animation: dialog-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
            `}</style>
        </div>
    );
};
