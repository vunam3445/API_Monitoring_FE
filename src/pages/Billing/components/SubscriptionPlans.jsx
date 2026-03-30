import React from 'react';

const SubscriptionPlans = ({ plans = [], loading, currentPlanId }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800"></div>
                ))}
            </div>
        );
    }

    const formatFeatureName = (key) => {
        return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const getEnabledFeatures = (features) => {
        if (!features) return [];
        try {
            // Check if it's a JSON string
            const parsed = typeof features === 'string' ? JSON.parse(features) : features;
            if (typeof parsed !== 'object' || parsed === null) return [];
            
            return Object.entries(parsed)
                .filter(([_, value]) => value === true)
                .map(([key, _]) => formatFeatureName(key));
        } catch (e) {
            // Handle cases where it's a simple comma-separated string
            if (typeof features === 'string' && features.includes(',')) {
                return features.split(',').map(f => f.trim());
            }
            return [];
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Available Subscription Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {plans.map((plan) => {
                    const isCurrent = plan.isCurrentPlan === true || plan.id === currentPlanId;
                    const enabledFeatures = getEnabledFeatures(plan.features);

                    return (
                        <div 
                            key={plan.id} 
                            className={`p-6 rounded-3xl border-2 flex flex-col transition-all duration-300 relative ${
                                isCurrent 
                                ? 'bg-gradient-to-b from-primary/10 to-transparent border-primary shadow-2xl shadow-primary/20 -translate-y-2 z-10' 
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary/40 hover:-translate-y-1'
                            }`}
                        >
                            {isCurrent && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap border-4 border-white dark:border-slate-950">
                                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                    YOUR CURRENT ACTIVE PLAN
                                </div>
                            )}

                            <div className="mb-6 pt-4">
                                <div className="flex justify-between items-start">
                                    <h4 className={`text-xl font-black uppercase tracking-tight truncate ${isCurrent ? 'text-primary' : 'text-slate-900 dark:text-white'}`} title={plan.name}>
                                        {plan.name}
                                    </h4>
                                    {isCurrent && <span className="material-symbols-outlined text-primary text-xl">star</span>}
                                </div>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-slate-900 dark:text-white">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: plan.currency || 'VND' }).format(plan.price).replace(/₫/, '').trim()}
                                    </span>
                                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">/{plan.currency || 'mo'}</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed min-h-[80px]">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="space-y-2.5 mb-8 flex-1 overflow-hidden">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Included Features:</p>
                                {enabledFeatures.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-2.5 group">
                                        <div className="shrink-0 mt-0.5">
                                            <span className="material-symbols-outlined text-sm text-emerald-500 font-black">check_circle</span>
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tight break-words leading-tight">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button 
                                disabled={isCurrent}
                                className={`w-full py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    isCurrent 
                                    ? 'bg-emerald-500 text-white cursor-default' 
                                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 shadow-lg active:scale-95'
                                }`}
                            >
                                {isCurrent ? 'Active Now' : 'Choose Plan'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SubscriptionPlans;
