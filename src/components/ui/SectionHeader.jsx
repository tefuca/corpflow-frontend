import { cn } from '@/utils/cn'

export function SectionHeader({ title, subtitle, action, className }) {
  return (
    <div className={cn('section-header', className)}>
      <div>
        <h1 className="section-header-title">{title}</h1>
        {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  )
}