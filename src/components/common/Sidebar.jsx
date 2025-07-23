// src/components/common/Sidebar.jsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  HomeIcon, 
  UserGroupIcon, 
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  CogIcon 
} from '@heroicons/react/24/outline'

const Sidebar = () => {
  const location = useLocation()
  
  // TODO: Make this dynamic based on user role
  const menuItems = [
    { name: 'Dashboard', href: '/patient', icon: HomeIcon },
    { name: 'Prescriptions', href: '/patient/prescriptions', icon: ClipboardDocumentListIcon },
    { name: 'Health Logs', href: '/patient/health-logs', icon: UserGroupIcon },
    { name: 'Messages', href: '/patient/messages', icon: ChatBubbleLeftRightIcon },
    { name: 'Settings', href: '/patient/settings', icon: CogIcon },
  ]

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      
      {/* Quick Stats Widget */}
      <div className="mt-8 mx-4 p-4 bg-medical-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Stats</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <p>• 3 pending reminders</p>
          <p>• 1 new prescription</p>
          <p>• Next appointment: Tomorrow</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
