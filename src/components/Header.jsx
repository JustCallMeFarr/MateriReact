import { NavLink } from 'react-router-dom'
import './Header.css'

const menus = [
  { to: '/', label: 'Home', end: true },
  { to: '/books', label: 'Book' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
]

function Header() {
  return (
    <header className="site-header d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
      <div className="col-md-3 mb-2 mb-md-0">
        <NavLink to="/" className="brand text-decoration-none">
          📚 BookSales
        </NavLink>
      </div>

      <nav className="col-12 col-md-auto mb-2 mb-md-0" aria-label="Navigasi utama">
        <ul className="nav justify-content-center gap-1">
          {menus.map((m) => (
            <li key={m.to}>
              <NavLink to={m.to} end={m.end} className="nav-item-link">
                {m.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="col-md-3 text-center text-md-end">
        <button type="button" className="btn btn-outline-primary me-2">Login</button>
        <button type="button" className="btn btn-primary">Sign-up</button>
      </div>
    </header>
  )
}

export default Header
