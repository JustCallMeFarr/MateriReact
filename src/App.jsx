import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Team from './pages/Team'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      {/* Layout route: tanpa path, hanya membungkus halaman-halaman di dalamnya */}
      <Route element={<MainLayout />}>
        {/* Index route: tampil di alamat induknya ("/") */}
        <Route index element={<Home />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        {/* Catch-all route: alamat yang tidak dikenal */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
