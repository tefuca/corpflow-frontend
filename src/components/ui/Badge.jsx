import { cn } from '@/utils/cn'

const badgeVariants = {
  draft: 'badge-draft',
  pending: 'badge-pending',
  approved: 'badge-approved',
  rejected: 'badge-rejected',
  paid: 'badge-paid',
  executed: 'badge-executed',
  active: 'badge-active',
  inactive: 'badge-inactive',
  maintenance: 'badge-maintenance',
  'on-hold': 'badge-on-hold',
  completed: 'badge-completed',
  'in-progress': 'badge-in-progress',
  low: 'badge-low',
  out: 'badge-out',
  scheduled: 'badge-scheduled',
  reserved: 'badge-draft',
  'on-leave': 'badge-pending',
  terminated: 'badge-rejected',
}

export function Badge({ status, className }) {
  return (
    <span className={cn('badge-base', badgeVariants[status] || 'badge-draft', className)}>
      {status}
    </span>
  )
}