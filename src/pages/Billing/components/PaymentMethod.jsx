import React from 'react';

const PaymentMethod = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Payment Method</h3>
                <button className="text-primary text-xs font-bold hover:underline">Edit</button>
            </div>
            <div className="flex-1 flex flex-col justify-center">
                <div className="bg-gradient-to-br from-slate-800 to-slate-950 p-5 rounded-xl text-white shadow-md relative overflow-hidden h-36">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="material-symbols-outlined text-4xl opacity-20">credit_card</span>
                    </div>
                    <div className="flex flex-col h-full justify-between relative z-10">
                        <p className="text-xs font-medium tracking-widest opacity-70">PRIMARY CARD</p>
                        <div>
                            <p className="text-lg font-mono tracking-[0.2em] mb-1">•••• •••• •••• 1234</p>
                            <div className="flex justify-between items-end">
                                <p className="text-xs font-medium">ALEX RIVERA</p>
                                <p className="text-xs font-medium uppercase italic">VISA</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full"></div>
                </div>
            </div>
            <p className="mt-4 text-[10px] text-slate-400 leading-tight">Your card will be charged automatically on each billing cycle. You can update your payment details at any time.</p>
        </div>
    );
};

export default PaymentMethod;
