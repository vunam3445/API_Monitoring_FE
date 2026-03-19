import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};

const AdminRoute = () => {
    const location = useLocation();

    // Nếu đang ở trang login thì không cần kiểm tra để redirect tránh loop
    if (location.pathname === '/admin/login') {
        return <Outlet />;
    }

    const token = localStorage.getItem('accessToken');

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    const decodedToken = parseJwt(token);

    if (!decodedToken || (decodedToken.role !== 'ADMIN' && decodedToken.role !== 'SUPER_ADMIN')) {
        return <Navigate to="/admin/login" replace />;
    }

    // Role hợp lệ, cho phép truy cập layout
    return <Outlet />;
};

export default AdminRoute;
