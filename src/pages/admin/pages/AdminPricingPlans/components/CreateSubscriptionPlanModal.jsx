import React, { useState, useEffect, useRef } from 'react';

const FEATURE_CATEGORIES = {
    CORE: { label: 'Giới hạn', icon: 'settings_input_component' },
    NOTIFICATIONS: { label: 'Thông báo & Cảnh báo', icon: 'notifications_active' },
    ANALYTICS: { label: 'Phân tích & Nhật ký', icon: 'analytics' },
    SECURITY: { label: 'Xác thực & Bảo mật', icon: 'verified_user' },
};

const AVAILABLE_FEATURES = [
    // --- CORE ---
    {
        key: '5_api_endpoints',
        category: 'CORE',
        label: '5 API Endpoints',
        description: 'Giới hạn tối đa 5 địa chỉ API được theo dõi đồng thời.'
    },
    {
        key: '50_api_endpoints',
        category: 'CORE',
        label: '50 API Endpoints',
        description: 'Mở rộng khả năng giám sát lên đến 50 API.'
    },
    {
        key: '500_api_endpoints',
        category: 'CORE',
        label: 'Unlimited API Endpoints',
        description: 'Không giới hạn số lượng API theo dõi.'
    },


    // --- NOTIFICATIONS ---
    {
        key: 'email_notifications',
        category: 'NOTIFICATIONS',
        label: 'Email Notifications',
        description: 'Gửi thông báo lỗi trực tiếp vào hòm thư cá nhân.'
    },
    {
        key: 'slack_notifications',
        category: 'NOTIFICATIONS',
        label: 'Slack & Webhook Support',
        description: 'Tích hợp thông báo vào Slack hoặc gửi dữ liệu lỗi đến URL tùy chỉnh.'
    },
    {
        key: 'real_time_alerts',
        category: 'NOTIFICATIONS',
        label: 'Advanced Alert Rules',
        description: 'Thiết lập điều kiện báo động thông minh (Timeout, Error Rate).'
    },

    // --- ANALYTICS ---
    {
        key: 'advanced_analytics',
        category: 'ANALYTICS',
        label: '24h Performance Charts',
        description: 'Biểu đồ trực quan hóa dữ liệu hiệu năng trong 24 giờ qua.'
    },
    {
        key: 'log_retention_30d',
        category: 'ANALYTICS',
        label: '30-Day Log Retention',
        description: 'Lưu trữ chi tiết nhật ký mọi lần kiểm tra trong 30 ngày.'
    },
    {
        key: 'export_data',
        category: 'ANALYTICS',
        label: 'Export Logs (CSV/JSON)',
        description: 'Trích xuất dữ liệu nhật ký ra định dạng CSV hoặc JSON.'
    },

    // --- SECURITY ---
    {
        key: 'api_response_validation',
        category: 'SECURITY',
        label: 'Deep Response Validation',
        description: 'Xác thực sâu cấu trúc JSON và kiểu dữ liệu trong phản hồi.'
    },
];
const CURRENCY_OPTIONS = [
    { value: 'USD', label: 'USD ($)', symbol: '$' },
    { value: 'EUR', label: 'EUR (€)', symbol: '€' },
    { value: 'GBP', label: 'GBP (£)', symbol: '£' },
    { value: 'VND', label: 'VND (₫)', symbol: '₫' },
];

const INTERVAL_OPTIONS = [
    { value: 5, label: '5 seconds' },
    { value: 10, label: '10 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 300, label: '5 minutes' },
    { value: 600, label: '10 minutes' },
];

// Initial state cho form - tuân thủ SRP
const getInitialFormData = () => ({
    name: '',
    description: '',
    price: '',
    currency: 'USD',
    maxMonitors: '',
    minInterval: 60,
    features: {}, // Đảm bảo là object trống
    isActive: true,
});

/**
 * Parse features từ backend (string JSON) thành object
 * Backend lưu features dạng: '{"api_access": true, "slack_notifications": true}'
 */
const parseFeaturesFromBackend = (data) => {
    if (!data) return {};
    let parsed = data;

    // Đảm bảo parse hết mức có thể (phòng trường hợp double stringified JSON)
    // Ví dụ: "{\"api_access\": true}" -> {api_access: true}
    try {
        while (typeof parsed === 'string') {
            const next = JSON.parse(parsed);
            if (next === parsed) break;
            parsed = next;
        }
    } catch {
        // Nếu không parse được nữa thì giữ nguyên giá trị hiện tại
    }

    // Nếu là dạng mảng ["f1", "f2"] -> chuyển thành {f1: true, f2: true}
    if (Array.isArray(parsed)) {
        return parsed.reduce((acc, key) => ({ ...acc, [key]: true }), {});
    }

    // Luôn trả về một object
    return (parsed && typeof parsed === 'object') ? parsed : {};
};

/**
 * Chuyển dữ liệu plan từ backend thành formData
 */
const planToFormData = (plan) => ({
    name: plan.name || '',
    description: plan.description || '',
    price: plan.price ?? '',
    currency: plan.currency || 'USD',
    maxMonitors: plan.maxMonitors ?? '',
    minInterval: plan.minInterval ?? 60,
    features: parseFeaturesFromBackend(plan.features),
    isActive: plan.isActive ?? true,
});

// Validation logic - tuân thủ SRP
const validateForm = (formData) => {
    const errors = {};
    if (!formData.name.trim()) {
        errors.name = 'Tên plan không được để trống';
    } else if (formData.name.trim().length < 2) {
        errors.name = 'Tên plan phải có ít nhất 2 ký tự';
    }
    if (formData.price === '' || formData.price === null) {
        errors.price = 'Giá không được để trống';
    } else if (Number(formData.price) < 0) {
        errors.price = 'Giá không được âm';
    }
    if (formData.maxMonitors === '' || formData.maxMonitors === null) {
        errors.maxMonitors = 'Số lượng monitors không được để trống';
    } else if (Number(formData.maxMonitors) < 1) {
        errors.maxMonitors = 'Số lượng monitors tối thiểu là 1';
    }
    return errors;
};

/**
 * Modal tạo/chỉnh sửa Subscription Plan
 * @param {boolean} isOpen - Trạng thái mở/đóng
 * @param {function} onClose - Callback đóng modal
 * @param {function} onSubmit - Callback khi submit (nhận payload)
 * @param {object|null} editPlan - Nếu có → chế độ Edit, null → chế độ Create
 */
const CreateSubscriptionPlanModal = ({ isOpen, onClose, onSubmit, editPlan = null }) => {
    const [formData, setFormData] = useState(getInitialFormData());
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const modalRef = useRef(null);

    const isEditMode = !!editPlan;

    const steps = [
        { label: 'Thông tin cơ bản', icon: 'info' },
        { label: 'Giới hạn & Tính năng', icon: 'tune' },
        { label: 'Xem lại', icon: 'fact_check' },
    ];

    // Reset hoặc load dữ liệu khi modal mở
    useEffect(() => {
        if (isOpen) {
            if (editPlan) {
                setFormData(planToFormData(editPlan));
            } else {
                setFormData(getInitialFormData());
            }
            setErrors({});
            setActiveStep(0);
            setIsSubmitting(false);
        }
    }, [isOpen, editPlan]);

    // Đóng modal khi nhấn Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleFeatureToggle = (featureKey) => {
        setFormData((prev) => {
            const currentFeatures = prev.features && typeof prev.features === 'object' ? { ...prev.features } : {};
            return {
                ...prev,
                features: {
                    ...currentFeatures,
                    [featureKey]: !currentFeatures[featureKey],
                },
            };
        });
    };

    const handleNext = () => {
        if (activeStep === 0) {
            const stepErrors = {};
            if (!formData.name.trim()) stepErrors.name = 'Tên plan không được để trống';
            if (formData.price === '') stepErrors.price = 'Giá không được để trống';
            if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }
        }
        if (activeStep === 1) {
            const stepErrors = {};
            if (formData.maxMonitors === '') stepErrors.maxMonitors = 'Số lượng monitors không được để trống';
            if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }
        }
        setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

    const handleSubmit = async () => {
        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setActiveStep(0);
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                name: formData.name.trim(),
                description: formData.description.trim() || null,
                price: Number(formData.price),
                currency: formData.currency,
                maxMonitors: Number(formData.maxMonitors),
                minInterval: Number(formData.minInterval),
                features: JSON.stringify(formData.features),
                isActive: formData.isActive,
            };

            if (onSubmit) {
                await onSubmit(payload);
            }
            onClose();
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} subscription plan:`, error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getCurrencySymbol = () => {
        return CURRENCY_OPTIONS.find((c) => c.value === formData.currency)?.symbol || '$';
    };

    const selectedFeaturesCount = Object.values(formData.features).filter(Boolean).length;

    // ==================== RENDER STEPS ====================

    const renderStep0 = () => (
        <div className="space-y-5 animate-fadeIn">
            {/* Plan Name */}
            <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">
                    Tên Plan <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">label</span>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full rounded-xl border ${errors.name ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary/20'} bg-white dark:bg-slate-800 py-2.5 pl-11 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all text-sm`}
                        placeholder="e.g. Pro Plan, Enterprise..."
                    />
                </div>
                {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">error</span>{errors.name}
                    </p>
                )}
            </div>

            {/* Description */}
            <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">Mô tả</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
                    placeholder="Mô tả ngắn gọn về plan này..."
                />
            </div>

            {/* Price & Currency */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">
                        Giá <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-bold text-sm">{getCurrencySymbol()}</span>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className={`block w-full rounded-xl border ${errors.price ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary/20'} bg-white dark:bg-slate-800 py-2.5 pl-10 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all text-sm`}
                            placeholder="0.00"
                        />
                    </div>
                    {errors.price && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">error</span>{errors.price}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">Đơn vị tiền tệ</label>
                    <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm cursor-pointer appearance-none"
                    >
                        {CURRENCY_OPTIONS.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                    </select>
                </div>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Kích hoạt Plan</p>
                    <p className="text-xs text-slate-500 mt-0.5">Plan sẽ được hiển thị và cho phép đăng ký</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
            </div>
        </div>
    );

    const renderStep1 = () => {
        // Hàm render cho từng nhóm tính năng - Tận dụng lại logic để giảm lỗi
        const renderFeatureGroup = (catKey) => {
            const catInfo = FEATURE_CATEGORIES[catKey];
            const catFeatures = AVAILABLE_FEATURES.filter((f) => f.category === catKey);
            if (catFeatures.length === 0) return null;

            return (
                <div key={catKey} className="space-y-3">
                    <div className="flex items-center gap-2 px-1 border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="material-symbols-outlined text-slate-400 text-sm">{catInfo.icon}</span>
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{catInfo.label}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {catFeatures.map((feature) => {
                            const isChecked = !!(formData.features && formData.features[feature.key]);
                            return (
                                <button
                                    key={feature.key}
                                    type="button"
                                    onClick={() => handleFeatureToggle(feature.key)}
                                    className={`flex items-start gap-3 p-3 rounded-xl transition-all border text-left ${isChecked
                                        ? 'bg-primary/5 border-primary/30 dark:bg-primary/10 ring-1 ring-primary/20'
                                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                        }`}
                                >
                                    <div className="mt-0.5 shrink-0">
                                        <span className={`material-symbols-outlined text-lg transition-colors ${isChecked ? 'text-primary' : 'text-slate-300'}`}>
                                            {isChecked ? 'check_circle' : 'radio_button_unchecked'}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-bold truncate ${isChecked ? 'text-primary' : 'text-slate-700 dark:text-slate-200'}`}>
                                            {feature.label}
                                        </p>
                                        <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            );
        };

        return (
            <div className="space-y-6 animate-fadeIn pb-4">
                {/* Section Giới hạn */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* <div>
                        <label className="block text-[11px] font-black uppercase text-slate-400 mb-2 tracking-widest">Giới hạn Monitors</label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary transition-colors">dns</span>
                            <input
                                type="number"
                                name="maxMonitors"
                                value={formData.maxMonitors}
                                onChange={handleChange}
                                min="1"
                                className={`block w-full rounded-xl border ${errors.maxMonitors ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary/20'} bg-white dark:bg-slate-800 py-2.5 pl-11 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all text-sm`}
                                placeholder="e.g. 50"
                            />
                        </div>
                        {errors.maxMonitors && <p className="mt-1 text-xs text-rose-500">{errors.maxMonitors}</p>}
                    </div> */}
                    <div>
                        <label className="block text-[11px] font-black uppercase text-slate-400 mb-2 tracking-widest">Tần suất tối thiểu</label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary transition-colors">timer</span>
                            <select
                                name="minInterval"
                                value={formData.minInterval}
                                onChange={handleChange}
                                className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 pl-11 pr-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm appearance-none"
                            >
                                {INTERVAL_OPTIONS.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Danh sách Features */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Tính năng đi kèm</label>
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{selectedFeaturesCount} Key được cấp</span>
                    </div>

                    {/* Render từng nhóm theo thứ tự ưu tiên */}
                    {renderFeatureGroup('CORE')}
                    {renderFeatureGroup('NOTIFICATIONS')}
                    {renderFeatureGroup('ANALYTICS')}
                    {renderFeatureGroup('SECURITY')}
                </div>
            </div>
        );
    };

    const renderStep2 = () => {
        const selectedFeatures = AVAILABLE_FEATURES.filter((f) => formData.features[f.key]);
        const intervalLabel = INTERVAL_OPTIONS.find((i) => i.value === Number(formData.minInterval))?.label || `${formData.minInterval}s`;
        return (
            <div className="space-y-5 animate-fadeIn">
                <div className="text-center p-5 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20">
                    <div className="w-14 h-14 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined text-primary text-2xl">workspace_premium</span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white">{formData.name || 'Unnamed Plan'}</h4>
                    <div className="mt-2 flex items-baseline justify-center gap-0.5">
                        <span className="text-3xl font-black text-primary">{getCurrencySymbol()}{formData.price || '0'}</span>
                        <span className="text-slate-500 text-sm">/mo</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${formData.isActive ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${formData.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                        {formData.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-sm text-slate-500 flex items-center gap-2"><span className="material-symbols-outlined text-base">dns</span>Max Monitors</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{formData.maxMonitors || '--'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-sm text-slate-500 flex items-center gap-2"><span className="material-symbols-outlined text-base">timer</span>Min Interval</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{intervalLabel}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-sm text-slate-500 flex items-center gap-2"><span className="material-symbols-outlined text-base">payments</span>Đơn vị tiền tệ</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{formData.currency}</span>
                    </div>
                </div>
                {formData.description && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <p className="text-xs font-bold uppercase text-slate-400 mb-1">Mô tả</p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{formData.description}</p>
                    </div>
                )}
                {selectedFeatures.length > 0 ? (
                    <div>
                        <p className="text-xs font-bold uppercase text-slate-400 mb-2.5 tracking-wider">Tính năng ({selectedFeatures.length})</p>
                        <div className="grid grid-cols-1 gap-2">
                            {selectedFeatures.map((feature) => (
                                <div key={feature.key} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>{feature.label}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-4 text-slate-400 text-sm">
                        <span className="material-symbols-outlined text-2xl mb-1 block">info</span>
                        Chưa có tính năng nào được chọn
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div ref={modalRef} className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl transition-all border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-gradient-to-r from-slate-50/80 to-white dark:from-slate-800/50 dark:to-slate-900 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isEditMode ? 'bg-amber-500/10' : 'bg-primary/10'}`}>
                            <span className={`material-symbols-outlined text-xl ${isEditMode ? 'text-amber-500' : 'text-primary'}`}>
                                {isEditMode ? 'edit_note' : 'add_card'}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                {isEditMode ? 'Chỉnh sửa Plan' : 'Tạo Subscription Plan'}
                            </h3>
                            <p className="text-xs text-slate-500">
                                {isEditMode ? `Đang chỉnh sửa: ${editPlan.name}` : 'Thiết lập plan mới cho nền tảng'}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Stepper */}
                <div className="px-8 py-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => (
                            <React.Fragment key={index}>
                                <button
                                    onClick={() => { if (index < activeStep) setActiveStep(index); }}
                                    className={`flex items-center gap-2 transition-all ${index <= activeStep ? 'cursor-pointer' : 'cursor-default'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${index < activeStep ? 'bg-emerald-500 text-white' : index === activeStep ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                        {index < activeStep ? <span className="material-symbols-outlined text-sm">check</span> : <span className="material-symbols-outlined text-sm">{step.icon}</span>}
                                    </div>
                                    <span className={`text-xs font-semibold hidden sm:block ${index === activeStep ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{step.label}</span>
                                </button>
                                {index < steps.length - 1 && <div className={`flex-1 h-0.5 mx-3 rounded-full transition-all ${index < activeStep ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Body */}
                <div className="px-8 py-6 overflow-y-auto flex-1 custom-scrollbar">
                    {activeStep === 0 && renderStep0()}
                    {activeStep === 1 && renderStep1()}
                    {activeStep === 2 && renderStep2()}
                </div>

                {/* Footer */}
                <div className="px-8 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30 shrink-0">
                    <button type="button" onClick={activeStep === 0 ? onClose : handleBack} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm">
                        {activeStep === 0 ? 'Huỷ' : 'Quay lại'}
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 hidden sm:block">Bước {activeStep + 1}/{steps.length}</span>
                        {activeStep < steps.length - 1 ? (
                            <button type="button" onClick={handleNext} className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 text-sm">
                                Tiếp theo<span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        ) : (
                            <button type="button" onClick={handleSubmit} disabled={isSubmitting} className={`${isEditMode ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'} disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95 text-sm`}>
                                {isSubmitting ? (
                                    <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>{isEditMode ? 'Đang lưu...' : 'Đang tạo...'}</>
                                ) : (
                                    <><span className="material-symbols-outlined text-sm">save</span>{isEditMode ? 'Lưu thay đổi' : 'Tạo Plan'}</>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.3); border-radius: 999px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.5); }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default CreateSubscriptionPlanModal;
