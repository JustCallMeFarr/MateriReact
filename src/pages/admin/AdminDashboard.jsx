import { Link } from 'react-router-dom'

function AdminDashboard({ books, genres, authors }) {
  const stats = [
    { label: 'Buku', total: books.length, to: '/books', color: 'primary' },
    { label: 'Genre', total: genres.length, to: '/admin/genres', color: 'success' },
    { label: 'Author', total: authors.length, to: '/admin/authors', color: 'warning' },
  ]

  return (
    <>
      <h1 className="h3 mb-1">Dashboard</h1>
      <p className="text-body-secondary mb-4">Ringkasan data BookSales.</p>

      <div className="row row-cols-1 row-cols-md-3 g-3">
        {stats.map((s) => (
          <div className="col" key={s.label}>
            <Link to={s.to} className="text-decoration-none">
              <div className={`card shadow-sm border-0 border-start border-4 border-${s.color} h-100`}>
                <div className="card-body">
                  <div className="text-body-secondary small">Total {s.label}</div>
                  <div className="display-6 fw-bold text-body-emphasis">{s.total}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdminDashboard
