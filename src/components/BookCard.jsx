// Kartu satu buku. Dipakai di halaman Home (ringkas) dan halaman Book (lengkap).
function BookCard({ book, detail = false }) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={book.image}
        className="card-img-top"
        alt={book.title}
        loading="lazy"
        style={{ height: 200, objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-subtitle mb-2 text-body-secondary">
          {book.author} · {book.year}
        </p>
        {detail && <p className="card-text">{book.description}</p>}
      </div>
    </div>
  )
}

export default BookCard
