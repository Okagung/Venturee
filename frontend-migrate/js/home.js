// Home Page - Event Listing & Search
// Menggantikan src/app/auth/page.tsx

document.addEventListener('DOMContentLoaded', () => {
  fetchEvents();

  // Enter key untuk search
  document.getElementById('search-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
});

/**
 * Fetch semua events dari API
 */
async function fetchEvents() {
  const container = document.getElementById('events-container');
  container.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <span class="loading-text">Memuat event...</span>
    </div>`;

  try {
    const events = await api.get('/events');
    renderEvents(events);
  } catch (err) {
    console.error('Gagal fetch events:', err);
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <div class="empty-state-title">Gagal memuat event</div>
        <div class="empty-state-desc">Pastikan server backend sudah berjalan</div>
      </div>`;
  }
}

/**
 * Search events berdasarkan keyword
 */
async function handleSearch() {
  const keyword = document.getElementById('search-input').value.trim();
  if (!keyword) return fetchEvents();

  const container = document.getElementById('events-container');
  container.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <span class="loading-text">Mencari event...</span>
    </div>`;

  try {
    const events = await api.get(`/events/search?keyword=${encodeURIComponent(keyword)}`);
    renderEvents(events);
  } catch (err) {
    console.error('Gagal search events:', err);
  }
}

/**
 * Render daftar event ke DOM
 */
function renderEvents(events) {
  const container = document.getElementById('events-container');

  if (!events || events.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📭</div>
        <div class="empty-state-title">Tidak ada event ditemukan</div>
        <div class="empty-state-desc">Coba kata kunci lain atau reset pencarian</div>
      </div>`;
    return;
  }

  let html = '<div class="event-grid">';
  events.forEach((event) => {
    html += `
      <div class="event-card card card-interactive" onclick="location.href='event-detail.html?id=${event.id_event}'">
        <h2 class="event-card-title">${escapeHtml(event.nama_event)}</h2>
        <p class="event-card-desc">${escapeHtml(event.deskripsi_event || '')}</p>
        <div class="event-card-footer">
          <span class="event-price">${formatRupiah(event.harga_event)}</span>
          <span class="event-quota">Kuota: ${event.kuota}</span>
        </div>
      </div>`;
  });
  html += '</div>';

  container.innerHTML = html;
}

/**
 * Logout user
 */
function handleLogout() {
  localStorage.removeItem('token');
  location.href = 'auth.html';
}

/**
 * Escape HTML untuk mencegah XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
