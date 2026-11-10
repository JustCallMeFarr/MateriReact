import { Link, Outlet } from 'react-router-dom'
import './AuthLayout.css'

const perks = [
  { icon: '📖', text: 'Ribuan judul buku pilihan' },
  { icon: '🚚', text: 'Pengiriman cepat ke seluruh Indonesia' },
  { icon: '💸', text: 'Harga terjangkau dan promo rutin' },
]

// Layout halaman login dan registrasi: panel sambutan di kiri, form (Outlet) di kanan.
// Di layar kecil panel sambutan menjadi banner di atas form.
function AuthLayout() {
  return (
    <div className="auth-page d-flex align-items-center justify-content-center p-3 p-md-4">
      <div className="auth-card card border-0 shadow-lg overflow-hidden w-100">
        <div className="row g-0">
          <aside className="auth-aside col-lg-5 p-4 p-lg-5 text-white d-flex flex-column justify-content-between">
            <div>
              <Link to="/" className="auth-brand text-white text-decoration-none">
                📚 BookSales
              </Link>
              <h2 className="h3 fw-bold mt-4 mb-2">Temukan buku favoritmu.</h2>
              <p className="auth-aside-text mb-0">
                Bergabung dan nikmati kemudahan berbelanja buku online.
              </p>
            </div>

            <ul className="list-unstyled d-none d-lg-block mb-0 mt-5">
              {perks.map((perk) => (
                <li key={perk.text} className="d-flex align-items-center gap-3 mb-3">
                  <span className="auth-perk-icon" aria-hidden="true">{perk.icon}</span>
                  <span>{perk.text}</span>
                </li>
              ))}
            </ul>
          </aside>

          <main className="col-lg-7 p-4 p-lg-5 bg-body">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
