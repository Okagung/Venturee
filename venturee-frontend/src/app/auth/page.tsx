'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [loginData, setLoginData] = useState({ identifier: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', loginData);
      const { access_token, role } = res.data;
      
      localStorage.setItem('token', access_token);
      if (role === 'admin') {
        localStorage.setItem('admin_token', access_token);
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch {
      setError('Username/Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', registerData);
      setIsLogin(true);
    } catch {
      setError('Registrasi gagal, coba lagi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-600">Venturee</h1>

        <div className="flex mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-center font-semibold border-b-2 ${isLogin ? 'border-green-500 text-green-600' : 'border-gray-200 text-gray-400'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-center font-semibold border-b-2 ${!isLogin ? 'border-green-500 text-green-600' : 'border-gray-200 text-gray-400'}`}
          >
            Register
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {isLogin ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username atau Email"
              className="w-full border p-2 rounded text-gray-900 bg-white"
              value={loginData.identifier}
              onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded text-gray-900 bg-white"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full border p-2 rounded text-gray-900 bg-white"
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded text-gray-900 bg-white"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded text-gray-900 bg-white"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              {loading ? 'Loading...' : 'Register'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}