import React from 'react';

const RevenueCharts = ({ data, planData }) => {
    if (!data) return null;

    // Use dynamic data for labels and values
    const labels = data.labels || [];
    const values = data.datasets?.[0]?.data || [];

    // Find max value to scale the bars
    const maxValue = Math.max(...values, 1);

    // Process planData for Revenue by Plan chart
    const rawPlans = (planData || []);
    const totalRevenue = rawPlans.reduce((sum, p) => sum + (p.monthlyRevenue || p.revenue || 0), 0);
    const totalSubscribers = rawPlans.reduce((sum, p) => sum + (p.activeSubscribers || 0), 0);

    const isShowingRevenue = totalRevenue > 0;
    
    const processedPlanData = rawPlans
        .map(p => ({
            name: p.name || 'Unknown',
            value: isShowingRevenue ? (p.monthlyRevenue || p.revenue || 0) : (p.activeSubscribers || 0),
            id: p.id
        }))
        .filter(p => p.value > 0)
        .sort((a, b) => b.value - a.value);

    const totalValue = processedPlanData.reduce((sum, p) => sum + p.value, 0);
    
    // Define a set of colors for the chart
    const chartColors = ['#ec5b13', '#f4a261', '#3b82f6', '#10b981', '#6366f1', '#f59e0b', '#94a3b8'];

    // Generate conic gradient string
    let currentPercentage = 0;
    const gradientParts = processedPlanData.map((p, idx) => {
        const percentage = (p.value / totalValue) * 100;
        const start = currentPercentage;
        currentPercentage += percentage;
        return `${chartColors[idx % chartColors.length]} ${start.toFixed(1)}% ${currentPercentage.toFixed(1)}%`;
    });

    const conicGradient = gradientParts.length > 0 
        ? `conic-gradient(${gradientParts.join(', ')})`
        : 'conic-gradient(#e2e8f0 0% 100%)';

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Monthly Revenue Trend */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-900 dark:text-white">Revenue Trend</h3>
                    <div className="flex gap-2">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Live Analytics
                        </span>
                    </div>
                </div>
                
                <div className="h-64 flex items-end justify-between gap-2 px-2 relative group">
                    {values.map((val, idx) => (
                        <div 
                            key={idx}
                            className={`flex-1 rounded-t transition-all cursor-pointer relative group/bar ${
                                idx === values.length - 1 ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/40'
                            }`}
                            style={{ height: `${(val / maxValue) * 100}%` }}
                        >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none font-bold">
                                {val.toLocaleString('vi-VN')} ₫
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2">
                    {labels.map((label, idx) => {
                        // Only show some labels if there are too many
                        if (labels.length > 12 && idx % Math.floor(labels.length / 10) !== 0) return null;
                        return <span key={idx}>{label}</span>;
                    })}
                </div>
            </div>

            {/* Revenue by Plan - Dynamic distribution */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                <h3 className="font-bold mb-6 text-slate-900 dark:text-white">
                    {isShowingRevenue ? 'Revenue by Plan' : 'Subscribers by Plan'}
                </h3>
                <div className="flex-1 flex items-center justify-center relative">
                    <div className="w-40 h-40 rounded-full border-[12px] border-slate-100 dark:border-slate-800 flex items-center justify-center relative"
                        style={{ background: conicGradient }}>
                        <div className="w-32 h-32 rounded-full bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center px-4">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">
                                {isShowingRevenue ? 'Dist.' : 'Users'}
                            </p>
                            <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                                {isShowingRevenue ? 'Plan Revenue' : 'Plan Users'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-6 space-y-3">
                    {processedPlanData.length === 0 ? (
                        <div className="text-center text-xs text-slate-500 py-4">No revenue data</div>
                    ) : (
                        processedPlanData.map((p, idx) => (
                            <div key={p.id || idx} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 font-medium">
                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors[idx % chartColors.length] }}></span>
                                    <span className="text-slate-900 dark:text-white truncate max-w-[120px]">{p.name}</span>
                                </div>
                                <span className="font-bold text-slate-900 dark:text-white">
                                    {totalValue > 0 ? ((p.value / totalValue) * 100).toFixed(1) : 0}%
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default RevenueCharts;
