import React from 'react';

const RecentTransactions = () => {
    const transactions = [
        { id: 'TXN-9012', user: 'alex.smith@example.com', plan: 'Pro Monthly', amount: '$29.00', status: 'SUCCESS', time: '2 mins ago' },
        { id: 'TXN-9011', user: 'company.ops@techcorp.io', plan: 'Enterprise', amount: '$499.00', status: 'SUCCESS', time: '15 mins ago' },
        { id: 'TXN-9010', user: 'j.doe@startup.sh', plan: 'Pro Yearly', amount: '$290.00', status: 'FAILED', time: '45 mins ago' },
        { id: 'TXN-9009', user: 'marketing@saas.com', plan: 'Pro Monthly', amount: '$29.00', status: 'SUCCESS', time: '1 hour ago' },
        { id: 'TXN-9008', user: 'dev.lead@freelance.org', plan: 'Pro Monthly', amount: '$29.00', status: 'REFUNDED', time: '3 hours ago' },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
                <button className="text-primary text-[10px] font-bold hover:underline uppercase tracking-wider">View All</button>
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {transactions.map((txn) => (
                        <div key={txn.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    txn.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-600' : 
                                    txn.status === 'FAILED' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'
                                }`}>
                                    <span className="material-symbols-outlined text-[18px]">
                                        {txn.status === 'SUCCESS' ? 'check_circle' : txn.status === 'FAILED' ? 'error' : 'history'}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[150px]">{txn.user}</p>
                                    <p className="text-[10px] text-slate-500">{txn.plan} • {txn.time}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-black text-slate-900 dark:text-white">{txn.amount}</p>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                    txn.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-600' : 
                                    txn.status === 'FAILED' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'
                                }`}>
                                    {txn.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentTransactions;
