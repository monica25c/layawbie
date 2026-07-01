# 🌸 Monica & Rizki — 6 Tahun Bersama

Website romantis interaktif untuk merayakan 6 tahun perjalanan cinta Monica & Rizki.

🔗 **Live:** https://monica25c.github.io/layawbie

---

## ✨ Cara Tambah Foto

1. Buka folder `photos/` di repository ini
2. Upload foto dengan nama persis:
   - `foto1.jpg`, `foto2.jpg`, `foto3.jpg` ... sampai `foto16.jpg`
3. Foto akan otomatis muncul di website!

---

## ✏️ Cara Edit Teks / Quotes

Buka file `index.html`, cari bagian seperti ini:

```html
<div class="photo-card" onclick="openModal(0)">
  ...
  <p>"Senyummu adalah alasan hariku selalu indah. 🌸"</p>
```

Ganti teks di dalam tanda `"..."` dengan quote yang kamu mau.

Quotes juga ada di file `script.js` (untuk modal/popup), cari bagian:

```js
const photos = [
  { src: 'photos/foto1.jpg',  quote: '"Senyummu adalah alasan hariku selalu indah. 🌸"' },
  ...
]
```

Ganti quote di sana juga supaya tampil saat foto diklik.

---

## 📅 Cara Ganti Tanggal Jadian

Buka `script.js`, cari baris ini:

```js
const startDate = new Date(2019, 0, 1);
```

Ganti dengan tanggal jadian kalian:
- `2019` = tahun
- `0` = bulan (0 = Januari, 1 = Februari, dst.)
- `1` = tanggal

---

## 💌 Cara Edit Surat Cinta

Buka `index.html`, cari bagian `<!-- 💌 LOVE LETTER SECTION -->` dan edit teksnya.

---

## 🚀 Deploy ke GitHub Pages

```bash
git add .
git commit -m "update foto dan quotes"
git push
```

Setelah push, buka:
**Settings → Pages → Source: main branch** → Save

Website akan live di: `https://monica25c.github.io/layawbie`

---

Made with 💕 for Monica & Rizki
