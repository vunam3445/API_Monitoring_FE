import { useState, useEffect, useCallback, useMemo } from 'react';
import { subscriptionPlanService } from '../../../services/subscriptionPlanService';
import { parseJwt } from '../../../services/apiClient';

const useSubscription = () => {
    const [plans, setPlans] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userId = useMemo(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = parseJwt(token);
            return decoded?.userId || null;
        }
        return null;
    }, []);

    const fetchAllData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Run in parallel for speed
            const [plansRes, userPlanRes] = await Promise.all([
                subscriptionPlanService.getPaging({ size: 50, sort: 'price,asc' }),
                userId ? subscriptionPlanService.getByUser(userId) : Promise.resolve(null)
            ]);

            if (plansRes && Array.isArray(plansRes.content)) {
                setPlans(plansRes.content);
            } else if (Array.isArray(plansRes)) {
                setPlans(plansRes);
            }

            if (userPlanRes) {
                setCurrentPlan(userPlanRes);
            }
        } catch (err) {
            console.error('Subscription fetch error:', err);
            setError(err.message || 'Failed to load subscription data');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    const getPlanDetails = async (id) => {
        try {
            return await subscriptionPlanService.getById(id);
        } catch (err) {
            console.error('Error fetching plan detail:', err);
            throw err;
        }
    };

    return {
        plans,
        currentPlan,
        loading,
        error,
        userId,
        refresh: fetchAllData,
        getPlanDetails
    };
};

export default useSubscription;
