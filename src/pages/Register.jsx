import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth'
import FormField from '../components/form/FormField'
import PasswordStrength from '../components/form/PasswordStrength'
import { validateRegister } from '../Utils/validators'

const emptyForm = { name: '', email: '', username: '', password: '', confirm: '' }

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [values, setValues] = useState(emptyForm)
  const [touched, setTouched] = useState({}) // field yang sudah disentuh (blur)
  const [submitted, setSubmitted] = useState(false)
  const [serverErrors, setServerErrors] = useState({}) // email/username sudah dipakai

  // Error dihitung ulang dari isi form setiap render, jadi selalu sesuai dengan isian terbaru.
  // Pesan baru ditampilkan kalau field sudah disentuh atau tombol Daftar sudah ditekan.
  const errors = { ...validateRegister(values), ...serverErrors }
  const errorOf = (field) => (touched[field] || submitted ? errors[field] : '')

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    // Hapus pesan dari server untuk field ini (email/username sudah dipakai) karena isinya baru diubah
    setServerErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(validateRegister(values)).length > 0) return

    const result = register(values)
    if (!result.ok) {
      setServerErrors(result.errors)
      return
    }
    // Berhasil: ke halaman login, bawa username supaya bisa langsung dipakai
    navigate('/login', { replace: true, state: { registered: result.user.username } })
  }

  // Props yang sama untuk semua field, supaya JSX di bawah tidak berulang
  const fieldProps = (name) => ({
    id: `reg-${name}`,
    name,
    value: values[name],
    error: errorOf(name),
    onChange: handleChange,
    onBlur: handleBlur,
  })

  return (
    <>
      <h1 className="h2 fw-bold mb-1">Buat akun baru</h1>
      <p className="text-body-secondary mb-4">Isi data di bawah untuk mulai berbelanja.</p>

      <form onSubmit={handleSubmit} noValidate>
        <FormField
          {...fieldProps('name')}
          label="Nama lengkap"
          placeholder="Contoh: Farhan Maulana"
          autoComplete="name"
        />
        <FormField
          {...fieldProps('email')}
          type="email"
          label="Email"
          placeholder="nama@email.com"
          autoComplete="email"
        />
        <FormField
          {...fieldProps('username')}
          label="Username"
          placeholder="Contoh: farhan_m"
          hint="4-20 karakter: huruf, angka, atau underscore. Diawali huruf."
          autoComplete="username"
        />
        <FormField
          {...fieldProps('password')}
          type="password"
          label="Password"
          placeholder="Minimal 8 karakter"
          hint="Minimal 8 karakter, kombinasi huruf dan angka."
          autoComplete="new-password"
        >
          <PasswordStrength password={values.password} />
        </FormField>
        <FormField
          {...fieldProps('confirm')}
          type="password"
          label="Ulangi password"
          placeholder="Ketik ulang password"
          autoComplete="new-password"
        />

        <button type="submit" className="btn btn-primary btn-lg w-100 mt-2">
          Daftar
        </button>
      </form>

      <p className="text-center text-body-secondary mt-4 mb-0">
        Sudah punya akun? <Link to="/login" className="fw-semibold">Login</Link>
      </p>
    </>
  )
}

export default Register
