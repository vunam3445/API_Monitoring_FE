import React from 'react';

const CurrentPlan = ({ plan, loading }) => {
    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm animate-pulse h-full">
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
                <div className="h-8 w-40 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
                <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded mb-6"></div>
                <div className="space-y-3">
                    <div className="h-3 w-full bg-slate-50 dark:bg-slate-800 rounded"></div>
                    <div className="h-3 w-full bg-slate-50 dark:bg-slate-800 rounded"></div>
                </div>
            </div>
        );
    }

    const { name = 'Free Plan', price = 0, features = null, currency = 'VND', description = '' } = plan || {};
    
    const formatFeatureName = (key) => {
        return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const getEnabledFeatures = (featuresData) => {
        if (!featuresData) return [];
        try {
            const parsed = typeof featuresData === 'string' ? JSON.parse(featuresData) : featuresData;
            if (typeof parsed !== 'object' || parsed === null) return [];
            
            return Object.entries(parsed)
                .filter(([_, value]) => value === true)
                .map(([key, _]) => formatFeatureName(key));
        } catch (e) {
            return [];
        }
    };

    const enabledFeatures = getEnabledFeatures(features);

    return (
        <div className="bg-white dark:bg-slate-900 border-2 border-primary rounded-2xl p-6 shadow-xl flex flex-col h-full overflow-hidden relative ring-4 ring-primary/5">
            <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-white bg-primary px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    Your Active Plan
                </span>
            </div>
            
            <div className="mb-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight truncate" title={name}>{name}</h3>
                <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-primary">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: currency }).format(price).replace(/₫/, '').trim()}
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">/{currency}</span>
                </div>
                {description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed min-h-[60px]">
                        {description}
                    </p>
                )}
            </div>

            <div className="space-y-3 mb-8 flex-1 overflow-y-auto custom-scrollbar pr-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subscription Benefits:</p>
                {enabledFeatures.length > 0 ? enabledFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-emerald-500 text-base font-black shrink-0 mt-0.5">check_circle</span>
                        <span className="font-bold text-[11px] uppercase tracking-tight text-slate-600 dark:text-slate-400 break-words leading-tight">
                            {feature}
                        </span>
                    </div>
                )) : (
                    <p className="text-xs text-slate-400 italic">No specific features listed.</p>
                )}
            </div>

            <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity active:scale-[0.98] shadow-lg">
                Manage Billing
            </button>
        </div>
    );
};

export default CurrentPlan;
