function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Terima kasih! Pesanmu sudah terkirim.')
    e.target.reset()
  }

  return (
    <div className="row g-5">
      <div className="col-md-5">
        <h1 className="mb-3">Hubungi Kami</h1>
        <p>Ada pertanyaan soal pesanan atau buku? Kirim pesan, kami balas secepatnya.</p>
        <ul className="list-unstyled">
          <li className="mb-2">📍 Jl. Contoh No. 123, Jakarta</li>
          <li className="mb-2">📞 +62 812 3456 7890</li>
          <li className="mb-2">✉️ halo@booksales.com</li>
        </ul>
      </div>

      <div className="col-md-7">
        <form onSubmit={handleSubmit} className="card card-body shadow-sm">
          <div className="mb-3">
            <label htmlFor="nama" className="form-label">Nama</label>
            <input type="text" className="form-control" id="nama" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="pesan" className="form-label">Pesan</label>
            <textarea className="form-control" id="pesan" rows="4" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Kirim</button>
        </form>
      </div>
    </div>
  )
}

export default Contact