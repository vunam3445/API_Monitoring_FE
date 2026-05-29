import React, { useState, useEffect } from 'react';

const CreateFeatureModal = ({ isOpen, onClose, onSubmit, editFeature = null, existingFeatures = [] }) => {
    const [formData, setFormData] = useState({ key: '', label: '', description: '' });
    const [error, setError] = useState('');
    const isEditMode = !!editFeature;

    useEffect(() => {
        if (isOpen) {
            if (editFeature) {
                setFormData({ ...editFeature });
            } else {
                setFormData({ key: '', label: '', description: '' });
            }
            setError('');
        }
    }, [isOpen, editFeature]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'key' ? value.toLowerCase().replace(/[^a-z0-9_]/g, '_') : value,
        }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.key.trim()) {
            setError('Mã tính năng không được để trống.');
            return;
        }
        if (!formData.label.trim()) {
            setError('Tên tính năng không được để trống.');
            return;
        }

        // Kiểm tra trùng lặp key (chỉ kiểm tra khi tạo mới)
        if (!isEditMode) {
            const isDuplicate = existingFeatures.some(f => f.key === formData.key.trim().toLowerCase());
            if (isDuplicate) {
                setError('Mã tính năng này đã tồn tại.');
                return;
            }
        }

        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl transition-all border border-slate-200 dark:border-slate-800">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {isEditMode ? 'Chỉnh sửa tính năng' : 'Thêm tính năng mới'}
                    </h3>
                    <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Body */}
                    <div className="p-6 space-y-4">
                        {error && (
                            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">error</span>
                                {error}
                            </div>
                        )}

                        {/* Feature Key */}
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">
                                Mã tính năng (Key) <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="key"
                                value={formData.key}
                                onChange={handleChange}
                                disabled={isEditMode}
                                className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                                placeholder="e.g. email_notifications"
                            />
                            {!isEditMode && <p className="mt-1 text-[10px] text-slate-400">Chỉ dùng chữ thường không dấu, số và dấu gạch dưới (_).</p>}
                        </div>

                        {/* Feature Label */}
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">
                                Tên tính năng (Label) <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="label"
                                value={formData.label}
                                onChange={handleChange}
                                className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                                placeholder="e.g. Email Notifications"
                            />
                        </div>

                        {/* Feature Description */}
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">Mô tả</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
                                placeholder="Mô tả tóm tắt tính năng..."
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3 bg-slate-50/50 dark:bg-slate-800/30">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm">
                            Huỷ
                        </button>
                        <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-xl font-semibold flex items-center gap-1 shadow-lg shadow-primary/20 transition-all text-sm">
                            <span className="material-symbols-outlined text-sm">save</span>
                            {isEditMode ? 'Lưu thay đổi' : 'Thêm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateFeatureModal;
