import React, { useState } from 'react';
import Toolbar from './components/Toolbar';
import APITable from './components/APITable';
import FooterStats from './components/FooterStats';
import AddAPIModal from './components/AddAPIModal';

const APIList = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="space-y-8">
            {/* Page Title */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">API List</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and monitor all registered API endpoints in real-time.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined">add</span>
                    Add API
                </button>
            </div>

            <Toolbar />

            <APITable />

            <FooterStats />

            <AddAPIModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </div>
    );
};

export default APIList;
