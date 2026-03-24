import React, { useEffect, useState } from 'react';
import AccountSection from './components/AccountSection';
import NotificationSection from './components/NotificationSection';
import AlertRulesSection from './components/AlertRulesSection';
import MonitoringSection from './components/MonitoringSection';
import APIHealthSection from './components/APIHealthSection';
import { useUserSettings } from '../../hooks/useUserSettings';
import Skeleton from '../../components/UI/Skeleton';
import { useToast } from '../../components/UI/Toast/ToastContext';

const Settings = () => {
    const { settings, loading, isUpdating, error: fetchError, updateSettings } = useUserSettings();
    const [formData, setFormData] = useState(null);
    const toast = useToast();

    // Sync formData when settings are loaded or refreshed
    useEffect(() => {
        if (settings) {
            setFormData(settings);
        }
    }, [settings]);

    const handleFieldChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveChanges = async () => {
        try {
            await updateSettings(formData);
            toast.success('Cài đặt đã được cập nhật thành công!');
        } catch (err) {
            let errorMessage = err.message || 'Lỗi khi cập nhật cài đặt';
            
            // Nếu err.message là JSON string (do apiClient stringify)
            try {
                if (typeof errorMessage === 'string' && errorMessage.startsWith('{')) {
                    const errorObj = JSON.parse(errorMessage);
                    Object.values(errorObj).forEach(msg => {
                        toast.error(msg);
                    });
                    return; // Đã hiển thị qua toast từng field
                }
            } catch (e) {
                // Ignore parse error, use default message
            }

            toast.error(errorMessage);
        }
    };

    if (loading && !settings) {
        return (
            <div className="space-y-8 pb-8">
                <div className="flex flex-col gap-1 max-w-5xl mx-auto">
                    <Skeleton className="w-48 h-10 mb-2" />
                    <Skeleton className="w-96 h-5" />
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-6 h-6 rounded-full" />
                                <Skeleton className="w-32 h-6" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="w-full h-12 rounded-lg" />
                                <Skeleton className="w-full h-12 rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col gap-1 max-w-5xl mx-auto">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage system configuration, notifications, and account preferences</p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <AccountSection />
                
                <NotificationSection 
                    data={formData} 
                    onChange={handleFieldChange} 
                />
                
                <AlertRulesSection 
                    data={formData} 
                    onChange={handleFieldChange}
                />
                
                <MonitoringSection 
                    data={formData} 
                    onChange={handleFieldChange}
                />
                
                <APIHealthSection 
                    data={formData} 
                    onChange={handleFieldChange}
                />
            </div>

            <div className="max-w-5xl mx-auto flex justify-end gap-3 pb-8">
                <button 
                    onClick={() => setFormData(settings)}
                    disabled={isUpdating}
                    className="px-6 py-2.5 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50">
                    Cancel
                </button>
                <button 
                    onClick={handleSaveChanges}
                    disabled={isUpdating}
                    className="px-8 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                    {isUpdating ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            Saving...
                        </>
                    ) : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default Settings;
