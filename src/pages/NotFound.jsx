import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="text-center py-5">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="fs-5 text-body-secondary mb-4">
        Halaman yang kamu cari tidak ditemukan.
      </p>
      <Link to="/" className="btn btn-primary">
        Kembali ke Beranda
      </Link>
    </section>
  )
}

export default NotFound
