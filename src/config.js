// Initial React Frontend Setup with Constants

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CompanyDashboard from './pages/CompanyDashboard';
import AgencyDashboard from './pages/AgencyDashboard';
import ScheduleInterview from './pages/ScheduleInterview';
import InterviewPage from './pages/InterviewPage';
import ViewReport from './pages/ViewReport';
import { API_BASE_URL, ROLES, ROUTES, COLORS, APP_INFO } from './utils/constants';
import { NAV_ITEMS, THEME, DEFAULT_LANGUAGE, EMAIL_TEMPLATES, INTERVIEW_CONFIG, INTERVIEW_STATUS, REPORT_SCORE_LABELS, SECURITY } from './utils/config';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.COMPANY_DASHBOARD} element={<CompanyDashboard />} />
        <Route path={ROUTES.AGENCY_DASHBOARD} element={<AgencyDashboard />} />
        <Route path={ROUTES.SCHEDULE_INTERVIEW} element={<ScheduleInterview />} />
        <Route path={ROUTES.INTERVIEW} element={<InterviewPage />} />
        <Route path={ROUTES.VIEW_REPORT} element={<ViewReport />} />
      </Routes>
    </Router>
  );
}

export default App;

// utils/constants.js
export const API_BASE_URL = 'https://api.yourplatform.com';

export const ROLES = {
  SUPERADMIN: 'superadmin',
  COMPANY: 'company',
  AGENCY: 'agency'
};

export const ROUTES = {
  HOME: '/',
  COMPANY_DASHBOARD: '/company/dashboard',
  AGENCY_DASHBOARD: '/agency/dashboard',
  SCHEDULE_INTERVIEW: '/agency/schedule',
  INTERVIEW: '/interview/:token',
  VIEW_REPORT: '/report/:interviewId'
};

export const COLORS = {
  PRIMARY: '#1A73E8', // blue
  SECONDARY: '#F4B400' // yellow
};

export const APP_INFO = {
  NAME: 'IntelliHire',
  LOGO_PATH: '/assets/logo.png'
};

// utils/config.js
export const NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTES.AGENCY_DASHBOARD },
  { label: 'Schedule Interview', path: ROUTES.SCHEDULE_INTERVIEW },
  { label: 'Reports', path: ROUTES.VIEW_REPORT }
];

export const THEME = {
  FONT_FAMILY: "'Inter', sans-serif",
  BORDER_RADIUS: '12px',
  SHADOW: '0 4px 12px rgba(0, 0, 0, 0.1)'
};

export const DEFAULT_LANGUAGE = 'en';

export const EMAIL_TEMPLATES = {
  INTERVIEW_LINK: 'interview_link_template',
  REPORT_READY: 'report_ready_template'
};

export const INTERVIEW_CONFIG = {
  MAX_DURATION_MINUTES: 45,
  LINK_EXPIRY_HOURS: 72,
  ALLOW_RESUME_UPLOAD: true,
  MINIMUM_QUESTIONS: 5
};

export const INTERVIEW_STATUS = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  EXPIRED: 'Expired',
  NO_SHOW: 'No Show'
};

export const REPORT_SCORE_LABELS = {
  EXCELLENT: 'Excellent',
  GOOD: 'Good',
  AVERAGE: 'Average',
  POOR: 'Needs Improvement'
};

export const SECURITY = {
  TOKEN_EXPIRY: '3d',
  ALLOW_DEV_MODE: false
};
