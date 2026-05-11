import React from 'react';

const MonitorDetails = ({ monitor, onClose }) => {
    if (!monitor) return null;

    const infoGroups = [
        {
            title: 'General Info',
            items: [
                { label: 'Monitor ID', value: monitor.id, isMono: true },
                { label: 'Status', value: monitor.lastStatus, isStatus: true },
                { label: 'Check Interval', value: `${monitor.checkInterval}s` },
                { label: 'Expected Status', value: monitor.expectedStatusCodes }
            ]
        },
        {
            title: 'Current Performance',
            items: [
                { label: 'Last Latency', value: `${monitor.lastLatencyMs}ms` },
                { label: 'Uptime', value: `${monitor.uptimePercentage}%` },
                { label: 'Consecutive Failures', value: monitor.consecutiveFailures }
            ]
        },
        {
            title: 'Timestamps',
            items: [
                { label: 'Created At', value: new Date(monitor.createdAt).toLocaleString() },
                { label: 'Last Checked', value: monitor.lastCheckAt ? new Date(monitor.lastCheckAt).toLocaleString() : 'Never' },
                { label: 'Next Check', value: monitor.nextCheckAt ? new Date(monitor.nextCheckAt).toLocaleString() : 'Soon' }
            ]
        }
    ];

    return (
        <aside className="w-full xl:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg flex flex-col shrink-0 animate-in slide-in-from-right-4 duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-black leading-tight text-slate-900 dark:text-white">
                        Monitor Details:<br />
                        <span className="text-orange-500 truncate block max-w-[200px]">{monitor.name}</span>
                    </h4>
                    <button onClick={onClose} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-slate-200">
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded shadow-sm">{monitor.method}</span>
                    <span className="text-xs font-mono truncate text-slate-500" title={monitor.url}>{monitor.url}</span>
                </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-8 custom-scrollbar">
                {infoGroups.map((group, idx) => (
                    <div key={idx}>
                        <h5 className="text-[11px] font-black text-orange-500 uppercase tracking-widest mb-4">{group.title}</h5>
                        <div className="grid grid-cols-1 gap-4">
                            {group.items.map((item, i) => (
                                <div key={i}>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{item.label}</p>
                                    <p className={`mt-1 text-sm font-medium ${item.isMono ? 'font-mono text-xs break-all' : ''} ${
                                        item.isStatus 
                                            ? item.value === 'UP' ? 'text-green-600 font-bold' 
                                              : item.value === 'WARNING' ? 'text-amber-600 font-bold'
                                              : item.value === 'DOWN' ? 'text-red-600 font-bold'
                                              : 'text-orange-600 font-bold'
                                            : 'text-slate-800 dark:text-slate-100'
                                    }`}>
                                        {item.value || 'N/A'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {monitor.lastErrorMessage && (
                    <div>
                        <h5 className="text-[11px] font-black text-red-500 uppercase tracking-widest mb-4">Last Error</h5>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30">
                            <p className="text-xs font-mono text-red-600 dark:text-red-400 leading-relaxed italic">
                                "{monitor.lastErrorMessage}"
                            </p>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                <button className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity">
                    Pause Monitoring
                </button>
            </div>
        </aside>
    );
};

export default MonitorDetails;
