import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LandingPage from './pages/LandingPage'
import Layout from './components/common/Layout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import PatientDashboard from './components/patient/PatientDashboard'
import DoctorDashboard from './components/doctor/DoctorDashboard'
import PharmacistDashboard from './components/pharmacist/PharmacistDashboard'
import LoadingSpinner from './components/common/LoadingSpinner'
import './index.css'
import Prescriptions from './components/patient/Prescriptions';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }
  
  return user ? children : <Navigate to="/login" />
}

// Main App Routes
const AppRoutes = () => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <p className="mt-4 text-gray-600">Loading CareSync...</p>
        </div>
      </div>
    )
  }

  return (
<Routes>
  {/* Public Routes */}
  <Route path="/" element={<LandingPage />} />
  <Route 
    path="/login" 
    element={user ? <Navigate to={`/${user.role}`} /> : <Login />} 
  />
  <Route 
    path="/register" 
    element={user ? <Navigate to={`/${user.role}`} /> : <Register />} 
  />

  {/* Protected routes with shared layout */}
  <Route 
    path="/patient"
    element={
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    }
  >
    <Route index element={<PatientDashboard />} />
    <Route path="prescriptions" element={<Prescriptions />} />
    {/* add other patient routes here! */}
  </Route>

  <Route 
    path="/doctor"
    element={
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    }
  >
    <Route index element={<DoctorDashboard />} />
    {/* add doctor subroutes here */}
  </Route>

  <Route 
    path="/pharmacist"
    element={
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    }
  >
    <Route index element={<PharmacistDashboard />} />
    {/* add pharmacist subroutes here */}
  </Route>

  {/* Catch all route */}
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
