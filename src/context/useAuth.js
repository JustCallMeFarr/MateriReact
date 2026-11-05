import { useContext } from 'react'
import AuthContext from './AuthContext'

// Hook pendek supaya komponen cukup menulis: const { user, login } = useAuth()
function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai di dalam <AuthProvider>')
  return ctx
}

export default useAuth
