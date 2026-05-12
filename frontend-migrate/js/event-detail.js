// Event Detail Page
// Menggantikan src/app/events/[id]/page.tsx

document.addEventListener('DOMContentLoaded', () => {
  fetchEventDetail();
});

/**
 * Ambil ID event dari URL query parameter
 */
function getEventId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

/**
 * Fetch detail event dari API
 */
async function fetchEventDetail() {
  const container = document.getElementById('event-detail-container');
  const eventId = getEventId();

  if (!eventId) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">❌</div>
        <div class="empty-state-title">Event tidak ditemukan</div>
        <div class="empty-state-desc">ID event tidak valid</div>
      </div>`;
    return;
  }

  try {
    const event = await api.get(`/events/${eventId}`);
    renderEventDetail(event);
  } catch (err) {
    console.error('Gagal fetch event:', err);
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <div class="empty-state-title">Event tidak ditemukan</div>
        <div class="empty-state-desc">Event mungkin sudah dihapus atau tidak tersedia</div>
      </div>`;
  }
}

/**
 * Render detail event ke DOM
 */
function renderEventDetail(event) {
  const container = document.getElementById('event-detail-container');
  document.title = `${event.nama_event} - Venturee`;

  const isKuotaHabis = event.kuota === 0;
  const btnText = isKuotaHabis ? 'Kuota Habis' : 'Masukkan ke Keranjang';
  const btnDisabled = isKuotaHabis ? 'disabled' : '';

  container.innerHTML = `
    <div class="card" style="animation: fadeInUp .5s ease-out">
      <h1 class="detail-title">${escapeHtml(event.nama_event)}</h1>
      <p class="detail-desc">${escapeHtml(event.deskripsi_event || 'Tidak ada deskripsi')}</p>

      <div class="detail-meta">
        <span class="detail-price">${formatRupiah(event.harga_event)}</span>
        <span class="detail-quota">Kuota tersisa: ${event.kuota}</span>
      </div>

      <div id="message-container"></div>

      <button class="btn btn-primary btn-full btn-lg" onclick="handleAddToKeranjang(${event.id_event})" id="btn-add-cart" ${btnDisabled}>
        ${btnText}
      </button>
    </div>`;
}

/**
 * Tambahkan event ke keranjang
 */
async function handleAddToKeranjang(eventId) {
  const btn = document.getElementById('btn-add-cart');
  const user = getUserFromToken();

  if (!user) {
    location.href = 'auth.html';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Loading...';

  try {
    await api.post('/keranjang', {
      id_user: user.sub,
      id_event: eventId,
    });
    showMessage('message-container', 'Berhasil ditambahkan ke keranjang! 🎉', 'success');
  } catch (err) {
    showMessage('message-container', 'Gagal menambahkan ke keranjang', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Masukkan ke Keranjang';
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
