import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('currentRole') || ''
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (token && savedUser) {
      try {
        const parsed = JSON.parse(savedUser)
        setUser(parsed)
        const roles = parsed.roles || (parsed.role ? [parsed.role] : [])
        const savedRole = localStorage.getItem('currentRole')
        setCurrentRole(savedRole || roles[0]?.name || roles[0] || '')
      } catch {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('currentRole')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData.message || `Login failed (${res.status})`)
    }

    const resBody = await res.json()
    console.log('🔑 Full login response:', resBody)

    // FIX: Unwrap the TransformInterceptor response
    const data = resBody.data || resBody
    console.log('📦 Unwrapped data:', data)
    
    const userData = data.user || data
    const token = data.access_token || data.token || data.accessToken
    
    if (!token) {
      console.error('❌ No token found. Full response:', resBody)
      throw new Error('Authentication failed: No token received from server')
    }
    
    console.log('✅ Token received:', token.substring(0, 30) + '...')
    
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)

    const roles = userData.roles || (userData.role ? [userData.role] : [])
    const initialRole = roles[0]?.name || roles[0] || currentRole || 'System Admin'
    setCurrentRole(initialRole)
    localStorage.setItem('currentRole', initialRole)

    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('currentRole')
    setUser(null)
    setCurrentRole('')
  }

  const switchRole = (role) => {
    setCurrentRole(role)
    localStorage.setItem('currentRole', role)
  }

  const hasPageAccess = (pageCode) => {
    if (!user) return false
    const permissions = user.permissions || user.role?.permissions || []
    if (permissions.length > 0) {
      return permissions.some(p => 
        p.page_code === pageCode || 
        p.code === pageCode || 
        p === pageCode
      )
    }
    return true
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      loading,
      isAuthenticated: !!user,
      currentRole,
      switchRole,
      hasPageAccess,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
