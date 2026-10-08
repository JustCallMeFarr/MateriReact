const books = [
  { id: 1, title: 'Pemrograman Web', price: 'Rp 85.000', img: 'https://picsum.photos/seed/book1/400/250' },
  { id: 2, title: 'Belajar React', price: 'Rp 95.000', img: 'https://picsum.photos/seed/book2/400/250' },
  { id: 3, title: 'Desain UI/UX', price: 'Rp 78.000', img: 'https://picsum.photos/seed/book3/400/250' },
]

function Home() {
  return (
    <>
      <section className="p-5 mb-4 bg-body-tertiary rounded-3 text-center">
        <h1 className="display-5 fw-bold">Selamat Datang di BookSales</h1>
        <p className="fs-5 col-md-8 mx-auto">
          Toko buku online dengan koleksi buku terbaik, harga terjangkau, dan
          pengiriman cepat ke seluruh Indonesia.
        </p>
        <button className="btn btn-primary btn-lg">Lihat Koleksi</button>
      </section>

      <h2 className="mb-3">Buku Terlaris</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {books.map((b) => (
          <div className="col" key={b.id}>
            <div className="card h-100 shadow-sm">
              <img src={b.img} className="card-img-top" alt={b.title} />
              <div className="card-body">
                <h5 className="card-title">{b.title}</h5>
                <p className="card-text text-primary fw-semibold">{b.price}</p>
                <button className="btn btn-outline-primary btn-sm">Beli</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home