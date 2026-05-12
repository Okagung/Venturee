'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Event {
  id_event: number;
  nama_event: string;
  harga_event: number;
  kuota: number;
}

interface Transaksi {
  id_transaksi: number;
  total_harga: number;
  status: string;
  user: {
    username: string;
    email: string;
  };
}

export default function AdminPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [activeTab, setActiveTab] = useState<'events' | 'transaksi'>('events');
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({
    nama_event: '',
    deskripsi_event: '',
    harga_event: 0,
    kuota: 0,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/auth');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, transaksiRes] = await Promise.all([
        api.get('/events'),
        api.get('/admin/transaksi'),
      ]);
      setEvents(eventsRes.data);
      setTransaksi(transaksiRes.data);
    } catch {
      console.error('Gagal fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async () => {
    setMessage('');
    try {
      await api.post('/events', newEvent);
      setMessage('Event berhasil ditambahkan!');
      setNewEvent({ nama_event: '', deskripsi_event: '', harga_event: 0, kuota: 0 });
      fetchData();
    } catch {
      setMessage('Gagal menambahkan event');
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter((e) => e.id_event !== id));
    } catch {
      console.error('Gagal hapus event');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('token');
    router.push('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">Venturee - Admin Panel</h1>
        <button onClick={handleLogout} className="text-red-500 hover:text-red-600">
          Logout
        </button>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'events' ? 'bg-green-500 text-white' : 'bg-white text-gray-600'}`}
          >
            Manajemen Event
          </button>
          <button
            onClick={() => setActiveTab('transaksi')}
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'transaksi' ? 'bg-green-500 text-white' : 'bg-white text-gray-600'}`}
          >
            Monitoring Transaksi
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : activeTab === 'events' ? (
          <div>
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h2 className="font-bold text-gray-800 mb-3">Tambah Event Baru</h2>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Nama Event"
                  className="w-full border p-2 rounded text-gray-900 bg-white"
                  value={newEvent.nama_event}
                  onChange={(e) => setNewEvent({ ...newEvent, nama_event: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Deskripsi Event"
                  className="w-full border p-2 rounded text-gray-900 bg-white"
                  value={newEvent.deskripsi_event}
                  onChange={(e) => setNewEvent({ ...newEvent, deskripsi_event: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Harga Event"
                  className="w-full border p-2 rounded text-gray-900 bg-white"
                  value={newEvent.harga_event}
                  onChange={(e) => setNewEvent({ ...newEvent, harga_event: Number(e.target.value) })}
                />
                <input
                  type="number"
                  placeholder="Kuota"
                  className="w-full border p-2 rounded text-gray-900 bg-white"
                  value={newEvent.kuota}
                  onChange={(e) => setNewEvent({ ...newEvent, kuota: Number(e.target.value) })}
                />
                {message && (
                  <p className={`text-sm ${message.includes('berhasil') ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                  </p>
                )}
                <button
                  onClick={handleAddEvent}
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  Tambah Event
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id_event} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">{event.nama_event}</h3>
                    <p className="text-green-600">Rp {event.harga_event.toLocaleString('id-ID')}</p>
                    <p className="text-gray-400 text-sm">Kuota: {event.kuota}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(event.id_event)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {transaksi.map((t) => (
              <div key={t.id_transaksi} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">{t.user.username}</h3>
                    <p className="text-gray-500 text-sm">{t.user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-bold">Rp {t.total_harga.toLocaleString('id-ID')}</p>
                    <p className="text-gray-400 text-sm">{t.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}