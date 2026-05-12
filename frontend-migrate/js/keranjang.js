// Keranjang (Cart) Page
// Menggantikan src/app/keranjang/page.tsx

let cartItems = [];

document.addEventListener('DOMContentLoaded', () => {
  fetchKeranjang();
});

/**
 * Fetch data keranjang dari API
 */
async function fetchKeranjang() {
  const container = document.getElementById('cart-container');
  const user = getUserFromToken();

  if (!user) {
    location.href = 'auth.html';
    return;
  }

  try {
    cartItems = await api.get(`/keranjang/${user.sub}`);
    renderKeranjang();
  } catch (err) {
    console.error('Gagal fetch keranjang:', err);
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <div class="empty-state-title">Gagal memuat keranjang</div>
        <div class="empty-state-desc">Pastikan server backend sudah berjalan</div>
      </div>`;
  }
}

/**
 * Render keranjang ke DOM
 */
function renderKeranjang() {
  const container = document.getElementById('cart-container');

  if (!cartItems || cartItems.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <div class="empty-state-title">Keranjang kosong</div>
        <div class="empty-state-desc">Yuk cari event menarik untuk dibeli!</div>
      </div>`;
    return;
  }

  const totalHarga = cartItems.reduce((acc, item) => acc + item.event.harga_event, 0);

  let itemsHtml = '';
  cartItems.forEach((item) => {
    itemsHtml += `
      <div class="card cart-item">
        <div class="cart-item-info">
          <h3>${escapeHtml(item.event.nama_event)}</h3>
          <span class="cart-item-price">${formatRupiah(item.event.harga_event)}</span>
        </div>
        <button class="btn-danger" onclick="handleDeleteItem(${item.id_keranjang})" id="btn-delete-${item.id_keranjang}">Hapus</button>
      </div>`;
  });

  container.innerHTML = `
    <div class="stack" style="margin-bottom:24px;">
      ${itemsHtml}
    </div>

    <div class="card" style="animation:fadeInUp .4s ease-out;">
      <div class="cart-total-row">
        <span class="cart-total-label">Total</span>
        <span class="cart-total-value">${formatRupiah(totalHarga)}</span>
      </div>
      <div id="message-container"></div>
      <button class="btn btn-primary btn-full btn-lg" onclick="handleCheckout()" id="btn-checkout">
        Checkout
      </button>
    </div>`;
}

/**
 * Hapus item dari keranjang
 */
async function handleDeleteItem(id) {
  try {
    await api.delete(`/keranjang/${id}`);
    cartItems = cartItems.filter((item) => item.id_keranjang !== id);
    renderKeranjang();
  } catch (err) {
    console.error('Gagal hapus item:', err);
  }
}

/**
 * Checkout / buat transaksi
 */
async function handleCheckout() {
  const btn = document.getElementById('btn-checkout');
  const user = getUserFromToken();

  btn.disabled = true;
  btn.textContent = 'Loading...';

  try {
    const totalHarga = cartItems.reduce((acc, item) => acc + item.event.harga_event, 0);
    await api.post('/transaksi', {
      id_user: user.sub,
      total_harga: totalHarga,
    });
    cartItems = [];
    renderKeranjang();
    // Show success message after render
    const container = document.getElementById('cart-container');
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🎉</div>
        <div class="empty-state-title">Checkout berhasil!</div>
        <div class="empty-state-desc">Terima kasih telah membeli tiket event</div>
      </div>`;
  } catch (err) {
    showMessage('message-container', 'Checkout gagal, coba lagi', 'error');
    btn.disabled = false;
    btn.textContent = 'Checkout';
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
