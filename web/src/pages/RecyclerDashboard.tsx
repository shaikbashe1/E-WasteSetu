import { Package, Clock, CheckCircle } from 'lucide-react';

export default function RecyclerDashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Recycler Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase">Incoming Lots</p>
              <h3 className="text-3xl font-bold mt-1">12</h3>
            </div>
            <Package className="text-blue-500" size={40} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-orange-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase">Pending Offers</p>
              <h3 className="text-3xl font-bold mt-1">5</h3>
            </div>
            <Clock className="text-orange-500" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase">Completed Handovers</p>
              <h3 className="text-3xl font-bold mt-1">104</h3>
            </div>
            <CheckCircle className="text-green-500" size={40} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Lots in Your Area</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lot ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">LOT-A7F29</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PCB</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 kg</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button className="text-green-600 hover:text-green-900 font-semibold bg-green-50 px-3 py-1 rounded">Make Offer</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">LOT-B32X1</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">CRT</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25 kg</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button className="text-green-600 hover:text-green-900 font-semibold bg-green-50 px-3 py-1 rounded">Make Offer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}\n