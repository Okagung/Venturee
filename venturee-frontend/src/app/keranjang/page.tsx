'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface KeranjangItem {
  id_keranjang: number;
  id_user: number;
  id_event: number;
  status: string;
  event: {
    nama_event: string;
    harga_event: number;
  };
}

export default function KeranjangPage() {
  const router = useRouter();
  const [items, setItems] = useState<KeranjangItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchKeranjang();
  }, []);

  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  };

  const fetchKeranjang = async () => {
    try {
      const userId = getUserId();
      if (!userId) {
        router.push('/auth');
        return;
      }
      const res = await api.get(`/keranjang/${userId}`);
      setItems(res.data);
    } catch {
      console.error('Gagal fetch keranjang');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/keranjang/${id}`);
      setItems(items.filter((item) => item.id_keranjang !== id));
    } catch {
      console.error('Gagal hapus item');
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setMessage('');
    try {
      const userId = getUserId();
      const totalHarga = items.reduce((acc, item) => acc + item.event.harga_event, 0);
      await api.post('/transaksi', {
        id_user: userId,
        total_harga: totalHarga,
      });
      setMessage('Checkout berhasil!');
      setItems([]);
    } catch {
      setMessage('Checkout gagal, coba lagi');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const totalHarga = items.reduce((acc, item) => acc + item.event.harga_event, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1
          className="text-xl font-bold text-green-600 cursor-pointer"
          onClick={() => router.push('/')}
        >
          Venturee
        </h1>
        <button
          onClick={() => router.push('/')}
          className="text-gray-600 hover:text-green-600"
        >
          Kembali
        </button>
      </nav>

      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Keranjang Saya</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500">Keranjang kosong</p>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id_keranjang} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.event.nama_event}</h3>
                    <p className="text-green-600">Rp {item.event.harga_event.toLocaleString('id-ID')}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id_keranjang)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="text-xl font-bold text-green-600">
                  Rp {totalHarga.toLocaleString('id-ID')}
                </span>
              </div>

              {message && (
                <p className={`text-sm mb-3 ${message.includes('berhasil') ? 'text-green-500' : 'text-red-500'}`}>
                  {message}
                </p>
              )}

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 disabled:bg-gray-300"
              >
                {checkoutLoading ? 'Loading...' : 'Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}