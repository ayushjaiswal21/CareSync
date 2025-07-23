// src/components/patient/PatientDashboard.jsx
import React from 'react'
import { 
  HeartIcon, 
  ClockIcon, 
  DocumentTextIcon,
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline'
import MedicineReminders from './MedicineReminders'

const PatientDashboard = () => {
  const stats = [
    { name: 'Active Prescriptions', value: '3', icon: DocumentTextIcon, color: 'text-blue-600' },
    { name: 'Medicine Reminders', value: '5', icon: ClockIcon, color: 'text-green-600' },
    { name: 'Health Logs', value: '12', icon: HeartIcon, color: 'text-red-600' },
    { name: 'Messages', value: '2', icon: ChatBubbleLeftIcon, color: 'text-purple-600' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, John!</h2>
        <p className="text-gray-600">Here's your health overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MedicineReminders />
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Health Logs</h3>
          <div className="space-y-3">
            {[
              { date: 'Today', type: 'Blood Pressure', value: '120/80 mmHg', status: 'normal' },
              { date: 'Yesterday', type: 'Weight', value: '70 kg', status: 'normal' },
              { date: '2 days ago', type: 'Temperature', value: '98.6°F', status: 'normal' },
            ].map((log, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{log.type}</p>
                  <p className="text-sm text-gray-600">{log.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{log.value}</p>
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
