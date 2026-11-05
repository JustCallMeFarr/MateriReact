import { useState } from 'react'

const emptyForm = { name: '', description: '' }

function AdminGenres({ genres, onAddGenre }) {
  // form menyimpan isian input, error menyimpan pesan validasi
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = form.name.trim()

    // Cegah nama genre ganda (tanpa membedakan huruf besar/kecil)
    const exists = genres.some((g) => g.name.toLowerCase() === name.toLowerCase())
    if (exists) {
      setError(`Genre "${name}" sudah ada.`)
      return
    }

    onAddGenre({ name, description: form.description.trim() })
    setForm(emptyForm)
  }

  return (
    <>
      <h1 className="h3 mb-1">Genre</h1>
      <p className="text-body-secondary mb-4">Kelola kategori buku.</p>

      <div className="row g-4">
        {/* CREATE: form tambah genre */}
        <div className="col-lg-4">
          <form onSubmit={handleSubmit} className="card shadow-sm border-0">
            <div className="card-header bg-body fw-semibold">Tambah Genre</div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="genre-name" className="form-label">Nama genre</label>
                <input
                  type="text"
                  id="genre-name"
                  name="name"
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="genre-description" className="form-label">Deskripsi</label>
                <textarea
                  id="genre-description"
                  name="description"
                  className="form-control"
                  rows="3"
                  value={form.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Simpan Genre</button>
            </div>
          </form>
        </div>

        {/* READ: tabel daftar genre */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-body d-flex justify-content-between align-items-center">
              <span className="fw-semibold">Daftar Genre</span>
              <span className="badge text-bg-secondary">{genres.length}</span>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" style={{ width: 60 }}>#</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  {genres.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-body-secondary py-4">
                        Belum ada genre.
                      </td>
                    </tr>
                  ) : (
                    genres.map((genre, index) => (
                      <tr key={genre.id}>
                        <td>{index + 1}</td>
                        <td className="fw-semibold">{genre.name}</td>
                        <td className="text-body-secondary">{genre.description}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminGenres
