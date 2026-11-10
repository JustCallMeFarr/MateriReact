import { useCallback, useMemo, useState } from 'react'
import AuthContext from './AuthContext'
import * as authService from '../services/authService'
import { ROLES, canAccess } from '../services/authorizationService'

// Penghubung antara service dan React: menyimpan user yang sedang login di state
// dan membagikannya ke seluruh halaman lewat hook useAuth().
function AuthProvider({ children }) {
  const [user, setUser] = useState(authService.getCurrentUser)

  const login = useCallback((identifier, password) => {
    const result = authService.login(identifier, password)
    if (result.ok) setUser(result.user)
    return result
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAdmin: user?.role === ROLES.ADMIN,
      can: (roles) => canAccess(user, roles), // cek hak akses user saat ini
      login,
      register: authService.register,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
