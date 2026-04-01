import React from 'react';
import usePaymentLogs from '../hooks/usePaymentLogs';

const BillingHistory = ({ refreshTrigger }) => {
    const {
        logs,
        loading,
        error,
        pagination,
        setPage,
        refresh
    } = usePaymentLogs(0, 5); // Fetch first 5 logs initially

    // Listen to refresh trigger from parent component
    React.useEffect(() => {
        if (refreshTrigger > 0) {
            refresh();
        }
        // ESLint warning ignored: We only want to trigger refresh when refreshTrigger changes
        // Adding refresh here would cause an infinite loop because refresh changes when state updates
    }, [refreshTrigger]);

    const getStatusColor = (status) => {
        switch (status?.toUpperCase()) {
            case 'SUCCESS':
            case '00': // VNPay Success code
                return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400';
            case 'PENDING':
                return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
            case 'FAILED':
            case 'CANCELLED':
                return 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400';
            default:
                return 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400';
        }
    };

    const getStatusLabel = (status) => {
        switch (status?.toUpperCase()) {
            case 'SUCCESS':
            case '00':
                return 'Thành công';
            case 'PENDING':
                return 'Đang chờ';
            case 'FAILED':
                return 'Thất bại';
            case 'CANCELLED':
                return 'Đã hủy';
            default:
                return status || 'Không xác định';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('vi-VN', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        } catch (e) {
            return dateString;
        }
    };

    const formatCurrency = (amount) => {
        if (amount === undefined || amount === null) return 'N/A';
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Billing History</h3>
                    <p className="text-xs text-slate-500 mt-1">Review and manage your recent subscription payments.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        onClick={refresh}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all disabled:opacity-50"
                    >
                        <span className={`material-symbols-outlined text-sm ${loading ? 'animate-spin' : ''}`}>sync</span>
                        Refresh
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Export
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto min-h-[300px]">
                {loading && !logs.length ? (
                    <div className="flex flex-col items-center justify-center h-[300px] gap-3">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                        <p className="text-sm font-medium text-slate-500">Đang tải lịch sử giao dịch...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-[300px] p-6 text-center">
                        <span className="material-symbols-outlined text-rose-500 text-4xl mb-2">error</span>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Oops! Đã xảy ra lỗi</p>
                        <p className="text-xs text-slate-500 mt-1 max-w-[250px]">{error}</p>
                    </div>
                ) : logs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[300px] p-6 text-center">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-slate-400 text-3xl">receipt_long</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Chưa có giao dịch nào</p>
                        <p className="text-xs text-slate-500 mt-1 max-w-[250px]">Lịch sử thanh toán của bạn sẽ xuất hiện tại đây sau khi bạn nâng cấp gói dịch vụ.</p>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Date & Time</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Transaction ID</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Plan</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Amount</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400 text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {logs.map((log) => (
                                <tr key={log.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                                            {formatDate(log.vnpPayDate || log.createdAt)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded inline-block">
                                            {(log.vnpTransactionNo || log.id.toString()).substring(0, 10)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-sm">workspace_premium</span>
                                            <span className="text-sm font-medium">{log.planName || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-black text-slate-900 dark:text-white">
                                            {formatCurrency(log.vnpAmount || log.amount)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${getStatusColor(log.vnpResponseCode || log.status)}`}>
                                            {getStatusLabel(log.vnpResponseCode || log.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                                            <span className="material-symbols-outlined text-xl">download</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 0 && logs.length > 0 && (
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/10">
                    <p className="text-xs text-slate-500 font-medium">
                        Showing <span className="font-bold text-slate-900 dark:text-white">{pagination.pageNumber * pagination.pageSize + 1}</span> to <span className="font-bold text-slate-900 dark:text-white">{Math.min((pagination.pageNumber + 1) * pagination.pageSize, pagination.totalElements)}</span> of <span className="font-bold text-slate-900 dark:text-white">{pagination.totalElements}</span> entries
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(pagination.pageNumber - 1)}
                            disabled={pagination.isFirst || loading}
                            className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 transition-all shadow-sm"
                        >
                            <span className="material-symbols-outlined text-sm leading-none">chevron_left</span>
                        </button>
                        <div className="flex items-center px-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-xs font-black">{pagination.pageNumber + 1}</span>
                            <span className="text-xs text-slate-400 mx-2">/</span>
                            <span className="text-xs font-medium text-slate-500">{pagination.totalPages}</span>
                        </div>
                        <button
                            onClick={() => setPage(pagination.pageNumber + 1)}
                            disabled={pagination.isLast || loading}
                            className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 transition-all shadow-sm"
                        >
                            <span className="material-symbols-outlined text-sm leading-none">chevron_right</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillingHistory;
