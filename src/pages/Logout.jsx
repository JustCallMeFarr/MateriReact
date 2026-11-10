import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../context/useAuth'

// Halaman perantara untuk logout: menghapus sesi lalu langsung ke halaman login.
// Letaknya di luar ProtectedRoute, jadi tidak ada yang menganggap user "belum login
// dan mencoba membuka halaman terproteksi" ketika sesinya dihapus.
function Logout() {
  const { logout } = useAuth()

  useEffect(() => {
    logout()
  }, [logout])

  return <Navigate to="/login" replace />
}

export default Logout
