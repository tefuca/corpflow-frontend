import { useCallback } from 'react'
import { useResources } from '@/context/ResourceContext'

export function usePaymentGenerator() {
  const { payments, createPaymentFromResource } = useResources()

  const generatePaymentId = useCallback(() => {
    const nextNum = payments.length + 1
    return `PAY-2026-${String(nextNum).padStart(3, '0')}`
  }, [payments.length])

  const createPayment = useCallback((template, submitter) => {
    const newPayment = {
      id: generatePaymentId(),
      vendor: template.vendor,
      amount: template.amount,
      status: 'draft',
      projectId: template.projectId,
      activityId: template.activityId,
      trigger: template.trigger,
      submitted: new Date().toISOString().split('T')[0],
      submitter,
      approver: '',
    }
    return newPayment
  }, [generatePaymentId])

  const autoGenerateFromStock = useCallback((stockId, quantity, unitCost, vendor, projectId, activityId, submitter) => {
    const amount = quantity * unitCost
    const payment = createPayment({
      vendor,
      amount,
      projectId,
      activityId,
      trigger: 'stock-requisition',
    }, submitter)
    return payment
  }, [createPayment])

  const autoGenerateFromAsset = useCallback((assetId, maintenanceCost, vendor, projectId, activityId, submitter) => {
    const payment = createPayment({
      vendor,
      amount: maintenanceCost,
      projectId,
      activityId,
      trigger: 'asset-maintenance',
    }, submitter)
    return payment
  }, [createPayment])

  const autoGeneratePayroll = useCallback((employeeIds, totalAmount, projectId, activityId, submitter) => {
    const payment = createPayment({
      vendor: 'Payroll Services',
      amount: totalAmount,
      projectId,
      activityId,
      trigger: 'payroll',
    }, submitter)
    return payment
  }, [createPayment])

  const getPaymentsByTrigger = useCallback((trigger) => {
    return payments.filter(p => p.trigger === trigger)
  }, [payments])

  const getPaymentsByProject = useCallback((projectId) => {
    return payments.filter(p => p.projectId === projectId)
  }, [payments])

  const getPendingPayments = useCallback(() => {
    return payments.filter(p => p.status === 'pending')
  }, [payments])

  return {
    createPayment,
    autoGenerateFromStock,
    autoGenerateFromAsset,
    autoGeneratePayroll,
    getPaymentsByTrigger,
    getPaymentsByProject,
    getPendingPayments,
  }
}
