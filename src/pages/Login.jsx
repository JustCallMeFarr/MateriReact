import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../context/useAuth'
import FormField from '../components/form/FormField'

function Login() {
  const { login } = useAuth()
  const location = useLocation()

  // Data dari halaman sebelumnya: username yang baru didaftarkan, atau halaman tujuan semula
  const registered = location.state?.registered
  const from = location.state?.from

  const [form, setForm] = useState({ identifier: registered ?? '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(form.identifier, form.password)
    // Kalau berhasil, tidak perlu pindah halaman di sini: GuestRoute melihat user sudah login
    // dan mengarahkannya ke halaman tujuan semula, atau ke halaman utama sesuai role.
    if (!result.ok) setError(result.error)
  }

  return (
    <>
      <h1 className="h2 fw-bold mb-1">Selamat datang kembali</h1>
      <p className="text-body-secondary mb-4">Masuk ke akun BookSales-mu.</p>

      {registered && (
        <div className="alert alert-success" role="status">
          Akun <strong>{registered}</strong> berhasil dibuat. Silakan login.
        </div>
      )}
      {from && !registered && (
        <div className="alert alert-info" role="status">
          Silakan login dulu untuk membuka halaman itu.
        </div>
      )}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <form onSubmit={handleSubmit}>
        <FormField
          id="login-identifier"
          name="identifier"
          label="Email atau username"
          value={form.identifier}
          onChange={handleChange}
          autoComplete="username"
          required
        />
        <FormField
          id="login-password"
          name="password"
          type="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        <button type="submit" className="btn btn-primary btn-lg w-100 mt-2">Login</button>
      </form>

      <p className="text-center text-body-secondary mt-4 mb-2">
        Belum punya akun? <Link to="/register" className="fw-semibold">Daftar sekarang</Link>
      </p>
      <p className="text-center text-body-secondary small mb-0">
        Akun admin contoh: <code>admin</code> / <code>admin123</code>
      </p>
    </>
  )
}

export default Login
