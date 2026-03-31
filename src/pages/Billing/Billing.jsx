import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CurrentPlan from './components/CurrentPlan';
import PaymentMethod from './components/PaymentMethod';
import SubscriptionPlans from './components/SubscriptionPlans';
import BillingHistory from './components/BillingHistory';
import useSubscription from './hooks/useSubscription';
import { paymentService } from '../../services/paymentService';
import { useToast } from '../../components/UI/Toast';

const Billing = () => {
    const { plans, currentPlan, loading, error, refresh } = useSubscription();
    const { addToast } = useToast();
    const location = useLocation();
    const navigate = useNavigate();
    const hasProcessedRef = useRef(false);

    // Handle VNPay Callback inside Billing page for seamless UX
    useEffect(() => {
        const verifyPayment = async () => {
            const queryParams = new URLSearchParams(location.search);
            const vnpResponseCode = queryParams.get('vnp_ResponseCode');
            const vnpTransactionStatus = queryParams.get('vnp_TransactionStatus');

            // Check if URL contains VNPay return parameters and avoid duplicate processing
            if ((vnpResponseCode || vnpTransactionStatus) && !hasProcessedRef.current) {
                hasProcessedRef.current = true; // Block duplicate calls immediately
                
                try {
                    const response = await paymentService.handleVNPayReturn(location.search);
                    
                    if (response.success) {
                        addToast('success', 'Gói dịch vụ của bạn đã được cập nhật thành công!');
                        // Refresh data to show new plan
                        refresh();
                    } else {
                        addToast('error', response.message || 'Thanh toán thất bại hoặc đã bị hủy.');
                    }
                } catch (err) {
                    addToast('error', 'Lỗi xác thực thanh toán: ' + (err.message || 'Unknown error'));
                } finally {
                    // Clean up URL parameters without refreshing the page
                    navigate('/billing', { replace: true });
                }
            }
        };

        verifyPayment();
    }, [location.search, addToast, navigate, refresh]);

    const handleChoosePlan = async (plan) => {
        try {
            const response = await paymentService.createPaymentUrl(plan.id);
            if (response && response.paymentUrl) {
                // Redirect user to VNPay
                window.location.href = response.paymentUrl;
            } else {
                addToast('error', 'Không thể tạo liên kết thanh toán. Vui lòng thử lại.');
            }
        } catch (err) {
            addToast('error', err.message || 'Đã xảy ra lỗi trong quá trình xử lý');
        }
    };

    return (
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-950/20">
            <div className="p-8 space-y-10 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Billing & Subscription</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-md">Upgrade your experience, manage payment methods and view your transaction history in one place.</p>
                    </div>
                </div>

                {/* Main Content Sections */}
                <div className="space-y-12">
                    {/* Subscription Plans Section */}
                    <SubscriptionPlans
                        plans={plans}
                        currentPlanId={currentPlan?.id}
                        loading={loading}
                        onPlanSelect={refresh}
                        onChoosePlan={handleChoosePlan}
                    />

                    {/* Billing History Section */}
                    <div className="pt-4">
                        <BillingHistory />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Billing;
