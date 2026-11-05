import { useState } from 'react'

const emptyForm = { name: '', country: '', bio: '' }

function AdminAuthors({ authors, onAddAuthor, onUpdateAuthor, onDeleteAuthor }) {
  // form: isian input | error: pesan validasi
  // editingId: id author yang sedang diedit (null = form dalam mode tambah)
  // confirmId: id author yang sedang menunggu konfirmasi hapus
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [confirmId, setConfirmId] = useState(null)

  const isEditing = editingId !== null

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setError('')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  // Tombol Edit: isi form dengan data baris yang dipilih
  const handleEdit = (author) => {
    setEditingId(author.id)
    setForm({ name: author.name, country: author.country, bio: author.bio })
    setConfirmId(null)
    setError('')
  }

  const handleDelete = (id) => {
    onDeleteAuthor(id)
    setConfirmId(null)
    // Kalau author yang sedang diedit dihapus, kosongkan form
    if (id === editingId) resetForm()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = form.name.trim()
    const data = { name, country: form.country.trim(), bio: form.bio.trim() }

    // Cegah nama ganda (tanpa membedakan huruf besar/kecil).
    // Saat edit, author yang sedang diedit tidak dihitung sebagai "ganda".
    const exists = authors.some(
      (a) => a.id !== editingId && a.name.toLowerCase() === name.toLowerCase(),
    )
    if (exists) {
      setError(`Author "${name}" sudah ada.`)
      return
    }

    if (isEditing) onUpdateAuthor(editingId, data)
    else onAddAuthor(data)
    resetForm()
  }

  return (
    <>
      <h1 className="h3 mb-1">Author</h1>
      <p className="text-body-secondary mb-4">Kelola data penulis buku.</p>

      <div className="row g-4">
        {/* CREATE dan UPDATE: satu form dipakai untuk dua mode */}
        <div className="col-lg-4">
          <form onSubmit={handleSubmit} className="card shadow-sm border-0">
            <div className="card-header bg-body fw-semibold d-flex justify-content-between align-items-center">
              {isEditing ? 'Edit Author' : 'Tambah Author'}
              {isEditing && <span className="badge text-bg-warning">Mode edit</span>}
            </div>
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
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary flex-grow-1">
                  {isEditing ? 'Simpan Perubahan' : 'Simpan Author'}
                </button>
                {isEditing && (
                  <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                    Batal
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* READ: tabel daftar author, dengan tombol Edit dan Hapus di tiap baris */}
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
                    <th scope="col" className="text-end" style={{ width: 190 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-body-secondary py-4">
                        Belum ada author.
                      </td>
                    </tr>
                  ) : (
                    authors.map((author, index) => (
                      <tr
                        key={author.id}
                        className={author.id === editingId ? 'table-warning' : ''}
                      >
                        <td>{index + 1}</td>
                        <td className="fw-semibold">{author.name}</td>
                        <td>{author.country}</td>
                        <td className="text-body-secondary">{author.bio}</td>
                        <td className="text-end text-nowrap">
                          {confirmId === author.id ? (
                            <>
                              <span className="small me-2">Yakin?</span>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm me-1"
                                onClick={() => handleDelete(author.id)}
                              >
                                Ya, hapus
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => setConfirmId(null)}
                              >
                                Batal
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm me-1"
                                onClick={() => handleEdit(author)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => setConfirmId(author.id)}
                              >
                                Hapus
                              </button>
                            </>
                          )}
                        </td>
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
