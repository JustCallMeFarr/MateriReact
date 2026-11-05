import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Home'
import Book from './pages/Book'
import Team from './pages/Team'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminGenres from './pages/admin/AdminGenres'
import AdminAuthors from './pages/admin/AdminAuthors'
import initialBooks from './Utils/books'
import initialGenres from './Utils/genres'
import initialAuthors from './Utils/authors'

// Membuat id baru: id terbesar yang ada + 1
const nextId = (list) => (list.length ? Math.max(...list.map((item) => item.id)) + 1 : 1)

function App() {
  // State ditaruh di App supaya halaman toko dan halaman admin memakai data yang sama
  const [books, setBooks] = useState(initialBooks)
  const [genres, setGenres] = useState(initialGenres)
  const [authors, setAuthors] = useState(initialAuthors)

  const addBook = (newBook) => {
    setBooks((prev) => {
      const id = nextId(prev)
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

  const addGenre = (newGenre) => {
    setGenres((prev) => [...prev, { ...newGenre, id: nextId(prev) }])
  }

  const addAuthor = (newAuthor) => {
    setAuthors((prev) => [...prev, { ...newAuthor, id: nextId(prev) }])
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
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* Catch-all route: alamat yang tidak dikenal */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Tampilan Admin: layout sendiri dengan sidebar, semua alamatnya diawali /admin.
          Dibungkus ProtectedRoute: hanya user yang login dengan role admin yang boleh masuk. */}
      <Route
        path="admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard books={books} genres={genres} authors={authors} />} />
        <Route path="genres" element={<AdminGenres genres={genres} onAddGenre={addGenre} />} />
        <Route path="authors" element={<AdminAuthors authors={authors} onAddAuthor={addAuthor} />} />
      </Route>
    </Routes>
  )
}

export default App
