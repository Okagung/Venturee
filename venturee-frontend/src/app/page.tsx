'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Event {
  id_event: number;
  nama_event: string;
  deskripsi_event: string;
  harga_event: number;
  kuota: number;
}

export default function HomePage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth');
      return;
    }
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      setEvents(res.data);
    } catch {
      console.error('Gagal fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await api.get(`/events/search?keyword=${keyword}`);
      setEvents(res.data);
    } catch {
      console.error('Gagal search events');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">Venturee</h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/keranjang')}
            className="text-gray-600 hover:text-green-600"
          >
            Keranjang
          </button>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Cari event..."
            className="flex-1 border p-2 rounded text-gray-900 bg-white"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Cari
          </button>
          <button
            onClick={fetchEvents}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Reset
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada event ditemukan</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
              <div
                key={event.id_event}
                className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md"
                onClick={() => router.push(`/events/${event.id_event}`)}
              >
                <h2 className="text-lg font-semibold text-gray-800">{event.nama_event}</h2>
                <p className="text-gray-500 text-sm mt-1">{event.deskripsi_event}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-green-600 font-bold">
                    Rp {event.harga_event.toLocaleString('id-ID')}
                  </span>
                  <span className="text-gray-400 text-sm">Kuota: {event.kuota}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}