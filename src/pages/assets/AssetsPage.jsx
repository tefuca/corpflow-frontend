import { useState } from 'react'
import { useResources } from '@/context/ResourceContext'
import { usePermission } from '@/hooks/usePermission'
import { DataTable } from '@/components/tables'
import { SectionHeader, SearchInput, Badge, Modal, ProgressBar } from '@/components/ui'
import { Plus, Pencil, Trash2, Wrench } from 'lucide-react'

export default function AssetsPage() {
  const { assets } = useResources()
  const { can } = usePermission()
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = assets.filter(a => a.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <SectionHeader title="Asset Management" subtitle="Track assets, depreciation, and maintenance schedules" action={can('create') && (
        <button onClick={() => setShowModal(true)} className="btn btn-primary"><Plus className="w-4 h-4" /> Register asset</button>
      )} />
      <SearchInput value={search} onChange={setSearch} placeholder="Search assets..." className="w-80" />
      <DataTable
        data={filtered}
        columns={[
          { key: 'id', header: 'ID', width: '100px' },
          { key: 'name', header: 'Asset' },
          { key: 'category', header: 'Category', width: '160px' },
          { key: 'location', header: 'Location', width: '140px' },
          { key: 'bookValue', header: 'Book Value', width: '140px', align: 'right', render: row => `$${row.bookValue.toLocaleString()}` },
          { key: 'depreciation', header: 'Depreciation', width: '160px', render: row => <ProgressBar value={((row.cost - row.bookValue) / row.cost) * 100} max={100} size="sm" /> },
          { key: 'status', header: 'Status', width: '120px', render: row => <Badge status={row.status} /> },
          { key: 'maintenanceDue', header: 'Maint. Due', width: '120px', render: row => <span className={new Date(row.maintenanceDue) < new Date('2026-08-01') ? 'text-warning font-medium' : ''}>{row.maintenanceDue}</span> },
        ]}
        keyExtractor={row => row.id}
        actions={row => (
          <>
            <button className="btn btn-icon btn-sm"><Pencil className="w-4 h-4" /></button>
            {can('delete') && <button className="btn btn-icon btn-sm text-destructive"><Trash2 className="w-4 h-4" /></button>}
            <button className="btn btn-icon btn-sm" title="Schedule maintenance"><Wrench className="w-4 h-4" /></button>
          </>
        )}
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Register Asset" footer={<><button className="btn btn-primary" onClick={() => setShowModal(false)}>Register</button><button className="btn" onClick={() => setShowModal(false)}>Cancel</button></>}>
        <div className="space-y-4">
          <div><label className="text-sm text-muted-foreground">Asset name</label><input className="input mt-1" placeholder="e.g. Excavator CAT 320" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-muted-foreground">Category</label><select className="select mt-1"><option>Heavy Machinery</option><option>IT Infrastructure</option><option>Transport</option></select></div>
            <div><label className="text-sm text-muted-foreground">Location</label><input className="input mt-1" placeholder="Site Alpha" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-muted-foreground">Purchase cost</label><input className="input mt-1" type="number" /></div>
            <div><label className="text-sm text-muted-foreground">Depreciation rate (%)</label><input className="input mt-1" type="number" /></div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
