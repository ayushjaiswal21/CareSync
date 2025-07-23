// src/components/pharmacist/PharmacistDashboard.jsx
import React from 'react'
import { 
  ClipboardDocumentListIcon, 
  CheckCircleIcon, 
  ClockIcon,
  TruckIcon
} from '@heroicons/react/24/outline'

const PharmacistDashboard = () => {
  const stats = [
    { name: 'Pending Orders', value: '12', icon: ClockIcon, color: 'text-yellow-600' },
    { name: 'Completed Today', value: '28', icon: CheckCircleIcon, color: 'text-green-600' },
    { name: 'Total Prescriptions', value: '156', icon: ClipboardDocumentListIcon, color: 'text-blue-600' },
    { name: 'Out for Delivery', value: '8', icon: TruckIcon, color: 'text-purple-600' },
  ]

  const pendingOrders = [
    {
      id: 'RX001',
      patient: 'John Doe',
      doctor: 'Dr. Smith',
      medicines: ['Metformin 500mg', 'Lisinopril 10mg'],
      priority: 'high',
      submittedAt: '2 hours ago'
    },
    {
      id: 'RX002',
      patient: 'Sarah Wilson',
      doctor: 'Dr. Johnson',
      medicines: ['Vitamin D3', 'Calcium tablets'],
      priority: 'normal',
      submittedAt: '4 hours ago'
    },
    {
      id: 'RX003',
      patient: 'Michael Brown',
      doctor: 'Dr. Davis',
      medicines: ['Ibuprofen 400mg'],
      priority: 'low',
      submittedAt: '6 hours ago'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Pharmacy Dashboard</h2>
        <p className="text-gray-600">Manage prescriptions and track orders efficiently.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Orders */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Pending Prescription Orders</h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All Orders
          </button>
        </div>

        <div className="space-y-4">
          {pendingOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {order.id}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    order.priority === 'high' ? 'bg-red-100 text-red-800' :
                    order.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.priority} priority
                  </span>
                </div>
                <span className="text-sm text-gray-500">{order.submittedAt}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Patient</p>
                  <p className="text-gray-900">{order.patient}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Prescribed by</p>
                  <p className="text-gray-900">{order.doctor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Medicines</p>
                  <p className="text-gray-900">{order.medicines.length} items</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600 mb-2">Prescribed Medicines:</p>
                <div className="space-y-1">
                  {order.medicines.map((medicine, index) => (
                    <span key={index} className="inline-block bg-medical-50 text-medical-700 px-2 py-1 rounded-md text-sm mr-2">
                      {medicine}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  Review Details
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Process Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PharmacistDashboard
