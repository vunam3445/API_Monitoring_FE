import React from 'react';

const LogDetailPanel = ({ 
    selectedLog, 
    setSelectedLog, 
    copied, 
    handleCopyStackTrace,
    formatTimestamp,
    getLevelBadgeClass,
    panelRef
}) => {
    return (
        <div ref={panelRef} className="w-full lg:w-96 shrink-0 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-fit sticky top-6">
            <div className="p-4 bg-primary text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">description</span>
                    <span className="font-bold text-sm">Chi tiết lỗi chi tiết</span>
                </div>
                <button 
                    onClick={() => setSelectedLog(null)}
                    className="hover:bg-white/20 p-1 rounded transition-colors text-white"
                >
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <div className="space-y-3">
                    <div className="flex justify-between items-start">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${getLevelBadgeClass(selectedLog.level)}`}>
                            {selectedLog.level}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                            {formatTimestamp(selectedLog.timestamp)}
                        </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</h4>
                    <p className="text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 font-mono break-words leading-relaxed">
                        {selectedLog.message}
                    </p>
                </div>

                <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Metadata Log</h4>
                    <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2.5">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Component phát sinh</p>
                            <p className="text-xs font-mono text-slate-900 dark:text-white break-all">{selectedLog.component}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Thread ID</p>
                                <p className="text-xs font-mono text-slate-900 dark:text-white">[{selectedLog.threadId}]</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Mã Log ID</p>
                                <p className="text-xs font-mono text-primary select-all truncate">
                                    {String(selectedLog.id).length > 15 ? `${String(selectedLog.id).slice(0, 15)}...` : String(selectedLog.id)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stack Trace Zone */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Java Exception Stack Trace</h4>
                        {selectedLog.stackTrace && (
                            <button 
                                onClick={() => handleCopyStackTrace(selectedLog.stackTrace)}
                                className={`px-2.5 py-1 text-[10px] font-bold rounded flex items-center gap-1 transition-all ${
                                    copied 
                                    ? 'bg-emerald-500 text-white' 
                                    : 'bg-slate-100 dark:bg-slate-850 hover:bg-primary/20 text-slate-600 dark:text-slate-350'
                                }`}
                            >
                                <span className="material-symbols-outlined text-xs">
                                    {copied ? 'check_circle' : 'content_copy'}
                                </span>
                                {copied ? 'Copied! ✔' : 'Copy'}
                            </button>
                        )}
                    </div>
                    <div className="text-[10px] font-mono bg-slate-950 text-emerald-400 p-4.5 rounded-lg overflow-x-auto whitespace-pre leading-relaxed border border-slate-900 max-h-[250px] overflow-y-auto">
                        {selectedLog.stackTrace ? (
                            selectedLog.stackTrace
                        ) : (
                            <span className="text-slate-500 italic block py-2">
                                (Không có Java Exception. Dòng log này ghi nhận thông tin xử lý thông thường).
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogDetailPanel;
