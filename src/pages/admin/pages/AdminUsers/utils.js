export const getStatusBadge = (status) => {
    switch (status) {
        case 'ACTIVE':
            return {
                bg: 'bg-green-500',
                text: 'text-green-600',
                lightBg: 'bg-green-50'
            };
        case 'SUSPENDED':
            return {
                bg: 'bg-red-500',
                text: 'text-red-600',
                lightBg: 'bg-red-50'
            };
        case 'PENDING':
            return {
                bg: 'bg-orange-500',
                text: 'text-orange-600',
                lightBg: 'bg-orange-50'
            };
        default:
            return {
                bg: 'bg-slate-500',
                text: 'text-slate-600',
                lightBg: 'bg-slate-50'
            };
    }
};

export const getPlanBadge = (planType) => {
    switch (planType) {
        case 'PRO':
            return 'bg-orange-50 dark:bg-primary/10 text-primary';
        case 'ENTERPRISE':
            return 'bg-slate-900 dark:bg-slate-700 text-white';
        case 'FREE':
        default:
            return 'bg-slate-100 dark:bg-slate-800 text-slate-500';
    }
};

export const formatDate = (dateString) => {
    if (!dateString) return '--';
    try {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    } catch (e) {
        return dateString;
    }
};
