import React, { useState } from 'react';

const AdminApis = () => {
    const [selectedApi, setSelectedApi] = useState(null);

    // Dummy API data
    const apis = [
        { id: 'API-9231', name: 'Stripe Webhook', endpoint: '/v1/payments', method: 'POST', owner: 'FintechCorp', status: 'Healthy', latency: '182ms', uptime: '99.9%', healthClass: 'text-green-600 bg-green-100 dark:bg-green-900/30', color: 'bg-green-500' },
        { id: 'API-4412', name: 'AWS Lambda Ingress', endpoint: '/lambda/process', method: 'GET', owner: 'DevOps Team', status: 'Slow', latency: '2.4s', uptime: '96.5%', healthClass: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30', color: 'bg-amber-500' },
        { id: 'API-1102', name: 'PostgreSQL Bridge', endpoint: '/db/sync', method: 'PUT', owner: 'DataOps', status: 'Offline', latency: '—', uptime: '82.1%', healthClass: 'text-red-600 bg-red-100 dark:bg-red-900/30', color: 'bg-red-500' },
        { id: 'API-5561', name: 'Mailgun Outbound', endpoint: '/send/v2', method: 'POST', owner: 'MarketSoft', status: 'Healthy', latency: '215ms', uptime: '99.9%', healthClass: 'text-green-600 bg-green-100 dark:bg-green-900/30', color: 'bg-green-500' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            {/* Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">APIs Management</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium text-sm">Monitor and manage all APIs registered by users on the platform.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2 bg-orange-500 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20">
                        <span className="material-symbols-outlined text-[18px]">add</span> Add API
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total APIs</p>
                    <div className="flex items-end justify-between mt-2">
                        <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">2,410</h3>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active APIs</p>
                    <div className="flex items-end justify-between mt-2">
                        <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">2,385</h3>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">APIs Down</p>
                    <div className="flex items-end justify-between mt-2">
                        <h3 className="text-2xl font-black text-red-500">12</h3>
                    </div>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4 min-w-0 w-full">
                    {/* Filters */}
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4 shadow-sm">
                        <div className="flex-1 min-w-[240px] relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl pl-10 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/50" placeholder="Search API name or endpoint..." />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/80 dark:bg-slate-800/50 text-slate-500 uppercase text-[10px] font-bold tracking-widest border-b border-slate-200 dark:border-slate-800">
                                        <th className="px-6 py-4">API Name</th>
                                        <th className="px-6 py-4">Endpoint</th>
                                        <th className="px-6 py-4">Owner</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Latency</th>
                                        <th className="px-6 py-4">Uptime</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                                    {apis.map((api, idx) => (
                                        <tr key={idx} onClick={() => setSelectedApi(api)} className={`transition-colors cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-800/50 ${selectedApi?.id === api.id ? 'bg-orange-50/50 dark:bg-orange-900/10' : ''}`}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`size-2.5 ${api.color} rounded-full opacity-80`}></div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{api.name}</p>
                                                        <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">ID: {api.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded shadow-sm">{api.method}</span>
                                                    <span className="text-xs font-mono truncate max-w-[120px]">{api.endpoint}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">{api.owner}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${api.healthClass}`}>{api.status}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">{api.latency}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">{api.uptime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* API Details Panel conditionally rendered */}
                {selectedApi && (
                    <aside className="w-full xl:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg flex flex-col shrink-0 animate-in slide-in-from-right-4 duration-300">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-lg font-black leading-tight text-slate-900 dark:text-white">API Details:<br /><span className="text-orange-500">{selectedApi.name}</span></h4>
                                <button onClick={() => setSelectedApi(null)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-slate-200">
                                    <span className="material-symbols-outlined text-lg">close</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-6 flex-1 overflow-y-auto space-y-6">
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Status</p>
                                <p className="text-sm font-bold mt-1 text-slate-800 dark:text-slate-100">{selectedApi.status}</p>
                            </div>
                        </div>
                    </aside>
                )}
            </div>
        </div>
    );
};

export default AdminApis;
