import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../context/useAuth'

// Penjaga halaman (protected route).
//   <ProtectedRoute>                        -> semua user yang sudah login
//   <ProtectedRoute roles={[ROLES.ADMIN]}>  -> hanya user dengan role tersebut
//
// Aturan:
//   belum login            -> diarahkan ke /login (halaman tujuan diingat di state "from")
//   login tapi role salah  -> diarahkan ke /forbidden (403)
//   boleh                  -> halamannya ditampilkan
function ProtectedRoute({ roles, children }) {
  const { user, can } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (!can(roles)) {
    return <Navigate to="/forbidden" replace state={{ from: location.pathname }} />
  }

  return children
}

export default ProtectedRoute
