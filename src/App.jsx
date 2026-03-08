import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/Layout/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import APIList from './pages/APIList/APIList';
import Intro from './pages/Intro/Intro';
import Monitoring from './pages/Monitoring/Monitoring';
import Alerts from './pages/Alerts/Alerts';
import Logs from './pages/Logs/Logs';
import Settings from './pages/Settings/Settings';
import Billing from './pages/Billing/Billing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />

        {/* Dashboard Layout wrapper for internal pages */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apis" element={<APIList />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
