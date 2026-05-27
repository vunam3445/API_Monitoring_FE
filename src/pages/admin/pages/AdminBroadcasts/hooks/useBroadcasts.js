import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { adminBroadcastService } from '../../../../../services/adminBroadcastService';
import { useToast } from '../../../../../components/UI/Toast/ToastContext';
import { subscriptionPlanService } from '../../../../../services/subscriptionPlanService';

const initialForm = {
    title: '',
    content: '',
    targetType: 'ALL',
    targetValue: '',
    level: 'INFO',
    sendWeb: true,
    sendEmail: true
};

export const useBroadcasts = () => {
    const [broadcasts, setBroadcasts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [plans, setPlans] = useState([]);
    const [loadingPlans, setLoadingPlans] = useState(false);
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});
    
    const toast = useToast();
    const location = useLocation();
    const navigate = useNavigate();

    // Autofill khi được điều hướng từ chi tiết user
    useEffect(() => {
        if (location.state && location.state.targetType === 'SINGLE' && location.state.email) {
            setFormData(prev => ({
                ...prev,
                targetType: 'SINGLE',
                targetValue: location.state.email
            }));
            
            // Xóa state trong history để tránh tự động điền lại khi reload
            navigate(location.pathname, { replace: true, state: null });
        }
    }, [location.state, navigate, location.pathname]);

    // Tải danh sách gói cước động từ API
    const fetchPlans = useCallback(async () => {
        setLoadingPlans(true);
        try {
            const data = await subscriptionPlanService.getAll();
            if (data && data.length > 0) {
                setPlans(data);
                // Gán giá trị mặc định ban đầu là gói cước đầu tiên
                setFormData(prev => ({
                    ...prev,
                    targetValue: prev.targetValue || data[0].name
                }));
            }
        } catch (error) {
            console.error('Failed to fetch subscription plans from API:', error);
            // Fallback danh sách cước tĩnh nếu API Backend bị lỗi
            const staticPlans = [
                { id: 'free-static', name: 'FREE' },
                { id: 'pro-static', name: 'PRO' },
                { id: 'enterprise-static', name: 'ENTERPRISE' }
            ];
            setPlans(staticPlans);
            setFormData(prev => ({
                ...prev,
                targetValue: prev.targetValue || 'FREE'
            }));
        } finally {
            setLoadingPlans(false);
        }
    }, []);

    // Fetch toàn bộ thông báo đã gửi
    const fetchBroadcasts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await adminBroadcastService.getBroadcasts();
            setBroadcasts(data);
        } catch (error) {
            console.error('Failed to fetch broadcasts:', error);
            toast.error('Không thể tải lịch sử thông báo!');
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchBroadcasts();
        fetchPlans();
    }, [fetchBroadcasts, fetchPlans]);

    // Handle thay đổi các ô nhập liệu của Form
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Xóa lỗi của trường tương ứng nếu đang có lỗi
        if (errors[name] || errors.channels) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                delete newErrors.channels;
                return newErrors;
            });
        }
    };

    // Khi chuyển đổi đối tượng nhận, reset giá trị targetValue và các lỗi liên quan
    const handleTargetTypeChange = (e) => {
        const value = e.target.value;
        const defaultPlan = plans[0]?.name || 'FREE';
        setFormData(prev => ({
            ...prev,
            targetType: value,
            targetValue: value === 'PLAN' ? defaultPlan : ''
        }));
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.targetValue;
            return newErrors;
        });
    };

    // Kiểm tra tính hợp lệ của Form (Form Validation)
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Tiêu đề thông báo không được để trống!';
        } else if (formData.title.trim().length < 5) {
            newErrors.title = 'Tiêu đề phải chứa ít nhất 5 ký tự!';
        }

        if (!formData.content.trim()) {
            newErrors.content = 'Nội dung thông báo không được để trống!';
        } else if (formData.content.trim().length < 10) {
            newErrors.content = 'Nội dung phải chứa ít nhất 10 ký tự!';
        }

        if (formData.targetType === 'SINGLE') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formData.targetValue.trim()) {
                newErrors.targetValue = 'Email người nhận không được để trống!';
            } else if (!emailRegex.test(formData.targetValue.trim())) {
                newErrors.targetValue = 'Email người nhận không đúng định dạng!';
            }
        }

        if (formData.targetType === 'PLAN') {
            if (!formData.targetValue) {
                newErrors.targetValue = 'Vui lòng chọn một gói cước cước!';
            }
        }

        if (!formData.sendWeb && !formData.sendEmail) {
            newErrors.channels = 'Vui lòng chọn ít nhất một kênh gửi thông báo!';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Gửi thông báo
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (!validateForm()) {
            toast.error('Vui lòng kiểm tra lại các thông tin nhập liệu!');
            return false;
        }

        setSending(true);
        try {
            // Định dạng payload gửi
            const payload = {
                title: formData.title.trim(),
                content: formData.content.trim(),
                targetType: formData.targetType,
                targetValue: formData.targetType === 'ALL' ? null : formData.targetValue,
                level: formData.level,
                sendWeb: formData.sendWeb,
                sendEmail: formData.sendEmail
            };

            await adminBroadcastService.sendBroadcast(payload);
            toast.success('Đã gửi thông báo hệ thống & Email thành công!');
            
            // Reset form soạn thảo
            setFormData(initialForm);
            setErrors({});
            
            // Tải lại lịch sử gửi thông báo
            await fetchBroadcasts();
            return true;
        } catch (error) {
            console.error('Failed to send broadcast:', error);
            toast.error(error.message || 'Gửi thông báo thất bại. Vui lòng thử lại!');
            return false;
        } finally {
            setSending(false);
        }
    };

    return {
        broadcasts,
        loading,
        sending,
        plans,
        loadingPlans,
        formData,
        errors,
        handleInputChange,
        handleTargetTypeChange,
        handleSubmit,
        refresh: fetchBroadcasts
    };
};
