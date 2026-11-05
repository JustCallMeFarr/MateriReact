import { Link, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../context/useAuth'

// Pembungkus halaman yang butuh login (dan role tertentu).
// <ProtectedRoute role="admin"> ... </ProtectedRoute>
function ProtectedRoute({ role, children }) {
  const { user } = useAuth()
  const location = useLocation()

  // Belum login: arahkan ke halaman login, ingat halaman tujuannya
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  // Sudah login tapi role tidak cocok
  if (role && user.role !== role) {
    return (
      <section className="text-center py-5 container">
        <h1 className="display-1 fw-bold">403</h1>
        <p className="fs-5 text-body-secondary mb-4">
          Halaman ini khusus {role}. Akunmu ({user.email}) tidak punya akses.
        </p>
        <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
      </section>
    )
  }

  return children
}

export default ProtectedRoute
