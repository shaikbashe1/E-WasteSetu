import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import RecyclerDashboard from './pages/RecyclerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import CollectorApp from './pages/CollectorApp';
import { Leaf } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const { user, loading, role: apiRole } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading session...</div>;
  
  if (!user) return <Navigate to="/login" replace />;
  
  const currentRole = localStorage.getItem('demo_override_role') || apiRole;

  if (allowedRoles && currentRole && !allowedRoles.includes(currentRole)) {
    return <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
      <p>Your assigned role "{currentRole}" is not authorized for this page.</p>
    </div>;
  }
  
  return <>{children}</>;
}

function GlobalHeader() {
  const { signOut, role, user } = useAuth();
  
  const switchRoleForDemo = (newRole: string) => {
    // A hacky way to force the role for the hackathon demo since we removed Postgres
    // In production this would update Firestore/Postgres
    localStorage.setItem('demo_override_role', newRole);
    window.location.reload();
  };

  const currentRole = localStorage.getItem('demo_override_role') || role;

  return (
    <header className="bg-green-600 text-white p-4 shadow-md flex justify-between items-center z-10 relative">
      <div className="flex items-center gap-2">
        <Leaf size={28} />
        <h1 className="text-2xl font-bold tracking-wide">KABADIWALA</h1>
      </div>
      <nav className="flex gap-4 items-center text-sm">
        {user && (
          <select 
            className="bg-green-700 text-white border border-green-500 rounded px-2 py-1 outline-none"
            value={currentRole || 'collector'}
            onChange={(e) => switchRoleForDemo(e.target.value)}
          >
            <option value="collector">Collector View</option>
            <option value="recycler">Recycler View</option>
            <option value="admin">Admin View</option>
          </select>
        )}
        <button onClick={signOut} className="hover:underline font-semibold text-green-200">Logout</button>
      </nav>
    </header>
  );
}

function RouteSwitcher() {
  const { user, role: apiRole, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  
  const currentRole = localStorage.getItem('demo_override_role') || apiRole;

  if (currentRole === 'admin') return <Navigate to="/admin" replace />;
  if (currentRole === 'recycler') return <Navigate to="/dashboard" replace />;
  if (currentRole === 'collector') return <Navigate to="/collector" replace />;
  
  return <div className="p-8 text-center">Your account is awaiting role assignment.</div>;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<RouteSwitcher />} />
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/collector" element={
              <ProtectedRoute allowedRoles={['collector']}>
                <GlobalHeader />
                <CollectorApp />
              </ProtectedRoute>
            } />

            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['recycler']}>
                <GlobalHeader />
                <main className="flex-1 p-6 bg-gray-50"><RecyclerDashboard /></main>
              </ProtectedRoute>
            } />

            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <GlobalHeader />
                <main className="flex-1 bg-gray-50"><AdminDashboard /></main>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;