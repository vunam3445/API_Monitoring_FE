import React from 'react';

const AccountSection = () => {
    return (
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">person_outline</span>
                <h2 className="text-lg font-bold">Account Settings</h2>
            </div>
            <div className="flex items-start gap-4 mb-6">
                <img className="w-16 h-16 rounded-xl object-cover shadow-sm"
                    alt="Main user profile portrait placeholder"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4mZE5ePxM27CxNg11lCPqqNJb6nBgB8Fx_ygyOMVxzdbXJbk_51VzIR4rqYBAfA83nXahHsAep7FLTNdPF4dr6kPqUgjiMjpzws6pz4Ibb51pesNeN0syi-a3qL3z___K06cEH7zWXy9404ug0pomEE6yTxEIhayxu3dTfpTLnj4P3hayv3qOL0dG2-0_PMUOn0Vic7P9aY4sDirA5J4T-sHcS9yrned8MFCkdY_mobpwFfG9OylicFxt5OvS5itAUBABWJxs5kRP" />
                <div className="flex-1">
                    <p className="text-sm text-slate-500 font-medium">Administrator</p>
                    <h3 className="text-xl font-bold">Alex Rivera</h3>
                    <p className="text-sm text-slate-500">alex.rivera@company.tech</p>
                </div>
            </div>
            <div className="flex gap-3 mt-auto">
                <button className="flex-1 bg-primary text-white text-sm font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-colors">
                    Update Profile
                </button>
                <button className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold py-2.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    Change Password
                </button>
            </div>
        </section>
    );
};

export default AccountSection;
