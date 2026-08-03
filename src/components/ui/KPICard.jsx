import { cn } from '@/utils/cn'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export function KPICard({ value, label, change, changeType = 'neutral', icon, className }) {
  return (
    <div className={cn('kpi-card', className)}>
      <div className="flex items-start justify-between">
        <div>
          <div className="kpi-value">{value}</div>
          <div className="kpi-label">{label}</div>
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      {change && (
        <div className={cn('kpi-change flex items-center gap-1', {
          'text-success': changeType === 'positive',
          'text-destructive': changeType === 'negative',
          'text-muted-foreground': changeType === 'neutral',
        })}>
          {changeType === 'positive' && <ArrowUpRight className="w-3 h-3" />}
          {changeType === 'negative' && <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      )}
    </div>
  )
}
