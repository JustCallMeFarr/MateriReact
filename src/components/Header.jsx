import { Link, NavLink } from 'react-router-dom'
import useAuth from '../context/useAuth'
import { ROLES } from '../services/authorizationService'
import './Header.css'

// roles kosong = menu untuk semua orang. Menu dengan roles hanya tampil untuk role itu.
const menus = [
  { to: '/', label: 'Home', end: true },
  { to: '/books', label: 'Book' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
  { to: '/profile', label: 'Profil', roles: [ROLES.ADMIN, ROLES.USER] },
  { to: '/admin', label: 'Admin', roles: [ROLES.ADMIN] },
]

function Header() {
  const { user, can } = useAuth()

  // Hanya tampilkan menu yang boleh dibuka oleh user saat ini
  const visibleMenus = menus.filter((m) => can(m.roles))

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
            <Link to="/profile" className="me-2 text-decoration-none">
              Halo, <strong>{user.name.split(' ')[0]}</strong>
            </Link>
            {/* Logout lewat halaman /logout supaya halaman terproteksi tidak salah mengarahkan */}
            <Link to="/logout" className="btn btn-outline-danger btn-sm">Logout</Link>
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
