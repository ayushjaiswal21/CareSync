// src/components/doctor/DoctorDashboard.jsx
import React from 'react'
import { 
  UserGroupIcon, 
  ClipboardDocumentListIcon, 
  CalendarDaysIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const DoctorDashboard = () => {
  const stats = [
    { name: 'Total Patients', value: '156', icon: UserGroupIcon, color: 'text-blue-600', change: '+12%' },
    { name: 'Prescriptions Today', value: '23', icon: ClipboardDocumentListIcon, color: 'text-green-600', change: '+5%' },
    { name: 'Appointments', value: '8', icon: CalendarDaysIcon, color: 'text-purple-600', change: '0%' },
    { name: 'Consultations', value: '45', icon: ChartBarIcon, color: 'text-orange-600', change: '+18%' },
  ]

  const recentPatients = [
    { name: 'John Doe', age: 45, condition: 'Hypertension', lastVisit: '2 days ago', status: 'stable' },
    { name: 'Sarah Wilson', age: 32, condition: 'Diabetes', lastVisit: '1 week ago', status: 'monitoring' },
    { name: 'Michael Brown', age: 67, condition: 'Arthritis', lastVisit: '3 days ago', status: 'improving' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Good morning, Dr. Smith!</h2>
        <p className="text-gray-600">You have 8 appointments scheduled for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.change.includes('+') ? 'text-green-600' : 'text-gray-500'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Patients */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Patients</h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All Patients
            </button>
          </div>
          
          <div className="space-y-4">
            {recentPatients.map((patient, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium text-sm">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{patient.name}</h4>
                    <p className="text-sm text-gray-600">{patient.condition} • Age {patient.age}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{patient.lastVisit}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    patient.status === 'stable' ? 'bg-green-100 text-green-800' :
                    patient.status === 'monitoring' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {patient.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {[
              { time: '09:00 AM', patient: 'Alice Johnson', type: 'Check-up' },
              { time: '10:30 AM', patient: 'Bob Smith', type: 'Follow-up' },
              { time: '02:00 PM', patient: 'Carol Davis', type: 'Consultation' },
              { time: '03:30 PM', patient: 'David Wilson', type: 'Check-up' },
            ].map((appointment, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-primary-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{appointment.patient}</p>
                  <p className="text-sm text-gray-600">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary-600">{appointment.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            View Full Schedule
          </button>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
