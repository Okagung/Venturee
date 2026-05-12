// Venturee API Configuration
const API_URL = 'http://localhost:3000';

/**
 * Helper untuk melakukan fetch request ke backend API
 * Menggantikan axios dari versi Next.js sebelumnya
 */
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    headers: { ...defaultHeaders, ...options.headers },
    ...options,
  };

  // Jangan override headers jika sudah di-merge
  if (options.headers) {
    config.headers = { ...defaultHeaders, ...options.headers };
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = new Error(`API Error: ${response.status}`);
    error.status = response.status;
    try {
      error.data = await response.json();
    } catch (e) {
      error.data = null;
    }
    throw error;
  }

  // Handle empty response (204 No Content, etc)
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// Shortcut methods
const api = {
  get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),
  post: (endpoint, body) => apiRequest(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' }),
};

/**
 * Decode JWT token payload untuk mendapatkan user info
 */
function getUserFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
}

/**
 * Format angka ke Rupiah
 */
function formatRupiah(number) {
  return 'Rp ' + Number(number).toLocaleString('id-ID');
}

/**
 * Tampilkan pesan notifikasi
 */
function showMessage(containerId, text, type = 'success') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `<div class="message message-${type}">${text}</div>`;
  setTimeout(() => { container.innerHTML = ''; }, 4000);
}
