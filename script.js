// ========================================
//   MONICA & RIZKI — script.js v2
// ========================================

// ───────── DATA FOTO ─────────
const photos = [
  { src: 'photos/foto1.jpg',  caption: 'teman SD cinta monyet 🥺',                                    quote: '"Siapa sangka teman kecil jadi cinta selamanya."' },
  { src: 'photos/foto2.jpg',  caption: 'sebelum jadian jadi bocil epep dulu 😂',                      quote: '"Fase awkward yang sekarang jadi cerita lucu."' },
  { src: 'photos/foto3.jpg',  caption: 'masuk SMA pas awal covid, canggung bgt kita oi 😅',           quote: '"Pandemi datang, tapi perasaan kita malah makin kuat."' },
  { src: 'photos/foto4.jpg',  caption: 'ngedate ala anak sekolahan 🏫💕',                             quote: '"Sederhana tapi berasa paling bahagia."' },
  { src: 'photos/foto5.jpg',  caption: 'ppp mau kondangan? 😄👔',                                     quote: '"Outfit matching tanpa janjian, emang udah jodoh."' },
  { src: 'photos/foto6.jpg',  caption: 'banyak foto SMA yak, adanya pas pepisahan SMA doang 🎓',      quote: '"Babak SMA selesai, tapi cerita kita baru dimulai."' },
  { src: 'photos/foto7.jpg',  caption: 'ke Gacoan pertama kali, aku UTBK dia udah lulus SNBP coy 🔥',quote: '"Rayain pencapaian bareng, itulah kita."' },
  { src: 'photos/foto8.jpg',  caption: 'rencanain satu kampus bareng malah LDR hikss 😭',              quote: '"Rencananya beda, tapi hatinya tetap satu."' },
  { src: 'photos/foto9.jpg',  caption: 'LDR dimulai, mari kita mulai perang ini 💪',                  quote: '"Jarak cuma angka, rasa kita yang menentukan."' },
  { src: 'photos/foto10.jpg', caption: 'ketemunya libur semester aja, hiks 🗓️😢',                    quote: '"Tiap pertemuan jadi semakin berharga."' },
  { src: 'photos/foto11.jpg', caption: 'ini juga foto pas libur semester 📅',                         quote: '"Setiap libur adalah hadiah yang paling ditunggu."' },
  { src: 'photos/foto12.jpg', caption: 'LDR, VC-an mulu 📱💬',                                        quote: '"Layar HP jadi jendela setiap harinya."' },
  { src: 'photos/foto13.jpg', caption: 'ngide datengin ke Lampung 🚌✨',                              quote: '"Surprise terbaik: kamu tiba-tiba ada di depan pintu."' },
  { src: 'photos/foto14.jpg', caption: 'Bukit Aslan 🏔️🌿',                                           quote: '"Pemandangan indah jadi lebih indah karena kamu ada."' },
  { src: 'photos/foto15.jpg', caption: 'makan sushi mengakhiri tahun 2025 🍣🎉',                      quote: '"Tutup tahun dengan orang tersayang, sempurna."' },
  { src: 'photos/foto16.jpg', caption: 'masih dengan aku, kamu, dan Lampung 🌴💕',                    quote: '"Lampung jadi saksi bisu cerita kita."' },
  { src: 'photos/foto17.jpg', caption: 'hunting makanan enak di Lampung yeuyy 🍜😋',                 quote: '"Perut kenyang, hati lebih kenyang lagi."' },
  { src: 'photos/foto18.jpg', caption: 'mancing edition 🎣😄',                                        quote: '"Nunggu ikan bareng itu ternyata seru juga."' },
  { src: 'photos/foto19.jpg', caption: 'lucukk 🥰',                                                   quote: '"Foto random yang jadi favorit."' },
  { src: 'photos/foto20.jpg', caption: 'tiba-tiba di Jakarta nih 🌆',                                 quote: '"Kota manapun jadi seru kalau bareng kamu."' },
];

// ───────── PETALS ─────────
const petalEmojis = ['🌸','🌺','💮','🌷','🌼'];
function createPetal() {
  const c = document.getElementById('petals');
  if (!c) return;
  const p = document.createElement('span');
  p.classList.add('petal');
  p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  p.style.left = Math.random() * 100 + 'vw';
  p.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
  const d = Math.random() * 8 + 6;
  p.style.animationDuration = d + 's';
  p.style.animationDelay = Math.random() * 4 + 's';
  c.appendChild(p);
  setTimeout(() => p.remove(), (d + 5) * 1000);
}
for (let i = 0; i < 12; i++) setTimeout(createPetal, i * 400);
setInterval(createPetal, 1000);

// ───────── DAY COUNTER ─────────
// Ganti tanggal jadian di sini (tahun, bulan-1, tanggal)
const startDate = new Date(2020, 6, 30); // 30 Juli 2020

function updateCounter() {
  const today = new Date();
  const diffMs = today - startDate;
  const days  = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const years = (diffMs / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);
  const dEl = document.getElementById('days');
  const yEl = document.getElementById('years');
  if (dEl) dEl.textContent = days.toLocaleString('id-ID');
  if (yEl) yEl.textContent = years;
}
updateCounter();

// ───────── SLIDESHOW ─────────
let currentSlide = 0;
const total = photos.length;

function buildThumbs() {
  const strip = document.getElementById('thumbStrip');
  const dots  = document.getElementById('slideDots');
  if (!strip || !dots) return;
  photos.forEach((p, i) => {
    // thumb
    const t = document.createElement('div');
    t.className = 'thumb' + (i === 0 ? ' active' : '');
    t.onclick = () => goToSlide(i);
    const img = document.createElement('img');
    img.src = p.src;
    img.onerror = () => {
      img.style.display = 'none';
      const n = document.createElement('div');
      n.className = 'thumb-num';
      n.textContent = String(i + 1).padStart(2, '0');
      t.appendChild(n);
    };
    t.appendChild(img);
    strip.appendChild(t);
    // dot
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Foto ' + (i+1));
    d.onclick = () => goToSlide(i);
    dots.appendChild(d);
  });
}

function goToSlide(index) {
  currentSlide = (index + total) % total;
  const track = document.getElementById('slideshowTrack');
  if (track) track.style.transform = `translateX(-${currentSlide * 100}%)`;
  // update dots
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  // update thumbs
  const thumbs = document.querySelectorAll('.thumb');
  thumbs.forEach((t, i) => t.classList.toggle('active', i === currentSlide));
  // scroll thumb into view
  if (thumbs[currentSlide]) thumbs[currentSlide].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function changeSlide(dir) { goToSlide(currentSlide + dir); }

// Click on slide image → open modal
document.addEventListener('DOMContentLoaded', () => {
  buildThumbs();
  document.querySelectorAll('.slide-img-wrap').forEach((wrap, i) => {
    wrap.addEventListener('click', () => openModal(i));
  });
  // Swipe support
  const track = document.getElementById('slideshowTrack');
  if (track) {
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) changeSlide(diff > 0 ? 1 : -1);
    });
  }
  initGame();
});

// Keyboard arrows
document.addEventListener('keydown', e => {
  const modal = document.getElementById('modalOverlay');
  if (modal && modal.classList.contains('active')) {
    if (e.key === 'ArrowRight') modalNext();
    if (e.key === 'ArrowLeft')  modalPrev();
    if (e.key === 'Escape')     closeModal();
  } else {
    if (e.key === 'ArrowRight') changeSlide(1);
    if (e.key === 'ArrowLeft')  changeSlide(-1);
  }
});

// ───────── IMAGE ERROR HANDLER ─────────
function handleImgError(img) {
  img.parentElement.classList.add('no-photo');
}

// ───────── MODAL ─────────
let modalIndex = 0;

function openModal(index) {
  modalIndex = index;
  renderModal();
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}
function renderModal() {
  const d = photos[modalIndex];
  const img = document.getElementById('modalImg');
  const ph  = document.getElementById('modalPlaceholder');
  img.src = d.src;
  img.style.display = 'block';
  ph.style.display  = 'none';
  img.onerror = () => { img.style.display = 'none'; ph.style.display = 'flex'; };
  document.getElementById('modalCaption').textContent = d.caption;
  document.getElementById('modalQuote').textContent   = d.quote;
}
function modalNext() { modalIndex = (modalIndex + 1) % total; renderModal(); }
function modalPrev() { modalIndex = (modalIndex - 1 + total) % total; renderModal(); }

// ───────── MINI GAME ─────────
const questions = [
  {
    q: '👀 gimana awal cerita mon sama ki?',
    opts: ['ketemu di mall', 'temen SD cinta monyet', 'kenalan online', 'dikenalain temen'],
    ans: 1,
    feedback: { right: '✅ bener! dari SD emang udah ada chemistry-nya 🥺', wrong: '❌ salah, mereka temen SD yang kena cinta monyet lho!' }
  },
  {
    q: '😭 pas masuk kuliah, apa yang terjadi?',
    opts: ['satu kampus', 'LDR beda kota', 'putus dulu', 'nikah duluan'],
    ans: 1,
    feedback: { right: '✅ yep, niat satu kampus malah LDR 😭', wrong: '❌ bukan, LDR beda kota dong, dramatis abis!' }
  },
  {
    q: '🍜 abis Rizki surprise dateng, ngapain dulu?',
    opts: ['nonton bioskop', 'mancing', 'hunting makan enak', 'foto-foto dulu'],
    ans: 2,
    feedback: { right: '✅ yep, makan dulu yang penting 🍜', wrong: '❌ hunting makan enak lah, prioritas!' }
  },
  {
    q: '🍣 mereka lakuin apa buat nutup tahun 2025?',
    opts: ['makan sushi bareng', 'naik gunung', 'anniversary fancy', 'konser'],
    ans: 0,
    feedback: { right: '✅ sushi untuk nutup 2025, chill banget 🎉', wrong: '❌ makan sushi dong buat nutup tahun 2025!' }
  },
  {
    q: '🔥 pertama kali makan bareng setelah lulus SMA, dimana?',
    opts: ['KFC', 'Gacoan', 'McD', 'warteg'],
    ans: 1,
    feedback: { right: '✅ Gacoan! sambil rayain dia lulus SNBP duluan 🔥', wrong: '❌ Gacoan dong! sambil baper dia lulus duluan 😭' }
  }
];

let qIndex = 0;
let score  = 0;
let answered = false;

function initGame() {
  qIndex = 0; score = 0; answered = false;
  renderQuestion();
}

function renderQuestion() {
  const q = questions[qIndex];
  answered = false;
  document.getElementById('qNum').textContent = `soal ${qIndex + 1} / ${questions.length}`;
  document.getElementById('gameQuestion').textContent = q.q;
  document.getElementById('gameFeedback').textContent = '';
  document.getElementById('btnNextQ').style.display = 'none';
  document.getElementById('gameResult').style.display = 'none';
  const fill = (((qIndex) / questions.length) * 100);
  document.getElementById('progressFill').style.width = fill + '%';

  const optsEl = document.getElementById('gameOptions');
  optsEl.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'game-opt';
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
    optsEl.appendChild(btn);
  });
}

function checkAnswer(chosen) {
  if (answered) return;
  answered = true;
  const q = questions[qIndex];
  const btns = document.querySelectorAll('.game-opt');
  btns.forEach(b => b.disabled = true);
  if (chosen === q.ans) {
    score++;
    btns[chosen].classList.add('correct');
    document.getElementById('gameFeedback').textContent = q.feedback.right;
    document.getElementById('gameFeedback').style.color = '#2d7a57';
  } else {
    btns[chosen].classList.add('wrong');
    btns[q.ans].classList.add('correct');
    document.getElementById('gameFeedback').textContent = q.feedback.wrong;
    document.getElementById('gameFeedback').style.color = '#a05050';
  }
  if (qIndex < questions.length - 1) {
    document.getElementById('btnNextQ').style.display = 'block';
  } else {
    setTimeout(showResult, 1200);
  }
}

function nextQuestion() {
  qIndex++;
  renderQuestion();
}

function showResult() {
  document.getElementById('progressFill').style.width = '100%';
  document.getElementById('gameOptions').innerHTML = '';
  document.getElementById('gameFeedback').textContent = '';
  document.getElementById('btnNextQ').style.display = 'none';
  document.getElementById('qNum').textContent = 'selesai! 🎉';
  document.getElementById('gameQuestion').textContent = '';

  const resultEl = document.getElementById('gameResult');
  resultEl.style.display = 'block';

  let emoji, title, msg;
  if (score === 5) {
    emoji = '🌸'; title = 'tau banget sih!';
    msg = `${score}/5 bener semua, literally hapal cerita kita luar dalem 💕`;
  } else if (score >= 3) {
    emoji = '💕'; title = 'lumayan tau!';
    msg = `${score}/5, masih ada yang kelewat nih, baca lagi dari atas 😄`;
  } else {
    emoji = '😭'; title = 'kamu siapa?';
    msg = `${score}/5 doang, ini orang lain apa gimana 💀 scroll lagi dari atas dong!`;
  }

  resultEl.innerHTML = `
    <span class="result-emoji">${emoji}</span>
    <div class="result-title">${title}</div>
    <div class="result-msg">${msg}</div>
    <button class="btn-restart" onclick="initGame()">main lagi 🔄</button>
  `;
}

// ───────── GAME TABS ─────────
function switchGame(tab) {
  document.querySelectorAll('.game-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.game-panel').forEach(p => p.style.display = 'none');
  if (tab === 'quiz') {
    document.querySelectorAll('.game-tab')[0].classList.add('active');
    document.getElementById('panelQuiz').style.display = 'block';
  } else {
    document.querySelectorAll('.game-tab')[1].classList.add('active');
    document.getElementById('panelFlip').style.display = 'block';
  }
}

// ───────── FLIP CARD GAME ─────────
// Emoji pairs seputar cerita Monica & Rizki
const flipEmojis = [
  '🌸','💕','🎓','📱','✈️','🍣',
  '🏔️','🎣','🌴','🍜','🥺','💌'
];

let flipState = {
  flipped: [], matched: 0, moves: 0,
  lock: false, timer: null, seconds: 0, total: 0
};
let currentFlipSize = 6;

function showFlipIntro() {
  document.getElementById('flipIntro').style.display = 'block';
  document.getElementById('flipGame').style.display = 'none';
  clearInterval(flipState.timer);
}

function startFlip(pairs) {
  currentFlipSize = pairs;
  clearInterval(flipState.timer);

  // pick emojis
  const pool = flipEmojis.slice(0, pairs);
  const cards = [...pool, ...pool].sort(() => Math.random() - 0.5);

  flipState = { flipped: [], matched: 0, moves: 0, lock: false, timer: null, seconds: 0, total: pairs };

  document.getElementById('flipIntro').style.display = 'none';
  document.getElementById('flipGame').style.display = 'block';
  document.getElementById('flipResult').style.display = 'none';
  document.getElementById('flipMoves').textContent = '0';
  document.getElementById('flipMatched').textContent = '0';
  document.getElementById('flipTotal').textContent = pairs;
  document.getElementById('flipTimer').textContent = '⏱ 0s';

  const grid = document.getElementById('flipGrid');
  grid.innerHTML = '';
  grid.className = `flip-grid grid-${pairs}`;

  cards.forEach((emoji, i) => {
    const card = document.createElement('div');
    card.className = 'flip-card';
    card.dataset.emoji = emoji;
    card.dataset.index = i;
    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-front">🌸</div>
        <div class="flip-back">${emoji}</div>
      </div>`;
    card.addEventListener('click', () => onFlipClick(card));
    grid.appendChild(card);
  });

  // start timer
  flipState.timer = setInterval(() => {
    flipState.seconds++;
    document.getElementById('flipTimer').textContent = `⏱ ${flipState.seconds}s`;
  }, 1000);
}

function onFlipClick(card) {
  if (flipState.lock) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  flipState.flipped.push(card);

  if (flipState.flipped.length === 2) {
    flipState.lock = true;
    flipState.moves++;
    document.getElementById('flipMoves').textContent = flipState.moves;

    const [a, b] = flipState.flipped;
    if (a.dataset.emoji === b.dataset.emoji) {
      // match!
      setTimeout(() => {
        a.classList.add('matched');
        b.classList.add('matched');
        flipState.matched++;
        document.getElementById('flipMatched').textContent = flipState.matched;
        flipState.flipped = [];
        flipState.lock = false;
        if (flipState.matched === flipState.total) endFlip();
      }, 400);
    } else {
      // no match
      setTimeout(() => {
        a.classList.remove('flipped');
        b.classList.remove('flipped');
        flipState.flipped = [];
        flipState.lock = false;
      }, 900);
    }
  }
}

function endFlip() {
  clearInterval(flipState.timer);
  const result = document.getElementById('flipResult');
  const { moves, seconds, total } = flipState;
  let msg = '';
  const perfect = total; // minimum possible moves
  if (moves <= perfect + 2) {
    msg = `${moves} percobaan, ${seconds} detik. ingatan kamu kuat banget frfr 🌸`;
  } else if (moves <= perfect + 6) {
    msg = `${moves} percobaan, ${seconds} detik. lumayan, tapi masih bisa lebih cepet 😄`;
  } else {
    msg = `${moves} percobaan, ${seconds} detik. santuy, yang penting kelar kayak LDR kita 💀`;
  }
  document.getElementById('flipResultMsg').textContent = msg;
  result.style.display = 'block';
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
