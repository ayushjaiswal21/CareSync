// src/components/common/Header.jsx
import React from 'react'
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">CareSync</h1>
            <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
              Beta
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <BellIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            <div className="flex items-center space-x-2">
              <UserCircleIcon className="h-8 w-8 text-gray-600" />
              <div className="text-sm">
                <p className="font-medium text-gray-900">Dr. Jane Smith</p>
                <p className="text-gray-500">Doctor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
