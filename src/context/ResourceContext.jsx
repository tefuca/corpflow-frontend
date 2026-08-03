import React, { createContext, useContext, useState, useCallback } from 'react'
import * as mockData from '@/data/mockData'

const ResourceContext = createContext(null)

export function ResourceProvider({ children }) {
  const [stockItems, setStockItems] = useState(mockData.stockItems)
  const [assets, setAssets] = useState(mockData.assets)
  const [employees, setEmployees] = useState(mockData.employees)
  const [budgets, setBudgets] = useState(mockData.budgets)
  const [projects, setProjects] = useState(mockData.projects)
  const [activities, setActivities] = useState(mockData.activities)
  const [payments, setPayments] = useState(mockData.payments)
  const [executions, setExecutions] = useState(mockData.executions)
  
  // ── NEW: Users, Audit Logs, and Master Data ──
  const [users, setUsers] = useState(mockData.users || [])
  const [auditLogs, setAuditLogs] = useState(mockData.auditLogs || [])
  const [masterData, setMasterData] = useState(mockData.masterData || {})

  const updateStock = useCallback((id, updates) => {
    setStockItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item))
  }, [])

  const updateAsset = useCallback((id, updates) => {
    setAssets(prev => prev.map(asset => asset.id === id ? { ...asset, ...updates } : asset))
  }, [])

  const assignResourceToProject = useCallback((resourceType, resourceId, projectId, activityId) => {
    if (resourceType === 'stock') {
      setStockItems(prev => prev.map(item => 
        item.id === resourceId 
          ? { ...item, projectAllocations: [...item.projectAllocations, projectId] }
          : item
      ))
    } else if (resourceType === 'asset') {
      setAssets(prev => prev.map(asset => 
        asset.id === resourceId 
          ? { ...asset, assignedProject: projectId, assignedActivity: activityId }
          : asset
      ))
    } else if (resourceType === 'employee') {
      setEmployees(prev => prev.map(emp => 
        emp.id === resourceId 
          ? { ...emp, assignedProject: projectId, assignedActivity: activityId }
          : emp
      ))
    }
  }, [])

  const createPaymentFromResource = useCallback((resourceType, resourceId, amount, vendor, projectId, activityId) => {
    const triggers = { stock: 'stock-requisition', asset: 'asset-maintenance', employee: 'payroll' }
    const newPayment = {
      id: `PAY-2026-${String(payments.length + 1).padStart(3, '0')}`,
      vendor,
      amount,
      status: 'draft',
      projectId,
      activityId,
      trigger: triggers[resourceType],
      submitted: new Date().toISOString().split('T')[0],
      submitter: 'Current User',
      approver: '',
    }
    setPayments(prev => [...prev, newPayment])
  }, [payments.length])

  const approvePayment = useCallback((paymentId, approver) => {
    setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, status: 'approved', approver } : p))
  }, [])

  const rejectPayment = useCallback((paymentId) => {
    setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, status: 'rejected' } : p))
  }, [])

  const executePayment = useCallback((paymentId, method, bankRef) => {
    const payment = payments.find(p => p.id === paymentId)
    if (!payment) return

    const newExecution = {
      id: `EXE-2026-${String(executions.length + 1).padStart(3, '0')}`,
      paymentId,
      amount: payment.amount,
      executionDate: new Date().toISOString().split('T')[0],
      method,
      bankRef,
      status: 'completed',
      vendor: payment.vendor,
      projectId: payment.projectId,
    }
    setExecutions(prev => [...prev, newExecution])
    setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, status: 'executed', executedDate: newExecution.executionDate, bankRef } : p))
  }, [payments, executions.length])

  const updateBudgetSpent = useCallback((budgetId, amount) => {
    setBudgets(prev => prev.map(b => {
      if (b.id !== budgetId) return b
      const newSpent = b.spent + amount
      return { ...b, spent: newSpent, remaining: b.totalBudget - newSpent }
    }))
  }, [])

  // ── NEW: User management functions ──
  const addUser = useCallback((userData) => {
    const newUser = {
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      ...userData,
      status: 'active',
      createdAt: new Date().toISOString(),
    }
    setUsers(prev => [...prev, newUser])
    return newUser
  }, [users.length])

  const updateUser = useCallback((id, updates) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u))
  }, [])

  const deleteUser = useCallback((id) => {
    setUsers(prev => prev.filter(u => u.id !== id))
  }, [])

  // ── NEW: Audit log functions ──
  const addAuditLog = useCallback((action, type = 'system', user = 'System') => {
    const newLog = {
      time: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).replace(',', ''),
      user,
      action,
      type,
    }
    setAuditLogs(prev => [newLog, ...prev])
  }, [])

  // ── NEW: Master data functions ──
  const updateMasterData = useCallback((category, data) => {
    setMasterData(prev => ({ ...prev, [category]: data }))
  }, [])

  const value = {
    // ── All existing data ──
    stockItems, assets, employees, budgets, projects, activities, payments, executions,
    
    // ── NEW data ──
    users, auditLogs, masterData,
    
    // ── All existing functions ──
    updateStock, updateAsset, assignResourceToProject, createPaymentFromResource,
    approvePayment, rejectPayment, executePayment, updateBudgetSpent,
    
    // ── NEW functions ──
    addUser, updateUser, deleteUser,
    addAuditLog,
    updateMasterData,
  }

  return <ResourceContext.Provider value={value}>{children}</ResourceContext.Provider>
}

export function useResources() {
  const context = useContext(ResourceContext)
  if (!context) throw new Error('useResources must be used within ResourceProvider')
  return context
}