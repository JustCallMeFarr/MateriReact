import { useState } from 'react'

const emptyForm = { name: '', description: '' }

function AdminGenres({ genres, onAddGenre, onUpdateGenre, onDeleteGenre }) {
  // form: isian input | error: pesan validasi
  // editingId: id genre yang sedang diedit (null = form dalam mode tambah)
  // confirmId: id genre yang sedang menunggu konfirmasi hapus
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
  const handleEdit = (genre) => {
    setEditingId(genre.id)
    setForm({ name: genre.name, description: genre.description })
    setConfirmId(null)
    setError('')
  }

  const handleDelete = (id) => {
    onDeleteGenre(id)
    setConfirmId(null)
    // Kalau genre yang sedang diedit dihapus, kosongkan form
    if (id === editingId) resetForm()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = form.name.trim()
    const data = { name, description: form.description.trim() }

    // Cegah nama ganda (tanpa membedakan huruf besar/kecil).
    // Saat edit, genre yang sedang diedit tidak dihitung sebagai "ganda".
    const exists = genres.some(
      (g) => g.id !== editingId && g.name.toLowerCase() === name.toLowerCase(),
    )
    if (exists) {
      setError(`Genre "${name}" sudah ada.`)
      return
    }

    if (isEditing) onUpdateGenre(editingId, data)
    else onAddGenre(data)
    resetForm()
  }

  return (
    <>
      <h1 className="h3 mb-1">Genre</h1>
      <p className="text-body-secondary mb-4">Kelola kategori buku.</p>

      <div className="row g-4">
        {/* CREATE dan UPDATE: satu form dipakai untuk dua mode */}
        <div className="col-lg-4">
          <form onSubmit={handleSubmit} className="card shadow-sm border-0">
            <div className="card-header bg-body fw-semibold d-flex justify-content-between align-items-center">
              {isEditing ? 'Edit Genre' : 'Tambah Genre'}
              {isEditing && <span className="badge text-bg-warning">Mode edit</span>}
            </div>
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
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary flex-grow-1">
                  {isEditing ? 'Simpan Perubahan' : 'Simpan Genre'}
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

        {/* READ: tabel daftar genre, dengan tombol Edit dan Hapus di tiap baris */}
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
                    <th scope="col" className="text-end" style={{ width: 190 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {genres.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center text-body-secondary py-4">
                        Belum ada genre.
                      </td>
                    </tr>
                  ) : (
                    genres.map((genre, index) => (
                      <tr
                        key={genre.id}
                        className={genre.id === editingId ? 'table-warning' : ''}
                      >
                        <td>{index + 1}</td>
                        <td className="fw-semibold">{genre.name}</td>
                        <td className="text-body-secondary">{genre.description}</td>
                        <td className="text-end text-nowrap">
                          {confirmId === genre.id ? (
                            <>
                              <span className="small me-2">Yakin?</span>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm me-1"
                                onClick={() => handleDelete(genre.id)}
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
                                onClick={() => handleEdit(genre)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => setConfirmId(genre.id)}
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

export default AdminGenres
