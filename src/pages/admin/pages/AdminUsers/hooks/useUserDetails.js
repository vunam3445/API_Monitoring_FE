import { useState, useEffect, useCallback } from 'react';
import { adminUserService } from '../../../../../services/adminUserService';
import { subscriptionPlanService } from '../../../../../services/subscriptionPlanService';
import { useToast } from '../../../../../components/UI/Toast';

export const useUserDetails = (user, setSelectedUser) => {
    const [activeTab, setActiveTab] = useState('apis'); // 'apis', 'alerts', 'logs'
    const [monitorStats, setMonitorStats] = useState({
        totalMonitor: 0,
        totalActiveMonitor: 0
    });
    const [alertStats, setAlertStats] = useState({
        totalAlert: 0,
        totalIncident: 0
    });
    const [loadingStats, setLoadingStats] = useState(false);

    // Plans state
    const [plans, setPlans] = useState([]);
    const [loadingPlans, setLoadingPlans] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState('');
    const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);

    // Manual Extend State
    const [extendDuration, setExtendDuration] = useState(1);
    const [extendUnit, setExtendUnit] = useState('MONTHS');
    const [extendNote, setExtendNote] = useState('');
    const [extendAmount, setExtendAmount] = useState(0);

    const toast = useToast();

    const fetchStats = useCallback(async () => {
        if (!user?.id) return;

        setLoadingStats(true);
        try {
            const [monitorRes, alertRes] = await Promise.all([
                adminUserService.getUserMonitorStats(user.id),
                adminUserService.getUserMonthlyAlertStats(user.id)
            ]);
            setMonitorStats(monitorRes);
            setAlertStats(alertRes);
        } catch (error) {
            console.error("Failed to fetch statistics:", error);
        } finally {
            setLoadingStats(false);
        }
    }, [user?.id]);

    const fetchPlans = useCallback(async () => {
        setLoadingPlans(true);
        try {
            const res = await subscriptionPlanService.getAll();
            const plansData = Array.isArray(res) ? res : (res.content || []);
            setPlans(plansData);
        } catch (error) {
            console.error("Failed to fetch plans:", error);
        } finally {
            setLoadingPlans(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
        fetchPlans();
    }, [fetchStats, fetchPlans]);

    const handleUpdatePlan = async () => {
        if (!selectedPlanId) {
            toast.error("Vui lòng chọn một gói để cập nhật.");
            return;
        }

        setIsUpdatingPlan(true);
        try {
            const res = await adminUserService.updateUserPlan(user.id, selectedPlanId);
            toast.success(res.message || "Cập nhật gói đăng ký thành công");

            const updatedPlan = plans.find(p => p.id === selectedPlanId);
            if (updatedPlan && setSelectedUser) {
                setSelectedUser(prev => ({ ...prev, planType: updatedPlan.name.toUpperCase() }));
            }
            setSelectedPlanId('');
        } catch (error) {
            toast.error(error.message || "Cập nhật gói thất bại.");
        } finally {
            setIsUpdatingPlan(false);
        }
    };

    const handleManualRenewal = async () => {
        if (!extendNote) {
            toast.error("Vui lòng nhập ghi chú gia hạn.");
            return;
        }
        try {
            setIsUpdatingPlan(true);
            const typeMap = { 'DAYS': 'day', 'MONTHS': 'month', 'YEARS': 'year' };
            const data = {
                type: typeMap[extendUnit],
                time: parseInt(extendDuration),
                note: extendNote,
                amount: parseFloat(extendAmount)
            };
            await adminUserService.renewSubscriptionManual(user.id, data);
            toast.success("Gia hạn gói cước thành công!");
            
            // Reset form
            setExtendDuration(1);
            setExtendNote('');
            setExtendAmount(0);
            
            // Refresh stats if needed (subscription info might have changed)
            fetchStats();
        } catch (error) {
            toast.error(error.message || "Gia hạn thất bại.");
        } finally {
            setIsUpdatingPlan(false);
        }
    };

    return {
        activeTab,
        setActiveTab,
        monitorStats,
        alertStats,
        loadingStats,
        plans,
        loadingPlans,
        selectedPlanId,
        setSelectedPlanId,
        isUpdatingPlan,
        handleUpdatePlan,
        extendDuration,
        setExtendDuration,
        extendUnit,
        setExtendUnit,
        extendNote,
        setExtendNote,
        extendAmount,
        setExtendAmount,
        handleManualRenewal,
        refreshStats: fetchStats
    };
};
