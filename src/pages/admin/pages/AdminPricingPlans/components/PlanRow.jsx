import React from 'react';
import StatusBadge from './StatusBadge';
import { parseFeatures, getIntervalLabel } from '../../../../../utils/planUtils';

/**
 * PlanRow - Render một dòng trong bảng danh sách plans
 */
const PlanRow = ({ plan, isSelected, onSelect, onEdit, onDelete }) => {
    const features = parseFeatures(plan.features);
    const featureCount = Object.values(features).filter(Boolean).length;

    return (
        <tr
            onClick={onSelect}
            className={`cursor-pointer transition-colors ${
                isSelected
                    ? 'bg-primary/5 border-l-4 border-l-primary'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
        >
            <td className="px-6 py-4">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{plan.name}</p>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{plan.description || 'Không có mô tả'}</p>
            </td>
            <td className="px-6 py-4">
                <p className="text-sm font-bold text-slate-900 dark:text-white">${plan.price?.toFixed(2)}</p>
                <p className="text-xs text-slate-400">{plan.currency}/mo</p>
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                        <span className="font-semibold">{plan.maxMonitors}</span> monitors
                    </span>
                    <span className="text-xs text-slate-400">
                        Every {getIntervalLabel(plan.minInterval)} • {featureCount} features
                    </span>
                </div>
            </td>
            <td className="px-6 py-4">
                <StatusBadge isActive={plan.isActive} />
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(); }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Edit"
                    >
                        <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                        title="Delete"
                    >
                        <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default PlanRow;
