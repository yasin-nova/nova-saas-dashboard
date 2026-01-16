import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sol Menü */}
      <Sidebar />

      {/* Ana İçerik Alanı */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Hoş Geldin, Yasin</h2>
          <p className="text-slate-500 mt-1">Bugünün özetine göz atalım.</p>
        </header>

        {/* İçerik Kartları (Demo) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-700">Toplam Kullanıcı</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">1,240</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-700">Aktif Aboneler</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">856</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-700">Aylık Gelir</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">₺42,500</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;