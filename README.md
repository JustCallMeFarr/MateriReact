# BookSales

Website toko buku sederhana yang dibuat dengan React dan Vite. Proyek ini berisi empat halaman toko (Home, Book, Team, Contact) dan tampilan Admin untuk mengelola (tambah, lihat, edit, hapus) genre dan author. Data buku disimpan di `src/Utils/books.js`.

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
| Profil | `/profile` | Data akun dan tabel hak akses (semua user yang sudah login) |
| Forbidden | `/forbidden` | Halaman 403 untuk akun yang role-nya tidak punya akses |
| Registrasi | `/register` | Form pendaftaran akun baru (nama lengkap, email, username, password) |
| Login | `/login` | Form login dengan email atau username |
| Admin Dashboard | `/admin` | Ringkasan jumlah buku, genre, dan author |
| Admin Genre | `/admin/genres` | Tabel daftar genre dan form tambah genre |
| Admin Author | `/admin/authors` | Tabel daftar author dan form tambah author |

## Data Buku dan Tambah Buku (Tugas 3)

- Data buku ada di `src/Utils/books.js`, berisi 9 buku dengan field `id`, `title`, `author`, `year`, `description`, dan `image`.
- Data ditampilkan di halaman Home dan Book memakai metode `map`, lewat komponen `BookCard`.
- Di halaman Book ada tombol **+ Tambah Buku** yang membuka form. Buku yang disimpan langsung muncul di daftar (memakai hook `useState`).
- State daftar buku disimpan di `App.jsx`, jadi buku baru muncul di halaman Home dan Book sekaligus. Data akan kembali ke awal jika halaman di-refresh karena belum disimpan ke database.

## Tampilan Admin (Tugas Lanjutan #1 dan #2)

- Alamat diawali `/admin`, memakai layout sendiri (`AdminLayout`) dengan sidebar.
- Halaman admin **hanya bisa dibuka oleh user dengan role `admin`** (lihat bagian Registrasi, Login, dan Role di bawah). Menu **Admin** di Header hanya tampil untuk admin.
- **Read**: data genre dan author ditampilkan dalam tabel memakai `map`.
- **Create**: form di sebelah tabel. Data baru langsung muncul di tabel (memakai `useState`). Nama genre atau author yang sudah ada ditolak dengan pesan error.
- **Update**: tombol **Edit** di tiap baris mengisi form dengan data baris itu dan baris disorot kuning. Form yang sama dipakai untuk menambah dan mengedit (state `editingId` menentukan modenya). Tombol **Batal** membatalkan edit. Saat edit, nama yang sama dengan miliknya sendiri tidak dianggap ganda.
- **Delete**: tombol **Hapus** menampilkan konfirmasi "Yakin?" di baris itu (**Ya, hapus** atau **Batal**) sebelum data dihapus dengan `filter`. Jika baris yang sedang diedit dihapus, form dikosongkan.
- Fungsi `updateGenre`, `deleteGenre`, `updateAuthor`, dan `deleteAuthor` ada di `App.jsx`. Data buku belum terhubung ke genre atau author, jadi mengubah atau menghapusnya tidak memengaruhi daftar buku.
- Data awal ada di `src/Utils/genres.js` dan `src/Utils/authors.js`. State disimpan di `App.jsx`. Data kembali ke awal jika halaman di-refresh karena belum disimpan ke database.

## Registrasi, Login, dan Role (Tugas Lanjutan #3)

**Registrasi** (`/register`)
- Field: **nama lengkap**, **email**, **username**, **password**, dan ulangi password.
- Validasi sederhana, pesan error tampil per field di bawah kolomnya (setelah kolom disentuh atau tombol **Daftar** ditekan):
  - semua field wajib diisi
  - nama minimal 3 karakter dan hanya huruf
  - format email valid
  - username 4-20 karakter, diawali huruf, hanya huruf, angka, dan underscore
  - password minimal 8 karakter dengan kombinasi huruf dan angka, serta harus sama dengan ulangi password
  - email atau username yang sudah terdaftar ditolak
- Ada tombol **Lihat/Sembunyi** pada kolom password dan indikator kekuatan password.
- Tampilan responsif: panel sambutan dan form berdampingan di layar lebar, bertumpuk di layar kecil.
- Setelah berhasil, pengguna diarahkan ke halaman login dengan username yang sudah terisi.

**Login** (`/login`)
- Bisa memakai **email atau username**. Akun admin contoh: `admin` (atau `admin@booksales.com`) dengan password `admin123`.

**Struktur kode registrasi**
- `Utils/validators.js`: aturan validasi berupa fungsi-fungsi murni.
- `components/form/FormField.jsx`: kolom isian (label, input, petunjuk, error) yang dipakai ulang di form login dan registrasi.
- `components/form/PasswordStrength.jsx`: indikator kekuatan password.
- `layouts/AuthLayout.jsx`: layout bersama halaman login dan registrasi.
- `pages/Register.jsx` dan `pages/Login.jsx`: halaman form.

## Hak Akses dan Routing (Tugas Lanjutan #4)

Aplikasi membedakan dua role: **admin** dan **user**. Akun baru dari registrasi otomatis menjadi `user`. Akun admin contoh: `admin` / `admin123`.

| Halaman | Tamu (belum login) | User | Admin |
|---|---|---|---|
| `/`, `/books`, `/team`, `/contact` | Boleh | Boleh | Boleh |
| `/login`, `/register` | Boleh | Diarahkan ke beranda | Diarahkan ke `/admin` |
| `/profile` | Diarahkan ke `/login` | Boleh | Boleh |
| `/admin`, `/admin/genres`, `/admin/authors` | Diarahkan ke `/login` | Diarahkan ke `/forbidden` (403) | Boleh |

**Cara kerja**
- **Service otorisasi** (`src/services/authorizationService.js`): daftar `ROLES`, fungsi `canAccess(user, roles)` untuk mengecek hak akses, `homePathFor(user)` untuk halaman tujuan setelah login, dan `ACCESS_RULES` (daftar aturan akses yang ditampilkan di halaman Profil).
- **Service autentikasi** (`src/services/authService.js`): login (email atau username), registrasi, logout, dan sesi. Semua akses `localStorage` dikumpulkan di sini. Sesi hanya menyimpan id user, sedangkan role selalu dibaca ulang dari daftar akun.
- **Context API** (`src/context/`): `AuthProvider` menyimpan user yang login di state, dan `useAuth()` membagikan `user`, `isAdmin`, `can(roles)`, `login`, `register`, dan `logout` ke semua halaman.
- **`ProtectedRoute`**: pembungkus halaman yang butuh login. Dengan prop `roles` juga membatasi role. Belum login diarahkan ke `/login` (tujuan semula diingat), role tidak cocok diarahkan ke `/forbidden`.
- **`GuestRoute`**: pembungkus halaman khusus tamu (`/login`, `/register`). User yang sudah login langsung diarahkan pergi.
- **Navigasi menurut role**: menu di Header disaring dengan `can(roles)`. Menu **Profil** hanya tampil setelah login, menu **Admin** hanya untuk admin.
- **Logout** lewat halaman `/logout` (`pages/Logout.jsx`) supaya halaman terproteksi tidak salah mengarahkan saat sesi dihapus.
- Pembatasan ini hanya di sisi tampilan (frontend). Karena data disimpan di `localStorage`, pengguna yang paham bisa mengubahnya lewat browser. Untuk keamanan sungguhan, pengecekan role harus dilakukan juga di backend.

## Routing

Routing memakai React Router dan disusun berdasarkan jenis elemennya:

- **Layout route** (`MainLayout`) membungkus semua halaman dengan Header dan Footer, isi halaman tampil di `<Outlet />`.
- **Index route** menampilkan Home di alamat `/`.
- **Route biasa** untuk `books`, `team`, dan `contact`.
- **Layout route ketiga** (`AuthLayout`, dibungkus `GuestRoute`) membungkus halaman `login` dan `register`.
- **Route terproteksi** `profile` (dibungkus `ProtectedRoute`) berada di dalam `MainLayout`.
- **Layout route kedua** (`AdminLayout`, path `admin`, dibungkus `ProtectedRoute`) membungkus halaman admin: dashboard (index route), `genres`, dan `authors`.
- **Catch-all route** (`path="*"`) menampilkan halaman 404.

Navigasi memakai `NavLink`, sehingga menu halaman yang sedang dibuka otomatis diberi style aktif.

## Branch

Setiap tugas disimpan di branch terpisah:

| Branch | Isi |
|---|---|
| `Tugas2React` | Halaman Home, Team, Contact, routing, dan navigasi |
| `Tugas3React` | Lanjutan tugas 2: data buku (`Utils/books.js`), halaman Book, dan tombol tambah buku |
| `TugasLanjutan1` | Lanjutan tugas 3: tampilan Admin untuk read dan create genre serta author, plus login dan role |
| `TugasLanjutan2` | Lanjutan dari `TugasLanjutan1`: fitur update (edit) dan delete (hapus) genre serta author |
| `TugasLanjutan3` | Lanjutan dari `TugasLanjutan2`: fitur registrasi pengguna (form, validasi, tampilan responsif) dan penyesuaian login |
| `TugasLanjutan4` | Lanjutan dari `TugasLanjutan3`: routing dan hak akses berdasarkan role (service otorisasi, protected route, halaman profil dan 403) |

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
   - `http://localhost:5173/register` untuk registrasi. Coba kosongkan form, isi dengan data tidak valid, lalu daftar dengan data benar
   - `http://localhost:5173/profile` untuk profil. Tanpa login akan diarahkan ke login. Coba juga buka `/admin` dengan akun user biasa (muncul 403) dan dengan akun admin
   - `http://localhost:5173/login` untuk login. Pakai akun yang baru dibuat, atau akun admin contoh (`admin` / `admin123`) lalu coba tambah, edit, dan hapus genre serta author di `/admin`

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
│   ├── ProtectedRoute.jsx
│   ├── GuestRoute.jsx
│   ├── form/
│   │   ├── FormField.jsx
│   │   └── PasswordStrength.jsx
│   ├── Header.jsx
│   ├── Header.css
│   └── Footer.jsx
├── context/
│   ├── AuthContext.js
│   ├── AuthProvider.jsx
│   └── useAuth.js
├── layouts/
│   ├── MainLayout.jsx
│   ├── AdminLayout.jsx
│   ├── AdminLayout.css
│   ├── AuthLayout.jsx
│   └── AuthLayout.css
├── pages/
│   ├── Home.jsx
│   ├── Book.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Logout.jsx
│   ├── Profile.jsx
│   ├── Forbidden.jsx
│   ├── Team.jsx
│   ├── Contact.jsx
│   ├── NotFound.jsx
│   └── admin/
│       ├── AdminDashboard.jsx
│       ├── AdminGenres.jsx
│       └── AdminAuthors.jsx
├── services/
│   ├── authService.js
│   └── authorizationService.js
├── Utils/
│   ├── books.js
│   ├── genres.js
│   ├── authors.js
│   └── validators.js
├── App.jsx
└── main.jsx
```

## Pembuat

Dibuat oleh JustCallMeFarr.
