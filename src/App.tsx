import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Customers from './pages/Customers';

// Layout: Sidebar solda sabit, içerik (Outlet) değişiyor
const DashboardLayout = () => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-1 p-8 overflow-y-auto">
      <Outlet />
    </main>
  </div>
);

// Özet Sayfası (Dashboard Home)
const DashboardHome = () => (
  <div>
    <header className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800">Hoş Geldin, Yasin</h2>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-700">Toplam Müşteri</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">--</p>
        <Link to="/dashboard/customers" className="text-sm text-blue-500 hover:underline mt-2 block">Yönet</Link>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-700">Sistem Durumu</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">Aktif</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Dashboard Rotası ve Alt Sayfaları */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="customers" element={<Customers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;