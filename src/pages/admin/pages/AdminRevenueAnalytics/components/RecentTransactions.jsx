import React from 'react';

const RecentTransactions = ({ transactionsPage, onPageChange, currentPage }) => {
    if (!transactionsPage) return null;
    const { content, totalPages } = transactionsPage;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
                <button className="text-primary text-[10px] font-bold hover:underline uppercase tracking-wider">Audit Log</button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {(!content || content.length === 0) ? (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                        <span className="material-symbols-outlined text-4xl mb-2">payments</span>
                        <p className="text-sm italic">No recent transactions</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {(content || []).map((txn) => (
                            <div key={txn?.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        txn?.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-600' : 
                                        txn?.status === 'FAILED' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                        <span className="material-symbols-outlined text-[18px]">
                                            {txn?.status === 'SUCCESS' ? 'check_circle' : txn?.status === 'FAILED' ? 'error' : 'history'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[150px]">{txn?.userName || 'Unknown User'}</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                            {txn?.plan || 'Unknown Plan'} • {txn?.date ? new Date(txn.date).toLocaleDateString() : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-slate-900 dark:text-white">{(txn?.amount || 0).toLocaleString('vi-VN')} ₫</p>
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                        txn?.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-600' : 
                                        txn?.status === 'FAILED' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                        {txn?.status || 'PENDING'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {totalPages > 1 && (
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <button 
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Page {currentPage + 1} of {totalPages}
                    </span>
                    <button 
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages - 1}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecentTransactions;
