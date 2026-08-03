const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('token')

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  if (res.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('currentRole')
    window.location.href = '/login'
    throw new Error('Session expired. Please log in again.')
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || `Request failed (${res.status})`)
  }

  if (res.status === 204) return null
  return res.json()
}

export const api = {
  get: (url) => fetchWithAuth(url, { method: 'GET' }),
  post: (url, body) => fetchWithAuth(url, { method: 'POST', body: JSON.stringify(body) }),
  put: (url, body) => fetchWithAuth(url, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (url, body) => fetchWithAuth(url, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (url) => fetchWithAuth(url, { method: 'DELETE' }),
}