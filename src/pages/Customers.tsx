import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Trash2, Plus, User, Mail } from 'lucide-react';

// Müşteri veri tipi
interface Customer {
  id: string;
  name: string;
  email: string;
  status: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Verileri veritabanından çekme fonksiyonu
  const fetchCustomers = async () => {
    const querySnapshot = await getDocs(collection(db, "customers"));
    const customersList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Customer[];
    setCustomers(customersList);
  };

  // Sayfa açılınca verileri çek
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Yeni Müşteri Ekleme
  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "customers"), {
        name: newName,
        email: newEmail,
        status: 'Aktif',
        createdAt: new Date()
      });
      setNewName('');
      setNewEmail('');
      fetchCustomers(); // Listeyi güncelle
    } catch (error) {
      console.error("Hata:", error);
    }
    setLoading(false);
  };

  // Müşteri Silme
  const handleDelete = async (id: string) => {
    if (window.confirm('Bu müşteriyi silmek istediğine emin misin?')) {
      await deleteDoc(doc(db, "customers", id));
      fetchCustomers(); // Listeyi güncelle
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Müşteri Yönetimi</h2>

      {/* Ekleme Formu */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <Plus size={20} className="text-blue-600" /> Yeni Müşteri Ekle
        </h3>
        <form onSubmit={handleAddCustomer} className="flex gap-4">
          <div className="flex-1 relative">
            <User className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Ad Soyad"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="email"
              placeholder="Email Adresi"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button 
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Ekleniyor...' : 'Ekle'}
          </button>
        </form>
      </div>

      {/* Müşteri Listesi */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 font-semibold text-slate-600">Ad Soyad</th>
              <th className="p-4 font-semibold text-slate-600">Email</th>
              <th className="p-4 font-semibold text-slate-600">Durum</th>
              <th className="p-4 font-semibold text-slate-600 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                <td className="p-4 font-medium text-slate-800">{customer.name}</td>
                <td className="p-4 text-slate-500">{customer.email}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                    {customer.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleDelete(customer.id)}
                    className="text-red-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-400">
                  Henüz kayıtlı müşteri yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;