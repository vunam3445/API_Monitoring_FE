import React from 'react';

const DeliveryDetailPanel = ({ selectedDelivery, onClose, onRetry }) => {
    if (!selectedDelivery) return null;

    return (
        <aside className="w-full xl:w-96 flex-shrink-0 space-y-6 animate-in slide-in-from-right duration-300">
            <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all hover:scale-110 z-20 group"
                    title="Close Panel"
                >
                    <span className="material-symbols-outlined text-white/50 group-hover:text-white text-xl block group-active:rotate-90 transition-transform">close</span>
                </button>

                <div className={`p-6 pr-14 border-b border-white/5 ${selectedDelivery.status === 'FAILED' ? 'bg-red-600/20' : 'bg-emerald-600/20'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Delivery Analysis</span>
                        <span className={`px-2 py-1 rounded text-[10px] font-black ${selectedDelivery.status === 'FAILED' ? 'bg-red-600' : 'bg-emerald-600'}`}>
                            {selectedDelivery.status}
                        </span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter truncate" title={selectedDelivery.id}>{selectedDelivery.id.split('-')[0]}...</h3>
                    <p className={`${selectedDelivery.status === 'FAILED' ? 'text-red-400' : 'text-emerald-400'} text-sm font-bold mt-2`}>
                        {selectedDelivery.errorMessage || 'System processed successfully'}
                    </p>
                </div>

                <div className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs border-b border-white/5 pb-3">
                            <span className="text-white/40 font-bold uppercase tracking-widest">Provider</span>
                            <span className="font-black flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${selectedDelivery.channel === 'SLACK' ? 'bg-[#4A154B]' : 'bg-blue-400'}`}></span>
                                {selectedDelivery.channel}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-xs border-b border-white/5 pb-3">
                            <span className="text-white/40 font-bold uppercase tracking-widest">Latency</span>
                            <span className="font-black">{selectedDelivery.latencyMs ? `${selectedDelivery.latencyMs}ms` : '--'}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs border-b border-white/5 pb-3">
                            <span className="text-white/40 font-bold uppercase tracking-widest">Retries</span>
                            <span className={`font-black ${selectedDelivery.status === 'FAILED' ? 'text-red-500' : 'text-emerald-500'}`}>
                                {selectedDelivery.retryCount} / 3
                            </span>
                        </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Endpoint URL / Destination</p>
                        <p className="font-mono text-[11px] break-all text-white/70">
                            {selectedDelivery.destination || 'N/A'}
                        </p>
                    </div>

                    <div className="space-y-3 pt-4">
                        <button
                            onClick={() => onRetry(selectedDelivery.id)}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-slate-900 rounded-xl font-black text-sm hover:bg-slate-100 transition-all active:scale-95 disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-[20px]">replay</span>
                            Force Retry Delivery
                        </button>
                        {/* <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white/5 text-white/70 rounded-xl font-black text-sm hover:bg-white/10 transition-all border border-white/10">
                            <span className="material-symbols-outlined text-[20px]">settings</span>
                            Update Destination Config
                        </button> */}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default DeliveryDetailPanel;
