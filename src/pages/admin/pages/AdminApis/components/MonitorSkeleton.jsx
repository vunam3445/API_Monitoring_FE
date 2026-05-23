import React from 'react';
import Skeleton from '../../../../../components/UI/Skeleton';

const MonitorSkeleton = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                            <th className="px-6 py-4"><Skeleton className="h-4 w-24" /></th>
                            <th className="px-6 py-4"><Skeleton className="h-4 w-32" /></th>
                            <th className="px-6 py-4"><Skeleton className="h-4 w-16" /></th>
                            <th className="px-6 py-4"><Skeleton className="h-4 w-16" /></th>
                            <th className="px-6 py-4"><Skeleton className="h-4 w-16" /></th>
                            <th className="px-6 py-4"><Skeleton className="h-4 w-16" /></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                        {[...Array(5)].map((_, i) => (
                            <tr key={i}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="size-3 rounded-full" />
                                        <div className="space-y-1">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-48" />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4"><Skeleton className="h-4 w-40" /></td>
                                <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                                <td className="px-6 py-4"><Skeleton className="h-6 w-16 rounded-full" /></td>
                                <td className="px-6 py-4"><Skeleton className="h-4 w-12" /></td>
                                <td className="px-6 py-4"><Skeleton className="h-4 w-12" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MonitorSkeleton;
