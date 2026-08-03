import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // ── Role State ──
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('currentRole') || ''
  })

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (token && savedUser) {
      try {
        const parsed = JSON.parse(savedUser)
        setUser(parsed)
        // Restore role from saved user or localStorage
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
      const data = await res.json().catch(() => ({}))
      throw new Error(data.message || `Login failed (${res.status})`)
    }

    const data = await res.json()
    const userData = data.user || data

    // Store token & user
    localStorage.setItem('token', data.access_token || data.token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)

    // Set initial role from backend response
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

  // ── Permission Check ──
  // Adjust this based on what your NestJS backend returns
  const hasPageAccess = (pageCode) => {
    if (!user) return false

    // Option 1: Backend returns permissions array on user
    // e.g., user.permissions = [{ page_code: 'payments', ... }, ...]
    const permissions = user.permissions || user.role?.permissions || []
    if (permissions.length > 0) {
      return permissions.some(p => 
        p.page_code === pageCode || 
        p.code === pageCode || 
        p === pageCode
      )
    }

    // Option 2: Backend returns role name and you want to hardcode mappings
    // (Uncomment and adjust if needed)
    /*
    const rolePages = {
      'System Admin': ['dashboard', 'resources', 'projects', 'payments', 'bulk-upload', 'master-data', 'users', 'audit', 'settings'],
      'Finance Manager': ['dashboard', 'payments', 'bulk-upload', 'audit'],
      'Finance Officer': ['dashboard', 'payments', 'bulk-upload'],
      'Cluster Contact': ['dashboard', 'resources', 'projects'],
      'Operation Lead': ['dashboard', 'projects', 'resources'],
      'Management': ['dashboard', 'reports', 'audit'],
      'Auditor': ['dashboard', 'audit'],
    }
    const allowed = rolePages[currentRole] || []
    return allowed.includes(pageCode)
    */

    // Option 3: Development fallback — allow all pages
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