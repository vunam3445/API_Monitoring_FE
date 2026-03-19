import React from 'react';
import PlanRow from './PlanRow';

/**
 * PlansTable - Bảng danh sách plans kèm phân trang
 */
const PlansTable = ({ plans, loading, selectedPlan, pagination, onSelectPlan, onEditPlan, onDeletePlan, onPageChange, renderPaginationButtons }) => (
    <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                        <th className="px-6 py-4">Plan</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Limits</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <tr key={i}>
                                <td className="px-6 py-4"><div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-32 animate-pulse"></div></td>
                                <td className="px-6 py-4"><div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-20 animate-pulse"></div></td>
                                <td className="px-6 py-4"><div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-28 animate-pulse"></div></td>
                                <td className="px-6 py-4"><div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-16 animate-pulse"></div></td>
                                <td className="px-6 py-4"><div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-20 animate-pulse ml-auto"></div></td>
                            </tr>
                        ))
                    ) : plans.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="px-6 py-16 text-center">
                                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2 block">inventory_2</span>
                                <p className="text-slate-400 text-sm">Chưa có plan nào. Hãy tạo plan đầu tiên!</p>
                            </td>
                        </tr>
                    ) : (
                        plans.map((plan) => (
                            <PlanRow
                                key={plan.id}
                                plan={plan}
                                isSelected={selectedPlan?.id === plan.id}
                                onSelect={() => onSelectPlan(plan)}
                                onEdit={() => onEditPlan(plan)}
                                onDelete={() => onDeletePlan(plan)}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>

        {/* Pagination */}
        {!loading && plans.length > 0 && (
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <p className="text-xs text-slate-500">
                    Hiển thị {pagination.page * pagination.size + 1} - {Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)} / {pagination.totalElements} kết quả
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={() => onPageChange(pagination.page - 1)}
                        disabled={pagination.first}
                        className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        Previous
                    </button>
                    {renderPaginationButtons()}
                    <button
                        onClick={() => onPageChange(pagination.page + 1)}
                        disabled={pagination.last}
                        className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        )}
    </div>
);

export default PlansTable;
