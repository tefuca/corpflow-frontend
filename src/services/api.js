const API_BASE = import.meta.env.VITE_API_URL || '/api'

class ApiService {
  async fetch(endpoint, options = {}) {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Auth
  async login(email, password) {
    return this.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async logout() {
    return this.fetch('/auth/logout', { method: 'POST' })
  }

  // Stock
  async getStockItems() { return this.fetch('/stock') }
  async createStockItem(item) { return this.fetch('/stock', { method: 'POST', body: JSON.stringify(item) }) }
  async updateStockItem(id, updates) { return this.fetch(`/stock/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }) }
  async deleteStockItem(id) { return this.fetch(`/stock/${id}`, { method: 'DELETE' }) }

  // Assets
  async getAssets() { return this.fetch('/assets') }
  async createAsset(asset) { return this.fetch('/assets', { method: 'POST', body: JSON.stringify(asset) }) }
  async updateAsset(id, updates) { return this.fetch(`/assets/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }) }

  // Employees
  async getEmployees() { return this.fetch('/employees') }
  async createEmployee(employee) { return this.fetch('/employees', { method: 'POST', body: JSON.stringify(employee) }) }
  async updateEmployee(id, updates) { return this.fetch(`/employees/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }) }

  // Budgets
  async getBudgets() { return this.fetch('/budgets') }
  async createBudget(budget) { return this.fetch('/budgets', { method: 'POST', body: JSON.stringify(budget) }) }
  async updateBudget(id, updates) { return this.fetch(`/budgets/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }) }

  // Projects
  async getProjects() { return this.fetch('/projects') }
  async createProject(project) { return this.fetch('/projects', { method: 'POST', body: JSON.stringify(project) }) }
  async updateProject(id, updates) { return this.fetch(`/projects/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }) }

  // Activities
  async getActivities() { return this.fetch('/activities') }
  async createActivity(activity) { return this.fetch('/activities', { method: 'POST', body: JSON.stringify(activity) }) }
  async updateActivity(id, updates) { return this.fetch(`/activities/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }) }

  // Payments
  async getPayments() { return this.fetch('/payments') }
  async createPayment(payment) { return this.fetch('/payments', { method: 'POST', body: JSON.stringify(payment) }) }
  async updatePayment(id, updates) { return this.fetch(`/payments/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }) }
  async approvePayment(id, approver) { return this.fetch(`/payments/${id}/approve`, { method: 'POST', body: JSON.stringify({ approver }) }) }
  async rejectPayment(id) { return this.fetch(`/payments/${id}/reject`, { method: 'POST' }) }

  // Execution
  async getExecutions() { return this.fetch('/executions') }
  async executePayment(paymentId, method, bankRef) {
    return this.fetch('/executions', {
      method: 'POST',
      body: JSON.stringify({ paymentId, method, bankRef }),
    })
  }

  // Audit
  async getAuditLogs() { return this.fetch('/audit-logs') }

  // Bulk Upload
  async uploadBulkPayments(file) {
    const formData = new FormData()
    formData.append('file', file)
    return this.fetch('/payments/bulk-upload', { method: 'POST', body: formData })
  }

  // Dashboard
  async getDashboardStats() {
    return this.fetch('/dashboard/stats')
  }
}

export const api = new ApiService()
