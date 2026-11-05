import { useState } from 'react'

const emptyForm = { name: '', country: '', bio: '' }

function AdminAuthors({ authors, onAddAuthor }) {
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

    // Cegah nama author ganda (tanpa membedakan huruf besar/kecil)
    const exists = authors.some((a) => a.name.toLowerCase() === name.toLowerCase())
    if (exists) {
      setError(`Author "${name}" sudah ada.`)
      return
    }

    onAddAuthor({ name, country: form.country.trim(), bio: form.bio.trim() })
    setForm(emptyForm)
  }

  return (
    <>
      <h1 className="h3 mb-1">Author</h1>
      <p className="text-body-secondary mb-4">Kelola data penulis buku.</p>

      <div className="row g-4">
        {/* CREATE: form tambah author */}
        <div className="col-lg-4">
          <form onSubmit={handleSubmit} className="card shadow-sm border-0">
            <div className="card-header bg-body fw-semibold">Tambah Author</div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="author-name" className="form-label">Nama author</label>
                <input
                  type="text"
                  id="author-name"
                  name="name"
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="author-country" className="form-label">Asal negara</label>
                <input
                  type="text"
                  id="author-country"
                  name="country"
                  className="form-control"
                  value={form.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="author-bio" className="form-label">Bio singkat</label>
                <textarea
                  id="author-bio"
                  name="bio"
                  className="form-control"
                  rows="3"
                  value={form.bio}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Simpan Author</button>
            </div>
          </form>
        </div>

        {/* READ: tabel daftar author */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-body d-flex justify-content-between align-items-center">
              <span className="fw-semibold">Daftar Author</span>
              <span className="badge text-bg-secondary">{authors.length}</span>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" style={{ width: 60 }}>#</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Negara</th>
                    <th scope="col">Bio</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center text-body-secondary py-4">
                        Belum ada author.
                      </td>
                    </tr>
                  ) : (
                    authors.map((author, index) => (
                      <tr key={author.id}>
                        <td>{index + 1}</td>
                        <td className="fw-semibold">{author.name}</td>
                        <td>{author.country}</td>
                        <td className="text-body-secondary">{author.bio}</td>
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

export default AdminAuthors
