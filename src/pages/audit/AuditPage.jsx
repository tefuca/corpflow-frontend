import { cn } from '@/utils/cn'
import { useResources } from '@/context/ResourceContext'
import { SectionHeader } from '@/components/ui'
import {
  Clock, FileText, CheckCircle, XCircle, AlertTriangle,
  Box, Briefcase, Users, DollarSign, Filter, Download
} from 'lucide-react'

const typeIcons = {
  approval: <CheckCircle className="w-4 h-4 text-emerald-500" />,
  rejection: <XCircle className="w-4 h-4 text-red-500" />,
  system: <AlertTriangle className="w-4 h-4 text-amber-500" />,
  stock: <Box className="w-4 h-4 text-blue-500" />,
  asset: <Briefcase className="w-4 h-4 text-purple-500" />,
  hr: <Users className="w-4 h-4 text-green-500" />,
  budget: <DollarSign className="w-4 h-4 text-orange-500" />,
  create: <FileText className="w-4 h-4 text-primary" />,
  update: <FileText className="w-4 h-4 text-primary" />,
  delete: <XCircle className="w-4 h-4 text-red-500" />,
}

const typeLabels = {
  approval: 'Approval',
  rejection: 'Rejection',
  system: 'System',
  stock: 'Stock',
  asset: 'Asset',
  hr: 'HR',
  budget: 'Budget',
  create: 'Create',
  update: 'Update',
  delete: 'Delete',
}

export default function AuditPage() {
  const { auditLogs } = useResources()
  const logs = auditLogs || []

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Audit Log"
        subtitle="Track all system activities and changes"
        action={
          <div className="flex items-center gap-2">
            <button className="btn-crms-icon btn-crms-ghost">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="btn-crms-secondary">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        }
      />

      <div className="card-crms p-6">
        {logs.length === 0 ? (
          <div className="empty-state">
            <Clock className="empty-state-icon" />
            <p className="empty-state-title">No audit logs available</p>
          </div>
        ) : (
          <div className="timeline-container">
            <div className="timeline-line" />
            {logs.map((log, i) => (
              <div key={i} className="relative">
                <div className="timeline-dot" />
                <div className="flex items-start gap-4">
                  <div className="timeline-icon-box">
                    {typeIcons[log.type] || <Clock className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0 pb-2">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-semibold text-foreground">{log.user}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground font-mono">{log.time}</span>
                      <span className={cn(
                        'text-[10px] px-1.5 py-0.5 rounded border font-medium uppercase tracking-wider',
                        log.type === 'approval' && 'bg-emerald-50 text-emerald-700 border-emerald-200',
                        log.type === 'rejection' && 'bg-red-50 text-red-700 border-red-200',
                        log.type === 'system' && 'bg-amber-50 text-amber-700 border-amber-200',
                        log.type === 'create' && 'bg-blue-50 text-blue-700 border-blue-200',
                        log.type === 'update' && 'bg-blue-50 text-blue-700 border-blue-200',
                        log.type === 'delete' && 'bg-red-50 text-red-700 border-red-200',
                        !['approval','rejection','system','create','update','delete'].includes(log.type) && 'bg-muted text-muted-foreground border-border'
                      )}>
                        {typeLabels[log.type] || log.type}
                      </span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{log.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}