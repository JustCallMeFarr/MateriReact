import { createContext } from 'react'

// Context berisi data user yang sedang login beserta fungsi login, register, dan logout.
// Dibaca lewat hook useAuth() (lihat useAuth.js).
const AuthContext = createContext(null)

export default AuthContext
