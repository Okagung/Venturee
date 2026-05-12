// Auth Page - Login & Register User
// Menyambungkan ke POST /auth/login dan POST /auth/register

document.addEventListener('DOMContentLoaded', () => {
  // Jika sudah login, redirect ke home
  const token = localStorage.getItem('token');
  if (token) {
    location.href = 'index.html';
    return;
  }

  // Enter key untuk login
  document.getElementById('login-password').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLogin();
  });

  // Enter key untuk register
  document.getElementById('reg-password').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleRegister();
  });
});

/**
 * Switch antara tab Login dan Register
 */
function switchAuthTab(tab) {
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');
  const msgContainer = document.getElementById('message-container');
  msgContainer.innerHTML = '';

  if (tab === 'login') {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    formLogin.style.display = 'block';
    formRegister.style.display = 'none';
  } else {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    formRegister.style.display = 'block';
    formLogin.style.display = 'none';
  }
}

/**
 * Handle login user - POST /auth/login
 */
async function handleLogin() {
  const btn = document.getElementById('btn-login');
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    showMessage('message-container', 'Email dan password harus diisi', 'error');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Loading...';

  try {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.access_token);
    location.href = 'index.html';
  } catch (err) {
    showMessage('message-container', 'Email atau password salah', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Login';
  }
}

/**
 * Handle register user - POST /auth/register
 */
async function handleRegister() {
  const btn = document.getElementById('btn-register');
  const username = document.getElementById('reg-username').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;

  if (!username || !email || !password) {
    showMessage('message-container', 'Semua field harus diisi', 'error');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Loading...';

  try {
    await api.post('/auth/register', { username, email, password });
    showMessage('message-container', 'Registrasi berhasil! Silakan login 🎉', 'success');
    // Switch ke tab login
    switchAuthTab('login');
    document.getElementById('login-email').value = email;
  } catch (err) {
    const msg = err.data?.message || 'Registrasi gagal, coba lagi';
    showMessage('message-container', msg, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Daftar';
  }
}
