// SERVICE AUTENTIKASI: akun, sesi login, login, registrasi, dan logout.
// Belum ada backend, jadi data disimpan di localStorage browser. Semua akses ke
// localStorage dikumpulkan di file ini, sehingga nanti mudah diganti dengan panggilan API.

import { ROLES } from './authorizationService'

const USERS_KEY = 'booksales_users'
const SESSION_KEY = 'booksales_session'

// Akun awal (admin).
const SEED_USERS = [
  {
    id: 1,
    name: 'Admin BookSales',
    email: 'admin@booksales.com',
    username: 'admin',
    password: 'admin123',
    role: ROLES.ADMIN,
  },
]

// localStorage bisa gagal (mode private, dll), jadi dibungkus try/catch.
function read(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // abaikan: aplikasi tetap jalan, hanya datanya tidak tersimpan
  }
}

// Akun yang dibuat sebelum ada field username diberi username dari bagian depan emailnya.
function getUsers() {
  return read(USERS_KEY, SEED_USERS).map((u) => ({
    ...u,
    username: u.username ?? u.email.split('@')[0],
  }))
}

// Data user yang keluar dari service ini tidak menyertakan password.
const publicUser = ({ id, name, email, username, role }) => ({ id, name, email, username, role })

const same = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase()

// Sesi hanya menyimpan id user. Data user (termasuk role) selalu dibaca ulang dari daftar akun,
// jadi mengubah role langsung di localStorage tidak otomatis memberi hak akses admin.
export function getCurrentUser() {
  const session = read(SESSION_KEY, null)
  if (!session) return null
  const found = getUsers().find((u) => u.id === session.id)
  return found ? publicUser(found) : null
}

// Login dengan email ATAU username.
export function login(identifier, password) {
  const found = getUsers().find(
    (u) => (same(u.email, identifier) || same(u.username, identifier)) && u.password === password,
  )
  if (!found) return { ok: false, error: 'Email/username atau password salah.' }

  write(SESSION_KEY, { id: found.id })
  return { ok: true, user: publicUser(found) }
}

// Registrasi hanya membuat akun (tanpa login otomatis). Akun baru selalu berole "user".
// Kalau gagal, hasilnya berisi pesan error per field: { ok: false, errors: { email: '...' } }
export function register({ name, email, username, password }) {
  const users = getUsers()

  const errors = {}
  if (users.some((u) => same(u.email, email))) errors.email = 'Email sudah terdaftar.'
  if (users.some((u) => same(u.username, username))) errors.username = 'Username sudah dipakai.'
  if (Object.keys(errors).length) return { ok: false, errors }

  const newUser = {
    id: Math.max(...users.map((u) => u.id)) + 1,
    name: name.trim(),
    email: email.trim(),
    username: username.trim(),
    password,
    role: ROLES.USER,
  }
  write(USERS_KEY, [...users, newUser])
  return { ok: true, user: publicUser(newUser) }
}

export function logout() {
  write(SESSION_KEY, null)
}
