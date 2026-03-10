import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../../services/authService';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await authService.login({ email, password });

            // Response API trả về dạng flat: { accessToken, role, userId, email, fullName, avatarUrl, planType, ... }
            const accessToken = data?.accessToken;
            const role = data?.role;

            if (!accessToken) {
                throw new Error('Không nhận được token từ server.');
            }

            // Lưu accessToken vào localStorage
            localStorage.setItem('accessToken', accessToken);

            // Lưu thông tin user vào localStorage
            const userInfo = {
                userId: data.userId,
                email: data.email,
                fullName: data.fullName,
                avatarUrl: data.avatarUrl,
                planType: data.planType,
                role: data.role,
            };
            localStorage.setItem('user', JSON.stringify(userInfo));

            // Kiểm tra role: chỉ ADMIN mới được truy cập
            if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
                navigate('/admin/dashboard');
            } else {
                // Không phải admin → xóa token và báo lỗi
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                setError('Bạn không có quyền truy cập trang quản trị. Chỉ tài khoản Admin mới được phép đăng nhập.');
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại email hoặc mật khẩu.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-display bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center overflow-x-hidden">
            <div className="flex flex-col lg:flex-row w-full min-h-screen">
                {/* Left Side: Branding & Illustration */}
                <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="size-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                <span className="material-symbols-outlined text-3xl">monitoring</span>
                            </div>
                            <h2 className="text-white text-2xl font-black tracking-tight">API Monitoring <span className="text-blue-400 opacity-80">Admin</span></h2>
                        </div>
                        <div className="max-w-md">
                            <h1 className="text-white text-5xl font-black leading-tight mb-6">Real-time system oversight at your fingertips.</h1>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                Manage users, APIs, alerts, and system monitoring from a centralized dashboard. Securely access the backbone of your infrastructure.
                            </p>
                        </div>
                    </div>

                    {/* Abstract Data Vis Area */}
                    <div className="relative z-10 flex-1 flex items-center justify-center py-12">
                        <div className="w-full max-w-sm aspect-square bg-slate-800/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col gap-4">
                            <div className="flex justify-between items-end gap-2 h-32">
                                <div className="flex-1 bg-blue-500/40 rounded-t-lg h-1/2"></div>
                                <div className="flex-1 bg-blue-500/60 rounded-t-lg h-3/4"></div>
                                <div className="flex-1 bg-blue-500 rounded-t-lg h-full"></div>
                                <div className="flex-1 bg-blue-500/50 rounded-t-lg h-2/3"></div>
                                <div className="flex-1 bg-blue-500/70 rounded-t-lg h-4/5"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[85%]"></div>
                                </div>
                                <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[62%]"></div>
                                </div>
                                <div className="flex justify-between text-xs text-slate-400 font-medium">
                                    <span>SERVER HEALTH: 98.2%</span>
                                    <span>LATENCY: 42ms</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 text-slate-400 text-sm">
                        © {new Date().getFullYear()} API Monitoring SaaS Platform. All rights reserved.
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 md:p-20 bg-slate-50 dark:bg-slate-900">
                    <div className="w-full max-w-md">
                        <div className="flex justify-end mb-8 lg:absolute lg:top-8 lg:right-8">
                            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                Back to Website
                            </button>
                        </div>

                        <div className="mb-10 text-center lg:text-left">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Admin Login</h2>
                            <p className="text-slate-500 dark:text-slate-400">Only authorized administrators can access this dashboard.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 flex items-start gap-3 text-red-700 dark:text-red-400 text-sm">
                                <span className="material-symbols-outlined shrink-0">error</span>
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2" htmlFor="email">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                        <span className="material-symbols-outlined text-xl">mail</span>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                                        placeholder="admin@api-monitor.io"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="password">Password</label>
                                    <a href="#" className="text-sm font-semibold text-blue-500 hover:text-blue-600" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                        <span className="material-symbols-outlined text-xl">lock</span>
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-11 pr-12 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    >
                                        <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember-me"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="size-4 text-blue-500 focus:ring-blue-500/20 border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700 dark:text-slate-400">
                                    Remember me for 30 days
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang đăng nhập...
                                    </>
                                ) : (
                                    'Sign In to Dashboard'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
