import React from 'react';

/**
 * StatsCards - Hiển thị thống kê tổng quan (Total, Active, Inactive, Price Range)
 */
const StatsCards = ({ totalElements, activePlansCount, inactivePlansCount, priceRange }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Total Plans</p>
            <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{totalElements}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Active Plans</p>
            <p className="text-2xl font-bold mt-1 text-green-500">{activePlansCount}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Inactive Plans</p>
            <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{inactivePlansCount}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Price Range</p>
            <p className="text-2xl font-bold mt-1 text-primary">
                {priceRange ? `$${priceRange.min} - $${priceRange.max}` : '--'}
            </p>
        </div>
    </div>
);

export default StatsCards;
