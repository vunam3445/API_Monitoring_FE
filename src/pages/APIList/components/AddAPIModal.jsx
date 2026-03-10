import React, { useState } from 'react';

const AddAPIModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        method: 'GET',
        interval: '5',
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would typically call an API service to save this endpoint
        console.log('Submitting new API:', formData);

        // Mock successful addition
        onClose();
        // Reset form
        setFormData({
            name: '',
            url: '',
            method: 'GET',
            interval: '5',
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl transition-all border border-slate-200 dark:border-slate-800">
                <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">add_link</span>
                        Add API Endpoint
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                <div className="px-8 py-6">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                API Name
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

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Endpoint URL
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

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Method
                                </label>
                                <select
                                    name="method"
                                    value={formData.method}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors cursor-pointer appearance-none"
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
                                    Check Interval (mins)
                                </label>
                                <select
                                    name="interval"
                                    value={formData.interval}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors cursor-pointer appearance-none"
                                >
                                    <option value="1">1 minute</option>
                                    <option value="5">5 minutes</option>
                                    <option value="15">15 minutes</option>
                                    <option value="30">30 minutes</option>
                                    <option value="60">1 hour</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
                            >
                                <span className="material-symbols-outlined text-sm">save</span>
                                Save API
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAPIModal;
