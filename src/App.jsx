import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Book from './pages/Book'
import Team from './pages/Team'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import initialBooks from './Utils/books'

function App() {
  // State buku ditaruh di App supaya Home dan Book menampilkan data yang sama
  const [books, setBooks] = useState(initialBooks)

  const addBook = (newBook) => {
    setBooks((prev) => {
      const id = prev.length ? Math.max(...prev.map((b) => b.id)) + 1 : 1
      return [
        ...prev,
        {
          ...newBook,
          id,
          image: newBook.image || `https://picsum.photos/seed/book${id}/400/250`,
        },
      ]
    })
  }

  return (
    <Routes>
      {/* Layout route: tanpa path, hanya membungkus halaman-halaman di dalamnya */}
      <Route element={<MainLayout />}>
        {/* Index route: tampil di alamat induknya ("/") */}
        <Route index element={<Home books={books} />} />
        <Route path="books" element={<Book books={books} onAddBook={addBook} />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        {/* Catch-all route: alamat yang tidak dikenal */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
