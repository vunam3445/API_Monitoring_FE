import React from 'react';
import CurrentPlan from './components/CurrentPlan';
import PaymentMethod from './components/PaymentMethod';
import SubscriptionPlans from './components/SubscriptionPlans';
import BillingHistory from './components/BillingHistory';
import useSubscription from './hooks/useSubscription';

const Billing = () => {
    const { plans, currentPlan, loading, error, refresh } = useSubscription();

    return (
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar">
            <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
                {/* Header (Optional, could be added here or inside components) */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Billing &amp; Subscription</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your plan, billing details and history.</p>
                    </div>
                </div>

                {/* Top Section: Current Plan & Payment Method */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <CurrentPlan plan={currentPlan} loading={loading} onRefresh={refresh} />
                    <div className="lg:col-span-2">
                        <PaymentMethod />
                    </div>
                </div>

                {/* Subscription Plans Section */}
                <SubscriptionPlans 
                    plans={plans} 
                    currentPlanId={currentPlan?.id} 
                    loading={loading} 
                    onPlanSelect={refresh} 
                />

                {/* Billing History Table */}
                <BillingHistory />
            </div>
        </div>
    );
};

export default Billing;
