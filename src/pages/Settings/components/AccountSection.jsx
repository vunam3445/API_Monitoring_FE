import React, { useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import Skeleton from '../../../components/UI/Skeleton';
import UpdateProfileModal from './UpdateProfileModal';

/**
 * Account Section Component
 * Displays user profile info and provides actions for account management
 */
const AccountSection = () => {
    const { user, loading, error, refresh } = useUser();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // Loading State with Skeleton
    if (loading && !user) {
        return (
            <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-primary">person_outline</span>
                    <h2 className="text-lg font-bold">Account Settings</h2>
                </div>
                <div className="flex items-start gap-4 mb-6">
                    <Skeleton variant="rect" className="w-16 h-16 rounded-xl shadow-sm" />
                    <div className="flex-1 space-y-2 pt-1">
                        <Skeleton variant="text" className="w-24 h-4" />
                        <Skeleton variant="text" className="w-48 h-6" />
                        <Skeleton variant="text" className="w-32 h-4" />
                    </div>
                </div>
                <div className="flex gap-3 mt-auto">
                    <Skeleton variant="rect" className="flex-1 h-10 rounded-lg" />
                    <Skeleton variant="rect" className="flex-1 h-10 rounded-lg" />
                </div>
            </section>
        );
    }

    // Error State
    if (error && !user) {
        return (
            <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full justify-center items-center text-center">
                <span className="material-symbols-outlined text-red-500 text-4xl mb-2">error_outline</span>
                <p className="text-slate-600 dark:text-slate-400 font-medium">Unable to load account info</p>
                <button 
                  onClick={() => refresh()} 
                  className="mt-4 text-primary text-sm font-bold hover:underline"
                >
                  Try Again
                </button>
            </section>
        );
    }

    // Main UI with Data
    const { fullName, email, avatarUrl, company } = user || {};

    return (
        <>
            <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-primary">person_outline</span>
                    <h2 className="text-lg font-bold">Account Settings</h2>
                </div>
                <div className="flex items-start gap-4 mb-6">
                    <img 
                        className="w-16 h-16 rounded-xl object-cover shadow-sm bg-slate-100 dark:bg-slate-800"
                        alt={`${fullName}'s profile`}
                        src={avatarUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(fullName || 'User')} 
                    />
                    <div className="flex-1 overflow-hidden">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                            {company || "Account Holder"}
                        </p>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white truncate">
                            {fullName || "Anonymous User"}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium truncate italic pb-1 border-b border-slate-100 dark:border-slate-800 w-fit">
                            {email}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 mt-auto">
                    <button 
                        onClick={() => setIsUpdateModalOpen(true)}
                        className="flex-1 bg-primary text-white text-sm font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                    >
                        Update Profile
                    </button>
                    <button className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold py-2.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95">
                        Change Password
                    </button>
                </div>
            </section>

            <UpdateProfileModal 
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                user={user}
                onUpdateSuccess={() => refresh()}
            />
        </>
    );
};

export default AccountSection;
