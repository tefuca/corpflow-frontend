import { useState } from 'react'
import { useResources } from '@/context/ResourceContext'
import { usePermission } from '@/hooks/usePermission'
import { DataTable } from '@/components/tables'
import { SectionHeader, Badge, KPICard, Modal } from '@/components/ui'
import { Play, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ExecutionPage() {
  const { executions, payments, executePayment } = useResources()
  const { can } = usePermission()
  const [showExecuteModal, setShowExecuteModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)

  const scheduled = payments.filter(p => p.status === 'approved')
  const completed = executions.filter(e => e.status === 'completed')

  const handleExecute = (paymentId, method, bankRef) => {
    executePayment(paymentId, method, bankRef)
    toast.success(`Payment ${paymentId} executed via ${method}`)
    setShowExecuteModal(false)
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Payment Execution" subtitle="Execute approved payments via bank transfer, wire, ACH, or check" />
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard value={String(scheduled.length)} label="Scheduled" change="Awaiting execution" changeType="warning" />
        <KPICard value={String(completed.length)} label="Completed today" change="All successful" changeType="positive" />
        <KPICard value={`$${completed.reduce((s, e) => s + e.amount, 0).toLocaleString()}`} label="Total executed" change="This month" changeType="positive" />
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h3 className="font-semibold mb-4">Scheduled Payments</h3>
        <DataTable
          data={scheduled}
          columns={[
            { key: 'id', header: 'Payment ID', width: '130px' },
            { key: 'vendor', header: 'Vendor' },
            { key: 'amount', header: 'Amount', width: '130px', align: 'right', render: row => <span className="font-medium tabular-nums">${row.amount.toLocaleString()}</span> },
            { key: 'projectId', header: 'Project', width: '100px' },
            { key: 'approver', header: 'Approved By', width: '130px' },
            { key: 'status', header: 'Status', width: '120px', render: row => <Badge status="approved" /> },
          ]}
          keyExtractor={row => row.id}
          actions={row => (
            <>
              {can('execute') && (
                <button onClick={() => { setSelectedPayment(row); setShowExecuteModal(true) }} className="btn btn-sm btn-primary">
                  <Play className="w-4 h-4" /> Execute
                </button>
              )}
            </>
          )}
        />
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h3 className="font-semibold mb-4">Execution History</h3>
        <DataTable
          data={executions}
          columns={[
            { key: 'id', header: 'Execution ID', width: '140px' },
            { key: 'paymentId', header: 'Payment ID', width: '130px' },
            { key: 'vendor', header: 'Vendor' },
            { key: 'amount', header: 'Amount', width: '130px', align: 'right', render: row => <span className="font-medium tabular-nums">${row.amount.toLocaleString()}</span> },
            { key: 'method', header: 'Method', width: '130px' },
            { key: 'bankRef', header: 'Bank Ref', width: '160px', render: row => row.bankRef || <span className="text-muted-foreground">Pending</span> },
            { key: 'executionDate', header: 'Date', width: '120px', render: row => row.executionDate || '-' },
            { key: 'status', header: 'Status', width: '110px', render: row => <Badge status={row.status} /> },
          ]}
          keyExtractor={row => row.id}
        />
      </div>

      <Modal isOpen={showExecuteModal} onClose={() => setShowExecuteModal(false)} title={`Execute Payment ${selectedPayment?.id}`} footer={
        <>
          <button className="btn btn-primary" onClick={() => handleExecute(selectedPayment.id, 'Bank Transfer', `BANK-REF-${Date.now()}`)}>Execute</button>
          <button className="btn" onClick={() => setShowExecuteModal(false)}>Cancel</button>
        </>
      }>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-muted-foreground">Vendor</label><div className="font-medium mt-1">{selectedPayment?.vendor}</div></div>
            <div><label className="text-sm text-muted-foreground">Amount</label><div className="font-medium mt-1">${selectedPayment?.amount.toLocaleString()}</div></div>
          </div>
          <div><label className="text-sm text-muted-foreground">Payment method</label><select className="select mt-1"><option>Bank Transfer</option><option>Wire Transfer</option><option>ACH Batch</option><option>Check</option></select></div>
          <div><label className="text-sm text-muted-foreground">Bank reference</label><input className="input mt-1" placeholder="BANK-REF-XXXXX" /></div>
        </div>
      </Modal>
    </div>
  )
}