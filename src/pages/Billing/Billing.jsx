
import CurrentPlan from './components/CurrentPlan';
import PaymentMethod from './components/PaymentMethod';
import SubscriptionPlans from './components/SubscriptionPlans';
import BillingHistory from './components/BillingHistory';

const Billing = () => {
    return (
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            <div className="p-8 space-y-8">
                {/* Top Section: Current Plan & Payment Method */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <CurrentPlan />
                    <PaymentMethod />
                </div>
                {/* Subscription Plans */}
                <SubscriptionPlans />
                {/* Billing History Table */}
                <BillingHistory />
            </div>
        </div>
    );
};

export default Billing;
