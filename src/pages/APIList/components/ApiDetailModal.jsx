import React, { useState } from 'react';

const ApiDetailModal = ({ isOpen, onClose, apiData }) => {
    const [activeTab, setActiveTab] = useState('overview');

    if (!isOpen || !apiData) return null;

    const tabs = [
        { id: 'overview', label: 'Overview', icon: 'info' },
        { id: 'params', label: 'Params', icon: 'tune' },
        { id: 'request', label: 'Request Data', icon: 'data_object' },
        { id: 'headers', label: 'Auth & Headers', icon: 'key' },
    ];

    const getStandardStatus = (item) => {
        if (!item.isActive) return 'paused';
        if (item.lastStatus === null || item.lastStatus === undefined) return 'unknown';
        const statusString = String(item.lastStatus).toLowerCase();
        if (statusString === 'true' || statusString === 'up' || statusString === 'healthy') return 'healthy';
        if (statusString === 'warning') return 'warning';
        if (statusString === 'false' || statusString === 'down' || statusString === 'error') return 'down';
        return 'unknown';
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'healthy': return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
            case 'warning': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
            case 'down': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800 animate-pulse';
            case 'paused': return 'bg-slate-200 text-slate-500 dark:bg-slate-700/50 dark:text-slate-400 border-slate-300 dark:border-slate-600';
            default: return 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
        }
    };

    const getMethodStyle = (methodStr) => {
        switch (methodStr?.toUpperCase()) {
            case 'GET': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
            case 'POST': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800';
            case 'PUT': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800';
            case 'DELETE': return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800';
            default: return 'bg-slate-100 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('vi-VN');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl transition-all border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
                <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 flex-shrink-0">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">visibility</span>
                        Monitor Details
                    </h3>
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusStyle(getStandardStatus(apiData))} uppercase`}>
                            {getStandardStatus(apiData)}
                        </span>
                        <button
                            onClick={onClose}
                            className="rounded-full p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl leading-none">close</span>
                        </button>
                    </div>
                </div>

                <div className="flex px-6 space-x-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto flex-shrink-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                    {/* OVERVIEW TAB */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">General Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Monitor Name</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">{apiData.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Expected Status</p>
                                        <p className="font-mono text-sm bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded inline-block text-slate-700 dark:text-slate-300">
                                            {apiData.expectedStatusCodes || '200'}
                                        </p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Target Endpoint</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter border ${getMethodStyle(apiData.method)}`}>
                                                {apiData.method}
                                            </span>
                                            <span className="font-mono text-sm break-all text-slate-800 dark:text-slate-200">{apiData.url}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Performance Stats</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-3">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">Last Latency</span>
                                            <span className="font-mono text-sm font-semibold">{apiData.lastLatencyMs ? `${apiData.lastLatencyMs} ms` : 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-3">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">Timeout Threshold</span>
                                            <span className="font-mono text-sm">{apiData.maxResponseTimeMs ? `${apiData.maxResponseTimeMs} ms` : 'Default'}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">Overall Uptime</span>
                                            <span className="font-bold text-emerald-500">{apiData.uptimePercentage ? `${apiData.uptimePercentage.toFixed(2)}%` : '100%'}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">System Details</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-3">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">Check Interval</span>
                                            <span className="text-sm font-semibold">{apiData.checkInterval} {apiData.checkInterval === 1 ? 'minute' : 'minutes'}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-3">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">Created At</span>
                                            <span className="text-sm">{formatDate(apiData.createdAt)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">Last Checked</span>
                                            <span className="text-sm">{formatDate(apiData.lastCheckAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PARAMS TAB */}
                    {activeTab === 'params' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-xl border border-slate-200 dark:border-slate-700/50">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px] text-slate-500">tune</span>
                                    Query Parameters
                                </h4>
                                
                                {(!apiData.queryParams || apiData.queryParams.length === 0) ? (
                                    <p className="text-sm text-slate-500 italic">No query parameters configured.</p>
                                ) : (
                                    <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                                        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                            <thead className="bg-slate-100 dark:bg-slate-800">
                                                <tr>
                                                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/3">Key</th>
                                                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Value</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                                                {apiData.queryParams.map((param, idx) => (
                                                    <tr key={idx}>
                                                        <td className="px-4 py-2 text-sm font-mono font-medium text-slate-900 dark:text-slate-200 break-all">{param.key}</td>
                                                        <td className="px-4 py-2 text-sm font-mono text-slate-500 dark:text-slate-400 break-all">{param.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* REQUEST TAB */}
                    {activeTab === 'request' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200 h-full flex flex-col">
                            {(!apiData.body || apiData.body.trim() === '') ? (
                                <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/20">
                                    <span className="material-symbols-outlined text-4xl text-slate-400 mb-3">data_array</span>
                                    <h4 className="text-slate-900 dark:text-white font-medium mb-1 text-lg">No Payload Configured</h4>
                                    <p className="text-sm text-slate-500 max-w-md">
                                        This endpoint does not send any raw body data in its requests.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col h-full min-h-[300px]">
                                    <div className="flex justify-between items-center mb-2 px-1">
                                        <label className="block text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[18px] text-slate-500">data_object</span>
                                            Raw Payload (Read Only)
                                        </label>
                                    </div>
                                    <div className="w-full h-auto min-h-[16rem] rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#0f111a] py-4 px-5 overflow-auto custom-scrollbar">
                                        <pre className="text-sm text-slate-800 dark:text-slate-300 font-mono whitespace-pre-wrap">
                                            {apiData.body}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* HEADERS TAB */}
                    {activeTab === 'headers' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
                             {/* Auth Settings */}
                             <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-xl border border-slate-200 dark:border-slate-700/50">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px] text-slate-500">lock</span>
                                    Authentication Setup
                                </h4>
                                
                                {(!apiData.auth || apiData.auth.type === 'none') ? (
                                    <p className="text-sm text-slate-500 italic">No authentication configured for this endpoint.</p>
                                ) : (
                                    <div className="grid grid-cols-[120px_1fr] gap-y-3 gap-x-4 items-center">
                                        <div className="text-sm font-medium text-slate-500">Auth Type:</div>
                                        <div className="text-sm font-semibold uppercase bg-primary/10 text-primary w-fit px-2 py-0.5 rounded">{apiData.auth.type}</div>
                                        
                                        {apiData.auth.type === 'bearer' && (
                                            <>
                                                <div className="text-sm font-medium text-slate-500">Token:</div>
                                                <div className="text-sm font-mono truncate text-slate-700 dark:text-slate-300" title={apiData.auth.token}>
                                                    {apiData.auth.token ? `${apiData.auth.token.substring(0, 15)}...[MASKED]` : 'N/A'}
                                                </div>
                                            </>
                                        )}
                                        {apiData.auth.type === 'api-key' && (
                                            <>
                                                <div className="text-sm font-medium text-slate-500">Key Name:</div>
                                                <div className="text-sm font-mono text-slate-700 dark:text-slate-300">{apiData.auth.apiKeyKey}</div>
                                                <div className="text-sm font-medium text-slate-500">Value:</div>
                                                <div className="text-sm font-mono text-slate-700 dark:text-slate-300">*********</div>
                                            </>
                                        )}
                                        {apiData.auth.type === 'basic' && (
                                            <>
                                                <div className="text-sm font-medium text-slate-500">Username:</div>
                                                <div className="text-sm font-mono text-slate-700 dark:text-slate-300">{apiData.auth.username}</div>
                                                <div className="text-sm font-medium text-slate-500">Password:</div>
                                                <div className="text-sm font-mono text-slate-700 dark:text-slate-300">*********</div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Headers List */}
                            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-xl border border-slate-200 dark:border-slate-700/50">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px] text-slate-500">list_alt</span>
                                    Custom Headers
                                </h4>
                                
                                {(!apiData.headers || apiData.headers.length === 0) ? (
                                    <p className="text-sm text-slate-500 italic">No custom headers configured.</p>
                                ) : (
                                    <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                                        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                            <thead className="bg-slate-100 dark:bg-slate-800">
                                                <tr>
                                                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/3">Key</th>
                                                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Value</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                                                {apiData.headers.map((hdr, idx) => (
                                                    <tr key={idx}>
                                                        <td className="px-4 py-2 text-sm font-mono font-medium text-slate-900 dark:text-slate-200 break-all">{hdr.key}</td>
                                                        <td className="px-4 py-2 text-sm font-mono text-slate-500 dark:text-slate-400 break-all">{hdr.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 flex items-center justify-end border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex-shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApiDetailModal;
