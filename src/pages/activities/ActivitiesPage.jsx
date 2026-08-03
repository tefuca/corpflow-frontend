import { useState } from 'react'
import { useResources } from '@/context/ResourceContext'
import { usePermission } from '@/hooks/usePermission'
import { DataTable } from '@/components/tables'
import { SectionHeader, SearchInput, Badge, Modal, ProgressBar } from '@/components/ui'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'

export default function ActivitiesPage() {
  const { activities, projects } = useResources()
  const { can } = usePermission()
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = activities.filter(a => a.name.toLowerCase().includes(search.toLowerCase()))

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId)
    return project ? project.name : projectId
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Activities" subtitle="Track activities, resource consumption, and budget allocation" action={can('create') && (
        <button onClick={() => setShowModal(true)} className="btn btn-primary"><Plus className="w-4 h-4" /> New activity</button>
      )} />
      <SearchInput value={search} onChange={setSearch} placeholder="Search activities..." className="w-80" />
      <DataTable
        data={filtered}
        columns={[
          { key: 'id', header: 'ID', width: '100px' },
          { key: 'name', header: 'Activity Name' },
          { key: 'projectId', header: 'Project', width: '180px', render: row => getProjectName(row.projectId) },
          { key: 'type', header: 'Type', width: '120px', render: row => <span className="resource-tag capitalize">{row.type}</span> },
          { key: 'budgetAllocated', header: 'Allocated', width: '120px', align: 'right', render: row => `$${row.budgetAllocated.toLocaleString()}` },
          { key: 'spent', header: 'Spent', width: '120px', align: 'right', render: row => `$${row.spent.toLocaleString()}` },
          { key: 'progress', header: 'Budget Used', width: '160px', render: row => <ProgressBar value={(row.spent / row.budgetAllocated) * 100} max={100} size="sm" color={row.spent / row.budgetAllocated > 0.9 ? 'danger' : row.spent / row.budgetAllocated > 0.7 ? 'warning' : 'success'} /> },
          { key: 'status', header: 'Status', width: '120px', render: row => <Badge status={row.status} /> },
          { key: 'resources', header: 'Resources', width: '200px', render: row => (
            <div className="flex gap-1 flex-wrap">
              {row.resources.stock.length > 0 && <span className="resource-tag">{row.resources.stock.length} items</span>}
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Activity" footer={<><button className="btn btn-primary" onClick={() => setShowModal(false)}>Create</button><button className="btn" onClick={() => setShowModal(false)}>Cancel</button></>}>
        <div className="space-y-4">
          <div><label className="text-sm text-muted-foreground">Activity name</label><input className="input mt-1" placeholder="e.g. Foundation concrete pour" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-muted-foreground">Project</label><select className="select mt-1"><option>Select project...</option>{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
            <div><label className="text-sm text-muted-foreground">Type</label><select className="select mt-1"><option>construction</option><option>technical</option><option>administrative</option></select></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-muted-foreground">Budget allocated</label><input className="input mt-1" type="number" /></div>
            <div><label className="text-sm text-muted-foreground">Duration</label><div className="grid grid-cols-2 gap-2"><input className="input" type="date" /><input className="input" type="date" /></div></div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
