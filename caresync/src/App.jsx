import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/common/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PatientDashboard from './components/patient/PatientDashboard';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import PharmacistDashboard from './components/pharmacist/PharmacistDashboard';

import './index.css';

function App() {
  // TODO: Replace with actual auth context or Firebase auth
  const isAuthenticated = false; // Placeholder for auth state
  const userRole = 'patient';    // Placeholder for role: patient | doctor | pharmacist

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
          }
        >
          {/* Redirect root to role-based dashboard */}
          <Route index element={<Navigate to={`/${userRole}`} replace />} />

          {/* Role-specific Dashboards */}
          <Route path="patient" element={<PatientDashboard />} />
          <Route path="doctor" element={<DoctorDashboard />} />
          <Route path="pharmacist" element={<PharmacistDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
