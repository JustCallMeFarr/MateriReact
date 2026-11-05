import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth'
import './Header.css'

const menus = [
  { to: '/', label: 'Home', end: true },
  { to: '/books', label: 'Book' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
  { to: '/admin', label: 'Admin', adminOnly: true },
]

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Menu Admin hanya tampil kalau yang login dengan role admin
  const visibleMenus = menus.filter((m) => !m.adminOnly || user?.role === 'admin')

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="site-header d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
      <div className="col-md-3 mb-2 mb-md-0">
        <NavLink to="/" className="brand text-decoration-none">
          📚 BookSales
        </NavLink>
      </div>

      <nav className="col-12 col-md-auto mb-2 mb-md-0" aria-label="Navigasi utama">
        <ul className="nav justify-content-center gap-1">
          {visibleMenus.map((m) => (
            <li key={m.to}>
              <NavLink to={m.to} end={m.end} className="nav-item-link">
                {m.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="col-md-3 text-center text-md-end">
        {user ? (
          <>
            <span className="me-2 text-body-secondary">
              Halo, <strong>{user.name}</strong>
            </span>
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign-up</Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
