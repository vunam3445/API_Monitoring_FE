import React, { useState, useEffect, useRef } from 'react';
import LogStats from './components/LogStats';
import LogFilters from './components/LogFilters';
import LogTable from './components/LogTable';
import LogDetailPanel from './components/LogDetailPanel';
import { adminSystemLogsService } from '../../../../services/adminSystemLogsService';

const AdminSystemLogs = () => {
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState({ total: 0, infos: 0, warnings: 0, errors: 0, fatals: 0 });
    const [loading, setLoading] = useState(false);
    const [isLive, setIsLive] = useState(false);
    
    // Filters State
    const [keyword, setKeyword] = useState('');
    const [levelFilter, setLevelFilter] = useState('ALL');
    const [timeFilter, setTimeFilter] = useState('ALL');
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    
    const [selectedLog, setSelectedLog] = useState(null);
    const [copied, setCopied] = useState(false);
    
    const itemsPerPage = 50;
    const liveTimerRef = useRef(null);

    // Hàm gọi API lấy danh sách logs theo bộ lọc và phân trang từ Backend
    const fetchLogs = async () => {
        // Nếu Live Tail đang chạy, chúng ta để cơ chế Polling quản lý cập nhật danh sách
        if (isLive) return;

        setLoading(true);
        try {
            const response = await adminSystemLogsService.getLogs({
                page: currentPage - 1, // Spring Boot 0-indexed
                size: itemsPerPage,
                level: levelFilter,
                keyword: keyword,
                timeRange: timeFilter
            });

            if (response && response.content) {
                const parsedLogs = response.content.map(log => ({
                    ...log,
                    timestamp: new Date(log.timestamp)
                }));
                setLogs(parsedLogs);
                setTotalElements(response.page?.totalElements || response.totalElements || 0);
                setTotalPages(response.page?.totalPages || response.totalPages || 1);
            }
        } catch (error) {
            console.error("Failed to fetch logs:", error);
        } finally {
            setLoading(false);
        }
    };

    // Hàm gọi API lấy số liệu thống kê trong ngày từ Backend
    const fetchStats = async () => {
        try {
            const response = await adminSystemLogsService.getStats();
            if (response) {
                setStats({
                    total: response.total || 0,
                    infos: response.infos || 0, // Mặc định là 0 theo nghiệp vụ của backend
                    warnings: response.warnings || 0,
                    errors: response.errors || 0,
                    fatals: response.fatals || 0
                });
            }
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        }
    };

    // Tải logs mỗi khi các bộ lọc hoặc trang hiện tại thay đổi
    useEffect(() => {
        fetchLogs();
    }, [currentPage, levelFilter, keyword, timeFilter, isLive]);

    // Tải stats ban đầu
    useEffect(() => {
        fetchStats();
    }, []);

    // Reset trang về 1 khi các bộ lọc thay đổi
    useEffect(() => {
        setCurrentPage(1);
    }, [keyword, levelFilter, timeFilter]);

    // Cơ chế Live Tail thật sự qua Polling API mỗi 2 giây khi bật
    useEffect(() => {
        if (isLive) {
            liveTimerRef.current = setInterval(async () => {
                try {
                    // Thăm dò trang 0 để lấy các log mới nhất từ Backend
                    const response = await adminSystemLogsService.getLogs({
                        page: 0,
                        size: itemsPerPage,
                        level: levelFilter,
                        keyword: keyword,
                        timeRange: timeFilter
                    });

                    if (response && response.content) {
                        const parsedNewLogs = response.content.map(log => ({
                            ...log,
                            timestamp: new Date(log.timestamp)
                        }));

                        setLogs((prevLogs) => {
                            // Tìm các log mới mà ID chưa tồn tại trong danh sách hiện tại của Frontend
                            const existingIds = new Set(prevLogs.map(l => l.id));
                            const uniqueNewLogs = parsedNewLogs.filter(l => !existingIds.has(l.id));

                            if (uniqueNewLogs.length === 0) return prevLogs;

                            // Đánh dấu các log mới có hiệu ứng nhấp nháy sáng nhẹ
                            const markedNewLogs = uniqueNewLogs.map(l => ({ ...l, isNew: true }));

                            // Tắt hiệu ứng nháy sáng sau 1.2 giây
                            setTimeout(() => {
                                setLogs((currentLogs) => 
                                    currentLogs.map(l => l.isNew ? { ...l, isNew: false } : l)
                                );
                            }, 1200);

                            // Chèn các log mới lên đầu bảng và giới hạn tối đa 1000 logs tránh lag UI
                            const updated = [...markedNewLogs, ...prevLogs];
                            if (updated.length > 1000) {
                                updated.splice(1000);
                            }
                            return updated;
                        });

                        // Đồng bộ lại stats thật từ Backend
                        fetchStats();
                    }
                } catch (error) {
                    console.error("Failed to poll live logs:", error);
                }
            }, 2000);
        } else {
            if (liveTimerRef.current) {
                clearInterval(liveTimerRef.current);
            }
            // Gọi lại dữ liệu thật và stats thật từ API khi tắt Live Tail để đồng bộ
            fetchLogs();
            fetchStats();
        }

        return () => {
            if (liveTimerRef.current) {
                clearInterval(liveTimerRef.current);
            }
        };
    }, [isLive, levelFilter, keyword, timeFilter]);

    // Trả về phần tên Class rút gọn để bảng hiển thị đẹp mắt hơn
    const getShortClassName = (className) => {
        if (!className) return '';
        const parts = className.split('.');
        return parts[parts.length - 1];
    };

    // Hàm copy Stack Trace vào clipboard
    const handleCopyStackTrace = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    // Các thẻ màu phong phú cho từng Log Level
    const getLevelBadgeClass = (level) => {
        switch (level) {
            case 'FATAL':
                return 'bg-red-950 text-red-200 border border-red-800 animate-pulse';
            case 'ERROR':
                return 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400';
            case 'WARN':
                return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400';
            case 'INFO':
                return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400';
            default:
                return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
        }
    };

    // Hàm lấy màu sắc chữ của Message chính theo Log Level
    const getMessageTextClass = (level) => {
        switch (level) {
            case 'FATAL': return 'text-red-600 dark:text-red-400 font-bold';
            case 'ERROR': return 'text-rose-700 dark:text-rose-300';
            case 'WARN': return 'text-amber-700 dark:text-amber-300';
            default: return 'text-slate-600 dark:text-slate-400';
        }
    };

    // Hàm định dạng thời gian đến mili-giây
    const formatTimestamp = (date) => {
        if (!date) return '';
        const pad = (n, width = 2) => String(n).padStart(width, '0');
        const yyyy = date.getFullYear();
        const mm = pad(date.getMonth() + 1);
        const dd = pad(date.getDate());
        const hh = pad(date.getHours());
        const min = pad(date.getMinutes());
        const ss = pad(date.getSeconds());
        const ms = pad(date.getMilliseconds(), 3);
        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}.${ms}`;
    };

    // Gọi API dọn dẹp logs cũ vĩnh viễn theo chỉ số ngày giữ lại
    const handleClearLogs = async () => {
        const daysInput = window.prompt("Nhập số ngày giữ lại logs (Ví dụ: 7, 30):", "30");
        if (daysInput === null) return;
        
        const days = parseInt(daysInput, 10);
        if (isNaN(days) || days <= 0) {
            alert("Số ngày giữ lại phải là số nguyên dương hợp lệ!");
            return;
        }

        if (window.confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn các logs cũ hơn ${days} ngày?`)) {
            try {
                setLoading(true);
                const response = await adminSystemLogsService.clearLogs(days);
                if (response && response.success) {
                    alert(response.message || `Đã dọn dẹp thành công các log cũ hơn ${days} ngày!`);
                    fetchLogs();
                    fetchStats();
                    setSelectedLog(null);
                }
            } catch (error) {
                console.error("Failed to clear logs:", error);
                alert("Có lỗi xảy ra khi dọn dẹp log hệ thống.");
            } finally {
                setLoading(false);
            }
        }
    };

    // Làm mới dữ liệu logs từ Backend
    const handleRefresh = () => {
        fetchLogs();
        fetchStats();
        setSelectedLog(null);
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-background-light dark:bg-background-dark min-h-0 min-w-0 h-full">
            {/* Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-3xl">terminal</span>
                        System Logs
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Giám sát hoạt động, lỗi nghiệp vụ và luồng xử lý thời gian thực của chính hệ thống Admin.</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Live Tail Toggle Button */}
                    <button 
                        onClick={() => setIsLive(!isLive)}
                        className={`px-4 py-2 flex items-center gap-2 text-sm font-bold rounded-xl transition-all shadow-md ${
                            isLive 
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white animate-pulse' 
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                    >
                        <span className={`w-2.5 h-2.5 rounded-full ${isLive ? 'bg-white' : 'bg-slate-400'}`}></span>
                        {isLive ? 'Live Tail [ON]' : 'Live Tail [OFF]'}
                    </button>

                    <button 
                        onClick={handleRefresh}
                        className="px-4 py-2 flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
                    >
                        <span className="material-symbols-outlined text-lg">refresh</span>
                        Làm mới
                    </button>
                    <button 
                        onClick={handleClearLogs}
                        className="px-4 py-2 flex items-center gap-2 text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl transition-colors shadow-lg shadow-rose-500/20"
                    >
                        <span className="material-symbols-outlined text-lg">delete_sweep</span>
                        Dọn dẹp log
                    </button>
                </div>
            </div>

            {/* Quick Stats Panel */}
            <LogStats stats={stats} />

            {/* Filter Bar Panel */}
            <LogFilters 
                keyword={keyword}
                setKeyword={setKeyword}
                levelFilter={levelFilter}
                setLevelFilter={setLevelFilter}
                timeFilter={timeFilter}
                setTimeFilter={setTimeFilter}
            />

            {/* Split View: Table + Detail Overlay */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">
                
                {/* Table Section */}
                {loading && !isLive ? (
                    <div className="flex-1 w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-sm">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-3"></div>
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Đang tải logs từ hệ thống...</p>
                    </div>
                ) : (
                    <LogTable 
                        paginatedLogs={isLive ? logs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : logs}
                        filteredLogsLength={isLive ? logs.length : totalElements}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={isLive ? Math.ceil(logs.length / itemsPerPage) || 1 : totalPages}
                        itemsPerPage={itemsPerPage}
                        setSelectedLog={setSelectedLog}
                        formatTimestamp={formatTimestamp}
                        getLevelBadgeClass={getLevelBadgeClass}
                        getMessageTextClass={getMessageTextClass}
                        getShortClassName={getShortClassName}
                    />
                )}

                {/* Stack Trace Detail Overlay Panel */}
                {selectedLog && (
                    <LogDetailPanel 
                        selectedLog={selectedLog}
                        setSelectedLog={setSelectedLog}
                        copied={copied}
                        handleCopyStackTrace={handleCopyStackTrace}
                        formatTimestamp={formatTimestamp}
                        getLevelBadgeClass={getLevelBadgeClass}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminSystemLogs;
