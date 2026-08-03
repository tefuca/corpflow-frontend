import { useCallback, useMemo } from 'react'
import { useResources } from '@/context/ResourceContext'

export function useBudgetCheck() {
  const { budgets, projects } = useResources()

  const checkBudgetAvailability = useCallback((projectId, requestedAmount) => {
    const project = projects.find(p => p.id === projectId)
    if (!project) return { available: false, reason: 'Project not found' }

    const budget = budgets.find(b => b.id === project.budgetId)
    if (!budget) return { available: false, reason: 'Budget not found' }

    const remaining = budget.totalBudget - budget.spent - budget.committed
    if (remaining < requestedAmount) {
      return { 
        available: false, 
        reason: `Insufficient budget. Available: $${remaining.toLocaleString()}, Requested: $${requestedAmount.toLocaleString()}`,
        budgetId: budget.id,
        remaining,
      }
    }

    return { 
      available: true, 
      budgetId: budget.id,
      remaining,
      totalBudget: budget.totalBudget,
      spent: budget.spent,
    }
  }, [budgets, projects])

  const getBudgetStatus = useCallback((budgetId) => {
    const budget = budgets.find(b => b.id === budgetId)
    if (!budget) return null

    const utilizationRate = (budget.spent / budget.totalBudget) * 100
    return {
      ...budget,
      utilizationRate,
      isNearLimit: utilizationRate > 80,
      isOverLimit: budget.spent > budget.totalBudget,
    }
  }, [budgets])

  const projectBudgets = useMemo(() => {
    return projects.map(project => {
      const budget = budgets.find(b => b.id === project.budgetId)
      return {
        project,
        budget,
        utilizationRate: budget ? (project.spent / budget.totalBudget) * 100 : 0,
      }
    })
  }, [projects, budgets])

  return {
    checkBudgetAvailability,
    getBudgetStatus,
    projectBudgets,
  }
}
