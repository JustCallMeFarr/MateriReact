import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth'
import './AdminLayout.css'

const menus = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/genres', label: 'Genre', icon: '🏷️' },
  { to: '/admin/authors', label: 'Author', icon: '✍️' },
]

// Layout khusus Admin: sidebar di kiri, isi halaman di <Outlet />.
// Terpisah dari MainLayout, jadi tidak memakai Header dan Footer toko.
function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="admin-shell d-flex flex-column flex-md-row min-vh-100">
      <aside className="admin-sidebar p-3">
        <NavLink to="/admin" className="admin-brand d-block text-decoration-none mb-4">
          📚 BookSales <span className="badge text-bg-primary ms-1">Admin</span>
        </NavLink>

        <nav aria-label="Navigasi admin">
          <ul className="nav nav-pills flex-row flex-md-column gap-1">
            {menus.map((m) => (
              <li className="nav-item" key={m.to}>
                <NavLink to={m.to} end={m.end} className="nav-link admin-link">
                  <span className="me-2" aria-hidden="true">{m.icon}</span>
                  {m.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink to="/" className="admin-back d-inline-block mt-4 text-decoration-none">
          ← Kembali ke toko
        </NavLink>

        <div className="admin-user mt-4 pt-3 border-top border-secondary small">
          <div className="text-truncate">Masuk sebagai <strong>{user?.name}</strong></div>
          <button type="button" className="btn btn-outline-light btn-sm mt-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-content flex-grow-1 p-3 p-md-4">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
