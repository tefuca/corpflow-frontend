import { useState } from 'react'
import { useResources } from '@/context/ResourceContext'
import { usePermission } from '@/hooks/usePermission'
import { DataTable } from '@/components/tables'
import { SectionHeader, SearchInput, Badge, Modal, ProgressBar } from '@/components/ui'
import { Plus, Pencil, Trash2, UserCheck } from 'lucide-react'

export default function HRPage() {
  const { employees } = useResources()
  const { can } = usePermission()
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <SectionHeader title="Human Resources" subtitle="Manage employees, assignments, and utilization" action={can('create') && (
        <button onClick={() => setShowModal(true)} className="btn btn-primary"><Plus className="w-4 h-4" /> Add employee</button>
      )} />
      <SearchInput value={search} onChange={setSearch} placeholder="Search employees..." className="w-80" />
      <DataTable
        data={filtered}
        columns={[
          { key: 'id', header: 'ID', width: '100px' },
          { key: 'name', header: 'Name' },
          { key: 'department', header: 'Department', width: '140px' },
          { key: 'designation', header: 'Designation', width: '160px' },
          { key: 'salary', header: 'Salary', width: '120px', align: 'right', render: row => `$${row.salary.toLocaleString()}` },
          { key: 'utilization', header: 'Utilization', width: '140px', render: row => <ProgressBar value={row.utilization} max={100} size="sm" color={row.utilization > 90 ? 'danger' : row.utilization > 70 ? 'warning' : 'success'} /> },
          { key: 'status', header: 'Status', width: '120px', render: row => <Badge status={row.status} /> },
          { key: 'assignedProject', header: 'Project', width: '120px', render: row => row.assignedProject || '-' },
        ]}
        keyExtractor={row => row.id}
        actions={row => (
          <>
            <button className="btn btn-icon btn-sm"><Pencil className="w-4 h-4" /></button>
            {can('delete') && <button className="btn btn-icon btn-sm text-destructive"><Trash2 className="w-4 h-4" /></button>}
            <button className="btn btn-icon btn-sm" title="Assign to project"><UserCheck className="w-4 h-4" /></button>
          </>
        )}
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Employee" footer={<><button className="btn btn-primary" onClick={() => setShowModal(false)}>Add</button><button className="btn" onClick={() => setShowModal(false)}>Cancel</button></>}>
        <div className="space-y-4">
          <div><label className="text-sm text-muted-foreground">Full name</label><input className="input mt-1" placeholder="John Doe" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-muted-foreground">Department</label><select className="select mt-1"><option>Engineering</option><option>Finance</option><option>Operations</option><option>HR</option><option>Management</option></select></div>
            <div><label className="text-sm text-muted-foreground">Designation</label><input className="input mt-1" placeholder="Senior Engineer" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-muted-foreground">Annual salary</label><input className="input mt-1" type="number" /></div>
            <div><label className="text-sm text-muted-foreground">Join date</label><input className="input mt-1" type="date" /></div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
