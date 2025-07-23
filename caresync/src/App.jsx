import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/common/Layout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import PatientDashboard from './components/patient/PatientDashboard'
import DoctorDashboard from './components/doctor/DoctorDashboard'
import PharmacistDashboard from './components/pharmacist/PharmacistDashboard'
import LoadingSpinner from './components/common/LoadingSpinner'
import './index.css'

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
      <Route 
        path="/login" 
        element={user ? <Navigate to={`/${user.role}`} /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={user ? <Navigate to={`/${user.role}`} /> : <Register />} 
      />
      
      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to={`/${user?.role || 'login'}`} />} />
        <Route path="patient" element={<PatientDashboard />} />
        <Route path="doctor" element={<DoctorDashboard />} />
        <Route path="pharmacist" element={<PharmacistDashboard />} />
      </Route>
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to={user ? `/${user.role}` : "/login"} />} />
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
