import { AlertTriangle, Users, Activity } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h2>
      
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
        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Anomaly Verification Queue</h3>
        <div className="space-y-4">
           <div className="border border-red-200 bg-red-50 p-4 rounded-md flex justify-between items-center">
              <div>
                <p className="font-semibold text-red-800">Unusually High Price Flagged</p>
                <p className="text-sm text-red-600">LOT-C99Z2 - PCB priced at ₹420/kg (Expected: ₹170–₹220)</p>
              </div>
              <button className="bg-white border border-red-300 text-red-600 px-4 py-2 rounded shadow-sm hover:bg-red-100">Review</button>
           </div>
        </div>
      </div>
    </div>
  )
}\n