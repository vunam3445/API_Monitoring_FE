import React from 'react';

const BroadcastForm = ({ formData, errors, sending, plans = [], onChange, onTargetTypeChange, onSubmit }) => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-6">
            <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">campaign</span>
                    Soạn thông báo mới
                </h2>
                <p className="text-xs text-slate-500 mt-1">Gửi thông báo một chiều tới người dùng qua giao diện Web và Email.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
                {/* 1. Chọn Đối tượng nhận */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Đối tượng nhận</label>
                    <select
                        name="targetType"
                        value={formData.targetType}
                        onChange={onTargetTypeChange}
                        disabled={sending}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 dark:text-slate-100 text-sm transition-all"
                    >
                        <option value="ALL">Tất cả người dùng (Broadcast)</option>
                        <option value="PLAN">Nhóm người dùng theo Gói cước</option>
                        <option value="SINGLE">Một người dùng cụ thể (Cá nhân)</option>
                    </select>
                </div>

                {/* 1.1 Nhập giá trị đối tượng cụ thể (Nếu chọn PLAN hoặc SINGLE) */}
                {formData.targetType === 'PLAN' && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-150">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Chọn Gói cước</label>
                        <select
                            name="targetValue"
                            value={formData.targetValue}
                            onChange={onChange}
                            disabled={sending}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 dark:text-slate-100 text-sm transition-all"
                        >
                            {plans.map(plan => (
                                <option key={plan.id} value={plan.name}>
                                    {plan.name} {plan.price !== undefined ? `(${plan.price.toLocaleString('vi-VN')} ${plan.currency || 'VND'})` : ''}
                                </option>
                            ))}
                        </select>
                        {errors.targetValue && <p className="text-xs font-semibold text-red-500">{errors.targetValue}</p>}
                    </div>
                )}

                {formData.targetType === 'SINGLE' && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-150">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Nhập Email người nhận</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-slate-400">mail</span>
                            <input
                                type="text"
                                name="targetValue"
                                placeholder="example@gmail.com"
                                value={formData.targetValue}
                                onChange={onChange}
                                disabled={sending}
                                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border ${errors.targetValue ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-primary/20 focus:border-primary'} rounded-xl focus:outline-none focus:ring-2 text-slate-800 dark:text-slate-100 text-sm transition-all`}
                            />
                        </div>
                        {errors.targetValue && <p className="text-xs font-semibold text-red-500">{errors.targetValue}</p>}
                    </div>
                )}

                {/* 2. Chọn loại thông báo (Level) */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Mức độ thông báo</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['INFO', 'WARNING', 'SYSTEM'].map((lvl) => {
                            let borderStyle = 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800';
                            let activeStyle = '';
                            let labelText = 'Thông tin';
                            let icon = 'info';

                            if (lvl === 'WARNING') {
                                labelText = 'Cảnh báo';
                                icon = 'warning';
                            } else if (lvl === 'SYSTEM') {
                                labelText = 'Hệ thống';
                                icon = 'gpp_maybe';
                            }

                            if (formData.level === lvl) {
                                if (lvl === 'INFO') {
                                    activeStyle = 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-500 text-blue-600 dark:text-blue-400 font-bold';
                                } else if (lvl === 'WARNING') {
                                    activeStyle = 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-500 text-amber-600 dark:text-amber-400 font-bold';
                                } else {
                                    activeStyle = 'bg-red-50/50 dark:bg-red-900/10 border-red-500 text-red-600 dark:text-red-400 font-bold';
                                }
                                borderStyle = '';
                            }

                            return (
                                <button
                                    key={lvl}
                                    type="button"
                                    onClick={() => onChange({ target: { name: 'level', value: lvl } })}
                                    disabled={sending}
                                    className={`py-2 px-3 border rounded-xl flex items-center justify-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 transition-all ${borderStyle} ${activeStyle}`}
                                >
                                    <span className="material-symbols-outlined text-[16px]">{icon}</span>
                                    <span>{labelText}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Kênh gửi thông báo */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Kênh gửi thông báo</label>
                    <div className="grid grid-cols-2 gap-3">
                        <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all select-none ${formData.sendWeb ? 'border-primary bg-primary/5 dark:bg-primary/5 font-semibold text-slate-800 dark:text-slate-200' : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'}`}>
                            <input
                                type="checkbox"
                                name="sendWeb"
                                checked={formData.sendWeb}
                                onChange={onChange}
                                disabled={sending}
                                className="w-4 h-4 rounded text-primary border-slate-300 focus:ring-primary focus:ring-offset-0 accent-orange-500 cursor-pointer"
                            />
                            <span className="flex items-center gap-1.5 text-xs">
                                <span className="material-symbols-outlined text-[16px] text-slate-500">desktop_windows</span>
                                Ứng dụng Web (SSE)
                            </span>
                        </label>

                        <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all select-none ${formData.sendEmail ? 'border-primary bg-primary/5 dark:bg-primary/5 font-semibold text-slate-800 dark:text-slate-200' : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'}`}>
                            <input
                                type="checkbox"
                                name="sendEmail"
                                checked={formData.sendEmail}
                                onChange={onChange}
                                disabled={sending}
                                className="w-4 h-4 rounded text-primary border-slate-300 focus:ring-primary focus:ring-offset-0 accent-orange-500 cursor-pointer"
                            />
                            <span className="flex items-center gap-1.5 text-xs">
                                <span className="material-symbols-outlined text-[16px] text-slate-500">mail</span>
                                Thư điện tử (Email)
                            </span>
                        </label>
                    </div>
                    {errors.channels && <p className="text-xs font-semibold text-red-500 mt-1">{errors.channels}</p>}
                </div>

                {/* 3. Nhập Tiêu đề */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Tiêu đề thông báo</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Nhập tiêu đề thông báo..."
                        value={formData.title}
                        onChange={onChange}
                        disabled={sending}
                        className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border ${errors.title ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-primary/20 focus:border-primary'} rounded-xl focus:outline-none focus:ring-2 text-slate-800 dark:text-slate-100 text-sm transition-all`}
                    />
                    {errors.title && <p className="text-xs font-semibold text-red-500">{errors.title}</p>}
                </div>

                {/* 4. Nhập Nội dung */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Nội dung chi tiết</label>
                        <span className="text-[10px] text-slate-400">{formData.content.length}/1000 kí tự</span>
                    </div>
                    <textarea
                        name="content"
                        rows="6"
                        maxLength="1000"
                        placeholder="Nhập chi tiết nội dung thông báo muốn gửi..."
                        value={formData.content}
                        onChange={onChange}
                        disabled={sending}
                        className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border ${errors.content ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-primary/20 focus:border-primary'} rounded-xl focus:outline-none focus:ring-2 text-slate-800 dark:text-slate-100 text-sm resize-none transition-all`}
                    />
                    {errors.content && <p className="text-xs font-semibold text-red-500">{errors.content}</p>}
                </div>

                {/* 5. Nút gửi */}
                <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all shadow-md shadow-orange-500/10 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed group active:scale-[0.98]"
                >
                    {sending ? (
                        <>
                            <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                            <span>Đang gửi đi...</span>
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-0.5 transition-transform">send</span>
                            <span>Gửi thông báo ngay</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default BroadcastForm;
