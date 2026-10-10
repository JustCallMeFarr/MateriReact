import { Link } from 'react-router-dom'
import BookCard from '../components/BookCard'

function Home({ books }) {
  return (
    <>
      <section className="p-5 mb-4 bg-body-tertiary rounded-3 text-center">
        <h1 className="display-5 fw-bold">Selamat Datang di BookSales</h1>
        <p className="fs-5 col-md-8 mx-auto">
          Toko buku online dengan koleksi buku terbaik, harga terjangkau, dan
          pengiriman cepat ke seluruh Indonesia.
        </p>
        <Link to="/books" className="btn btn-primary btn-lg">
          Lihat Koleksi
        </Link>
      </section>

      <h2 className="mb-3">Buku Terlaris</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {books.map((book) => (
          <div className="col" key={book.id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
