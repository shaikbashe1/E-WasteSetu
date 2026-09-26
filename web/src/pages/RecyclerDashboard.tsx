import { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle } from 'lucide-react';
import axios from 'axios';

const API_URL = "http://localhost:8000";

export default function RecyclerDashboard() {
  const [lots, setLots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLots();
  }, []);

  const fetchLots = async () => {
    try {
      const response = await axios.get(`${API_URL}/lots`);
      setLots(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching lots:", error);
      setLoading(false);
    }
  };

  const makeOffer = async (lotId: number) => {
    try {
      const offer = prompt("Enter your offer price (₹):");
      if (!offer) return;
      
      await axios.post(`${API_URL}/transactions`, {
        lot_id: lotId,
        recycler_id: 1, // Mock recycler ID
        quoted_price: parseFloat(offer)
      });
      alert("Offer submitted successfully!");
      fetchLots();
    } catch (error) {
      alert("Failed to submit offer.");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Recycler Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase">Incoming Lots</p>
              <h3 className="text-3xl font-bold mt-1">{lots.filter(l => l.status === 'POSTED' || l.status === 'DRAFT').length}</h3>
            </div>
            <Package className="text-blue-500" size={40} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-orange-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase">Pending Offers</p>
              <h3 className="text-3xl font-bold mt-1">{lots.filter(l => l.status === 'MATCHED').length}</h3>
            </div>
            <Clock className="text-orange-500" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase">Completed Handovers</p>
              <h3 className="text-3xl font-bold mt-1">{lots.filter(l => l.status === 'COMPLETED').length}</h3>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-4">Loading...</td></tr>
            ) : lots.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-4">No lots available</td></tr>
            ) : (
              lots.map(lot => (
                <tr key={lot.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{lot.lot_ref}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lot.material}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lot.weight} kg</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{lot.estimated_value_low} - ₹{lot.estimated_value_high}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lot.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {lot.status !== 'MATCHED' && lot.status !== 'COMPLETED' ? (
                      <button onClick={() => makeOffer(lot.id)} className="text-green-600 hover:text-green-900 font-semibold bg-green-50 px-3 py-1 rounded">Make Offer</button>
                    ) : (
                      <span className="text-gray-400">Offered</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}