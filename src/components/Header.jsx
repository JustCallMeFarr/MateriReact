import { NavLink } from 'react-router-dom'

function Header() {
  const linkClass = ({ isActive }) =>
    'nav-link px-2' + (isActive ? ' active fw-bold' : '')

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div className="col-md-3 mb-2 mb-md-0">
        <NavLink to="/" className="fs-4 fw-bold text-decoration-none">
          📚 BookSales
        </NavLink>
      </div>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
        <li><NavLink to="/team" className={linkClass}>Team</NavLink></li>
        <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
      </ul>

      <div className="col-md-3 text-end">
        <button type="button" className="btn btn-outline-primary me-2">Login</button>
        <button type="button" className="btn btn-primary">Sign-up</button>
      </div>
    </header>
  )
}

export default Header