import { useState } from 'react'
import BookCard from '../components/BookCard'

const emptyForm = { title: '', author: '', year: '', description: '', image: '' }

function Book({ books, onAddBook }) {
  // Hooks: showForm mengatur tampil/sembunyinya form, form menyimpan isian input
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddBook({
      title: form.title.trim(),
      author: form.author.trim(),
      year: Number(form.year),
      description: form.description.trim(),
      image: form.image.trim(),
    })
    setForm(emptyForm)
    setShowForm(false)
  }

  return (
    <>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
        <h1 className="mb-0">Daftar Buku</h1>
        <button
          type="button"
          className={`btn ${showForm ? 'btn-outline-secondary' : 'btn-primary'}`}
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? 'Batal' : '+ Tambah Buku'}
        </button>
      </div>
      <p className="text-body-secondary mb-4">
        Total {books.length} buku tersedia di BookSales.
      </p>

      {showForm && (
        <form onSubmit={handleSubmit} className="card card-body shadow-sm mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="title" className="form-label">Judul</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="author" className="form-label">Penulis</label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={form.author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="year" className="form-label">Tahun</label>
              <input
                type="number"
                className="form-control"
                id="year"
                name="year"
                min="1900"
                max="2100"
                value={form.year}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <label htmlFor="description" className="form-label">Deskripsi</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={form.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="col-12">
              <label htmlFor="image" className="form-label">
                URL Gambar <span className="text-body-secondary">(opsional)</span>
              </label>
              <input
                type="url"
                className="form-control"
                id="image"
                name="image"
                placeholder="https://..."
                value={form.image}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Simpan Buku</button>
            </div>
          </div>
        </form>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {books.map((book) => (
          <div className="col" key={book.id}>
            <BookCard book={book} detail />
          </div>
        ))}
      </div>
    </>
  )
}

export default Book
