'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/api';

interface Event {
  id_event: number;
  nama_event: string;
  deskripsi_event: string;
  harga_event: number;
  kuota: number;
}

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${params.id}`);
      setEvent(res.data);
    } catch {
      console.error('Gagal fetch event');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToKeranjang = async () => {
    setAdding(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth');
        return;
      }
      const payload = JSON.parse(atob(token.split('.')[1]));
      await api.post('/keranjang', {
        id_user: payload.sub,
        id_event: event?.id_event,
      });
      setMessage('Berhasil ditambahkan ke keranjang!');
    } catch {
      setMessage('Gagal menambahkan ke keranjang');
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!event) return <p className="text-center mt-10">Event tidak ditemukan</p>;

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
          onClick={() => router.push('/keranjang')}
          className="text-gray-600 hover:text-green-600"
        >
          Keranjang
        </button>
      </nav>

      <div className="max-w-2xl mx-auto p-6">
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-1"
        >
          ← Kembali
        </button>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.nama_event}</h2>
          <p className="text-gray-500 mb-4">{event.deskripsi_event}</p>

          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl font-bold text-green-600">
              Rp {event.harga_event.toLocaleString('id-ID')}
            </span>
            <span className="text-gray-400">Kuota tersisa: {event.kuota}</span>
          </div>

          {message && (
            <p className={`text-sm mb-4 ${message.includes('Berhasil') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          <button
            onClick={handleAddToKeranjang}
            disabled={adding || event.kuota === 0}
            className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 disabled:bg-gray-300"
          >
            {adding ? 'Loading...' : event.kuota === 0 ? 'Kuota Habis' : 'Masukkan ke Keranjang'}
          </button>
        </div>
      </div>
    </div>
  );
}