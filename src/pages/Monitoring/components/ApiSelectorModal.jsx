import React, { useState, useEffect } from 'react';
import { useApiMonitors } from '../../APIList/hooks/useApiMonitors';

const ApiSelectorModal = ({ isOpen, onClose, onSelect }) => {
    const {
        apis,
        loading,
        search,
        changeSearch,
        fetchApis
    } = useApiMonitors();

    const [localSearch, setLocalSearch] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchApis(0, { field: 'name', direction: 'asc' }, 'All', '');
        }
    }, [isOpen, fetchApis]);

    // Handle searching
    useEffect(() => {
        const timer = setTimeout(() => {
            changeSearch(localSearch);
        }, 300);
        return () => clearTimeout(timer);
    }, [localSearch, changeSearch]);

    if (!isOpen) return null;

    const getMethodStyle = (method) => {
        switch (method?.toUpperCase()) {
            case 'GET': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
            case 'POST': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800';
            case 'PUT': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800';
            case 'DELETE': return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800';
            default: return 'bg-slate-100 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[80vh] overflow-hidden animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Select API Monitor</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Choose an API to view its metrics</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                        <span className="material-symbols-outlined text-slate-500">close</span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                        <input 
                            type="text"
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            placeholder="Find API by name or endpoint..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/30 outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* API List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                    {loading && apis.length === 0 ? (
                        <div className="py-12 flex flex-col items-center justify-center">
                            <div className="size-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <p className="mt-4 text-sm text-slate-500 font-medium">Fetching monitors...</p>
                        </div>
                    ) : apis.length === 0 ? (
                        <div className="py-12 text-center">
                            <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">search_off</span>
                            <p className="mt-2 text-sm text-slate-500 font-medium whitespace-pre-wrap">
                                {localSearch ? `No APIs matching "${localSearch}"` : "No APIs found in your account"}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {apis.map((api) => (
                                <button
                                    key={api.id}
                                    onClick={() => {
                                        onSelect(api);
                                        onClose();
                                    }}
                                    className="w-full flex flex-col items-start p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group text-left border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                                >
                                    <div className="flex items-center gap-2 mb-1 w-full">
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter border ${getMethodStyle(api.method)}`}>
                                            {api.method}
                                        </span>
                                        <span className="font-bold text-slate-900 dark:text-slate-100 truncate flex-1">{api.name}</span>
                                        <span className="material-symbols-outlined text-[16px] text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                                    </div>
                                    <div className="text-[11px] font-mono text-slate-400 truncate w-full pl-[52px]">
                                        {api.url}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApiSelectorModal;
