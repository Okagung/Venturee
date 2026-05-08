'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [data, setData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/admin/login', data);
      localStorage.setItem('admin_token', res.data.access_token);
      localStorage.setItem('token', res.data.access_token);
      router.push('/admin');
    } catch {
      setError('Username atau password salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2 text-green-600">Venturee</h1>
        <p className="text-center text-gray-500 mb-6">Admin Panel</p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full border p-2 rounded"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            {loading ? 'Loading...' : 'Login Admin'}
          </button>
        </div>
      </div>
    </div>
  );
}