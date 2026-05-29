import React from 'react';

const FeatureTable = ({ features, loading, onEdit, onDelete }) => {
    if (loading) {
        return (
            <div className="w-full flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (features.length === 0) {
        return (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700">extension</span>
                <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">Chưa có tính năng nào được tạo.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                            <th className="px-6 py-4">Mã Tính Năng (Key)</th>
                            <th className="px-6 py-4">Tên Tính Năng</th>
                            <th className="px-6 py-4">Mô Tả</th>
                            <th className="px-6 py-4 text-right">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {features.map((feature) => (
                            <tr key={feature.key} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
                                    {feature.key}
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-slate-200">
                                    {feature.label}
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 max-w-md break-words">
                                    {feature.description}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(feature)}
                                            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-colors"
                                            title="Sửa"
                                        >
                                            <span className="material-symbols-outlined text-lg">edit</span>
                                        </button>
                                        <button
                                            onClick={() => onDelete(feature)}
                                            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-rose-600 transition-colors"
                                            title="Xoá"
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeatureTable;
