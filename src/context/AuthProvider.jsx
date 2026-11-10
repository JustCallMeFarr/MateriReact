import { useState } from 'react'
import AuthContext from './AuthContext'

const USERS_KEY = 'booksales_users'
const SESSION_KEY = 'booksales_session'

// Akun awal. Role "admin" boleh membuka halaman /admin, role "user" tidak.
const SEED_USERS = [
  {
    id: 1,
    name: 'Admin BookSales',
    email: 'admin@booksales.com',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
  },
]

// localStorage bisa gagal (mode private, dll), jadi dibungkus try/catch.
function load(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // abaikan: aplikasi tetap jalan, hanya datanya tidak tersimpan
  }
}

// Akun yang dibuat sebelum ada field username diberi username dari bagian depan emailnya.
function loadUsers() {
  return load(USERS_KEY, SEED_USERS).map((u) => ({
    ...u,
    username: u.username ?? u.email.split('@')[0],
  }))
}

// Data user yang disimpan di state/session tidak menyertakan password.
const publicUser = ({ id, name, email, username, role }) => ({ id, name, email, username, role })

const same = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase()

function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers)
  const [user, setUser] = useState(() => load(SESSION_KEY, null))

  // Login dengan email ATAU username
  const login = (identifier, password) => {
    const found = users.find(
      (u) => (same(u.email, identifier) || same(u.username, identifier)) && u.password === password,
    )
    if (!found) return { ok: false, error: 'Email/username atau password salah.' }

    const session = publicUser(found)
    setUser(session)
    save(SESSION_KEY, session)
    return { ok: true, user: session }
  }

  // Registrasi hanya membuat akun. Pengguna lalu diarahkan ke halaman login.
  // Kalau gagal, hasilnya berisi pesan error per field: { ok: false, errors: { email: '...' } }
  const register = ({ name, email, username, password }) => {
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
      role: 'user', // akun baru selalu role user biasa
    }
    const nextUsers = [...users, newUser]
    setUsers(nextUsers)
    save(USERS_KEY, nextUsers)
    return { ok: true, user: publicUser(newUser) }
  }

  const logout = () => {
    setUser(null)
    save(SESSION_KEY, null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
