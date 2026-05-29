import React, { useState, useEffect } from 'react';
import { featureService } from '../../../../services/featureService';
import FeatureTable from './components/FeatureTable';
import CreateFeatureModal from './components/CreateFeatureModal';
import { useToast } from '../../../../components/UI/Toast';
import { useConfirmDialog } from '../../../../components/UI/ConfirmDialog';

const AdminFeatures = () => {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editFeature, setEditFeature] = useState(null);

    const toast = useToast();
    const { confirm } = useConfirmDialog();

    const loadFeatures = async () => {
        setLoading(true);
        try {
            const data = await featureService.getAll();
            setFeatures(data);
        } catch (err) {
            toast.error('Lỗi khi tải danh sách tính năng');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFeatures();
    }, []);

    const handleCreateOpen = () => {
        setEditFeature(null);
        setIsModalOpen(true);
    };

    const handleEditOpen = (feature) => {
        setEditFeature(feature);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditFeature(null);
    };

    const handleSubmitModal = async (formData) => {
        try {
            if (editFeature) {
                await featureService.update(editFeature.id, formData);
                toast.success('Cập nhật tính năng thành công!');
            } else {
                await featureService.create(formData);
                toast.success('Thêm tính năng mới thành công!');
            }
            await loadFeatures();
            handleCloseModal();
        } catch (err) {
            toast.error(err.message || 'Thao tác thất bại.');
        }
    };

    const handleDeleteFeature = async (feature) => {
        const confirmed = await confirm({
            title: 'Xoá Tính Năng',
            message: `Bạn có chắc chắn muốn xoá tính năng "${feature.label}"? Các Plan đang chọn tính năng này có thể bị ảnh hưởng.`,
            confirmText: 'Xoá ngay',
            cancelText: 'Huỷ',
            type: 'danger',
            icon: 'delete_forever',
        });

        if (!confirmed) return;

        try {
            await featureService.delete(feature.id);
            toast.success('Đã xoá tính năng thành công!');
            await loadFeatures();
        } catch (err) {
            toast.error(err.message || 'Có lỗi xảy ra khi xoá tính năng.');
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-background-light dark:bg-background-dark h-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <span>Admin</span>
                        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                        <span>Features</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
                        Features Management
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                        Quản lý các tính năng độc lập trong hệ thống để chọn khi thiết lập gói cước (Pricing Plans).
                    </p>
                </div>
                <div>
                    <button
                        onClick={handleCreateOpen}
                        className="px-4 py-2 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm"
                    >
                        <span className="material-symbols-outlined text-lg">add_circle</span>
                        Create New Feature
                    </button>
                </div>
            </div>

            {/* Table */}
            <FeatureTable
                features={features}
                loading={loading}
                onEdit={handleEditOpen}
                onDelete={handleDeleteFeature}
            />

            {/* Modal Form */}
            <CreateFeatureModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitModal}
                editFeature={editFeature}
                existingFeatures={features}
            />
        </div>
    );
};

export default AdminFeatures;
