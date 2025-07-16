import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';

import Dashboard from './pages/Dashboard';
import Interviews from './pages/Interviews';
import Candidates from './pages/Candidates';
import Profile from './pages/Profile';
import AddCandidateForm from './pages/AddCandidateForm';
import Users from './pages/Users';
import CreateJobPage from './pages/CreateJobPage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import CandidateReport from './pages/CandidateReport'; 
import ScheduleInterview from './pages/ScheduleInterview';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/forgot-password'];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <div style={{ display: 'flex' }}>
      {!hideNavbar && <Navbar />}

      <div style={{ flex: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />}
          />
          <Route
            path="/add-candidates"
            element={isLoggedIn ? <AddCandidateForm /> : <Navigate to="/" replace />}
          />
          <Route
            path="/interviews"
            element={isLoggedIn ? <Interviews /> : <Navigate to="/" replace />}
          />
          <Route
            path="/candidates"
            element={isLoggedIn ? <Candidates /> : <Navigate to="/" replace />}
          />
          <Route
            path="/jobs"
            element={isLoggedIn ? <CreateJobPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/settings"
            element={isLoggedIn ? <Users /> : <Navigate to="/" replace />}
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/" replace />}
          />
          <Route
            path="/candidatereport"   // ✅ Corrected path
            element={isLoggedIn ? <CandidateReport /> : <Navigate to="/" replace />}
          />
          <Route
  path="/schedule"
  element={isLoggedIn ? <ScheduleInterview /> : <Navigate to="/" replace />}
/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
