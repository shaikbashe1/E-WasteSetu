import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RecyclerDashboard from './pages/RecyclerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import CollectorApp from './pages/CollectorApp';
import { Leaf } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Unauthenticated / Mobile Mock */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/collector" element={<CollectorApp />} />

          {/* Web Portals */}
          <Route path="/dashboard" element={
            <>
              <header className="bg-green-600 text-white p-4 shadow-md flex justify-between items-center z-10 relative">
                <div className="flex items-center gap-2">
                  <Leaf size={28} />
                  <h1 className="text-2xl font-bold tracking-wide">KABADIWALA</h1>
                </div>
                <nav className="flex gap-4">
                  <Link to="/dashboard" className="hover:underline font-semibold">Recycler Portal</Link>
                  <Link to="/admin" className="hover:underline font-semibold">Admin Panel</Link>
                  <Link to="/login" className="hover:underline font-semibold text-green-200">Logout</Link>
                </nav>
              </header>
              <main className="flex-1 p-6 bg-gray-50"><RecyclerDashboard /></main>
            </>
          } />

          <Route path="/admin" element={
            <>
              <header className="bg-green-600 text-white p-4 shadow-md flex justify-between items-center z-10 relative">
                <div className="flex items-center gap-2">
                  <Leaf size={28} />
                  <h1 className="text-2xl font-bold tracking-wide">KABADIWALA</h1>
                </div>
                <nav className="flex gap-4">
                  <Link to="/dashboard" className="hover:underline font-semibold">Recycler Portal</Link>
                  <Link to="/admin" className="hover:underline font-semibold">Admin Panel</Link>
                  <Link to="/login" className="hover:underline font-semibold text-green-200">Logout</Link>
                </nav>
              </header>
              <main className="flex-1 bg-gray-50"><AdminDashboard /></main>
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App