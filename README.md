# BookSales

Website toko buku sederhana yang dibuat dengan React dan Vite. Proyek ini berisi tiga halaman: Home, Team, dan Contact.

## Teknologi

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Bootstrap 5](https://getbootstrap.com/) untuk tampilan
- [React Router](https://reactrouter.com/) untuk navigasi antarhalaman
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) untuk linting

## Halaman

| Halaman | Alamat | Isi |
|---|---|---|
| Home | `/` | Banner sambutan dan daftar buku terlaris |
| Team | `/team` | Profil anggota tim |
| Contact | `/contact` | Informasi kontak dan form pesan |
| Not Found | alamat lain | Halaman 404 dengan tombol kembali ke beranda |

## Routing

Routing memakai React Router dan disusun berdasarkan jenis elemennya:

- **Layout route** (`MainLayout`) membungkus semua halaman dengan Header dan Footer, isi halaman tampil di `<Outlet />`.
- **Index route** menampilkan Home di alamat `/`.
- **Route biasa** untuk `team` dan `contact`.
- **Catch-all route** (`path="*"`) menampilkan halaman 404.

Navigasi memakai `NavLink`, sehingga menu halaman yang sedang dibuka otomatis diberi style aktif.

## Cara Menjalankan

1. Clone repository ini:

```bash
   git clone https://github.com/JustCallMeFarr/MateriReact.git
   cd MateriReact
```

2. Pasang dependensi:

```bash
   npm install
```

3. Jalankan server development:

```bash
   npm run dev
```

4. Buka `http://localhost:5173/` di browser.

## Perintah Lain

```bash
npm run build     # build untuk production
npm run preview   # pratinjau hasil build
```

## Struktur Folder

```
src/
├── components/
│   ├── Header.jsx
│   ├── Header.css
│   └── Footer.jsx
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── Home.jsx
│   ├── Team.jsx
│   ├── Contact.jsx
│   └── NotFound.jsx
├── App.jsx
└── main.jsx
```

## Pembuat

Dibuat oleh JustCallMeFarr.