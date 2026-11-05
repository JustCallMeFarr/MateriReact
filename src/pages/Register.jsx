import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth'

const emptyForm = { name: '', email: '', password: '', confirm: '' }

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password.length < 6) {
      setError('Password minimal 6 karakter.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Konfirmasi password tidak sama.')
      return
    }
    const result = register(form)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate('/', { replace: true })
  }

  return (
    <div className="row justify-content-center py-4">
      <div className="col-md-6 col-lg-5">
        <form onSubmit={handleSubmit} className="card card-body shadow-sm p-4">
          <h1 className="h3 mb-1">Sign-up</h1>
          <p className="text-body-secondary mb-4">Buat akun baru di BookSales.</p>

          {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}

          <div className="mb-3">
            <label htmlFor="reg-name" className="form-label">Nama</label>
            <input
              type="text"
              id="reg-name"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reg-email" className="form-label">Email</label>
            <input
              type="email"
              id="reg-email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reg-password" className="form-label">Password</label>
            <input
              type="password"
              id="reg-password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reg-confirm" className="form-label">Ulangi password</label>
            <input
              type="password"
              id="reg-confirm"
              name="confirm"
              className="form-control"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Buat Akun</button>

          <p className="text-center text-body-secondary small mt-3 mb-0">
            Sudah punya akun? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
