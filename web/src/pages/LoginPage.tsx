import { useState } from 'react';

export default function LoginPage() {
  const [role, setRole] = useState('recycler');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'admin') window.location.href = '/admin';
    if (role === 'recycler') window.location.href = '/dashboard';
    if (role === 'collector') window.location.href = '/collector';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-green-600 mb-4">
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Welcome to E-WasteSetu
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Digital Bridge for Informal E-Waste Collectors
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Role</label>
              <select 
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md border-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="collector">Informal Collector (Mobile App Preview)</option>
                <option value="recycler">Authorized Recycler</option>
                <option value="admin">System Administrator</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number / Email
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  defaultValue="demo_user_123"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password / OTP
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  defaultValue="password123"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign in to Platform
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
