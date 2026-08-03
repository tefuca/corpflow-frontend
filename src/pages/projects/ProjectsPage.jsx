import { useState } from 'react'
import { useResources } from '@/context/ResourceContext'
import { usePermission } from '@/hooks/usePermission'
import { DataTable } from '@/components/tables'
import { SectionHeader, SearchInput, Badge, Modal, ProgressBar } from '@/components/ui'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'

export default function ProjectsPage() {
  const { projects, budgets } = useResources()
  const { can } = usePermission()
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const getBudget = (budgetId) => budgets.find(b => b.id === budgetId)

  return (
    <div className="space-y-6">
      <SectionHeader title="Projects" subtitle="Track project budgets, milestones, and resource allocations" action={can('create') && (
        <button onClick={() => setShowModal(true)} className="btn btn-primary"><Plus className="w-4 h-4" /> New project</button>
      )} />
      <SearchInput value={search} onChange={setSearch} placeholder="Search projects..." className="w-80" />
      <DataTable
        data={filtered}
        columns={[
          { key: 'id', header: 'ID', width: '100px' },
          { key: 'name', header: 'Project Name' },
          { key: 'manager', header: 'Manager', width: '140px' },
          { key: 'budget', header: 'Budget', width: '140px', align: 'right', render: row => `$${row.budget.toLocaleString()}` },
          { key: 'spent', header: 'Spent', width: '140px', align: 'right', render: row => `$${row.spent.toLocaleString()}` },
          { key: 'progress', header: 'Progress', width: '180px', render: row => {
            const completed = row.milestones.filter(m => m.status === 'completed').length
            const total = row.milestones.length
            return <ProgressBar value={(completed / total) * 100} max={100} size="sm" color={completed / total > 0.7 ? 'success' : completed / total > 0.3 ? 'warning' : 'default'} showLabel />
          }},
          { key: 'status', header: 'Status', width: '120px', render: row => <Badge status={row.status} /> },
          { key: 'resources', header: 'Resources', width: '200px', render: row => (
            <div className="flex gap-1 flex-wrap">
              {row.resources.stockIds.length > 0 && <span className="resource-tag">{row.resources.stockIds.length} stock</span>}
              {row.resources.assetIds.length > 0 && <span className="resource-tag">{row.resources.assetIds.length} assets</span>}
              {row.resources.employeeIds.length > 0 && <span className="resource-tag">{row.resources.employeeIds.length} staff</span>}
            </div>
          )},
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Project" footer={<><button className="btn btn-primary" onClick={() => setShowModal(false)}>Create</button><button className="btn" onClick={() => setShowModal(false)}>Cancel</button></>}>
        <div className="space-y-4">
          <div><label className="text-sm text-muted-foreground">Project name</label><input className="input mt-1" placeholder="e.g. Cloud Migration Phase 2" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-muted-foreground">Manager</label><input className="input mt-1" placeholder="John Doe" /></div>
            <div><label className="text-sm text-muted-foreground">Budget</label><select className="select mt-1"><option>Select budget...</option>{budgets.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-muted-foreground">Start date</label><input className="input mt-1" type="date" /></div>
            <div><label className="text-sm text-muted-foreground">End date</label><input className="input mt-1" type="date" /></div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
