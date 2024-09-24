import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import MainLayout from './layout/MainLayout';
import { CircularProgress } from '@mui/material';


import Login from './pages/auth/Login';
import Signup from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import TwoFactorAuth from './pages/auth/TwoFactor';
import ResetPassword from './pages/auth/ResetPassword';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Logs = lazy(() => import('./pages/Logs'));
const Anomalies = lazy(() => import('./pages/Anomalies'));
const Alerts = lazy(() => import('./pages/Alerts'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));
const ReportsPage = lazy(() => import('./pages/Reports'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<CircularProgress style={{ display: 'flex', margin: 'auto', height: '100vh'}} />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="logs" element={<Logs />} />
            <Route path="anomalies" element={<Anomalies />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/twofactor" element={<TwoFactorAuth />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
