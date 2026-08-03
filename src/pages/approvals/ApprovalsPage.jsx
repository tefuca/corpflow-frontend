import { useState } from 'react'
import { useResources } from '@/context/ResourceContext'
import { usePermission } from '@/hooks/usePermission'
import { DataTable } from '@/components/tables'
import { SectionHeader, Badge, KPICard } from '@/components/ui'
import { CheckCircle, XCircle, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ApprovalsPage() {
  const { payments, approvePayment, rejectPayment } = useResources()
  const { can } = usePermission()
  const [selectedIds, setSelectedIds] = useState([])

  const pendingPayments = payments.filter(p => p.status === 'pending')
  const approvedPayments = payments.filter(p => p.status === 'approved')

  const handleApprove = (id) => {
    approvePayment(id, 'Current User')
    toast.success(`Payment ${id} approved`)
  }

  const handleReject = (id) => {
    rejectPayment(id)
    toast.error(`Payment ${id} rejected`)
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Approval Queue" subtitle="Review and approve pending payment requests" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard value={String(pendingPayments.length)} label="Pending approvals" change={`$${pendingPayments.reduce((s, p) => s + p.amount, 0).toLocaleString()} total`} changeType="negative" />
        <KPICard value={String(approvedPayments.length)} label="Approved this month" change="Ready for execution" changeType="positive" />
        <KPICard value={String(pendingPayments.filter(p => {
          const days = Math.floor((new Date() - new Date(p.submitted)) / (1000 * 60 * 60 * 24))
          return days > 3
        }).length)} label="Overdue (>3 days)" change="Requires attention" changeType="negative" />
      </div>

      <DataTable
        data={pendingPayments}
        columns={[
          { key: 'id', header: 'Request ID', width: '130px' },
          { key: 'vendor', header: 'Vendor' },
          { key: 'projectId', header: 'Project', width: '100px' },
          { key: 'activityId', header: 'Activity', width: '100px' },
          { key: 'amount', header: 'Amount', width: '130px', align: 'right', render: row => <span className="font-medium tabular-nums">${row.amount.toLocaleString()}</span> },
          { key: 'trigger', header: 'Trigger', width: '150px', render: row => <span className="resource-tag">{row.trigger}</span> },
          { key: 'submitted', header: 'Submitted', width: '120px', render: row => <span className="text-muted-foreground text-xs">{row.submitted}</span> },
          { key: 'submitter', header: 'Submitter', width: '130px' },
          { key: 'daysPending', header: 'Days', width: '90px', align: 'center', render: row => {
            const days = Math.floor((new Date() - new Date(row.submitted)) / (1000 * 60 * 60 * 24))
            return <span className={days > 3 ? 'text-destructive font-medium' : ''}>{days}d</span>
          }},
        ]}
        keyExtractor={row => row.id}
        actions={row => (
          <>
            <button className="btn btn-icon btn-sm"><Eye className="w-4 h-4" /></button>
            {can('approve') && (
              <>
                <button onClick={() => handleApprove(row.id)} className="btn btn-sm btn-success"><CheckCircle className="w-4 h-4" /> Approve</button>
                <button onClick={() => handleReject(row.id)} className="btn btn-sm btn-danger"><XCircle className="w-4 h-4" /> Reject</button>
              </>
            )}
          </>
        )}
      />
    </div>
  )
}
