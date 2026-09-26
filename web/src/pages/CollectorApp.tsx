import { useState } from 'react';
import { Camera, Upload, IndianRupee, MapPin, CheckCircle, Smartphone } from 'lucide-react';
import axios from 'axios';

const API_URL = "https://backend-psi-two-49.vercel.app";

export default function CollectorDashboard() {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState('Analyzing...');
  const [priceRange, setPriceRange] = useState('');
  const [weight, setWeight] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setImage(imgUrl);
      setStep(2);
      
      // Simulate Edge AI Classification Delay
      setTimeout(() => {
        setCategory('Mixed PCB (Printed Circuit Board)');
        setPriceRange('₹180 - ₹220 / kg');
        setStep(3);
      }, 1500);
    }
  };

  const handleCreateLot = async () => {
    if (!weight) return alert("Please enter weight");
    setStep(4); // uploading
    
    // In a real app we'd POST to backend, but we'll mock the success screen for speed
    setTimeout(() => {
      setStep(5); // Success
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden min-h-[700px] flex flex-col relative border-8 border-gray-900">
        {/* Mobile Status Bar Mock */}
        <div className="bg-gray-900 text-white text-xs px-4 py-1 flex justify-between">
          <span>9:41</span>
          <div className="flex gap-2">
            <span>LTE</span>
            <span>100%</span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-green-600 p-4 text-white shadow-md flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">KABADIWALA App</h1>
          <Smartphone size={20} />
        </div>

        <div className="p-6 flex-1 flex flex-col">
          
          {step === 1 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
              <div className="bg-green-100 p-6 rounded-full">
                <Camera className="text-green-600" size={64} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Scan E-Waste</h2>
                <p className="text-gray-500 mt-2">Take a photo of the scrap material to get instant AI pricing.</p>
              </div>
              <label className="bg-green-600 text-white w-full py-4 rounded-xl font-bold text-lg flex justify-center items-center gap-2 cursor-pointer shadow-lg hover:bg-green-700 active:scale-95 transition">
                <Camera size={24} />
                Open Camera
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-64 h-64 border-4 border-dashed border-green-500 rounded-xl relative overflow-hidden flex items-center justify-center">
                {image && <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Scrap" />}
                <div className="animate-pulse bg-white p-4 rounded-lg shadow-lg z-10 flex items-center gap-3">
                  <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-bold text-gray-800">Edge AI Analyzing...</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 flex flex-col space-y-6">
              {image && <img src={image} className="w-full h-48 object-cover rounded-xl shadow-inner" alt="Scrap" />}
              
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">AI Classification Result</p>
                <h3 className="text-xl font-bold text-gray-800">{category}</h3>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center gap-4">
                <div className="bg-green-200 p-3 rounded-full text-green-700">
                  <IndianRupee size={28} />
                </div>
                <div>
                  <p className="text-sm text-green-700 font-bold uppercase tracking-wider">Estimated Market Rate</p>
                  <p className="text-2xl font-black text-gray-800">{priceRange}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Approximate Weight (kg)</label>
                <input 
                  type="number" 
                  className="w-full border-2 border-gray-300 rounded-xl p-4 text-xl font-bold focus:border-green-500 focus:ring-0" 
                  placeholder="e.g. 12"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <button 
                onClick={handleCreateLot}
                className="mt-auto bg-green-600 text-white w-full py-4 rounded-xl font-bold text-lg flex justify-center items-center gap-2 shadow-lg hover:bg-green-700 active:scale-95 transition"
              >
                <Upload size={24} />
                Post to Recyclers
              </button>
            </div>
          )}

          {step === 4 && (
             <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-bold text-gray-700">Syncing to secure dataset...</p>
             </div>
          )}

          {step === 5 && (
             <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
               <div className="bg-green-100 p-6 rounded-full text-green-600 mb-4 animate-bounce">
                  <CheckCircle size={80} />
               </div>
               <h2 className="text-3xl font-black text-gray-800">Lot Posted!</h2>
               <p className="text-gray-500">Your E-Waste has been broadcasted to verified recyclers in your area. You will receive quotes shortly.</p>
               
               <div className="bg-gray-100 p-4 rounded-lg w-full text-left border border-gray-200 mt-6">
                 <p className="text-xs text-gray-500 uppercase font-bold">Tracking ID</p>
                 <p className="font-mono font-bold text-gray-800">LOT-T84M9-92K</p>
               </div>

               <button 
                onClick={() => { setStep(1); setImage(null); setWeight(''); }}
                className="mt-8 text-green-600 font-bold w-full py-4 rounded-xl border-2 border-green-600 hover:bg-green-50 transition"
              >
                Scan Another Item
              </button>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}
