// Admin Panel Page
// Menggantikan src/app/admin/page.tsx

let adminEvents = [];
let adminTransaksi = [];

document.addEventListener('DOMContentLoaded', () => {
  // Cek apakah admin sudah login
  const token = localStorage.getItem('admin_token');
  if (!token) {
    location.href = 'admin-login.html';
    return;
  }
  fetchAdminData();
});

/**
 * Fetch semua data admin (events + transaksi)
 */
async function fetchAdminData() {
  try {
    const [events, transaksi] = await Promise.all([
      api.get('/events'),
      api.get('/admin/transaksi'),
    ]);
    adminEvents = events || [];
    adminTransaksi = transaksi || [];
    renderEventsList();
    renderTransaksiList();
  } catch (err) {
    console.error('Gagal fetch data:', err);
    document.getElementById('events-list-container').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <div class="empty-state-title">Gagal memuat data</div>
        <div class="empty-state-desc">Pastikan server backend sudah berjalan</div>
      </div>`;
  }
}

/**
 * Switch tab events / transaksi
 */
function switchTab(tab) {
  const tabEvents = document.getElementById('tab-events');
  const tabTransaksi = document.getElementById('tab-transaksi');
  const panelEvents = document.getElementById('panel-events');
  const panelTransaksi = document.getElementById('panel-transaksi');

  if (tab === 'events') {
    tabEvents.classList.add('active');
    tabTransaksi.classList.remove('active');
    panelEvents.style.display = 'block';
    panelTransaksi.style.display = 'none';
  } else {
    tabTransaksi.classList.add('active');
    tabEvents.classList.remove('active');
    panelTransaksi.style.display = 'block';
    panelEvents.style.display = 'none';
  }
}

/**
 * Render daftar event admin
 */
function renderEventsList() {
  const container = document.getElementById('events-list-container');

  if (adminEvents.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📭</div>
        <div class="empty-state-title">Belum ada event</div>
        <div class="empty-state-desc">Tambahkan event baru melalui form di atas</div>
      </div>`;
    return;
  }

  let html = '<div class="stack">';
  adminEvents.forEach((event) => {
    html += `
      <div class="card">
        <div class="admin-event-row">
          <div class="admin-event-info">
            <h3>${escapeHtml(event.nama_event)}</h3>
            <div class="admin-event-meta">
              <span class="price">${formatRupiah(event.harga_event)}</span>
              <span>Kuota: ${event.kuota}</span>
            </div>
          </div>
          <button class="btn-danger" onclick="handleDeleteEvent(${event.id_event})" id="btn-del-${event.id_event}">Hapus</button>
        </div>
      </div>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

/**
 * Render daftar transaksi
 */
function renderTransaksiList() {
  const container = document.getElementById('transaksi-list-container');

  if (adminTransaksi.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📊</div>
        <div class="empty-state-title">Belum ada transaksi</div>
        <div class="empty-state-desc">Transaksi akan muncul ketika user melakukan checkout</div>
      </div>`;
    return;
  }

  let html = '<div class="stack">';
  adminTransaksi.forEach((t) => {
    const statusClass = getStatusClass(t.status);
    html += `
      <div class="card">
        <div class="transaksi-row">
          <div class="transaksi-user">
            <h3>${escapeHtml(t.user?.username || 'Unknown')}</h3>
            <p>${escapeHtml(t.user?.email || '-')}</p>
          </div>
          <div class="transaksi-detail">
            <div class="transaksi-amount">${formatRupiah(t.total_harga)}</div>
            <span class="transaksi-status ${statusClass}">${t.status}</span>
          </div>
        </div>
      </div>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

/**
 * Tambah event baru
 */
async function handleAddEvent() {
  const btn = document.getElementById('btn-add-event');
  const nama = document.getElementById('nama_event').value.trim();
  const deskripsi = document.getElementById('deskripsi_event').value.trim();
  const harga = Number(document.getElementById('harga_event').value);
  const kuota = Number(document.getElementById('kuota').value);

  if (!nama) {
    showMessage('form-message-container', 'Nama event harus diisi', 'error');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Loading...';

  try {
    await api.post('/events', {
      nama_event: nama,
      deskripsi_event: deskripsi,
      harga_event: harga,
      kuota: kuota,
    });
    showMessage('form-message-container', 'Event berhasil ditambahkan! 🎉', 'success');

    // Reset form
    document.getElementById('nama_event').value = '';
    document.getElementById('deskripsi_event').value = '';
    document.getElementById('harga_event').value = '';
    document.getElementById('kuota').value = '';

    // Refresh data
    fetchAdminData();
  } catch (err) {
    showMessage('form-message-container', 'Gagal menambahkan event', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Tambah Event';
  }
}

/**
 * Hapus event
 */
async function handleDeleteEvent(id) {
  try {
    await api.delete(`/events/${id}`);
    adminEvents = adminEvents.filter((e) => e.id_event !== id);
    renderEventsList();
  } catch (err) {
    console.error('Gagal hapus event:', err);
  }
}

/**
 * Logout admin
 */
function handleAdminLogout() {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('token');
  location.href = 'admin-login.html';
}

/**
 * CSS class untuk status transaksi
 */
function getStatusClass(status) {
  if (!status) return '';
  const s = status.toLowerCase();
  if (s === 'pending') return 'status-pending';
  if (s === 'success' || s === 'selesai') return 'status-selesai';
  if (s === 'cancelled' || s === 'batal') return 'status-batal';
  return '';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
