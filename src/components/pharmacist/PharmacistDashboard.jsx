// src/components/pharmacist/PharmacistDashboard.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
    ClipboardDocumentListIcon, 
    CheckCircleIcon, 
    ClockIcon,
    TruckIcon,
    CubeTransparentIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

const InventoryModal = ({ onClose, inventoryData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredInventory = inventoryData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
    
  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full transform scale-95 transition-transform duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Medicine Inventory</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <p className="text-gray-600 mb-4">
                    A simple placeholder for your inventory management system.
                </p>

                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search medicines..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                    <ul className="space-y-4">
                        {filteredInventory.length > 0 ? (
                            filteredInventory.map((item) => (
                                <li key={item.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-gray-900">{item.name}</p>
                                        <p className="text-sm text-gray-600">Stock: {item.stock} {item.unit}</p>
                                        <p className="text-sm text-gray-600">Expiry: {item.expiry}</p>
                                    </div>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Update
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="text-center py-10 text-gray-500">No medicines found.</li>
                        )}
                    </ul>
                </div>

                <div className="flex justify-end mt-6">
                    <button onClick={onClose} className="px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

InventoryModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    inventoryData: PropTypes.array.isRequired,
};

const PharmacistDashboard = () => {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const inventoryData = [
        { id: 1, name: 'Metformin 500mg', stock: 150, unit: 'tablets', expiry: '2026-03-15' },
        { id: 2, name: 'Lisinopril 10mg', stock: 25, unit: 'tablets', expiry: '2025-08-20' },
        { id: 3, name: 'Vitamin D3', stock: 300, unit: 'capsules', expiry: '2027-01-10' },
        { id: 4, name: 'Ibuprofen 400mg', stock: 15, unit: 'tablets', expiry: '2025-09-01' },
        { id: 5, name: 'Amoxicillin 250mg', stock: 100, unit: 'capsules', expiry: '2026-11-25' },
    ];

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
  ];

  const filteredPendingOrders = pendingOrders.filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.doctor.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans antialiased">
            <style jsx="true">{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
            `}</style>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Pharmacy Dashboard</h2>
                    <p className="text-gray-600 mt-1">Manage prescriptions and track inventory efficiently.</p>
                </div>
                {/* Button to open the inventory modal */}
                <button
                    onClick={() => setIsInventoryOpen(true)}
                    className="flex items-center space-x-2 px-5 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors"
                >
                    <CubeTransparentIcon className="h-5 w-5" />
                    <span>View Inventory</span>
                </button>
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
          <h3 className="text-xl font-semibold text-gray-900">Pending Prescription Orders ({filteredPendingOrders.length})</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View All Orders
                    </button>
                </div>

                {/* NEW: The search input field */}
                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Patient, Doctor, or Order ID..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

        <div className="space-y-4">
          {filteredPendingOrders.length > 0 ? (
                        filteredPendingOrders.map((order) => (
                            <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
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
                                            <span key={index} className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm mr-2">
                                                {medicine}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                                        Review Details
                                    </button>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Process Order
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500">No pending orders found.</div>
                    )}
                </div>
      </div>
      {isInventoryOpen && (
                <InventoryModal
                    onClose={() => setIsInventoryOpen(false)}
                    inventoryData={inventoryData}
                />
            )}
            </div>
  )
}

export default PharmacistDashboard
