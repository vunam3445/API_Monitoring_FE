import React, { useState, useEffect } from 'react';
import Notification from '../UI/Notification';

const ForgotPasswordModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [step, setStep] = useState(1);
    
    // Step 1 State
    const [email, setEmail] = useState('');
    
    // Step 2 State
    const [otp, setOtp] = useState('');
    const [countdown, setCountdown] = useState(59);
    
    // Step 3 State
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // Common State
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Reset state when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setEmail('');
            setOtp('');
            setNewPassword('');
            setConfirmPassword('');
            setError('');
            setShowNewPassword(false);
            setShowConfirmPassword(false);
            setCountdown(59);
        }
    }, [isOpen]);

    // Timer layout for step 2
    useEffect(() => {
        let timer;
        if (isOpen && step === 2 && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isOpen, step, countdown]);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Vui lòng nhập địa chỉ email.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Email không đúng định dạng.');
            return;
        }

        setIsLoading(true);
        // Giả lập API gọi lấy OTP
        setTimeout(() => {
            setIsLoading(false);
            setStep(2);
            setCountdown(59); // reset timer
            setOtp('');
        }, 1000);
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!otp) {
            setError('Vui lòng nhập mã OTP.');
            return;
        }

        if (!/^\d{6}$/.test(otp)) {
            setError('Mã OTP phải bao gồm đúng 6 chữ số.');
            return;
        }

        setIsLoading(true);
        // Giả lập API xác thực OTP
        setTimeout(() => {
            setIsLoading(false);
            setStep(3);
        }, 1000);
    };

    const handleResendOtp = () => {
        if (countdown > 0) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setCountdown(59);
            // Simulate resent OTP
        }, 1000);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');

        if (!newPassword || !confirmPassword) {
            setError('Vui lòng nhập đầy đủ các trường.');
            return;
        }

        if (newPassword.length < 8) {
            setError('Mật khẩu mới phải có ít nhất 8 ký tự.');
            return;
        }

        // Rule: 1 uppercase, 1 lowercase, 1 number
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!strongRegex.test(newPassword)) {
            setError('Mật khẩu cần ít nhất: 1 chữ hoa, 1 chữ thường, 1 chữ số.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không trùng khớp.');
            return;
        }

        setIsLoading(true);
        // Giả lập API đổi mật khẩu
        setTimeout(() => {
            setIsLoading(false);
            onClose();
            // Switch to Login modal implicitly or manually by user rule
            onSwitchToLogin(email);
        }, 1500);
    };

    if (!isOpen) return null;

    const renderStepContent = () => {
        if (step === 1) {
            return (
                <form className="space-y-4" onSubmit={handleEmailSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Email đã đăng ký
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
                                    setError('');
                                }}
                                className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-3 pl-10 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`mt-4 flex w-full items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl px-4 py-3 font-bold shadow-lg shadow-primary/20 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Đang gửi...' : 'Gửi mã OTP'}
                    </button>
                    
                    <div className="mt-4 text-center">
                        <button 
                            type="button" 
                            onClick={onSwitchToLogin} 
                            className="text-sm font-bold text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-1 w-full"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Quay lại đăng nhập
                        </button>
                    </div>
                </form>
            );
        }

        if (step === 2) {
            return (
                <form className="space-y-4" onSubmit={handleOtpSubmit}>
                    <div className="text-center mb-6">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Mã xác thực đã được gửi tới email
                        </p>
                        <p className="font-bold text-slate-900 dark:text-white">{email}</p>
                    </div>

                    <div>
                        <div className="relative">
                            <input
                                type="text"
                                maxLength="6"
                                value={otp}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    setOtp(val);
                                    setError('');
                                }}
                                className="block w-full text-center tracking-[0.5em] text-2xl font-black rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                                placeholder="••••••"
                            />
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading || otp.length !== 6}
                        className={`mt-4 flex w-full items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl px-4 py-3 font-bold shadow-lg shadow-primary/20 transition-all ${(isLoading || otp.length !== 6) ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}`}
                    >
                        {isLoading ? 'Đang xác thực...' : 'Xác nhận OTP'}
                    </button>
                    
                    <div className="mt-4 text-center">
                        <button 
                            type="button" 
                            onClick={handleResendOtp}
                            disabled={countdown > 0 || isLoading}
                            className={`text-sm font-bold transition-colors ${(countdown > 0 || isLoading) ? 'text-slate-400 cursor-not-allowed' : 'text-primary hover:text-primary/80'}`}
                        >
                            {countdown > 0 ? `Gửi lại mã sau 00:${countdown.toString().padStart(2, '0')}` : 'Gửi lại mã'}
                        </button>
                    </div>
                </form>
            );
        }

        if (step === 3) {
            const inputClasses = "block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-3 pl-10 pr-10 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
            
            return (
                <form className="space-y-4" onSubmit={handleResetPassword}>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/50 mb-4">
                        <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1 font-medium list-disc pl-4">
                            <li>Mật khẩu tối thiểu 8 ký tự</li>
                            <li>Bao gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 số</li>
                        </ul>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Mật khẩu mới
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <span className="material-symbols-outlined text-sm">lock_person</span>
                            </span>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    setError('');
                                }}
                                className={inputClasses}
                                placeholder="Nhập mật khẩu mới"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                <span className="material-symbols-outlined text-sm">{showNewPassword ? 'visibility_off' : 'visibility'}</span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Xác nhận mật khẩu
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                            </span>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setError('');
                                }}
                                className={inputClasses}
                                placeholder="Nhập lại mật khẩu"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                <span className="material-symbols-outlined text-sm">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                            </button>
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`mt-6 flex w-full items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl px-4 py-3 font-bold shadow-lg shadow-primary/20 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}`}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                    </button>
                </form>
            );
        }

        return null;
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={(!isLoading && step === 1) ? onClose : undefined}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl transition-all border border-slate-200 dark:border-slate-800">
                <div className="px-8 py-8">
                    {/* Close button (only allow closing on step 1 or if not loading for others) */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                        disabled={isLoading}
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>

                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                            <span className="material-symbols-outlined text-2xl font-bold">lock_reset</span>
                        </div>
                        <h3 className="text-2xl font-bold leading-6 text-slate-900 dark:text-white mb-2">
                            {step === 1 && "Quên Mật Khẩu"}
                            {step === 2 && "Xác Thực Mã OTP"}
                            {step === 3 && "Đặt Lại Mật Khẩu"}
                        </h3>
                        {step === 1 && (
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Nhập email để nhận mã khôi phục mật khẩu.
                            </p>
                        )}
                    </div>

                    {error && (
                        <Notification
                            type="error"
                            message={error}
                            onClose={() => setError('')}
                            duration={5000}
                        />
                    )}

                    {renderStepContent()}

                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;
