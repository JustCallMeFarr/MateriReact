// SERVICE OTORISASI: aturan "siapa boleh mengakses apa".
// Hanya berisi logika murni (tanpa React dan tanpa penyimpanan), jadi mudah dibaca dan diuji.

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
}

// Cek apakah user boleh mengakses sesuatu yang dibatasi untuk role tertentu.
//   roles kosong / null  -> halaman publik, semua orang boleh (termasuk tamu)
//   roles = ['admin']    -> hanya user yang login dengan role tersebut
export function canAccess(user, roles) {
  if (!roles || roles.length === 0) return true
  if (!user) return false
  return roles.includes(user.role)
}

// Halaman tujuan setelah login berhasil: admin ke dashboard, user biasa ke beranda.
export function homePathFor(user) {
  return user?.role === ROLES.ADMIN ? '/admin' : '/'
}

// Daftar aturan akses semua halaman. Dipakai di halaman Profil untuk menampilkan
// halaman mana saja yang boleh dibuka oleh role yang sedang login.
export const ACCESS_RULES = [
  { path: '/', label: 'Beranda dan katalog buku', roles: null, note: 'Semua orang' },
  { path: '/profile', label: 'Profil saya', roles: [ROLES.ADMIN, ROLES.USER], note: 'Harus login' },
  { path: '/admin', label: 'Dashboard admin', roles: [ROLES.ADMIN], note: 'Khusus admin' },
  { path: '/admin/genres', label: 'Kelola genre', roles: [ROLES.ADMIN], note: 'Khusus admin' },
  { path: '/admin/authors', label: 'Kelola author', roles: [ROLES.ADMIN], note: 'Khusus admin' },
]
