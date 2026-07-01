// ========================================
//   MONICA & RIZKI — Script
// ========================================

// ---------- FALLING PETALS ----------
const petalEmojis = ['🌸', '🌺', '💮', '🌷', '🌼', '✿'];

function createPetal() {
  const container = document.getElementById('petals');
  if (!container) return;

  const petal = document.createElement('span');
  petal.classList.add('petal');
  petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
  const duration = Math.random() * 8 + 6;
  petal.style.animationDuration = duration + 's';
  petal.style.animationDelay = Math.random() * 5 + 's';
  container.appendChild(petal);
  setTimeout(() => petal.remove(), (duration + 5) * 1000);
}

// Start petals
for (let i = 0; i < 12; i++) setTimeout(createPetal, i * 400);
setInterval(createPetal, 900);


// ---------- DAY COUNTER ----------
// ⬇️ Ubah tanggal mulai pacaran di sini (YYYY, MM-1, DD)
// Contoh: 1 Januari 2019 = new Date(2019, 0, 1)
const startDate = new Date(2019, 0, 1); // <- GANTI SESUAI TANGGAL JADIAN

function updateDayCounter() {
  const today = new Date();
  const diff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const el = document.getElementById('days');
  if (el) el.textContent = diff.toLocaleString('id-ID');
}

updateDayCounter();


// ---------- GALLERY DATA (quotes & photo paths) ----------
const photos = [
  { src: 'photos/foto1.jpg',  quote: '"Senyummu adalah alasan hariku selalu indah. 🌸"' },
  { src: 'photos/foto2.jpg',  quote: '"Di antara semua hal yang kumiliki, kamu adalah favoritku. 💛"' },
  { src: 'photos/foto3.jpg',  quote: '"Bersama kamu, bahkan hari biasa terasa luar biasa. ✨"' },
  { src: 'photos/foto4.jpg',  quote: '"Perjalanan terbaik adalah yang kulewati bersamamu. 🛤️"' },
  { src: 'photos/foto5.jpg',  quote: '"Kamu adalah tempat pulang yang selalu kunantikan. 🏠💕"' },
  { src: 'photos/foto6.jpg',  quote: '"Tawa kita adalah melodi terindah yang pernah kudengar. 🎵"' },
  { src: 'photos/foto7.jpg',  quote: '"Enam tahun dan aku masih jatuh cinta setiap harinya. 🌹"' },
  { src: 'photos/foto8.jpg',  quote: '"Kamu adalah petualangan terbaik yang Tuhan tuliskan untukku. 🌟"' },
  { src: 'photos/foto9.jpg',  quote: '"Genggaman tanganmu adalah rumah yang selalu kurindu. 🤝💗"' },
  { src: 'photos/foto10.jpg', quote: '"Bersamamu, setiap detik adalah hadiah yang berharga. ⏳🎁"' },
  { src: 'photos/foto11.jpg', quote: '"Kamu membuatku percaya bahwa cinta sejati itu nyata. 💌"' },
  { src: 'photos/foto12.jpg', quote: '"Masa depan terasa lebih cerah karena kamu ada di sana. ☀️"' },
  { src: 'photos/foto13.jpg', quote: '"Bukan hanya 6 tahun, tapi seumur hidup bersamamu. 👫"' },
  { src: 'photos/foto14.jpg', quote: '"Kamu adalah warna di setiap halaman cerita hidupku. 🎨"' },
  { src: 'photos/foto15.jpg', quote: '"Setiap perjalanan bersamamu adalah cerita yang ingin kuulang. 🗺️✨"' },
  { src: 'photos/foto16.jpg', quote: '"Monica & Rizki — Dari hari ini sampai selalu. 💍🌸"' },
];

let currentIndex = 0;


// ---------- HANDLE IMAGE ERROR ----------
function handleImgError(img) {
  img.parentElement.classList.add('no-photo');
}


// ---------- MODAL ----------
function openModal(index) {
  currentIndex = index;
  renderModal();
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function renderModal() {
  const data = photos[currentIndex];
  const img = document.getElementById('modalImg');
  const placeholder = document.getElementById('modalPlaceholder');
  const quote = document.getElementById('modalQuote');

  img.src = data.src;
  img.alt = `Foto ${currentIndex + 1}`;
  img.style.display = 'block';
  placeholder.style.display = 'none';

  img.onerror = function () {
    img.style.display = 'none';
    placeholder.style.display = 'flex';
  };

  quote.textContent = data.quote;
}

function nextPhoto() {
  currentIndex = (currentIndex + 1) % photos.length;
  renderModal();
}

function prevPhoto() {
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  renderModal();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay.classList.contains('active')) return;
  if (e.key === 'ArrowRight') nextPhoto();
  if (e.key === 'ArrowLeft')  prevPhoto();
  if (e.key === 'Escape')     closeModal();
});


// ---------- SCROLL FADE-IN ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.photo-card, .counter-card, .letter-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
