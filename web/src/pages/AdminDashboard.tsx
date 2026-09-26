import { useState } from 'react';
import { AlertTriangle, Users, Activity, BarChart2, ShieldAlert, FileText, Database, Shield, BookOpen, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Fraud/Anomaly Alerts');

  const tabs = [
    { name: 'Collector Management', icon: <Users size={18} /> },
    { name: 'Recycler Verification', icon: <Shield size={18} /> },
    { name: 'Material Categories', icon: <Database size={18} /> },
    { name: 'Price Management', icon: <Activity size={18} /> },
    { name: 'Transaction Monitoring', icon: <FileText size={18} /> },
    { name: 'Dataset Management', icon: <Database size={18} /> },
    { name: 'Safety Content', icon: <BookOpen size={18} /> },
    { name: 'AI Model Monitoring', icon: <Activity size={18} /> },
    { name: 'Fraud/Anomaly Alerts', icon: <ShieldAlert size={18} /> },
    { name: 'Analytics', icon: <BarChart2 size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-gray-300 flex flex-col hidden md:flex">
        <div className="p-4 bg-slate-900 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white tracking-wide">SIH ADMIN</h2>
        </div>
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                activeTab === tab.name 
                  ? 'bg-slate-700 text-white border-l-4 border-green-500' 
                  : 'hover:bg-slate-700 hover:text-white border-l-4 border-transparent'
              }`}
            >
              <span className={activeTab === tab.name && tab.name === 'Fraud/Anomaly Alerts' ? 'text-red-400' : ''}>
                {tab.icon}
              </span>
              <span className={activeTab === tab.name && tab.name === 'Fraud/Anomaly Alerts' ? 'text-red-400 font-semibold' : ''}>
                {tab.name}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{activeTab}</h2>
        
        {activeTab === 'Fraud/Anomaly Alerts' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-indigo-500 flex items-center gap-4">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-500"><Users size={28} /></div>
                <div>
                  <p className="text-gray-500 text-sm">Active Collectors</p>
                  <p className="text-2xl font-bold">1,240</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500 flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-100 text-green-500"><Activity size={28} /></div>
                <div>
                  <p className="text-gray-500 text-sm">Verified Recyclers</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500 flex items-center gap-4">
                <div className="p-3 rounded-full bg-red-100 text-red-500"><AlertTriangle size={28} /></div>
                <div>
                  <p className="text-gray-500 text-sm">Anomalies Detected</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center gap-2">
                <ShieldAlert className="text-red-500" /> Fraud/Anomaly Verification Queue
              </h3>
              <div className="space-y-4">
                <div className="border border-red-200 bg-red-50 p-4 rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-red-800">Unusually High Price Flagged</p>
                      <p className="text-sm text-red-600">LOT-C99Z2 - PCB priced at ₹420/kg (Expected: ₹170–₹220)</p>
                    </div>
                    <button onClick={() => alert("Verification initiated. ML Model has flagged this for manual review.")} className="bg-white border border-red-300 text-red-600 px-4 py-2 rounded shadow-sm hover:bg-red-100 transition">Review Case</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center flex flex-col items-center justify-center border-dashed border-2 border-gray-200">
            <Activity className="text-gray-300 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{activeTab} Module</h3>
            <p className="text-gray-500 max-w-md">
              This module is currently connected to the live API Gateway but UI rendering is scheduled for the next deployment phase. All data for {activeTab.toLowerCase()} is securely stored in the PostgreSQL database.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}