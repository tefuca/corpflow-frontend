import { cn } from '@/utils/cn'

export function ProgressBar({ value, max = 100, size = 'md', color = 'default', showLabel = false, className }) {
  const percentage = Math.min((value / max) * 100, 100)

  const sizeClasses = { sm: 'h-1.5', md: 'h-2', lg: 'h-3' }
  const colorClasses = { default: 'bg-primary', success: 'bg-success', warning: 'bg-warning', danger: 'bg-destructive' }

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full rounded-full bg-muted overflow-hidden', sizeClasses[size])}>
        <div className={cn('h-full rounded-full transition-all duration-500', colorClasses[color])} style={{ width: `${percentage}%` }} />
      </div>
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{value.toLocaleString()}</span>
          <span>{max.toLocaleString()}</span>
        </div>
      )}
    </div>
  )
}
