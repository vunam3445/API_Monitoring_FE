import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/Layout/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import APIList from './pages/APIList/APIList';
import Intro from './pages/Intro/Intro';
import Monitoring from './pages/Monitoring/Monitoring';
import Alerts from './pages/Alerts/Alerts';
import Logs from './pages/Logs/Logs';
import Settings from './pages/Settings/Settings';
import Billing from './pages/Billing/Billing';

import AdminLogin from './pages/admin/pages/AdminLogin/AdminLogin';
import AdminLayout from './pages/admin/layout/AdminLayout';
import AdminDashboard from './pages/admin/pages/AdminDashboard/AdminDashboard';
import AdminApis from './pages/admin/pages/AdminApis/AdminApis';
import AdminUsers from './pages/admin/pages/AdminUsers/AdminUsers';
import AdminMonitoring from './pages/admin/pages/AdminMonitoring/AdminMonitoring';
import AdminAlerts from './pages/admin/pages/AdminAlerts/AdminAlerts';
import AdminPricingPlans from './pages/admin/pages/AdminPricingPlans/AdminPricingPlans';
import AdminSubscriptions from './pages/admin/pages/AdminSubscriptions/AdminSubscriptions';
import AdminRevenueAnalytics from './pages/admin/pages/AdminRevenueAnalytics/AdminRevenueAnalytics';
import AdminSystemLogs from './pages/admin/pages/AdminSystemLogs/AdminSystemLogs';
import AdminSettings from './pages/admin/pages/AdminSettings/AdminSettings';
import AdminRoute from './components/Auth/AdminRoute';

// Global UI Providers
import { ToastProvider, ToastContainer } from './components/UI/Toast';
import { ConfirmDialogProvider } from './components/UI/ConfirmDialog';

function App() {
  return (
    <ToastProvider>
      <ConfirmDialogProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Intro />} />

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/apis" element={<AdminApis />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/monitoring" element={<AdminMonitoring />} />
                <Route path="/admin/alerts" element={<AdminAlerts />} />
                <Route path="/admin/pricing-plans" element={<AdminPricingPlans />} />
                <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
                <Route path="/admin/revenue-analytics" element={<AdminRevenueAnalytics />} />
                <Route path="/admin/system-logs" element={<AdminSystemLogs />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
              </Route>
            </Route>

            {/* Dashboard Layout wrapper for internal pages */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/apis" element={<APIList />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/payment/vnpay-return" element={<Billing />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>

        {/* Toast hiển thị trên cùng, ngoài Router */}
        <ToastContainer />
      </ConfirmDialogProvider>
    </ToastProvider>
  )
}

export default App;
