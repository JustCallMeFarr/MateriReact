import { Link, useLocation } from 'react-router-dom'
import useAuth from '../context/useAuth'
import { homePathFor } from '../services/authorizationService'

// Halaman 403: user sudah login, tetapi rolenya tidak punya akses ke halaman yang dituju.
function Forbidden() {
  const { user } = useAuth()
  const location = useLocation()
  const from = location.state?.from

  return (
    <section className="text-center py-5">
      <h1 className="display-1 fw-bold text-danger">403</h1>
      <h2 className="h4 mb-3">Akses ditolak</h2>
      <p className="text-body-secondary mb-4">
        {from ? <>Halaman <code>{from}</code> </> : 'Halaman ini '}
        tidak bisa dibuka oleh akun{user ? <> dengan role <strong>{user.role}</strong></> : ' ini'}.
      </p>
      <div className="d-flex justify-content-center gap-2">
        <Link to={homePathFor(user)} className="btn btn-primary">Kembali ke Beranda</Link>
        <Link to="/profile" className="btn btn-outline-secondary">Lihat hak akses saya</Link>
      </div>
    </section>
  )
}

export default Forbidden
