// ========================================
//   cibinong x cibubub — script.js
// ========================================

// ───────── PHOTOS DATA ─────────
const photos = [
  { src: 'photos/foto1.jpg',  caption: 'teman SD cinta monyet 🥺',                                      quote: '"who knew a childhood friend could turn into something like this."' },
  { src: 'photos/foto2.jpg',  caption: 'sebelum jadian jadi bocil epep dulu 😂',                        quote: '"even the awkward phase had its charm, we just didn\'t know it yet."' },
  { src: 'photos/foto3.jpg',  caption: 'masuk SMA pas awal covid, canggung bgt kita oi 😅',             quote: '"the world was on pause, but feelings? they didn\'t stop."' },
  { src: 'photos/foto4.jpg',  caption: 'naik sidi bareng 🕊️💕',                                         quote: '"growing in faith, together. that means something."' },
  { src: 'photos/foto5.jpg',  caption: 'ppp mau kondangan? 😄👔',                                       quote: '"accidentally coordinated. definitely meant to be."' },
  { src: 'photos/foto6.jpg',  caption: 'ga banyak foto pas SMA, yg bagus hanya pas perpisahan 🎓',      quote: '"graduation day. the school era is over, but we are still going."' },
  { src: 'photos/foto7.jpg',  caption: 'ke Gacoan pertama kali, aku UTBK dia udah lulus SNBP coy 🔥',  quote: '"your win felt like mine too. that\'s just how it works with us."' },
  { src: 'photos/foto8.jpg',  caption: 'rencanain satu kampus bareng malah LDR hikss 😭',               quote: '"different cities, same feeling. we figured it out anyway."' },
  { src: 'photos/foto9.jpg',  caption: 'LDR dimulai, mari kita mulai perang ini 💪',                    quote: '"distance is just a test, and so far we keep passing it."' },
  { src: 'photos/foto10.jpg', caption: 'ketemunya libur semester aja, hiks 🗓️😢',                      quote: '"every reunion felt like the first time all over again."' },
  { src: 'photos/foto11.jpg', caption: 'ini juga foto pas libur semester 📅',                           quote: '"short on time, never short on memories."' },
  { src: 'photos/foto12.jpg', caption: 'LDR, VC-an mulu 📱💬',                                          quote: '"fell asleep on VC more times than we can count. no regrets."' },
  { src: 'photos/foto13.jpg', caption: 'ngide datengin ke Lampung 🚌✨',                                quote: '"sometimes love shows up at the door before it sends a text."' },
  { src: 'photos/foto14.jpg', caption: 'Bukit Aslan 🏔️🌿',                                             quote: '"the view was stunning, but honestly so were you."' },
  { src: 'photos/foto15.jpg', caption: 'makan sushi mengakhiri tahun 2025 🍣🎉',                        quote: '"2025 ending with sushi and you. can\'t complain."' },
  { src: 'photos/foto16.jpg', caption: 'masih dengan aku, kamu, dan Lampung 🌴💕',                      quote: '"different place, same feeling. it never really changes."' },
  { src: 'photos/foto17.jpg', caption: 'hunting makanan enak di Lampung yeuyy 🍜😋',                   quote: '"our love language: finding the best local food together."' },
  { src: 'photos/foto18.jpg', caption: 'mancing edition 🎣😄',                                          quote: '"best conversations happen when there\'s nowhere to be."' },
  { src: 'photos/foto19.jpg', caption: 'lucukk 🥰',                                                     quote: '"this photo lives rent-free in my head."' },
  { src: 'photos/foto20.jpg', caption: 'healing ke Jakarta, berdua 🌆✨',                                quote: '"any city feels right when you are next to me."' },
];

const TOTAL = photos.length;

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

// ───────── COUNTER ─────────
const startDate = new Date(2020, 6, 30);
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

// ───────── IMAGE ERROR ─────────
function handleImgError(img) {
  img.parentElement.classList.add('no-photo');
}

// ───────── STACK CARD SYSTEM ─────────
let stackIndex = 0; // which photo is on top
const cardEls = [];

function initStack() {
  const container = document.getElementById('stackContainer');
  if (!container) return;

  const rawCards = Array.from(container.querySelectorAll('.stack-card'));
  rawCards.forEach((card, i) => cardEls.push(card));

  renderStack();
  attachDragListeners();
  updateStackCounter();
}

function renderStack() {
  cardEls.forEach((card, i) => {
    const relPos = (i - stackIndex + TOTAL) % TOTAL;
    card.removeAttribute('data-pos');
    if (relPos < 4) {
      card.setAttribute('data-pos', relPos);
      card.classList.remove('swipe-left', 'swipe-right');
    } else {
      card.style.opacity = '0';
      card.style.pointerEvents = 'none';
      card.removeAttribute('data-pos');
    }
  });
  // make sure current top is visible
  cardEls[stackIndex].style.opacity = '';
  cardEls[stackIndex].style.pointerEvents = '';
}

function stackNext() {
  const topCard = cardEls[stackIndex];
  topCard.classList.add('swipe-left');
  topCard.classList.remove('flipped');
  setTimeout(() => {
    stackIndex = (stackIndex + 1) % TOTAL;
    renderStack();
    updateStackCounter();
  }, 380);
}

function stackPrev() {
  stackIndex = (stackIndex - 1 + TOTAL) % TOTAL;
  const prevCard = cardEls[stackIndex];
  prevCard.classList.remove('swipe-left', 'swipe-right', 'flipped');
  renderStack();
  updateStackCounter();
}

function updateStackCounter() {
  const el = document.getElementById('stackCounter');
  if (el) el.textContent = `${stackIndex + 1} / ${TOTAL}`;
}

// Tap to flip top card
function attachDragListeners() {
  cardEls.forEach((card) => {
    let startX = 0, startY = 0, moved = false;
    let isDragging = false;

    // Touch
    card.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      moved = false;
      isDragging = true;
    }, { passive: true });

    card.addEventListener('touchmove', e => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) moved = true;
      // live drag on top card
      if (card.getAttribute('data-pos') === '0') {
        card.style.transition = 'none';
        card.style.transform = `translateX(${dx}px) rotate(${dx * 0.08}deg)`;
      }
    }, { passive: true });

    card.addEventListener('touchend', e => {
      isDragging = false;
      if (card.getAttribute('data-pos') !== '0') return;
      const dx = e.changedTouches[0].clientX - startX;
      card.style.transition = '';
      card.style.transform = '';
      if (!moved) {
        card.classList.toggle('flipped');
      } else if (Math.abs(dx) > 60) {
        dx > 0 ? card.classList.add('swipe-right') : card.classList.add('swipe-left');
        card.classList.remove('flipped');
        setTimeout(() => {
          stackIndex = (stackIndex + 1) % TOTAL;
          renderStack();
          updateStackCounter();
        }, 380);
      }
    });

    // Mouse
    card.addEventListener('mousedown', e => {
      startX = e.clientX;
      startY = e.clientY;
      moved = false;
      isDragging = true;
    });

    document.addEventListener('mousemove', e => {
      if (!isDragging || card.getAttribute('data-pos') !== '0') return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) moved = true;
      card.style.transition = 'none';
      card.style.transform = `translateX(${dx}px) rotate(${dx * 0.06}deg)`;
    });

    document.addEventListener('mouseup', e => {
      if (!isDragging || card.getAttribute('data-pos') !== '0') { isDragging = false; return; }
      isDragging = false;
      const dx = e.clientX - startX;
      card.style.transition = '';
      card.style.transform = '';
      if (!moved) {
        card.classList.toggle('flipped');
      } else if (Math.abs(dx) > 80) {
        dx > 0 ? card.classList.add('swipe-right') : card.classList.add('swipe-left');
        card.classList.remove('flipped');
        setTimeout(() => {
          stackIndex = (stackIndex + 1) % TOTAL;
          renderStack();
          updateStackCounter();
        }, 380);
      }
    });
  });
}

// ───────── MODAL ─────────
function openModal(index) {
  const d = photos[index];
  const img = document.getElementById('modalImg');
  const ph  = document.getElementById('modalPlaceholder');
  img.src = d.src;
  img.style.display = 'block';
  ph.style.display  = 'none';
  img.onerror = () => { img.style.display = 'none'; ph.style.display = 'flex'; };
  document.getElementById('modalCaption').textContent = d.caption;
  document.getElementById('modalQuote').textContent   = d.quote;
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

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

// ───────── QUIZ ─────────
const questions = [
  {
    q: '👀 gimana awal cerita ini semua?',
    opts: ['ketemu di mall', 'temen SD cinta monyet', 'kenalan online', 'dikenalain temen'],
    ans: 1,
    feedback: { right: '✅ bener! dari SD emang udah ada vibe-nya 🥺', wrong: '❌ salah, mereka temen SD yang kena cinta monyet lho!' }
  },
  {
    q: '😭 pas masuk kuliah, apa yang terjadi?',
    opts: ['satu kampus', 'LDR beda kota', 'putus dulu', 'nikah duluan'],
    ans: 1,
    feedback: { right: '✅ yep, niat satu kampus malah LDR 😭', wrong: '❌ bukan, LDR beda kota dong, plot twist abis!' }
  },
  {
    q: '🍜 abis surprise dateng, ngapain dulu?',
    opts: ['nonton bioskop', 'mancing', 'hunting makan enak', 'foto-foto dulu'],
    ans: 2,
    feedback: { right: '✅ yep, makan dulu yang penting 🍜', wrong: '❌ hunting makan enak lah, prioritas!' }
  },
  {
    q: '🍣 nutup tahun 2025 ngapain?',
    opts: ['makan sushi', 'naik gunung', 'anniversary fancy', 'konser'],
    ans: 0,
    feedback: { right: '✅ sushi untuk nutup 2025, lowkey cute 🎉', wrong: '❌ makan sushi dong buat nutup tahun 2025!' }
  },
  {
    q: '🔥 makan bareng pertama setelah lulus SMA, dimana?',
    opts: ['KFC', 'Gacoan', 'McD', 'warteg'],
    ans: 1,
    feedback: { right: '✅ Gacoan! sambil rayain dia lulus SNBP duluan 🔥', wrong: '❌ Gacoan dong! dia lulus duluan, coy 😭' }
  }
];

let qIndex = 0, score = 0, answered = false;

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
  document.getElementById('progressFill').style.width = ((qIndex / questions.length) * 100) + '%';
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

function nextQuestion() { qIndex++; renderQuestion(); }

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
    msg = `${score}/5 bener semua. literally hapal cerita ini luar dalem 💕`;
  } else if (score >= 3) {
    emoji = '💕'; title = 'lumayan tau!';
    msg = `${score}/5, masih ada yang kelewat nih, scroll lagi dari atas 😄`;
  } else {
    emoji = '😭'; title = 'kamu siapa?';
    msg = `${score}/5 doang 💀 baca dulu ceritanya dari atas!`;
  }
  resultEl.innerHTML = `
    <span class="result-emoji">${emoji}</span>
    <div class="result-title">${title}</div>
    <div class="result-msg">${msg}</div>
    <button class="btn-restart" onclick="initGame()">main lagi 🔄</button>
  `;
}

// ───────── FLIP CARD GAME ─────────
const flipEmojis = ['🌸','💕','🎓','📱','✈️','🍣','🏔️','🎣','🌴','🍜','🥺','💌'];
let flipState = { flipped: [], matched: 0, moves: 0, lock: false, timer: null, seconds: 0, total: 0 };
let currentFlipSize = 6;

function showFlipIntro() {
  document.getElementById('flipIntro').style.display = 'block';
  document.getElementById('flipGame').style.display = 'none';
  clearInterval(flipState.timer);
}

function startFlip(pairs) {
  currentFlipSize = pairs;
  clearInterval(flipState.timer);
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
    card.innerHTML = `<div class="flip-card-inner"><div class="flip-front">🌸</div><div class="flip-back">${emoji}</div></div>`;
    card.addEventListener('click', () => onFlipClick(card));
    grid.appendChild(card);
  });
  flipState.timer = setInterval(() => {
    flipState.seconds++;
    document.getElementById('flipTimer').textContent = `⏱ ${flipState.seconds}s`;
  }, 1000);
}

function onFlipClick(card) {
  if (flipState.lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  card.classList.add('flipped');
  flipState.flipped.push(card);
  if (flipState.flipped.length === 2) {
    flipState.lock = true;
    flipState.moves++;
    document.getElementById('flipMoves').textContent = flipState.moves;
    const [a, b] = flipState.flipped;
    if (a.dataset.emoji === b.dataset.emoji) {
      setTimeout(() => {
        a.classList.add('matched'); b.classList.add('matched');
        flipState.matched++;
        document.getElementById('flipMatched').textContent = flipState.matched;
        flipState.flipped = []; flipState.lock = false;
        if (flipState.matched === flipState.total) endFlip();
      }, 400);
    } else {
      setTimeout(() => {
        a.classList.remove('flipped'); b.classList.remove('flipped');
        flipState.flipped = []; flipState.lock = false;
      }, 900);
    }
  }
}

function endFlip() {
  clearInterval(flipState.timer);
  const { moves, seconds, total } = flipState;
  let msg = '';
  if (moves <= total + 2) msg = `${moves} tries, ${seconds}s. memory kamu kuat banget frfr 🌸`;
  else if (moves <= total + 6) msg = `${moves} tries, ${seconds}s. lumayan, bisa lebih cepet tapi 😄`;
  else msg = `${moves} tries, ${seconds}s. santuy, yang penting kelar kayak LDR kita 💀`;
  document.getElementById('flipResultMsg').textContent = msg;
  document.getElementById('flipResult').style.display = 'block';
  document.getElementById('flipResult').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ───────── INIT ─────────
document.addEventListener('DOMContentLoaded', () => {
  initStack();
  initGame();
});

// ───────── PUZZLE GAME ─────────
const PUZZLE_IMG = 'puzzle.jpg';
let currentPuzzleSize = 3;
let puzzleState = {
  grid: [], size: 3, moves: 0,
  timer: null, seconds: 0, dragging: null
};

function showPuzzleIntro() {
  document.getElementById('puzzleIntro').style.display = 'block';
  document.getElementById('puzzleGame').style.display = 'none';
  document.getElementById('puzzleResult').style.display = 'none';
  clearInterval(puzzleState.timer);
}

function startPuzzle(size) {
  currentPuzzleSize = size;
  clearInterval(puzzleState.timer);
  puzzleState = { grid: [], size, moves: 0, timer: null, seconds: 0, dragging: null };

  document.getElementById('puzzleIntro').style.display = 'none';
  document.getElementById('puzzleGame').style.display = 'block';
  document.getElementById('puzzleResult').style.display = 'none';
  document.getElementById('puzzleMoves').textContent = '0';
  document.getElementById('puzzleTimer').textContent = '⏱ 0s';

  // build solved order
  const total = size * size;
  puzzleState.grid = Array.from({ length: total }, (_, i) => i);

  renderPuzzle();
  shufflePuzzle();

  puzzleState.timer = setInterval(() => {
    puzzleState.seconds++;
    document.getElementById('puzzleTimer').textContent = `⏱ ${puzzleState.seconds}s`;
  }, 1000);
}

function shufflePuzzle() {
  const { grid } = puzzleState;
  // Fisher-Yates
  for (let i = grid.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [grid[i], grid[j]] = [grid[j], grid[i]];
  }
  puzzleState.moves = 0;
  document.getElementById('puzzleMoves').textContent = '0';
  renderPuzzle();
}

function renderPuzzle() {
  const { grid, size } = puzzleState;
  const board = document.getElementById('puzzleBoard');
  board.innerHTML = '';

  // board size responsive
  const maxW = Math.min(window.innerWidth - 160, 360);
  const pieceSize = Math.floor(maxW / size);
  board.style.gridTemplateColumns = `repeat(${size}, ${pieceSize}px)`;
  board.style.width = `${pieceSize * size + (size - 1) * 3}px`;

  grid.forEach((tileIndex, pos) => {
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    piece.style.width = pieceSize + 'px';
    piece.style.height = pieceSize + 'px';
    piece.dataset.pos = pos;
    piece.dataset.tile = tileIndex;

    const row = Math.floor(tileIndex / size);
    const col = tileIndex % size;
    const bgX = -(col * pieceSize);
    const bgY = -(row * pieceSize);
    piece.style.backgroundImage = `url('${PUZZLE_IMG}')`;
    piece.style.backgroundSize = `${pieceSize * size}px ${pieceSize * size}px`;
    piece.style.backgroundPosition = `${bgX}px ${bgY}px`;

    // mark correct pieces
    if (tileIndex === pos) piece.classList.add('correct');

    // drag events (mouse + touch)
    piece.addEventListener('dragstart', onPuzzleDragStart);
    piece.addEventListener('dragover', e => e.preventDefault());
    piece.addEventListener('drop', onPuzzleDrop);
    piece.setAttribute('draggable', true);

    // touch
    piece.addEventListener('touchstart', onPuzzleTouchStart, { passive: true });
    piece.addEventListener('touchend', onPuzzleTouchEnd);

    board.appendChild(piece);
  });
}

// --- Drag & Drop ---
function onPuzzleDragStart(e) {
  puzzleState.dragging = parseInt(e.target.dataset.pos);
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function onPuzzleDrop(e) {
  e.preventDefault();
  const targetPos = parseInt(e.currentTarget.dataset.pos);
  const fromPos = puzzleState.dragging;
  if (fromPos === null || fromPos === targetPos) return;

  // swap
  const { grid } = puzzleState;
  [grid[fromPos], grid[targetPos]] = [grid[targetPos], grid[fromPos]];
  puzzleState.moves++;
  document.getElementById('puzzleMoves').textContent = puzzleState.moves;
  puzzleState.dragging = null;
  renderPuzzle();
  checkPuzzleSolved();
}

// --- Touch swap (tap two pieces) ---
let touchFirst = null;
function onPuzzleTouchStart(e) {
  const pos = parseInt(e.currentTarget.dataset.pos);
  if (touchFirst === null) {
    touchFirst = pos;
    e.currentTarget.style.outline = '3px solid var(--pink-dark)';
  } else {
    const { grid } = puzzleState;
    // clear outline
    document.querySelectorAll('.puzzle-piece').forEach(p => p.style.outline = '');
    [grid[touchFirst], grid[pos]] = [grid[pos], grid[touchFirst]];
    puzzleState.moves++;
    document.getElementById('puzzleMoves').textContent = puzzleState.moves;
    touchFirst = null;
    renderPuzzle();
    checkPuzzleSolved();
  }
}
function onPuzzleTouchEnd(e) { e.preventDefault(); }

function checkPuzzleSolved() {
  const { grid } = puzzleState;
  const solved = grid.every((tile, i) => tile === i);
  if (!solved) return;

  clearInterval(puzzleState.timer);
  const { moves, seconds } = puzzleState;
  let msg = '';
  if (moves <= puzzleState.size * 3) msg = `${moves} moves, ${seconds}s. gila cepet banget, udah kayak hapal posisi satu sama lain 🌸`;
  else if (moves <= puzzleState.size * 7) msg = `${moves} moves, ${seconds}s. nice! foto kelar tersusun rapi kayak hubungan kalian 💕`;
  else msg = `${moves} moves, ${seconds}s. santuy, yang penting kelar dan fotonya bagus kan 😄`;

  setTimeout(() => {
    document.getElementById('puzzleResultMsg').textContent = msg;
    document.getElementById('puzzleResult').style.display = 'block';
    document.getElementById('puzzleResult').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300);
}

// update switchGame to include puzzle
const _origSwitchGame = switchGame;
switchGame = function(tab) {
  document.querySelectorAll('.game-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.game-panel').forEach(p => p.style.display = 'none');
  const tabs = document.querySelectorAll('.game-tab');
  if (tab === 'quiz')   { tabs[0].classList.add('active'); document.getElementById('panelQuiz').style.display = 'block'; }
  else if (tab === 'flip')   { tabs[1].classList.add('active'); document.getElementById('panelFlip').style.display = 'block'; }
  else if (tab === 'puzzle') { tabs[2].classList.add('active'); document.getElementById('panelPuzzle').style.display = 'block'; }
};
