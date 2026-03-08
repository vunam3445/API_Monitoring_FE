import React from 'react';

const DashboardHeader = () => {
    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-10 shrink-0">
            <div className="flex items-center flex-1 max-w-xl">
                <div className="relative w-full group">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-primary transition-colors">search</span>
                    <input
                        className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                        placeholder="Search endpoints, status or logs..." type="text" />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="size-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2.5 size-2 bg-primary rounded-full ring-2 ring-white dark:ring-slate-900"></span>
                </button>
                <div className="h-8 w-[1px] bg-slate-200 dark:border-slate-800"></div>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-xl transition-colors">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold leading-none">Alex Rivera</p>
                        <p className="text-[10px] text-slate-500 mt-1">Lead Architect</p>
                    </div>
                    <img alt="Profile" className="size-9 rounded-full bg-slate-200"
                        data-alt="User profile avatar of Alex Rivera"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKEMFnOd48J7CAMbUykHO16YTCQwyC_mzr5Y6TPN3sVFIvbkVXdvVyJu2h_NiNw02LYnzLIiF5u7JxYpygS0eFMevh2WyGo3z6lQlh16acvZEMDUR_AeKkjZGkj5KCkzOZR6n7f0IDDVbF1rtjV3EKolF1mgRYaWK9g1wmvSELTxWlGBkJ_qAP_8BxvctnjdDFiO0cBDc2uXjKT9p3iDqXh3yefwbSMEH8X6jdsGOURPfbhwyVxPNcdDbc7oIzedfKFDz_ooSeCz0Q" />
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
