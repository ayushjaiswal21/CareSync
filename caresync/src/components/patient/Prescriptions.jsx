// src/components/patient/Prescriptions.jsx
import React, { useState } from 'react'
import { EyeIcon, DownloadIcon, PrinterIcon } from '@heroicons/react/24/outline'

const Prescriptions = () => {
  const [prescriptions] = useState([
    {
      id: 'RX001',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      status: 'active',
      medicines: [
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days' },
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' }
      ],
      instructions: 'Take with meals. Monitor blood sugar levels regularly.',
      nextRefill: '2024-02-14'
    },
    {
      id: 'RX002',
      doctor: 'Dr. Michael Brown',
      date: '2024-01-10',
      status: 'completed',
      medicines: [
        { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days' }
      ],
      instructions: 'Complete the full course even if symptoms improve.',
      nextRefill: null
    },
    {
      id: 'RX003',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-01-05',
      status: 'expired',
      medicines: [
        { name: 'Vitamin D3', dosage: '1000 IU', frequency: 'Once daily', duration: '90 days' }
      ],
      instructions: 'Take with fat-containing meal for better absorption.',
      nextRefill: '2024-04-05'
    }
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDownload = (prescriptionId) => {
    // TODO: Implement PDF download
    console.log('Downloading prescription:', prescriptionId)
  }

  const handlePrint = (prescriptionId) => {
    // TODO: Implement print functionality
    console.log('Printing prescription:', prescriptionId)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Prescriptions</h2>
        <div className="flex space-x-2">
          <select className="input-field text-sm">
            <option value="all">All Prescriptions</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded">
                      {prescription.id}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(prescription.status)}`}>
                      {prescription.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    Prescribed by {prescription.doctor} on {prescription.date}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleDownload(prescription.id)}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Download PDF"
                  >
                    <DownloadIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handlePrint(prescription.id)}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Print"
                  >
                    <PrinterIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Prescribed Medicines</h3>
              
              <div className="space-y-3 mb-4">
                {prescription.medicines.map((medicine, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-medical-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{medicine.name}</h4>
                      <p className="text-sm text-gray-600">
                        {medicine.dosage} • {medicine.frequency} • {medicine.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {prescription.instructions && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Instructions</h4>
                  <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    {prescription.instructions}
                  </p>
                </div>
              )}

              {prescription.nextRefill && prescription.status === 'active' && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Next refill due:</span>
                  <span className="text-sm font-medium text-primary-600">{prescription.nextRefill}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {prescriptions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
          <p className="text-gray-600">Your prescriptions will appear here once your doctor prescribes medications.</p>
        </div>
      )}
    </div>
  )
}

export default Prescriptions
