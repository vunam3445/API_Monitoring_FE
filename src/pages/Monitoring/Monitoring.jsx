import React, { useState } from 'react';
import MonitoringHeader from './components/MonitoringHeader';
import MonitorTable from './components/MonitorTable';
import MonitorDetail from './components/MonitorDetail';

const Monitoring = () => {
    const [selectedMonitor, setSelectedMonitor] = useState(null);
    const [isAddingMonitor, setIsAddingMonitor] = useState(false);

    const handleBackToList = () => {
        setSelectedMonitor(null);
    };

    return (
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-950/20">
            <div className="p-8 space-y-10 max-w-7xl mx-auto w-full">
                {selectedMonitor ? (
                    /* Detail View */
                    <MonitorDetail 
                        monitor={selectedMonitor} 
                        onBack={handleBackToList} 
                    />
                ) : (
                    /* List View */
                    <>
                        <MonitoringHeader onAddMonitor={() => setIsAddingMonitor(true)} />
                        
                        <div className="space-y-10">
                            <MonitorTable onSelectMonitor={setSelectedMonitor} />
                        </div>
                    </>
                )}
            </div>
            
            {/* New Monitor Modal would go here */}
            {isAddingMonitor && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 transform animate-in slide-in-from-bottom-8 duration-500">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Create New Monitor</h3>
                            <button onClick={() => setIsAddingMonitor(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        {/* Simplified Form Placeholder */}
                        <div className="space-y-6">
                            <p className="text-sm text-slate-500">Form to add monitor details (URL, Method, Interval, etc.) would be here.</p>
                            <div className="flex justify-end gap-4 mt-10">
                                <button onClick={() => setIsAddingMonitor(false)} className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">Cancel</button>
                                <button className="px-8 py-2.5 bg-primary text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">Create Monitor</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Monitoring;
