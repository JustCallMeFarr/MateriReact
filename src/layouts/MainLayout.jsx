import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

// Layout route: Header dan Footer dipakai bersama oleh semua halaman,
// sedangkan isi halaman dirender di posisi <Outlet />.
function MainLayout() {
  return (
    <div className="container d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
