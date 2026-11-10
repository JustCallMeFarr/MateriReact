import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../context/useAuth'
import { homePathFor } from '../services/authorizationService'

// Kebalikan ProtectedRoute: halaman khusus tamu (login dan registrasi).
// User yang sudah login tidak perlu melihatnya, jadi langsung diarahkan:
// ke halaman yang tadi ingin dibuka (state "from"), atau ke halaman utama sesuai rolenya.
function GuestRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (user) {
    return <Navigate to={location.state?.from ?? homePathFor(user)} replace />
  }

  return children
}

export default GuestRoute
