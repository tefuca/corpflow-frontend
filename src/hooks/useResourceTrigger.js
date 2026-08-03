import { useCallback } from 'react'
import { useResources } from '@/context/ResourceContext'

export function useResourceTrigger() {
  const { assignResourceToProject, createPaymentFromResource, updateBudgetSpent } = useResources()

  const triggerResourceAllocation = useCallback((config) => {
    const { resourceType, resourceId, projectId, activityId, autoCreatePayment, paymentAmount, vendor } = config

    assignResourceToProject(resourceType, resourceId, projectId, activityId)

    if (autoCreatePayment && paymentAmount && vendor && activityId) {
      createPaymentFromResource(resourceType, resourceId, paymentAmount, vendor, projectId, activityId)
    }

    if (paymentAmount) {
      updateBudgetSpent(projectId, paymentAmount)
    }

    return {
      success: true,
      message: `${resourceType} ${resourceId} allocated to ${projectId}${activityId ? `/${activityId}` : ''}`,
    }
  }, [assignResourceToProject, createPaymentFromResource, updateBudgetSpent])

  const triggerStockRequisition = useCallback((stockId, quantity, projectId, activityId, unitCost, vendor) => {
    const amount = quantity * unitCost
    return triggerResourceAllocation({
      resourceType: 'stock',
      resourceId: stockId,
      projectId,
      activityId,
      autoCreatePayment: true,
      paymentAmount: amount,
      vendor,
    })
  }, [triggerResourceAllocation])

  const triggerAssetMaintenance = useCallback((assetId, projectId, activityId, cost, vendor) => {
    return triggerResourceAllocation({
      resourceType: 'asset',
      resourceId: assetId,
      projectId,
      activityId,
      autoCreatePayment: true,
      paymentAmount: cost,
      vendor,
    })
  }, [triggerResourceAllocation])

  const triggerPayroll = useCallback((employeeId, projectId, activityId, amount) => {
    return triggerResourceAllocation({
      resourceType: 'employee',
      resourceId: employeeId,
      projectId,
      activityId,
      autoCreatePayment: true,
      paymentAmount: amount,
      vendor: 'Payroll Services',
    })
  }, [triggerResourceAllocation])

  return {
    triggerResourceAllocation,
    triggerStockRequisition,
    triggerAssetMaintenance,
    triggerPayroll,
  }
}
