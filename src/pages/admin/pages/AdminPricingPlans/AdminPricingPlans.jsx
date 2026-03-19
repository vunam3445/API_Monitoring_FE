import React, { useState } from 'react';
import { useSubscriptionPlans } from '../../../../hooks/useSubscriptionPlans';
import CreateSubscriptionPlanModal from './components/CreateSubscriptionPlanModal';
import StatsCards from './components/StatsCards';
import PlansTable from './components/PlansTable';
import PlanDetailPanel from './components/PlanDetailPanel';

/**
 * AdminPricingPlans - Component thuần UI (Presentation Layer)
 * 
 * Tuân thủ SRP: Component này CHỈ chịu trách nhiệm:
 * - Điều phối layout tổng thể
 * - Quản lý UI state cục bộ (modal open/close)
 * - Delegate render cho các sub-components
 * 
 * Logic dữ liệu → useSubscriptionPlans hook
 * UI chi tiết → các component trong /components
 */
const AdminPricingPlans = () => {
    // ==================== HOOK - Toàn bộ logic dữ liệu ====================
    const {
        plans,
        loading,
        selectedPlan,
        setSelectedPlan,
        pagination,
        createPlan,
        updatePlan,
        deletePlan,
        refresh,
        handlePageChange,
        activePlansCount,
        inactivePlansCount,
        priceRange,
    } = useSubscriptionPlans(10);

    // ==================== LOCAL UI STATE ====================
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editPlan, setEditPlan] = useState(null);

    // ==================== UI EVENT HANDLERS ====================
    const handleOpenCreate = () => {
        setEditPlan(null);
        setIsCreateModalOpen(true);
    };

    const handleOpenEdit = (plan) => {
        setEditPlan(plan);
        setIsCreateModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsCreateModalOpen(false);
        setEditPlan(null);
    };

    const handleSubmitModal = async (planData) => {
        if (editPlan) {
            await updatePlan(editPlan.id, planData);
        } else {
            await createPlan(planData);
        }
    };

    // ==================== PAGINATION RENDER HELPER ====================
    const renderPaginationButtons = () => {
        const pages = [];
        const { page, totalPages } = pagination;
        const maxVisible = 5;
        let start = Math.max(0, page - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible);
        if (end - start < maxVisible) start = Math.max(0, end - maxVisible);

        for (let i = start; i < end; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        i === page
                            ? 'bg-primary text-white shadow-sm'
                            : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                >
                    {i + 1}
                </button>
            );
        }
        return pages;
    };

    // ==================== RENDER ====================
    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-background-light dark:bg-background-dark h-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Pricing Plans</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">Manage subscription plans, pricing, and feature limits for the platform.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={refresh}
                        className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                    >
                        <span className={`material-symbols-outlined text-lg ${loading ? 'animate-spin' : ''}`}>refresh</span>
                        Refresh
                    </button>
                    <button
                        onClick={handleOpenCreate}
                        className="px-4 py-2 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">add_circle</span>
                        Create New Plan
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <StatsCards
                totalElements={pagination.totalElements}
                activePlansCount={activePlansCount}
                inactivePlansCount={inactivePlansCount}
                priceRange={priceRange}
            />

            {/* Main Content */}
            <div className="flex flex-col xl:flex-row gap-6">
                <PlansTable
                    plans={plans}
                    loading={loading}
                    selectedPlan={selectedPlan}
                    pagination={pagination}
                    onSelectPlan={setSelectedPlan}
                    onEditPlan={handleOpenEdit}
                    onDeletePlan={deletePlan}
                    onPageChange={handlePageChange}
                    renderPaginationButtons={renderPaginationButtons}
                />

                {selectedPlan && (
                    <PlanDetailPanel
                        plan={selectedPlan}
                        onClose={() => setSelectedPlan(null)}
                        onEdit={() => handleOpenEdit(selectedPlan)}
                        onDelete={() => deletePlan(selectedPlan)}
                    />
                )}
            </div>

            {/* Create / Edit Modal */}
            <CreateSubscriptionPlanModal
                isOpen={isCreateModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitModal}
                editPlan={editPlan}
            />
        </div>
    );
};

export default AdminPricingPlans;
