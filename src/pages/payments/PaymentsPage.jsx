import { useState } from 'react'
import { useResources } from '@/context/ResourceContext'
import { usePermission } from '@/hooks/usePermission'
import { DataTable } from '@/components/tables'
import { SectionHeader, SearchInput, Badge, Modal } from '@/components/ui'
import { Plus, Pencil, Trash2, Eye, Download } from 'lucide-react'

export default function PaymentsPage() {
  const { payments } = useResources()
  const { can } = usePermission()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)

  const filtered = payments.filter(p => {
    const matchesSearch = p.vendor.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusOptions = [
    { label: 'All', value: 'all' },
    { label: 'Draft', value: 'draft' },
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Executed', value: 'executed' },
  ]

  return (
    <div className="space-y-6">
      <SectionHeader title="Payment Requests" subtitle="Manage and track all payment requests" action={
        <div className="flex gap-2">
          {can('create') && <button onClick={() => setShowModal(true)} className="btn btn-primary"><Plus className="w-4 h-4" /> New request</button>}
          <button className="btn"><Download className="w-4 h-4" /> Export</button>
        </div>
      } />
      <div className="flex gap-4 flex-wrap">
        <SearchInput value={search} onChange={setSearch} placeholder="Search payments..." className="w-80" />
        <select className="select w-40" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <DataTable
        data={filtered}
        columns={[
          { key: 'id', header: 'Request ID', width: '130px' },
          { key: 'vendor', header: 'Vendor' },
          { key: 'projectId', header: 'Project', width: '100px' },
          { key: 'activityId', header: 'Activity', width: '100px' },
          { key: 'amount', header: 'Amount', width: '130px', align: 'right', render: row => <span className="font-medium tabular-nums">${row.amount.toLocaleString()}</span> },
          { key: 'trigger', header: 'Trigger', width: '150px', render: row => <span className="resource-tag">{row.trigger}</span> },
          { key: 'status', header: 'Status', width: '110px', render: row => <Badge status={row.status} /> },
          { key: 'submitted', header: 'Submitted', width: '120px', render: row => <span className="text-muted-foreground text-xs">{row.submitted}</span> },
          { key: 'submitter', header: 'Submitter', width: '130px' },
          { key: 'approver', header: 'Approver', width: '130px', render: row => row.approver || '-' },
        ]}
        keyExtractor={row => row.id}
        actions={row => (
          <>
            <button className="btn btn-icon btn-sm"><Eye className="w-4 h-4" /></button>
            <button className="btn btn-icon btn-sm"><Pencil className="w-4 h-4" /></button>
            {can('delete') && <button className="btn btn-icon btn-sm text-destructive"><Trash2 className="w-4 h-4" /></button>}
          </>
        )}
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Payment Request" footer={<><button className="btn btn-primary" onClick={() => setShowModal(false)}>Submit</button><button className="btn" onClick={() => setShowModal(false)}>Cancel</button></>}>
        <div className="space-y-4">
          <div><label className="text-sm text-muted-foreground">Vendor</label><input className="input mt-1" placeholder="Vendor name" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-muted-foreground">Project</label><input className="input mt-1" placeholder="PRJ-001" /></div>
            <div><label className="text-sm text-muted-foreground">Activity</label><input className="input mt-1" placeholder="ACT-001" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-muted-foreground">Amount</label><input className="input mt-1" type="number" /></div>
            <div><label className="text-sm text-muted-foreground">Trigger type</label><select className="select mt-1"><option>stock-requisition</option><option>asset-maintenance</option><option>service-contract</option><option>payroll</option><option>manual</option></select></div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
