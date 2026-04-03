import React, { useState, useEffect } from 'react';

const AddAPIModal = ({ isOpen, onClose, onSave, initialData }) => {
    const defaultFormData = {
        name: '',
        url: '',
        method: 'GET',
        checkInterval: 60,
        isActive: true,
        isMuted: false,
        auth: {
            type: 'none',
            token: '',
            apiKeyKey: 'x-api-key',
            apiKeyValue: '',
            username: '',
            password: '',
        },
        headers: [{ key: '', value: '' }],
        queryParams: [{ key: '', value: '' }],
        body: '',
        assertions: {
            expectedStatus: '200',
            maxResponseTime: '1000',
        }
    };

    const [activeTab, setActiveTab] = useState('config');
    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                // Convert headers from Map to array format for editing
                const headersArray = initialData.headers
                    ? (Array.isArray(initialData.headers)
                        ? initialData.headers
                        : Object.entries(initialData.headers).map(([key, value]) => ({ key, value })))
                    : defaultFormData.headers;

                // Convert queryParams from Map to array format for editing
                const queryParamsArray = initialData.queryParams
                    ? (Array.isArray(initialData.queryParams)
                        ? initialData.queryParams
                        : Object.entries(initialData.queryParams).map(([key, value]) => ({ key, value })))
                    : defaultFormData.queryParams;

                setFormData({
                    name: initialData.name || '',
                    url: initialData.url || '',
                    method: initialData.method || 'GET',
                    checkInterval: initialData.checkInterval ?? 60,
                    isActive: initialData.isActive ?? true,
                    isMuted: initialData.isMuted ?? false,
                    auth: initialData.auth || defaultFormData.auth,
                    headers: headersArray.length ? headersArray : defaultFormData.headers,
                    queryParams: queryParamsArray.length ? queryParamsArray : defaultFormData.queryParams,
                    body: initialData.body || '',
                    assertions: {
                        expectedStatus: initialData.expectedStatusCodes || '200',
                        maxResponseTime: initialData.maxResponseTimeMs ? initialData.maxResponseTimeMs.toString() : '1000',
                    }
                });
            } else {
                setFormData(defaultFormData);
            }
            setActiveTab('config');
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleClose = () => {
        onClose();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAuthChange = (e) => {
        setFormData({
            ...formData,
            auth: { ...formData.auth, [e.target.name]: e.target.value }
        });
    };

    const handleAssertionChange = (e) => {
        setFormData({
            ...formData,
            assertions: { ...formData.assertions, [e.target.name]: e.target.value }
        });
    };

    const handleHeaderChange = (index, field, value) => {
        const newHeaders = [...formData.headers];
        newHeaders[index][field] = value;
        setFormData({ ...formData, headers: newHeaders });
    };

    const handleAddHeader = () => {
        setFormData({
            ...formData,
            headers: [...formData.headers, { key: '', value: '' }],
        });
    };

    const handleRemoveHeader = (index) => {
        const newHeaders = formData.headers.filter((_, i) => i !== index);
        setFormData({ ...formData, headers: newHeaders });
    };

    const handleQueryParamChange = (index, field, value) => {
        const newParams = [...formData.queryParams];
        newParams[index][field] = value;
        setFormData({ ...formData, queryParams: newParams });
    };

    const handleAddQueryParam = () => {
        setFormData({
            ...formData,
            queryParams: [...formData.queryParams, { key: '', value: '' }],
        });
    };

    const handleRemoveQueryParam = (index) => {
        const newParams = formData.queryParams.filter((_, i) => i !== index);
        setFormData({ ...formData, queryParams: newParams });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (onSave) {
            // Trigger promise provided by hook
            // Note: Error handling and modal close are handled in the parent component APIList
            await onSave(formData);
        } else {
            // Dev fallback mock if no callback
            console.log('Submitting new API Monitor:', formData);
            handleClose();
        }
    };

    const tabs = [
        { id: 'config', label: 'Configuration', icon: 'settings' },
        { id: 'params', label: 'Params', icon: 'tune' },
        { id: 'auth', label: 'Auth & Headers', icon: 'key' },
        { id: 'body', label: 'Body', icon: 'code' },
        { id: 'assertions', label: 'Assertions', icon: 'verified' },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            ></div>

            <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl transition-all border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
                <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 flex-shrink-0">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">{initialData ? 'edit' : 'add_link'}</span>
                        {initialData ? 'Edit API Monitor' : 'Create API Monitor'}
                    </h3>
                    <button
                        onClick={handleClose}
                        className="rounded-full p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl leading-none">close</span>
                    </button>
                </div>

                {/* Tabs Configurator */}
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
                    <form id="add-api-form" className="space-y-6" onSubmit={handleSubmit}>
                        
                        {/* TAB: CONFIG */}
                        {activeTab === 'config' && (
                            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        Monitor Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                        placeholder="e.g. Payment Gateway Check"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                            Method
                                        </label>
                                        <select
                                            name="method"
                                            value={formData.method}
                                            onChange={handleChange}
                                            className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors cursor-pointer appearance-none font-bold text-center"
                                        >
                                            <option value="GET">GET</option>
                                            <option value="POST">POST</option>
                                            <option value="PUT">PUT</option>
                                            <option value="DELETE">DELETE</option>
                                            <option value="PATCH">PATCH</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                            Endpoint URL <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="url"
                                            name="url"
                                            value={formData.url}
                                            onChange={handleChange}
                                            className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-mono text-sm"
                                            placeholder="https://api.example.com/health"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Check Interval */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        Check Interval (seconds)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="material-symbols-outlined text-slate-400 text-[18px]">schedule</span>
                                        </span>
                                        <input
                                            type="number"
                                            name="checkInterval"
                                            value={formData.checkInterval}
                                            onChange={handleChange}
                                            min="10"
                                            className="block w-full md:w-1/2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 pl-10 pr-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-mono"
                                            placeholder="60"
                                        />
                                    </div>
                                    <p className="mt-1.5 text-xs text-slate-500">Khoảng thời gian giữa hai lần kiểm tra liên tiếp. Tối thiểu 10 giây.</p>
                                </div>

                                {/* Toggle Switches */}
                                <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-xl border border-slate-200 dark:border-slate-700/50 space-y-4">
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                                        <span className="material-symbols-outlined text-[18px] text-slate-500">toggle_on</span>
                                        Monitor Options
                                    </label>

                                    {/* isActive Toggle */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Active</p>
                                            <p className="text-xs text-slate-500">Bật monitor để scheduler tự động kiểm tra endpoint.</p>
                                        </div>
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked={formData.isActive}
                                            onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                                                formData.isActive ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                                    formData.isActive ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                            />
                                        </button>
                                    </div>

                                    <div className="border-t border-slate-200 dark:border-slate-700"></div>

                                    {/* isMuted Toggle */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Mute Alerts</p>
                                            <p className="text-xs text-slate-500">Tắt thông báo cảnh báo khi endpoint gặp lỗi.</p>
                                        </div>
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked={formData.isMuted}
                                            onClick={() => setFormData({ ...formData, isMuted: !formData.isMuted })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                                                formData.isMuted ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                                    formData.isMuted ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: PARAMS */}
                        {activeTab === 'params' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-xl border border-slate-200 dark:border-slate-700/50">
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="block text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[18px] text-slate-500">tune</span>
                                            Query Parameters
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handleAddQueryParam}
                                            className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors px-3 py-1.5 bg-primary/10 rounded-lg hover:bg-primary/20"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">add</span>
                                            Add Param
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {formData.queryParams.map((param, index) => (
                                            <div key={index} className="flex gap-2 items-start animate-in fade-in duration-200">
                                                <input
                                                    type="text"
                                                    value={param.key}
                                                    onChange={(e) => handleQueryParamChange(index, 'key', e.target.value)}
                                                    placeholder="Key"
                                                    className="w-1/3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-mono"
                                                />
                                                <input
                                                    type="text"
                                                    value={param.value}
                                                    onChange={(e) => handleQueryParamChange(index, 'value', e.target.value)}
                                                    placeholder="Value"
                                                    className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-mono"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveQueryParam(index)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                                                    title="Remove Param"
                                                >
                                                    <span className="material-symbols-outlined text-[20px] leading-none">delete</span>
                                                </button>
                                            </div>
                                        ))}
                                        {formData.queryParams.length === 0 && (
                                            <div className="text-center py-6 text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                                                No query parameters required yet.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: AUTH & HEADERS */}
                        {activeTab === 'auth' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                {/* Authentication Section */}
                                <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-xl border border-slate-200 dark:border-slate-700/50">
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px] text-slate-500">lock</span>
                                        Authentication
                                    </label>
                                    <div className="mb-4">
                                        <select
                                            name="type"
                                            value={formData.auth.type}
                                            onChange={handleAuthChange}
                                            className="block w-full md:w-1/2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
                                        >
                                            <option value="none">No Auth</option>
                                            <option value="bearer">Bearer Token</option>
                                            <option value="api-key">API Key</option>
                                            <option value="basic">Basic Auth</option>
                                        </select>
                                    </div>

                                    {formData.auth.type === 'bearer' && (
                                        <div className="animate-in fade-in zoom-in-95 duration-200">
                                            <input
                                                type="text"
                                                name="token"
                                                value={formData.auth.token}
                                                onChange={handleAuthChange}
                                                placeholder="Enter Bearer Token (e.g. eyJhb...)"
                                                className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono transition-colors"
                                            />
                                        </div>
                                    )}

                                    {formData.auth.type === 'api-key' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-in fade-in zoom-in-95 duration-200">
                                            <input
                                                type="text"
                                                name="apiKeyKey"
                                                value={formData.auth.apiKeyKey}
                                                onChange={handleAuthChange}
                                                placeholder="Key (e.g. x-api-key)"
                                                className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono transition-colors"
                                            />
                                            <input
                                                type="text"
                                                name="apiKeyValue"
                                                value={formData.auth.apiKeyValue}
                                                onChange={handleAuthChange}
                                                placeholder="Value"
                                                className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono transition-colors"
                                            />
                                        </div>
                                    )}

                                    {formData.auth.type === 'basic' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-in fade-in zoom-in-95 duration-200">
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.auth.username}
                                                onChange={handleAuthChange}
                                                placeholder="Username"
                                                className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                            />
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.auth.password}
                                                onChange={handleAuthChange}
                                                placeholder="Password"
                                                className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Custom Headers Section */}
                                <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-xl border border-slate-200 dark:border-slate-700/50">
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="block text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[18px] text-slate-500">list_alt</span>
                                            Custom Headers
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handleAddHeader}
                                            className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors px-3 py-1.5 bg-primary/10 rounded-lg hover:bg-primary/20"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">add</span>
                                            Add Header
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {formData.headers.map((header, index) => (
                                            <div key={index} className="flex gap-2 items-start animate-in fade-in duration-200">
                                                <input
                                                    type="text"
                                                    value={header.key}
                                                    onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                                                    placeholder="Header Key"
                                                    className="w-1/3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-mono"
                                                />
                                                <input
                                                    type="text"
                                                    value={header.value}
                                                    onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                                                    placeholder="Header Value"
                                                    className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-mono"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveHeader(index)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                                                    title="Remove Header"
                                                >
                                                    <span className="material-symbols-outlined text-[20px] leading-none">delete</span>
                                                </button>
                                            </div>
                                        ))}
                                        {formData.headers.length === 0 && (
                                            <div className="text-center py-6 text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                                                No specific headers required yet.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: BODY */}
                        {activeTab === 'body' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200 h-full flex flex-col">
                                {['GET', 'DELETE'].includes(formData.method) ? (
                                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/20">
                                        <span className="material-symbols-outlined text-4xl text-slate-400 mb-3">error_circle</span>
                                        <h4 className="text-slate-900 dark:text-white font-medium mb-1 text-lg">Body Not Recommended</h4>
                                        <p className="text-sm text-slate-500 max-w-md">
                                            The <strong className="text-slate-700 dark:text-slate-300 font-mono">{formData.method}</strong> request method typically does not require a body payload. 
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col h-full min-h-[300px]">
                                        <div className="flex justify-between items-center mb-2 px-1">
                                            <label className="block text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[18px] text-slate-500">data_object</span>
                                                Raw Payload (JSON)
                                            </label>
                                            <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md font-mono border border-slate-200 dark:border-slate-700">application/json</span>
                                        </div>
                                        <textarea
                                            name="body"
                                            value={formData.body}
                                            onChange={handleChange}
                                            placeholder="{\n  &quot;key&quot;: &quot;value&quot;\n}"
                                            className="w-full h-64 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0f111a] py-4 px-5 text-sm text-slate-900 dark:text-slate-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-mono resize-y shadow-inner"
                                            spellCheck={false}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TAB: ASSERTIONS */}
                        {activeTab === 'assertions' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-4 flex gap-3 text-sm text-blue-800 dark:text-blue-300">
                                    <span className="material-symbols-outlined shrink-0 text-blue-500">info</span>
                                    <p>Assertions define the conditions under which the API monitor considers a request as successful (UP). If any condition fails, the API status will be marked as DOWN.</p>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-xl border border-slate-200 dark:border-slate-700/50 space-y-5">
                                    <div>
                                        <label className="flex text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 items-center gap-2">
                                            Expected Status Code
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="material-symbols-outlined text-slate-400 text-[18px]">rule</span>
                                            </span>
                                            <input
                                                type="text"
                                                name="expectedStatus"
                                                value={formData.assertions.expectedStatus}
                                                onChange={handleAssertionChange}
                                                className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 pl-10 pr-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-mono"
                                                placeholder="e.g. 200, 201"
                                                required
                                            />
                                        </div>
                                        <p className="mt-1.5 text-xs text-slate-500">Comma-separated list of acceptable HTTP status codes.</p>
                                    </div>

                                    <div>
                                        <label className="flex text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 items-center gap-2">
                                            Max Response Time (ms)
                                        </label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="material-symbols-outlined text-slate-400 text-[18px]">timer</span>
                                            </span>
                                            <input
                                                type="number"
                                                name="maxResponseTime"
                                                value={formData.assertions.maxResponseTime}
                                                onChange={handleAssertionChange}
                                                className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 pl-10 pr-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-mono"
                                                placeholder="e.g. 1000"
                                            />
                                        </div>
                                        <p className="mt-1.5 text-xs text-slate-500">The test fails if response takes longer than this duration.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                <div className="px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex-shrink-0">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-5 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="add-api-form"
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]">save</span>
                        Save Monitor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddAPIModal;
