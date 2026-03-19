import React, { useState, useEffect, useRef } from 'react';
import { useUpdateProfile } from '../../../hooks/useUpdateProfile';
import Notification from '../../../components/UI/Notification';

/**
 * Update Profile Modal Component
 * Allows user to change full name and avatar
 */
const UpdateProfileModal = ({ isOpen, onClose, user, onUpdateSuccess }) => {
    const [fullName, setFullName] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const { updateProfile, loading: isLoading, error, setError } = useUpdateProfile();
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen && user) {
            setFullName(user.fullName || '');
            setPreviewUrl(user.avatarUrl || '');
            setAvatarFile(null);
            setError(null);
        }
    }, [isOpen, user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setError('Image size should be less than 2MB');
                return;
            }
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setError(null);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fullName.trim()) {
            setError('Full name is required');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('id', user.id);
            formData.append('fullName', fullName);
            if (avatarFile) {
                formData.append('avatarFile', avatarFile);
            }

            await updateProfile(user.id, formData);
            onUpdateSuccess();
            onClose();
        } catch (err) {
            // Error is already handled by the hook and updated in state
            console.error('Update failed in modal:', err);
        }
    };

    if (!isOpen) return null;

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
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                        disabled={isLoading}
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>

                    <div className="mb-6 text-center">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                            <span className="material-symbols-outlined text-2xl font-bold">edit_square</span>
                        </div>
                        <h3 className="text-2xl font-bold leading-6 text-slate-900 dark:text-white mb-2">
                            Update Profile
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Change your public information and avatar
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <Notification 
                                type="error" 
                                message={error} 
                                onClose={() => setError('')}
                                duration={5000}
                            />
                        )}

                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-sm transition-transform group-hover:scale-[1.02]">
                                    <img 
                                        src={previewUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(fullName || 'User')} 
                                        alt="Avatar preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={triggerFileInput}
                                    className="absolute -right-2 -bottom-2 bg-primary text-white p-2 rounded-lg shadow-lg hover:bg-primary/90 active:scale-95 transition-all"
                                    title="Change avatar"
                                >
                                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                                </button>
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden" 
                                    accept="image/*"
                                />
                            </div>
                            <p className="text-xs text-slate-500">JPG, PNG or GIF. Max 2MB.</p>
                        </div>

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                                Full Name
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <span className="material-symbols-outlined text-sm">person</span>
                                </span>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-3 pl-10 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                disabled={isLoading}
                            >
                                Cancel
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
                                        Updating...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfileModal;
