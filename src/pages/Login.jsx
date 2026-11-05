import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(form.email, form.password)
    if (!result.ok) {
      setError(result.error)
      return
    }
    // Admin ke dashboard admin, user biasa kembali ke halaman asal atau beranda
    const fallback = result.user.role === 'admin' ? '/admin' : '/'
    navigate(location.state?.from ?? fallback, { replace: true })
  }

  return (
    <div className="row justify-content-center py-4">
      <div className="col-md-6 col-lg-5">
        <form onSubmit={handleSubmit} className="card card-body shadow-sm p-4">
          <h1 className="h3 mb-1">Login</h1>
          <p className="text-body-secondary mb-4">Masuk ke akun BookSales-mu.</p>

          {location.state?.from && (
            <div className="alert alert-info py-2">Silakan login dulu untuk membuka halaman itu.</div>
          )}
          {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}

          <div className="mb-3">
            <label htmlFor="login-email" className="form-label">Email</label>
            <input
              type="email"
              id="login-email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="login-password" className="form-label">Password</label>
            <input
              type="password"
              id="login-password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>

          <p className="text-center text-body-secondary small mt-3 mb-0">
            Belum punya akun? <Link to="/register">Sign-up</Link>
          </p>
          <p className="text-center text-body-secondary small mt-2 mb-0">
            Akun admin contoh: <code>admin@booksales.com</code> / <code>admin123</code>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
