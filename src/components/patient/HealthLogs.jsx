// src/components/patient/HealthLogs.jsx
import React, { useMemo, useState, useEffect } from 'react'
import { PlusIcon, FunnelIcon, ArrowDownTrayIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

/**
 * HealthLogs — upgraded:
 * - add / edit / delete entries (modal)
 * - filters (type, date range, search)
 * - summary cards + log-type breakdown
 * - CSV export for vitals
 * - dummy data
 *
 * No charts, no external libs.
 */

// --- Dummy initial data
const initialVitals = [
  { id: 1, date: '2024-07-10', type: 'Blood Pressure', value: '120/78', unit: 'mmHg', status: 'normal' },
  { id: 2, date: '2024-07-09', type: 'Heart Rate', value: '88', unit: 'bpm', status: 'elevated' },
  { id: 3, date: '2024-07-08', type: 'Temperature', value: '99.1', unit: '°F', status: 'normal' },
  { id: 4, date: '2024-07-06', type: 'Weight', value: '70.5', unit: 'kg', status: 'normal' },
  { id: 5, date: '2024-07-05', type: 'Blood Sugar', value: '115', unit: 'mg/dL', status: 'elevated' },
]

const initialSymptoms = [
  { id: 101, date: '2024-07-09', symptom: 'Headache', severity: 'mild', notes: 'After long meeting' },
  { id: 102, date: '2024-07-05', symptom: 'Fatigue', severity: 'moderate', notes: 'Tired in morning' },
]

// simple uid
let uid = 200
const nextId = () => ++uid

// Utilities
const parseDateKey = (d) => {
  if (!d) return null
  const dt = new Date(d)
  if (Number.isNaN(dt.getTime())) return null
  return dt.toISOString().slice(0, 10)
}

// very small parser to detect bp "120/80"
const parseBP = (s) => {
  if (!s || typeof s !== 'string') return null
  const parts = s.split('/').map(p => Number(p.trim()))
  if (parts.length === 2 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1])) {
    return { sys: parts[0], dia: parts[1] }
  }
  return null
}

// auto status detection for some vitals
const detectStatus = ({ type, value }) => {
  if (!type || value == null) return 'normal'
  const t = type.toLowerCase()
  // blood pressure
  if (t.includes('blood pressure')) {
    const bp = parseBP(String(value))
    if (!bp) return 'unknown'
    if (bp.sys >= 140 || bp.dia >= 90) return 'high'
    if (bp.sys <= 90 || bp.dia <= 60) return 'low'
    return 'normal'
  }
  // heart rate (bpm) - numeric
  if (t.includes('heart')) {
    const n = Number(String(value).replace(/[^0-9.]/g, ''))
    if (Number.isNaN(n)) return 'unknown'
    if (n > 100) return 'high'
    if (n < 50) return 'low'
    return 'normal'
  }
  // temperature (F)
  if (t.includes('temperature') || t.includes('temp')) {
    const n = Number(String(value).replace(/[^0-9.]/g, ''))
    if (Number.isNaN(n)) return 'unknown'
    if (n >= 100.4) return 'high'
    return 'normal'
  }
  // blood sugar (mg/dL) - simple thresholds
  if (t.includes('blood sugar') || t.includes('glucose')) {
    const n = Number(String(value).replace(/[^0-9.]/g, ''))
    if (Number.isNaN(n)) return 'unknown'
    if (n >= 126) return 'high'
    if (n < 70) return 'low'
    return 'normal'
  }
  // weight / generic numeric -> normal by default
  return 'normal'
}

// CSV helper
const toCSV = (rows) => {
  return rows.map(r => r.map(cell => {
    // escape double quotes by doubling them
    const s = String(cell ?? '')
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`
    }
    return s
  }).join(',')).join('\n')
}

const HealthLogs = () => {
  const [activeTab, setActiveTab] = useState('vitals') // 'vitals' or 'symptoms'
  const [vitals, setVitals] = useState(initialVitals)
  const [symptoms, setSymptoms] = useState(initialSymptoms)

  // modal state (shared add/edit)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null) // { kind: 'vital'|'symptom', id, data }
  const [form, setForm] = useState({ // generic form
    kind: 'vital',
    date: parseDateKey(new Date()),
    type: 'Heart Rate',
    value: '',
    unit: '',
    status: '',
    symptom: '',
    severity: 'mild',
    notes: '',
  })

  // filters
  const [filterType, setFilterType] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [searchText, setSearchText] = useState('')

  // derived lists based on filters/search
  const filteredVitals = useMemo(() => {
    const from = parseDateKey(dateFrom)
    const to = parseDateKey(dateTo)
    return vitals.filter(v => {
      if (filterType !== 'all' && v.type !== filterType) return false
      if (from && v.date < from) return false
      if (to && v.date > to) return false
      if (searchText) {
        const q = searchText.toLowerCase()
        if (!(v.type.toLowerCase().includes(q) || String(v.value).toLowerCase().includes(q) || (v.unit || '').toLowerCase().includes(q))) return false
      }
      return true
    }).sort((a,b)=> b.date.localeCompare(a.date))
  }, [vitals, filterType, dateFrom, dateTo, searchText])

  const filteredSymptoms = useMemo(() => {
    const from = parseDateKey(dateFrom)
    const to = parseDateKey(dateTo)
    return symptoms.filter(s => {
      if (from && s.date < from) return false
      if (to && s.date > to) return false
      if (searchText) {
        const q = searchText.toLowerCase()
        if (!(s.symptom.toLowerCase().includes(q) || (s.notes || '').toLowerCase().includes(q))) return false
      }
      return true
    }).sort((a,b)=> b.date.localeCompare(a.date))
  }, [symptoms, dateFrom, dateTo, searchText])

  // Summaries
  const summary = useMemo(() => {
    const allLogs = [...vitals, ...symptoms]
    const total = allLogs.length
    const abnormal = vitals.filter(v => v.status && v.status !== 'normal').length
    const lastLog = allLogs.length ? allLogs.reduce((a,b)=> a.date > b.date ? a : b).date : '--'
    // most common vital type
    const typeCounts = vitals.reduce((acc, v) => { acc[v.type] = (acc[v.type]||0)+1; return acc }, {})
    const mostCommonType = Object.keys(typeCounts).length ? Object.entries(typeCounts).sort((a,b)=> b[1]-a[1])[0][0] : '--'
    return { total, abnormal, lastLog, mostCommonType, typeCounts }
  }, [vitals, symptoms])

  // Helpers: open modal for add or edit
  const openAddModal = (kind = 'vital') => {
    setEditing(null)
    setForm({
      kind,
      date: parseDateKey(new Date()),
      type: kind === 'vital' ? 'Heart Rate' : '',
      value: '',
      unit: kind === 'vital' ? ( 'bpm' ) : '',
      status: '',
      symptom: '',
      severity: 'mild',
      notes: '',
    })
    setModalOpen(true)
  }

  const openEditModal = (kind, entry) => {
    setEditing({ kind, id: entry.id })
    setForm({
      kind,
      date: parseDateKey(entry.date),
      type: kind === 'vital' ? entry.type : '',
      value: kind === 'vital' ? String(entry.value) : '',
      unit: kind === 'vital' ? (entry.unit || '') : '',
      status: kind === 'vital' ? entry.status || '' : '',
      symptom: kind === 'symptom' ? entry.symptom : '',
      severity: kind === 'symptom' ? entry.severity : 'mild',
      notes: kind === 'symptom' ? (entry.notes || '') : '',
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditing(null)
  }

  // Add or save
  const handleSave = () => {
    if (form.kind === 'vital') {
      // basic validation
      if (!form.type || !form.date || !form.value) {
        alert('Please provide date, type and value for the vital sign.')
        return
      }
      const auto = detectStatus({ type: form.type, value: form.value })
      const status = form.status && form.status !== 'auto' ? form.status : auto
      if (editing) {
        setVitals(prev => prev.map(v => v.id === editing.id ? { ...v, date: form.date, type: form.type, value: form.value, unit: form.unit, status } : v))
      } else {
        const newEntry = { id: nextId(), date: form.date, type: form.type, value: form.value, unit: form.unit, status }
        setVitals(prev => [newEntry, ...prev])
      }
    } else {
      // symptom
      if (!form.symptom || !form.date) {
        alert('Please provide symptom and date.')
        return
      }
      if (editing) {
        setSymptoms(prev => prev.map(s => s.id === editing.id ? { ...s, date: form.date, symptom: form.symptom, severity: form.severity, notes: form.notes } : s))
      } else {
        const newSym = { id: nextId(), date: form.date, symptom: form.symptom, severity: form.severity, notes: form.notes }
        setSymptoms(prev => [newSym, ...prev])
      }
    }

    closeModal()
  }

  // Delete
  const handleDelete = (kind, id) => {
    if (!window.confirm('Delete this entry? This cannot be undone.')) return
    if (kind === 'vital') setVitals(prev => prev.filter(v => v.id !== id))
    else setSymptoms(prev => prev.filter(s => s.id !== id))
  }

  // CSV export only vitals (as requested)
  const exportCSV = () => {
    const rows = [['Date', 'Type', 'Value', 'Unit', 'Status'], ...vitals.map(v => [v.date, v.type, v.value, v.unit, v.status])]
    const csv = toCSV(rows)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `vitals_${new Date().toISOString().slice(0,10)}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  // available types for filter dropdown (from current vitals)
  const vitalTypes = useMemo(() => {
    const set = new Set(vitals.map(v => v.type))
    return ['all', ...Array.from(set)]
  }, [vitals])

  // small effect: when tab changes reset filters
  useEffect(()=> {
    setFilterType('all')
    setDateFrom('')
    setDateTo('')
    setSearchText('')
  }, [activeTab])

  return (
    <div className="space-y-6 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Health Logs</h2>
        <div className="flex gap-3">
          <button
            onClick={() => openAddModal(activeTab === 'vitals' ? 'vital' : 'symptom')}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Entry</span>
          </button>

          {activeTab === 'vitals' && (
            <button
              onClick={exportCSV}
              className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              Export CSV
            </button>
          )}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Total Logs</p>
          <p className="text-lg font-semibold">{summary.total}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Abnormal Vitals</p>
          <p className="text-lg font-semibold">{summary.abnormal}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Last Log Date</p>
          <p className="text-lg font-semibold">{summary.lastLog || '--'}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Top Vital Type</p>
          <p className="text-lg font-semibold">{summary.mostCommonType || '--'}</p>
        </div>
      </div>

      {/* Type breakdown (no charts) */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h4 className="font-medium mb-3">Log Type Breakdown</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(summary.typeCounts).length ? (
            Object.entries(summary.typeCounts).map(([type, count]) => (
              <div key={type} className="px-3 py-2 bg-gray-50 rounded-lg border text-sm">
                <span className="font-medium">{type}</span>
                <span className="ml-2 text-xs text-gray-500">({count})</span>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500">No vitals recorded yet.</div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('vitals')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'vitals' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Vital Signs
          </button>

          <button
            onClick={() => setActiveTab('symptoms')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'symptoms' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Symptoms
          </button>
        </nav>
      </div>

      {/* Filters row */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-gray-500" />
          {activeTab === 'vitals' ? (
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
              {vitalTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          ) : (
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
              <option value="all">All</option>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">From</label>
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="border rounded-lg px-2 py-2 text-sm" />
          <label className="text-sm text-gray-500">To</label>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="border rounded-lg px-2 py-2 text-sm" />
        </div>

        <div className="flex items-center ml-auto">
          <input type="search" placeholder="Search..." value={searchText} onChange={e => setSearchText(e.target.value)} className="border rounded-lg px-3 py-2 text-sm w-full md:w-64" />
        </div>
      </div>

      {/* Content container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {activeTab === 'vitals' && (
          <div className="p-6 space-y-4">
            {filteredVitals.length === 0 && <div className="text-center text-gray-500 py-8">No vitals match your filters.</div>}
            {filteredVitals.map((v) => (
              <div key={v.id} className={`flex items-center justify-between p-4 rounded-lg ${v.status === 'high' ? 'bg-red-50' : v.status === 'low' ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                <div>
                  <h4 className="font-medium text-gray-900">{v.type}</h4>
                  <p className="text-sm text-gray-500">{v.date}</p>
                </div>

                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">{v.value} <span className="text-sm text-gray-600">{v.unit}</span></p>
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      v.status === 'normal' ? 'bg-green-100 text-green-800' :
                      v.status === 'high' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>{v.status}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button title="Edit" onClick={() => openEditModal('vital', v)} className="p-2 rounded-lg hover:bg-white/50">
                      <PencilSquareIcon className="h-5 w-5 text-gray-600" />
                    </button>
                    <button title="Delete" onClick={() => handleDelete('vital', v.id)} className="p-2 rounded-lg hover:bg-white/50">
                      <TrashIcon className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'symptoms' && (
          <div className="p-6 space-y-4">
            {filteredSymptoms.length === 0 && <div className="text-center text-gray-500 py-8">No symptoms match your filters.</div>}
            {filteredSymptoms.map(s => (
              <div key={s.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{s.symptom}</h4>
                    <p className="text-sm text-gray-500">{s.date}</p>
                    <p className="text-sm mt-2">{s.notes}</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      s.severity === 'mild' ? 'bg-green-100 text-green-800' :
                      s.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>{s.severity}</span>
                    <div className="flex items-center gap-2">
                      <button title="Edit" onClick={() => openEditModal('symptom', s)} className="p-2 rounded-lg hover:bg-white/50">
                        <PencilSquareIcon className="h-5 w-5 text-gray-600" />
                      </button>
                      <button title="Delete" onClick={() => handleDelete('symptom', s.id)} className="p-2 rounded-lg hover:bg-white/50">
                        <TrashIcon className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal (Add / Edit) */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editing ? 'Edit Entry' : 'Add New Entry'}</h3>
              <button onClick={closeModal} className="text-gray-500">Close</button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex flex-col">
                  <span className="text-sm text-gray-600">Date</span>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))} className="border rounded-lg px-3 py-2" />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm text-gray-600">Kind</span>
                  <select value={form.kind} onChange={e => setForm(f => ({...f, kind: e.target.value}))} className="border rounded-lg px-3 py-2">
                    <option value="vital">Vital</option>
                    <option value="symptom">Symptom</option>
                  </select>
                </label>
              </div>

              {form.kind === 'vital' ? (
                <>
                  <label className="flex flex-col">
                    <span className="text-sm text-gray-600">Type</span>
                    <input value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))} className="border rounded-lg px-3 py-2" />
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className="flex flex-col">
                      <span className="text-sm text-gray-600">Value</span>
                      <input value={form.value} onChange={e => setForm(f => ({...f, value: e.target.value}))} className="border rounded-lg px-3 py-2" placeholder="e.g. 120/80 or 72" />
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm text-gray-600">Unit</span>
                      <input value={form.unit} onChange={e => setForm(f => ({...f, unit: e.target.value}))} className="border rounded-lg px-3 py-2" placeholder="e.g. mmHg, bpm" />
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm text-gray-600">Status</span>
                      <select value={form.status || 'auto'} onChange={e => setForm(f => ({...f, status: e.target.value}))} className="border rounded-lg px-3 py-2">
                        <option value="auto">Auto detect</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="low">Low</option>
                      </select>
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <label className="flex flex-col">
                    <span className="text-sm text-gray-600">Symptom</span>
                    <input value={form.symptom} onChange={e => setForm(f => ({...f, symptom: e.target.value}))} className="border rounded-lg px-3 py-2" placeholder="e.g. Headache" />
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex flex-col">
                      <span className="text-sm text-gray-600">Severity</span>
                      <select value={form.severity} onChange={e => setForm(f => ({...f, severity: e.target.value}))} className="border rounded-lg px-3 py-2">
                        <option value="mild">Mild</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe</option>
                      </select>
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm text-gray-600">Notes</span>
                      <input value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} className="border rounded-lg px-3 py-2" placeholder="Short notes" />
                    </label>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 mt-3">
                <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg">{editing ? 'Save changes' : 'Add entry'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default HealthLogs
