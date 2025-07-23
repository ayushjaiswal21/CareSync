import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Mock user data for testing
const mockUsers = {
  'patient@caresync.com': {
    id: '1',
    email: 'patient@caresync.com',
    password: 'password123',
    role: 'patient',
    name: 'John Doe',
    firstName: 'John',
    lastName: 'Doe'
  },
  'doctor@caresync.com': {
    id: '2',
    email: 'doctor@caresync.com',
    password: 'password123',
    role: 'doctor',
    name: 'Dr. Sarah Johnson',
    firstName: 'Sarah',
    lastName: 'Johnson',
    specialization: 'Cardiology'
  },
  'pharmacist@caresync.com': {
    id: '3',
    email: 'pharmacist@caresync.com',
    password: 'password123',
    role: 'pharmacist',
    name: 'Mike Wilson',
    firstName: 'Mike',
    lastName: 'Wilson',
    pharmacyName: 'CareSync Pharmacy'
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for stored user on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('caresync_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password, role) => {
    setLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser = mockUsers[email]
      
      if (!mockUser) {
        throw new Error('User not found')
      }
      
      if (mockUser.password !== password) {
        throw new Error('Invalid password')
      }
      
      if (mockUser.role !== role) {
        throw new Error('Invalid role selected')
      }
      
      // Remove password from user object
      const { password: _, ...userWithoutPassword } = mockUser
      
      setUser(userWithoutPassword)
      localStorage.setItem('caresync_user', JSON.stringify(userWithoutPassword))
      
      return { success: true, user: userWithoutPassword }
    } catch (error) {
      throw new Error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    setLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if user already exists
      if (mockUsers[userData.email]) {
        throw new Error('User already exists with this email')
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        role: userData.role,
        name: `${userData.firstName} ${userData.lastName}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        ...userData
      }
      
      // Remove password from user object
      const { password, confirmPassword, ...userWithoutPassword } = newUser
      
      // In a real app, you'd save to database
      mockUsers[userData.email] = newUser
      
      setUser(userWithoutPassword)
      localStorage.setItem('caresync_user', JSON.stringify(userWithoutPassword))
      
      return { success: true, user: userWithoutPassword }
    } catch (error) {
      throw new Error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('caresync_user')
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
