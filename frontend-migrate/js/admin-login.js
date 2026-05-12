// Admin Login Page
// Menggantikan src/app/admin/login/page.tsx

document.addEventListener('DOMContentLoaded', () => {
  // Enter key untuk login
  document.getElementById('password').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAdminLogin();
  });
});

/**
 * Handle admin login
 */
async function handleAdminLogin() {
  const btn = document.getElementById('btn-login');
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !password) {
    showMessage('message-container', 'Username dan password harus diisi', 'error');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Loading...';

  try {
    const res = await api.post('/admin/login', { username, password });
    localStorage.setItem('admin_token', res.access_token);
    localStorage.setItem('token', res.access_token);
    location.href = 'admin.html';
  } catch (err) {
    showMessage('message-container', 'Username atau password salah', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Login Admin';
  }
}
