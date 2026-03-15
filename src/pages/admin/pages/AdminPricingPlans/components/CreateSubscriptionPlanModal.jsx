import React, { useState, useEffect, useRef } from 'react';

// Danh sách features mặc định có thể chọn
const AVAILABLE_FEATURES = [
    { key: 'slack_notifications', label: 'Slack Notifications' },
    { key: 'webhook_support', label: 'Webhook Support' },
    { key: 'white_label_reports', label: 'White-label Reports' },
    { key: 'advanced_analytics', label: 'Advanced Analytics' },
    { key: 'real_time_alerts', label: 'Real-time Alerts' },
    { key: 'priority_support', label: 'Priority Support' },
    { key: 'custom_dashboards', label: 'Custom Dashboards' },
    { key: 'api_response_validation', label: 'API Response Validation' },
    { key: 'multi_region_monitoring', label: 'Multi-Region Monitoring' },
    { key: 'sso_integration', label: 'SSO Integration' },
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
    features: {},
    isActive: true,
});

/**
 * Parse features từ backend (string JSON) thành object
 * Backend lưu features dạng: '{"api_access": true, "slack_notifications": true}'
 */
const parseFeaturesFromBackend = (featuresStr) => {
    if (!featuresStr) return {};
    try {
        return typeof featuresStr === 'string' ? JSON.parse(featuresStr) : featuresStr;
    } catch {
        return {};
    }
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
        setFormData((prev) => ({
            ...prev,
            features: {
                ...prev.features,
                [featureKey]: !prev.features[featureKey],
            },
        }));
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

    const renderStep1 = () => (
        <div className="space-y-5 animate-fadeIn">
            <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">
                    Số lượng Monitors tối đa <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">dns</span>
                    <input
                        type="number"
                        name="maxMonitors"
                        value={formData.maxMonitors}
                        onChange={handleChange}
                        min="1"
                        className={`block w-full rounded-xl border ${errors.maxMonitors ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary/20'} bg-white dark:bg-slate-800 py-2.5 pl-11 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all text-sm`}
                        placeholder="e.g. 50"
                    />
                </div>
                {errors.maxMonitors && (
                    <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">error</span>{errors.maxMonitors}
                    </p>
                )}
            </div>
            <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">Khoảng thời gian kiểm tra tối thiểu</label>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">timer</span>
                    <select
                        name="minInterval"
                        value={formData.minInterval}
                        onChange={handleChange}
                        className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 pl-11 pr-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm cursor-pointer appearance-none"
                    >
                        {INTERVAL_OPTIONS.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                    </select>
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Tính năng</label>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-lg">{selectedFeaturesCount} đã chọn</span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                    {AVAILABLE_FEATURES.map((feature) => (
                        <label
                            key={feature.key}
                            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${formData.features[feature.key] ? 'bg-primary/5 border-primary/30 dark:bg-primary/10' : 'bg-slate-50 dark:bg-slate-800/50 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`material-symbols-outlined text-lg transition-colors ${formData.features[feature.key] ? 'text-primary' : 'text-slate-400'}`}>
                                    {formData.features[feature.key] ? 'check_circle' : 'radio_button_unchecked'}
                                </span>
                                <span className="text-sm font-medium text-slate-900 dark:text-white">{feature.label}</span>
                            </div>
                            <input type="checkbox" checked={!!formData.features[feature.key]} onChange={() => handleFeatureToggle(feature.key)} className="sr-only" />
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

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
