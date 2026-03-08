import React from 'react';

const SecuritySection = () => {
    return (
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">security</span>
                <h2 className="text-lg font-bold">Security Settings</h2>
            </div>
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold">Two-Factor Authentication</p>
                        <p className="text-[11px] text-slate-500">Add extra security to your account</p>
                    </div>
                    <input defaultChecked
                        className="w-10 h-5 rounded-full bg-slate-200 dark:bg-slate-700 appearance-none checked:bg-primary cursor-pointer relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all checked:after:left-[22px]"
                        type="checkbox" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Session Timeout</label>
                    <select
                        className="w-full text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary">
                        <option>1 Hour</option>
                        <option defaultValue="8 Hours">8 Hours</option>
                        <option>Never</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Global API Key</label>
                    <div className="flex gap-2">
                        <div
                            className="flex-1 bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-mono flex items-center justify-between">
                            <span className="text-slate-500">****************************8f4a</span>
                            <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-primary transition-colors">visibility</span>
                        </div>
                        <button
                            className="bg-slate-200 dark:bg-slate-700 p-2 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                            <span className="material-symbols-outlined text-[20px] block">refresh</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SecuritySection;
