import React, { useState, useEffect } from 'react';
import { adminUserService } from '../../../../../services/adminUserService';
import { getStatusBadge, getPlanBadge, formatDate } from '../utils';
import ApiDetailModal from '../../../../APIList/components/ApiDetailModal';
import AlertDetailModal from '../../../../Alerts/components/AlertDetailModal';
import LogDetailsPanel from '../../../../Logs/components/LogDetailsPanel';

// --- MOCK COMPONENTS FOR TABS ---

const UserApisTab = () => {
    // Mock Data into State
    const [mockApis, setMockApis] = useState([
        { id: 1, name: 'Production Auth API', method: 'POST', url: 'https://api.example.com/v1/auth', isActive: true, status: 'Healthy', latency: 45, uptimePercentage: 99.9, checkInterval: 5, expectedStatusCodes: "200,201", maxResponseTimeMs: 1000, createdAt: new Date().toISOString(), body: "{\"username\":\"admin\"}", headers: [{ key: "Authorization", value: "Bearer xyz" }] },
        { id: 2, name: 'User Service', method: 'GET', url: 'https://api.example.com/v1/users', isActive: true, status: 'Warning', latency: 850, uptimePercentage: 98.2, checkInterval: 1, expectedStatusCodes: "200", maxResponseTimeMs: 500, createdAt: new Date().toISOString() },
        { id: 3, name: 'Payment Webhook', method: 'POST', url: 'https://api.example.com/webhooks/stripe', isActive: false, status: 'Paused', latency: 0, uptimePercentage: 100, checkInterval: 10, expectedStatusCodes: "200", maxResponseTimeMs: 2000, createdAt: new Date().toISOString() },
    ]);

    const [selectedApi, setSelectedApi] = useState(null);

    const handleToggleActive = (id) => {
        setMockApis(prev => prev.map(api => {
            if (api.id === id) {
                const newActive = !api.isActive;
                return { ...api, isActive: newActive, status: newActive ? 'Healthy' : 'Paused', latency: newActive ? 45 : 0 };
            }
            return api;
        }));
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá API này khỏi người dùng?")) {
            setMockApis(prev => prev.filter(api => api.id !== id));
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in duration-300">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">API Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Method & Endpoint</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Active</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Latency</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {mockApis.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-10 text-center text-slate-500">Người dùng không có Monitor nào.</td>
                            </tr>
                        ) : (
                            mockApis.map(api => (
                                <tr key={api.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`size-2.5 rounded-full ring-4 ${api.status === 'Healthy' ? 'bg-emerald-500 ring-emerald-500/10' : api.status === 'Warning' ? 'bg-amber-500 ring-amber-500/10' : 'bg-slate-300 ring-slate-300/10'}`}></div>
                                            <span className="font-bold text-slate-900 dark:text-slate-100">{api.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter border ${api.method === 'POST' ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-emerald-100 text-emerald-600 border-emerald-200'}`}>
                                                {api.method}
                                            </span>
                                            <span className="text-sm font-mono text-slate-500 dark:text-slate-400 max-w-[250px] truncate block" title={api.url}>{api.url}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            type="button"
                                            role="switch"
                                            onClick={() => handleToggleActive(api.id)}
                                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${api.isActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                                            title={api.isActive ? 'Tạm dừng monitor' : 'Kích hoạt monitor'}
                                        >
                                            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${api.isActive ? 'translate-x-[18px]' : 'translate-x-[3px]'}`} />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${api.status === 'Healthy' ? 'bg-emerald-100 text-emerald-600' : api.status === 'Warning' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                                            {api.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold">
                                        {api.latency > 0 ? `${api.latency}ms` : '--'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setSelectedApi(api)}
                                                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"
                                                title="Xem chi tiết"
                                            >
                                                <span className="material-symbols-outlined text-sm flex">visibility</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(api.id)}
                                                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-500 transition-colors group/del"
                                                title="Xoá Monitor"
                                            >
                                                <span className="material-symbols-outlined text-sm group-hover/del:scale-110 transition-transform">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination Mock */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500">Showing <span className="text-slate-900 dark:text-slate-200">{mockApis.length > 0 ? 1 : 0}-{mockApis.length}</span> of <span className="text-slate-900 dark:text-slate-200">{mockApis.length}</span> APIs</p>
                <div className="flex items-center gap-2">
                    <button disabled className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 opacity-50"><span className="material-symbols-outlined">chevron_left</span></button>
                    <button className="size-8 rounded-lg text-xs font-bold bg-primary text-white">1</button>
                    <button disabled className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 opacity-50"><span className="material-symbols-outlined">chevron_right</span></button>
                </div>
            </div>

            <ApiDetailModal
                isOpen={!!selectedApi}
                onClose={() => setSelectedApi(null)}
                apiData={selectedApi}
            />
        </div>
    );
};

const UserAlertsTab = () => {
    // Mock Data
    const mockAlerts = [
        { id: 1, time: new Date().toISOString(), title: 'API Down Constraint', monitorName: 'Production Auth API', severity: 'CRITICAL', status: 'ACTIVE', message: 'API returned 500 Internal Server Error for 3 consecutive checks.', monitorUrl: 'https://api.example.com/v1/auth', avgLatencyMs: 250, lastStatusCode: 500, triggeredAt: new Date().toISOString(), consecutiveFailCount: 3, deliveryHistory: [{ id: 1, status: 'SENT', channel: 'EMAIL', destination: 'admin@company.com', sentAt: new Date().toISOString() }] },
        { id: 2, time: new Date(Date.now() - 3600000).toISOString(), title: 'Latency Spike', monitorName: 'User Service', severity: 'WARNING', status: 'RESOLVED', message: 'Response time exceeded 800ms threshold.', monitorUrl: 'https://api.example.com/v1/users', avgLatencyMs: 850, lastStatusCode: 200, triggeredAt: new Date(Date.now() - 3600000).toISOString(), consecutiveFailCount: 1 },
    ];

    const [selectedAlert, setSelectedAlert] = useState(null);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in duration-300">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Monitor</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Severity</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Message</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {mockAlerts.map(alert => (
                            <tr key={alert.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                <td className="px-6 py-4 text-sm font-medium text-slate-500">{new Date(alert.time).toLocaleTimeString()}</td>
                                <td className="px-6 py-4 font-bold">{alert.monitorName}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border flex items-center gap-1.5 w-max ${alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${alert.severity === 'CRITICAL' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`}></span>
                                        {alert.severity}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${alert.status === 'ACTIVE' ? 'border-primary/30 text-primary bg-primary/5' : 'border-emerald-500/30 text-emerald-600 bg-emerald-500/5'}`}>
                                        {alert.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-400 max-w-[200px] truncate">{alert.message}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => setSelectedAlert(alert)}
                                        className="p-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                        title="Xem chi tiết"
                                    >
                                        <span className="material-symbols-outlined text-lg font-black flex">info</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination Mock */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500">Showing <span className="text-slate-900 dark:text-slate-200">1-2</span> of <span className="text-slate-900 dark:text-slate-200">2</span> Alerts</p>
                <div className="flex items-center gap-2">
                    <button disabled className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 opacity-50"><span className="material-symbols-outlined">chevron_left</span></button>
                    <button className="size-8 rounded-lg text-xs font-bold bg-primary text-white">1</button>
                    <button disabled className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 opacity-50"><span className="material-symbols-outlined">chevron_right</span></button>
                </div>
            </div>

            <AlertDetailModal
                isOpen={!!selectedAlert}
                onClose={() => setSelectedAlert(null)}
                alertData={selectedAlert}
                loading={false}
            />
        </div>
    );
};

const UserLogsTab = () => {
    // Mock Data
    const mockLogs = [
        { id: 1, time: new Date().toISOString(), monitorName: 'Production Auth API', monitorMethod: 'POST', monitorUrl: 'https://api.example.com/v1/auth', statusCode: 500, responseTimeMs: 120, isUp: false, errorMessage: 'Connection refused', assertionStatus: 'FAILED', responseSnippet: '<html>500 Internal Server Error</html>' },
        { id: 2, time: new Date(Date.now() - 60000).toISOString(), monitorName: 'Production Auth API', monitorMethod: 'POST', monitorUrl: 'https://api.example.com/v1/auth', statusCode: 500, responseTimeMs: 105, isUp: false, errorMessage: 'Timeout', responseSnippet: '' },
        { id: 3, time: new Date(Date.now() - 120000).toISOString(), monitorName: 'Production Auth API', monitorMethod: 'POST', monitorUrl: 'https://api.example.com/v1/auth', statusCode: 200, responseTimeMs: 85, isUp: true, assertionStatus: 'PASSED', responseSnippet: '{"token":"xyz","userId":123}' },
        { id: 4, time: new Date(Date.now() - 180000).toISOString(), monitorName: 'User Service', monitorMethod: 'GET', monitorUrl: 'https://api.example.com/v1/users', statusCode: 200, responseTimeMs: 850, isUp: true, assertionStatus: 'PASSED', responseSnippet: '[{"id":1,"name":"John"}]' },
        { id: 5, time: new Date(Date.now() - 240000).toISOString(), monitorName: 'User Service', monitorMethod: 'GET', monitorUrl: 'https://api.example.com/v1/users', statusCode: 200, responseTimeMs: 450, isUp: true, assertionStatus: 'PASSED', responseSnippet: '[{"id":1,"name":"John"}]' },
    ];

    const [selectedLog, setSelectedLog] = useState(null);

    return (
        <div className="flex gap-4 items-start animate-in fade-in duration-300">
            <div className="flex-1 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto min-h-0">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Timestamp</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Monitor</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Method</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Latency</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {mockLogs.map(log => (
                                <tr
                                    key={log.id}
                                    onClick={() => setSelectedLog(log)}
                                    className={`cursor-pointer transition-colors ${selectedLog?.id === log.id ? 'bg-primary/5 ring-1 ring-inset ring-primary/30' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'}`}
                                >
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{new Date(log.time).toLocaleString()}</td>
                                    <td className="px-6 py-4 font-bold text-sm">{log.monitorName}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${log.monitorMethod === 'POST' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                                            {log.monitorMethod}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`flex items-center justify-center gap-1.5 font-bold text-xs ${log.statusCode === 200 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            <span className={`size-2 rounded-full ${log.statusCode === 200 ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                            {log.statusCode}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-mono text-sm text-slate-500">{log.responseTimeMs}ms</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Mock */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-500">Showing <span className="text-slate-900 dark:text-slate-200">1-5</span> of <span className="text-slate-900 dark:text-slate-200">5</span> Logs</p>
                    <div className="flex items-center gap-2">
                        <button disabled className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 opacity-50"><span className="material-symbols-outlined">chevron_left</span></button>
                        <button className="size-8 rounded-lg text-xs font-bold bg-primary text-white">1</button>
                        <button disabled className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 opacity-50"><span className="material-symbols-outlined">chevron_right</span></button>
                    </div>
                </div>
            </div>

            {selectedLog && (
                <div className="w-[400px] flex-shrink-0 animate-in slide-in-from-right duration-300">
                    <LogDetailsPanel
                        log={{ ...selectedLog, checkedAt: selectedLog.time }} // align mock data to what component expects
                        onClose={() => setSelectedLog(null)}
                        onRetry={() => { }}
                    />
                </div>
            )}
        </div>
    );
};

// --- MAIN COMPONENT ---

const UserDetails = ({ selectedUser, setSelectedUser, handleBlockUser, handleActiveUser }) => {
    const [activeTab, setActiveTab] = useState('apis'); // 'apis', 'alerts', 'logs'
    const [monitorStats, setMonitorStats] = useState({
        totalMonitor: 0,
        totalActiveMonitor: 0
    });
    const [alertStats, setAlertStats] = useState({
        totalAlert: 0,
        totalIncident: 0
    });
    const [loadingStats, setLoadingStats] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            if (!selectedUser?.id) return;

            setLoadingStats(true);
            try {
                const [monitorRes, alertRes] = await Promise.all([
                    adminUserService.getUserMonitorStats(selectedUser.id),
                    adminUserService.getUserMonthlyAlertStats(selectedUser.id)
                ]);
                setMonitorStats(monitorRes);
                setAlertStats(alertRes);
            } catch (error) {
                console.error("Failed to fetch statistics:", error);
            } finally {
                setLoadingStats(false);
            }
        };

        fetchStats();
    }, [selectedUser?.id]);

    if (!selectedUser) return null;

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Back Button Area */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setSelectedUser(null)}
                    className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm bg-white dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Quay lại danh sách
                </button>
                <div className="flex items-center gap-3">
                    {selectedUser.status === 'ACTIVE' ? (
                        <button
                            onClick={() => { handleBlockUser(selectedUser.id); setSelectedUser(null); }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 rounded-xl font-bold text-sm transition-all shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">lock</span>
                            Khóa User
                        </button>
                    ) : (
                        <button
                            onClick={() => { handleActiveUser(selectedUser.id); setSelectedUser(null); }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-600 rounded-xl font-bold text-sm transition-all shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">lock_open</span>
                            Mở khóa
                        </button>
                    )}
                    {/* <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-md active:scale-95">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                        Chỉnh sửa Info
                    </button> */}
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative">
                        <div className="h-32 bg-gradient-to-br from-primary/20 via-blue-500/10 to-purple-500/10"></div>
                        <div className="px-8 pb-8 flex flex-col items-center -mt-16">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl relative z-10 bg-slate-100 dark:bg-slate-800">
                                    <img
                                        alt="Avatar"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        src={selectedUser.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.fullName)}&background=random`}
                                    />
                                </div>
                                <div className={`absolute bottom-2 right-2 w-7 h-7 rounded-full border-4 border-white dark:border-slate-900 z-20 shadow-sm flex items-center justify-center ${getStatusBadge(selectedUser.status).bg}`}>
                                </div>
                            </div>
                            <h3 className="mt-5 text-2xl font-black text-slate-900 dark:text-white tracking-tight">{selectedUser.fullName}</h3>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">{selectedUser.email}</p>

                            <div className="flex items-center justify-center gap-2 mt-5 w-full">
                                <span className={`px-4 py-2 flex-1 text-center ${getPlanBadge(selectedUser.planType)} text-[12px] font-black rounded-xl uppercase tracking-wider shadow-sm`}>
                                    Gói {selectedUser.planType}
                                </span>
                                <span className={`px-4 py-2 flex-1 text-center ${getStatusBadge(selectedUser.status).lightBg} ${getStatusBadge(selectedUser.status).text} text-[12px] font-black rounded-xl uppercase tracking-wider shadow-sm`}>
                                    {selectedUser.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Account Info */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 space-y-4">
                        <h5 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Thông tin hệ thống</h5>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-sm font-bold text-slate-500">Người dùng ID</span>
                                <span className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">{selectedUser.id}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-sm font-bold text-slate-500">Công ty</span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedUser.company || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-sm font-bold text-slate-500">Ngày gia nhập</span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{formatDate(selectedUser.createdAt)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-slate-500">Đăng nhập cuối</span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{formatDate(selectedUser.lastLoginAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Stats & Plan */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Dashboard */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 lg:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h5 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">analytics</span>
                                Thống kê sử dụng {loadingStats && <span className="animate-pulse ml-2 text-xs text-primary italic lowercase font-normal leading-none">(Đang cập nhật...)</span>}
                            </h5>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800/50 p-6 rounded-2xl border border-blue-100/50 dark:border-blue-800/30 shadow-sm transition-transform hover:-translate-y-1 group">
                                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[24px]">monitor_heart</span>
                                </div>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Monitors hiện có</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-slate-800 dark:text-white">{monitorStats.totalMonitor}</span>
                                    <span className="text-sm font-bold text-slate-400">/ {selectedUser.planType === 'ENTERPRISE' ? '∞' : selectedUser.planType === 'PRO' ? 100 : 20}</span>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-slate-800/50 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-800/30 shadow-sm transition-transform hover:-translate-y-1 group">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-800/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[24px]">task_alt</span>
                                </div>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Active Monitors</p>
                                <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">{monitorStats.totalActiveMonitor}</span>
                            </div>

                            <div className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-slate-800/50 p-6 rounded-2xl border border-amber-100/50 dark:border-amber-800/30 shadow-sm transition-transform hover:-translate-y-1 group">
                                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-800/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[24px]">notifications_active</span>
                                </div>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Alerts đã gửi (Tháng này)</p>
                                <span className="text-4xl font-black text-amber-600 dark:text-amber-400">{alertStats.totalAlert}</span>
                            </div>

                            <div className="bg-gradient-to-br from-rose-50 to-white dark:from-rose-900/20 dark:to-slate-800/50 p-6 rounded-2xl border border-rose-100/50 dark:border-rose-800/30 shadow-sm transition-transform hover:-translate-y-1 group">
                                <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-800/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[24px]">warning</span>
                                </div>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Incidents (Tháng này)</p>
                                <span className="text-4xl font-black text-rose-600 dark:text-rose-400">{alertStats.totalIncident}</span>
                            </div>
                        </div>

                        {/* Quota Progress */}
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 mt-6 shadow-sm">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <h6 className="text-sm font-bold text-slate-800 dark:text-white">API Quota Usage</h6>
                                    <p className="text-xs font-medium text-slate-500 mt-1">Đã dùng 6.5 triệu / 10 triệu requests</p>
                                </div>
                                <span className="text-3xl font-black text-primary">65%</span>
                            </div>
                            <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full relative" style={{ width: '65%' }}>
                                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Plan Management */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 lg:p-8 relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-primary">credit_card</span>
                            <h5 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">Nâng cấp & Quản lý Gói</h5>
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex-1">
                                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">Gói đang sử dụng</p>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-4 py-1.5 ${getPlanBadge(selectedUser.planType)} text-[14px] font-black rounded-lg uppercase shadow-sm`}>
                                        {selectedUser.planType}
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-slate-500">Chu kỳ thanh toán tiếp theo: <span className="font-bold text-slate-800 dark:text-slate-200">{new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('vi-VN')}</span></p>
                            </div>

                            <div className="flex-1 w-full md:w-auto bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Cập nhật gói</label>
                                <div className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <select defaultValue="" className="w-full appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer shadow-sm">
                                            <option value="" disabled>Chọn gói mới...</option>
                                            <option value="FREE">Gói Free</option>
                                            <option value="PRO">Gói Pro</option>
                                            <option value="ENTERPRISE">Gói Enterprise</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                    </div>
                                    <button className="px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 shadow-md">
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4">
                            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-200 font-bold text-sm transition-all shadow-sm">
                                <span className="material-symbols-outlined text-[20px]">autorenew</span>
                                Gia hạn thủ công
                            </button>
                            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-900/20 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 font-bold text-sm transition-all shadow-sm">
                                <span className="material-symbols-outlined text-[20px]">arrow_downward</span>
                                Bắt buộc hạ cấp Free
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- TABBED DATA SECTION --- */}
            <div className="mt-4">
                <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 mb-6">
                    <button
                        className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'apis' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                        onClick={() => setActiveTab('apis')}
                    >
                        <span className="material-symbols-outlined text-[18px]">api</span>
                        API Monitors
                    </button>
                    <button
                        className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'alerts' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                        onClick={() => setActiveTab('alerts')}
                    >
                        <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                        Alerts
                    </button>
                    <button
                        className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'logs' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                        onClick={() => setActiveTab('logs')}
                    >
                        <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                        System Logs
                    </button>
                </div>

                <div className="min-h-[300px]">
                    {activeTab === 'apis' && <UserApisTab />}
                    {activeTab === 'alerts' && <UserAlertsTab />}
                    {activeTab === 'logs' && <UserLogsTab />}
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
