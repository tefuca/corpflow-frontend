// src/hooks/usePermission.js
import { useAuth } from '@/context/AuthContext'

export function usePermission() {
  const { user, hasPageAccess } = useAuth()

  const hasPermission = (perm) => {
    if (!user) return false

    // 1. Check granular permissions from backend
    const perms = user.permissions || user.role?.permissions || []
    if (perms.length > 0) {
      const found = perms.some(p =>
        p === perm ||
        p.code === perm ||
        p.name === perm ||
        p.page_code === perm ||
        p.permission_code === perm
      )
      if (found) return true
    }

    // 2. Fallback to page-level access check
    if (typeof hasPageAccess === 'function') {
      return hasPageAccess(perm)
    }

    // 3. Dev fallback — allow all if backend doesn't send permissions yet
    return true
  }

  const can = (perm) => hasPermission(perm)

  return { hasPermission, can }
}