// src/components/patient/HealthLogs.jsx
import React, { useState } from 'react'
import { PlusIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const HealthLogs = () => {
  const [activeTab, setActiveTab] = useState('vitals')
  
  const vitalSigns = [
    { date: '2024-01-15', type: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal' },
    { date: '2024-01-15', type: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal' },
    { date: '2024-01-15', type: 'Temperature', value: '98.6', unit: '°F', status: 'normal' },
    { date: '2024-01-14', type: 'Weight', value: '70', unit: 'kg', status: 'normal' },
    { date: '2024-01-14', type: 'Blood Sugar', value: '95', unit: 'mg/dL', status: 'normal' },
  ]

  const symptoms = [
    { date: '2024-01-13', symptom: 'Headache', severity: 'mild', notes: 'After long work day' },
    { date: '2024-01-10', symptom: 'Fatigue', severity: 'moderate', notes: 'Lasted 2 days' },
    { date: '2024-01-08', symptom: 'Cough', severity: 'mild', notes: 'Dry cough, no fever' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Health Logs</h2>
        <button className="btn-primary flex items-center space-x-2">
          <PlusIcon className="h-5 w-5" />
          <span>Add Entry</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'vitals', name: 'Vital Signs', icon: ChartBarIcon },
            { id: 'symptoms', name: 'Symptoms', icon: ChartBarIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {activeTab === 'vitals' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs History</h3>
            <div className="space-y-4">
              {vitalSigns.map((vital, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{vital.type}</h4>
                      <p className="text-sm text-gray-600">{vital.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {vital.value} <span className="text-sm font-normal text-gray-600">{vital.unit}</span>
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      vital.status === 'normal' ? 'bg-green-100 text-green-800' :
                      vital.status === 'high' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vital.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'symptoms' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Symptom History</h3>
            <div className="space-y-4">
              {symptoms.map((symptom, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{symptom.symptom}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        symptom.severity === 'mild' ? 'bg-green-100 text-green-800' :
                        symptom.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {symptom.severity}
                      </span>
                      <span className="text-sm text-gray-600">{symptom.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{symptom.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HealthLogs
