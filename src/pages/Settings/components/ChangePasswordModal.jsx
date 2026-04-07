import React, { useState } from 'react';
import { useToast } from '../../../components/UI/Toast';
import { authService } from '../../../services/authService';

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Toggle visibility states
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const toast = useToast();

    // Reset form when opened/closed
    React.useEffect(() => {
        if (isOpen) {
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setShowOld(false);
            setShowNew(false);
            setShowConfirm(false);
            setError(null);
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
            setError('Vui lòng nhập đầy đủ các trường.');
            return;
        }

        if (newPassword.length < 8) {
            setError('Mật khẩu mới phải có ít nhất 8 ký tự.');
            return;
        }

        if (newPassword === oldPassword) {
            setError('Mật khẩu mới không được trùng với mật khẩu cũ.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không trùng khớp.');
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            const response = await authService.changePassword({ oldPassword, newPassword });
            toast.success(response?.message || 'Đổi mật khẩu thành công. Vui lòng sử dụng mật khẩu mới cho những lần đăng nhập sau.');
            onClose();
        } catch (err) {
            // Check for explicit error message from backend
            let errorMessage = 'Đã có lỗi xảy ra. Không thể đổi mật khẩu.';
            
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                // Sometime api client throws error with message payload from backend JSON
                try {
                    const parsedError = JSON.parse(err.message);
                    if (parsedError.message) errorMessage = parsedError.message;
                    // If it's a map of validation errors
                    else if (Object.keys(parsedError).length > 0) {
                        errorMessage = Object.values(parsedError)[0];
                    }
                } catch(e) {
                    errorMessage = err.message;
                }
            }
            
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    const inputClasses = "block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-3 pl-10 pr-10 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-medium";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={!isLoading ? onClose : undefined}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl transition-all border border-slate-200 dark:border-slate-800">
                <div className="px-8 py-8">
                    {/* Close button */}
                    <button 
                        type="button"
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                        disabled={isLoading}
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>

                    <div className="mb-6 text-center">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 mb-4">
                            <span className="material-symbols-outlined text-2xl font-bold">lock_reset</span>
                        </div>
                        <h3 className="text-2xl font-bold leading-6 text-slate-900 dark:text-white mb-2">
                            Đổi Mật Khẩu
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Cập nhật mật khẩu để bảo vệ tài khoản của bạn
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">error</span>
                                {error}
                            </div>
                        )}

                        {/* Old Password */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Mật khẩu hiện tại
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <span className="material-symbols-outlined text-sm">lock</span>
                                </span>
                                <input
                                    type={showOld ? "text" : "password"}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className={inputClasses}
                                    placeholder="Nhập mật khẩu hiện tại"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOld(!showOld)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    <span className="material-symbols-outlined text-sm">{showOld ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Mật khẩu mới
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <span className="material-symbols-outlined text-sm">key</span>
                                </span>
                                <input
                                    type={showNew ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className={inputClasses}
                                    placeholder="Nhập mật khẩu mới"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNew(!showNew)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    <span className="material-symbols-outlined text-sm">{showNew ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Xác nhận mật khẩu mới
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <span className="material-symbols-outlined text-sm">check_circle</span>
                                </span>
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={inputClasses}
                                    placeholder="Xác nhận mật khẩu"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    <span className="material-symbols-outlined text-sm">{showConfirm ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                disabled={isLoading}
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl px-4 py-3 font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang lưu...
                                    </>
                                ) : (
                                    'Xác nhận'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
