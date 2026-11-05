# BookSales

Website toko buku sederhana yang dibuat dengan React dan Vite. Proyek ini berisi empat halaman toko (Home, Book, Team, Contact) dan tampilan Admin untuk mengelola genre dan author. Data buku disimpan di `src/Utils/books.js`.

## Teknologi

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Bootstrap 5](https://getbootstrap.com/) untuk tampilan
- [React Router](https://reactrouter.com/) untuk navigasi antarhalaman
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) untuk linting

## Halaman

| Halaman | Alamat | Isi |
|---|---|---|
| Home | `/` | Banner sambutan dan daftar buku dari `books.js` |
| Book | `/books` | Daftar lengkap buku, plus tombol dan form tambah buku |
| Team | `/team` | Profil anggota tim |
| Contact | `/contact` | Informasi kontak dan form pesan |
| Not Found | alamat lain | Halaman 404 dengan tombol kembali ke beranda |
| Admin Dashboard | `/admin` | Ringkasan jumlah buku, genre, dan author |
| Admin Genre | `/admin/genres` | Tabel daftar genre dan form tambah genre |
| Admin Author | `/admin/authors` | Tabel daftar author dan form tambah author |

## Data Buku dan Tambah Buku (Tugas 3)

- Data buku ada di `src/Utils/books.js`, berisi 9 buku dengan field `id`, `title`, `author`, `year`, `description`, dan `image`.
- Data ditampilkan di halaman Home dan Book memakai metode `map`, lewat komponen `BookCard`.
- Di halaman Book ada tombol **+ Tambah Buku** yang membuka form. Buku yang disimpan langsung muncul di daftar (memakai hook `useState`).
- State daftar buku disimpan di `App.jsx`, jadi buku baru muncul di halaman Home dan Book sekaligus. Data akan kembali ke awal jika halaman di-refresh karena belum disimpan ke database.

## Tampilan Admin (Tugas Lanjutan #1)

- Alamat diawali `/admin`, memakai layout sendiri (`AdminLayout`) dengan sidebar. Dari toko, buka lewat menu **Admin** di Header.
- **Read**: data genre dan author ditampilkan dalam tabel memakai `map`.
- **Create**: form di sebelah tabel. Data baru langsung muncul di tabel (memakai `useState`). Nama genre atau author yang sudah ada ditolak dengan pesan error.
- Data awal ada di `src/Utils/genres.js` dan `src/Utils/authors.js`. State disimpan di `App.jsx`. Data kembali ke awal jika halaman di-refresh karena belum disimpan ke database.

## Routing

Routing memakai React Router dan disusun berdasarkan jenis elemennya:

- **Layout route** (`MainLayout`) membungkus semua halaman dengan Header dan Footer, isi halaman tampil di `<Outlet />`.
- **Index route** menampilkan Home di alamat `/`.
- **Route biasa** untuk `books`, `team`, dan `contact`.
- **Layout route kedua** (`AdminLayout`, path `admin`) membungkus halaman admin: dashboard (index route), `genres`, dan `authors`.
- **Catch-all route** (`path="*"`) menampilkan halaman 404.

Navigasi memakai `NavLink`, sehingga menu halaman yang sedang dibuka otomatis diberi style aktif.

## Branch

Setiap tugas disimpan di branch terpisah:

| Branch | Isi |
|---|---|
| `Tugas2React` | Halaman Home, Team, Contact, routing, dan navigasi |
| `Tugas3React` | Lanjutan tugas 2: data buku (`Utils/books.js`), halaman Book, dan tombol tambah buku |
| `TugasLanjutan1` | Lanjutan tugas 3: tampilan Admin untuk read dan create genre serta author |

Link langsung ke branch tugas 3:
https://github.com/JustCallMeFarr/MateriReact/tree/Tugas3React

Di GitHub, branch bisa dipilih lewat dropdown di kiri atas daftar file (yang bertuliskan nama branch).

## Cara Menjalankan

Buka VS Code, lalu buka terminal lewat menu **Terminal → New Terminal** (atau tekan `` Ctrl + ` ``). Pastikan Node.js dan Git sudah terpasang.

### Jika project belum pernah di-clone

1. Clone langsung ke branch tugas 3:

```bash
git clone -b Tugas3React https://github.com/JustCallMeFarr/MateriReact.git
cd MateriReact
```

2. Buka foldernya di VS Code: **File → Open Folder → pilih `MateriReact`**.

### Jika project sudah ada di komputer

1. Masuk ke folder project, lalu ambil branch terbaru dari GitHub dan pindah ke branch tugas 3:

```bash
git fetch origin
git checkout Tugas3React
git pull origin Tugas3React
```

2. Cek branch yang sedang aktif. Tanda `*` menunjukkan branch aktif (namanya juga tampil di pojok kiri bawah VS Code):

```bash
git branch
```

### Menjalankan project

1. Pasang dependensi (cukup sekali, atau ulangi kalau pindah branch dan ada paket baru):

```bash
npm install
```

2. Jalankan server development:

```bash
npm run dev
```

3. Buka `http://localhost:5173/` di browser, atau tahan `Ctrl` lalu klik link yang muncul di terminal. Hasilnya bisa dicek di:
   - `http://localhost:5173/` untuk halaman Home
   - `http://localhost:5173/books` untuk halaman Book (coba klik **+ Tambah Buku**)
   - `http://localhost:5173/admin` untuk tampilan Admin (coba tambah genre dan author)

4. Untuk menghentikan server, tekan `Ctrl + C` di terminal.

## Perintah Lain

```bash
npm run lint      # cek kode dengan Oxlint
npm run build     # build untuk production
npm run preview   # pratinjau hasil build
```

## Struktur Folder

```
src/
├── components/
│   ├── BookCard.jsx
│   ├── Header.jsx
│   ├── Header.css
│   └── Footer.jsx
├── layouts/
│   ├── MainLayout.jsx
│   ├── AdminLayout.jsx
│   └── AdminLayout.css
├── pages/
│   ├── Home.jsx
│   ├── Book.jsx
│   ├── Team.jsx
│   ├── Contact.jsx
│   ├── NotFound.jsx
│   └── admin/
│       ├── AdminDashboard.jsx
│       ├── AdminGenres.jsx
│       └── AdminAuthors.jsx
├── Utils/
│   ├── books.js
│   ├── genres.js
│   └── authors.js
├── App.jsx
└── main.jsx
```

## Pembuat

Dibuat oleh JustCallMeFarr.
