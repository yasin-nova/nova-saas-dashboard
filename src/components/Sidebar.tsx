import { LayoutDashboard, Users, Settings, BarChart3, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: Users, label: 'Müşteriler', path: '/dashboard/customers', active: false },
    { icon: BarChart3, label: 'Analizler', active: false },
    { icon: Settings, label: 'Ayarlar', active: false },
  ];

  // Çıkış yap
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase'den çıkış yap
      navigate('/');       // Giriş sayfasına geri gönder
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
    }
  };

  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800">
      {/* Logo Alanı */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Nova SaaS
        </h1>
      </div>

      {/* Menü Linkleri */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 cursor-pointer ${item.active
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Alt Kısım (Profil/Çıkış) */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors px-4 py-2 w-full cursor-pointer hover:bg-slate-800 rounded-lg"
        >
          <LogOut size={20} />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;