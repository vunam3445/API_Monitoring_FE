import React, { useState } from 'react';
import { useBroadcasts } from './hooks/useBroadcasts';
import BroadcastForm from './components/BroadcastForm';
import BroadcastHistory from './components/BroadcastHistory';
import BroadcastDetailModal from './components/BroadcastDetailModal';

const AdminBroadcasts = () => {
    const {
        broadcasts,
        loading,
        sending,
        plans,
        formData,
        errors,
        handleInputChange,
        handleTargetTypeChange,
        handleSubmit
    } = useBroadcasts();

    const [selectedBroadcast, setSelectedBroadcast] = useState(null);

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Header Section */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-5 flex items-center justify-between shrink-0">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <span>Admin</span>
                        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                        <span>Broadcasts</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                        Gửi thông báo hệ thống
                    </h1>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-5 gap-6 items-start">
                    
                    {/* Cột trái (2/5): Form soạn thảo */}
                    <div className="xl:col-span-2">
                        <BroadcastForm
                            formData={formData}
                            errors={errors}
                            sending={sending}
                            plans={plans}
                            onChange={handleInputChange}
                            onTargetTypeChange={handleTargetTypeChange}
                            onSubmit={handleSubmit}
                        />
                    </div>

                    {/* Cột phải (3/5): Bảng lịch sử */}
                    <div className="xl:col-span-3 h-full">
                        <BroadcastHistory
                            broadcasts={broadcasts}
                            loading={loading}
                            onSelect={setSelectedBroadcast}
                        />
                    </div>

                </div>
            </div>

            {/* Modal hiển thị chi tiết khi chọn bản ghi lịch sử */}
            <BroadcastDetailModal
                broadcast={selectedBroadcast}
                onClose={() => setSelectedBroadcast(null)}
            />
        </div>
    );
};

export default AdminBroadcasts;
