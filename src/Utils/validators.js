// Aturan validasi form. Semua fungsi murni: menerima nilai, mengembalikan pesan error
// (string) atau '' kalau nilainya sudah benar. Mudah dibaca dan dipakai ulang.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const NAME_PATTERN = /^[\p{L}][\p{L}\s.'-]*$/u // huruf, spasi, titik, apostrof, strip
const USERNAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9_]*$/ // diawali huruf, lalu huruf/angka/_

export function validateName(value) {
  const name = value.trim()
  if (!name) return 'Nama lengkap wajib diisi.'
  if (name.length < 3) return 'Nama lengkap minimal 3 karakter.'
  if (!NAME_PATTERN.test(name)) return 'Nama hanya boleh berisi huruf dan spasi.'
  return ''
}

export function validateEmail(value) {
  const email = value.trim()
  if (!email) return 'Email wajib diisi.'
  if (!EMAIL_PATTERN.test(email)) return 'Format email tidak valid (contoh: nama@email.com).'
  return ''
}

export function validateUsername(value) {
  const username = value.trim()
  if (!username) return 'Username wajib diisi.'
  if (username.length < 4) return 'Username minimal 4 karakter.'
  if (username.length > 20) return 'Username maksimal 20 karakter.'
  if (!USERNAME_PATTERN.test(username)) {
    return 'Username harus diawali huruf, dan hanya boleh huruf, angka, atau underscore (_).'
  }
  return ''
}

export function validatePassword(value) {
  if (!value) return 'Password wajib diisi.'
  if (value.length < 8) return 'Password minimal 8 karakter.'
  if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) return 'Password harus mengandung huruf dan angka.'
  return ''
}

export function validateConfirm(password, confirm) {
  if (!confirm) return 'Ulangi password wajib diisi.'
  if (password !== confirm) return 'Konfirmasi password tidak sama.'
  return ''
}

// Memeriksa seluruh form registrasi sekaligus.
// Hasilnya object { namaField: pesanError }, hanya berisi field yang bermasalah.
export function validateRegister(values) {
  const checks = {
    name: validateName(values.name),
    email: validateEmail(values.email),
    username: validateUsername(values.username),
    password: validatePassword(values.password),
    confirm: validateConfirm(values.password, values.confirm),
  }
  return Object.fromEntries(Object.entries(checks).filter(([, message]) => message))
}

// Menilai kekuatan password untuk indikator di form (0 sampai 4).
export function passwordStrength(value) {
  if (!value) return 0
  let score = 0
  if (value.length >= 8) score++
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++
  if (/\d/.test(value)) score++
  if (/[^a-zA-Z0-9]/.test(value) || value.length >= 12) score++
  return score
}
