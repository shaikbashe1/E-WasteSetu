import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RecyclerDashboard from './pages/RecyclerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { Leaf } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <header className="bg-green-600 text-white p-4 shadow-md flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf size={28} />
            <h1 className="text-2xl font-bold tracking-wide">KABADIWALA</h1>
          </div>
          <nav className="flex gap-4">
            <Link to="/" className="hover:underline font-semibold">Recycler Portal</Link>
            <Link to="/admin" className="hover:underline font-semibold">Admin Panel</Link>
          </nav>
        </header>
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<RecyclerDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App\n