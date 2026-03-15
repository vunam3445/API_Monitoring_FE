import React from 'react';
import StatusBadge from './StatusBadge';
import { parseFeatures, getIntervalLabel } from '../../../../../utils/planUtils';

/**
 * DetailRow - Một dòng key-value trong panel chi tiết
 */
const DetailRow = ({ label, value }) => (
    <div className="flex justify-between items-center">
        <span className="text-sm text-slate-500">{label}</span>
        <span className="text-sm font-bold text-slate-900 dark:text-white">{value}</span>
    </div>
);

/**
 * PlanDetailPanel - Panel chi tiết plan bên phải
 * Hiển thị thông tin đầy đủ của plan đang được chọn
 */
const PlanDetailPanel = ({ plan, onClose, onEdit, onDelete }) => {
    const features = parseFeatures(plan.features);
    const activeFeatures = Object.entries(features).filter(([, v]) => v);

    return (
        <div className="xl:w-96 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col h-fit">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Plan Details</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <div className="p-6 space-y-6">
                {/* Summary */}
                <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{plan.name}</h4>
                    <div className="mt-1 flex items-baseline gap-0.5">
                        <span className="text-2xl font-black text-primary">${plan.price?.toFixed(2)}</span>
                        <span className="text-slate-500 text-sm">/{plan.currency}</span>
                    </div>
                    <StatusBadge isActive={plan.isActive} />
                </div>

                {/* Config */}
                <div className="space-y-3">
                    <DetailRow label="Max Monitors" value={plan.maxMonitors} />
                    <DetailRow label="Min Interval" value={getIntervalLabel(plan.minInterval)} />
                    <DetailRow label="Currency" value={plan.currency} />
                </div>

                {/* Description */}
                {plan.description && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <p className="text-xs font-bold uppercase text-slate-400 mb-1">Mô tả</p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{plan.description}</p>
                    </div>
                )}

                {/* Features */}
                <div>
                    <p className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-wider">Features</p>
                    <div className="space-y-2">
                        {activeFeatures.length === 0 ? (
                            <p className="text-sm text-slate-400">Không có tính năng nào</p>
                        ) : (
                            activeFeatures.map(([key]) => (
                                <div key={key} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    {key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                    <button
                        onClick={onEdit}
                        className="flex-1 bg-primary text-white py-2 rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-1"
                    >
                        <span className="material-symbols-outlined text-sm">edit</span>Edit Plan
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 border border-rose-200 dark:border-rose-800 text-rose-500 rounded-lg text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-sm">delete</span>Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlanDetailPanel;
