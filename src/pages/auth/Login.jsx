import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon, HomeIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { patients, doctors, pharmacists } from '../../data/dummyData'

const Login = () => {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient'
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await login(formData.email, formData.password, formData.role)
      if (result.success) {
        navigate(`/${result.user.role}`)
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError('')
      const result = await loginWithGoogle()
      if (result.success) {
        navigate(`/${result.user.role}`)
      }
    } catch (err) {
      setError(err.message || 'Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  const fillDemoCredentials = (role) => {
    let user
    if (role === 'patient') user = patients[0]
    if (role === 'doctor') user = doctors[0]
    if (role === 'pharmacist') user = pharmacists[0]

    if (user) {
      setFormData({
        email: user.email,
        password: user.password,
        role: user.role
      })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background decorative elements */}
      <motion.div 
        className="absolute top-10 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20"
        variants={pulseVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute top-32 right-20 w-16 h-16 bg-teal-200 rounded-full opacity-20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '0.5s' }}
      />
      <motion.div 
        className="absolute bottom-20 left-1/4 w-12 h-12 bg-cyan-200 rounded-full opacity-20"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      />
      <motion.div 
        className="absolute bottom-32 right-10 w-24 h-24 bg-emerald-200 rounded-full opacity-20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '1.5s' }}
      />

      {/* Home Button */}
      <motion.div
        className="absolute top-6 left-6 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 text-emerald-600 hover:text-emerald-700 hover:bg-white transition-all duration-300 group"
        >
          <motion.div
            whileHover={{ x: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <HomeIcon className="w-5 h-5" />
          </motion.div>
          <span className="font-medium text-sm">Home</span>
        </Link>
      </motion.div>

      <motion.div
        className="max-w-lg w-full space-y-8 bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-white/50 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Header Section */}
        <motion.div className="text-center" variants={itemVariants}>
          <motion.div 
            className="flex justify-center mb-6"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <motion.svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </motion.svg>
            </div>
          </motion.div>
          <motion.h1 
            className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            CareSync
          </motion.h1>
          <motion.h2 
            className="text-2xl font-bold text-gray-800 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Welcome Back
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Sign in to continue your healthcare journey
          </motion.p>
          <motion.p 
            className="mt-2 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors duration-200 underline decoration-2 underline-offset-2 hover:decoration-emerald-500"
            >
              Create one here
            </Link>
          </motion.p>
        </motion.div>

        {/* Demo Credentials Section */}
        <motion.div 
          className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-400 p-5 rounded-xl shadow-sm"
          variants={itemVariants}
        >
          <motion.div 
            className="flex items-center mb-3"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-2">
              <motion.svg 
                className="w-3 h-3 text-white" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring" }}
              >
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </motion.svg>
            </div>
            <h3 className="text-sm font-bold text-emerald-800">Quick Demo Access</h3>
          </motion.div>
          <div className="space-y-3 text-xs">
            {['patient', 'doctor', 'pharmacist'].map((role, index) => {
              const user = role === 'patient' ? patients[0] : role === 'doctor' ? doctors[0] : pharmacists[0];
              const colors = {
                patient: 'from-blue-400 to-blue-500',
                doctor: 'from-green-400 to-green-500',
                pharmacist: 'from-purple-400 to-purple-500'
              };
              const icons = {
                patient: '👤',
                doctor: '👩‍⚕️',
                pharmacist: '💊'
              };
              const labels = {
                patient: 'Patient Portal',
                doctor: 'Doctor Dashboard',
                pharmacist: 'Pharmacy System'
              };

              return (
                <motion.button
                  key={role}
                  type="button"
                  onClick={() => fillDemoCredentials(role)}
                  className="w-full flex items-center gap-3 p-3 bg-white/70 hover:bg-white hover:shadow-md rounded-lg transition-all duration-200 text-emerald-700 hover:text-emerald-800 border border-emerald-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className={`w-8 h-8 bg-gradient-to-br ${colors[role]} rounded-full flex items-center justify-center text-white text-sm`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {icons[role]}
                  </motion.div>
                  <div className="text-left flex-1">
                    <div className="font-medium">{labels[role]}</div>
                    <div className="text-emerald-600 text-xs">{user?.email || 'No email'}</div>
                  </div>
                </motion.button>
              );
            })}
            <motion.div 
              className="bg-emerald-100 rounded-lg p-3 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <p className="text-emerald-700 text-center">
                <span className="font-medium">Default Password:</span> 
                <motion.code 
                  className="bg-emerald-200 px-2 py-1 rounded font-mono text-xs ml-1"
                  whileHover={{ scale: 1.05 }}
                >
                  password123
                </motion.code>
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
            />
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Login