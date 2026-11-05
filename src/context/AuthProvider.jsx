import { useState } from 'react'
import AuthContext from './AuthContext'

const USERS_KEY = 'booksales_users'
const SESSION_KEY = 'booksales_session'

// Akun awal. Role "admin" boleh membuka halaman /admin, role "user" tidak.
const SEED_USERS = [
  { id: 1, name: 'Admin', email: 'admin@booksales.com', password: 'admin123', role: 'admin' },
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

// Data user yang disimpan di state/session tidak menyertakan password.
const publicUser = ({ id, name, email, role }) => ({ id, name, email, role })

function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => load(USERS_KEY, SEED_USERS))
  const [user, setUser] = useState(() => load(SESSION_KEY, null))

  const startSession = (found) => {
    const session = publicUser(found)
    setUser(session)
    save(SESSION_KEY, session)
    return session
  }

  const login = (email, password) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
    )
    if (!found) return { ok: false, error: 'Email atau password salah.' }
    return { ok: true, user: startSession(found) }
  }

  const register = ({ name, email, password }) => {
    const exists = users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())
    if (exists) return { ok: false, error: 'Email sudah terdaftar.' }

    const newUser = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      name: name.trim(),
      email: email.trim(),
      password,
      role: 'user', // akun baru selalu role user biasa
    }
    const nextUsers = [...users, newUser]
    setUsers(nextUsers)
    save(USERS_KEY, nextUsers)
    return { ok: true, user: startSession(newUser) }
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
