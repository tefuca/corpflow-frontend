import { useState } from 'react'
import { useResources } from '@/context/ResourceContext'
import { usePermission } from '@/hooks/usePermission'
import { DataTable } from '@/components/tables'
import { SectionHeader, SearchInput, Badge, Modal, ProgressBar } from '@/components/ui'
import { Plus, Pencil, Trash2, ArrowRightLeft } from 'lucide-react'

export default function BudgetPage() {
  const { budgets, projects } = useResources()
  const { can } = usePermission()
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = budgets.filter(b => b.name.toLowerCase().includes(search.toLowerCase()))

  const getUtilization = (budget) => {
    return ((budget.spent / budget.totalBudget) * 100).toFixed(1)
  }

  const getColor = (budget) => {
    const pct = budget.spent / budget.totalBudget
    if (pct > 0.9) return 'danger'
    if (pct > 0.7) return 'warning'
    return 'success'
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Budget Management" subtitle="Track budgets, commitments, and spending across projects" action={can('create') && (
        <button onClick={() => setShowModal(true)} className="btn btn-primary"><Plus className="w-4 h-4" /> Create budget</button>
      )} />
      <SearchInput value={search} onChange={setSearch} placeholder="Search budgets..." className="w-80" />
      <DataTable
        data={filtered}
        columns={[
          { key: 'id', header: 'ID', width: '140px' },
          { key: 'name', header: 'Budget Name' },
          { key: 'fiscalYear', header: 'Year', width: '80px', align: 'center' },
          { key: 'quarter', header: 'Qtr', width: '60px', align: 'center' },
          { key: 'totalBudget', header: 'Total', width: '140px', align: 'right', render: row => `$${row.totalBudget.toLocaleString()}` },
          { key: 'spent', header: 'Spent', width: '140px', align: 'right', render: row => `$${row.spent.toLocaleString()}` },
          { key: 'remaining', header: 'Remaining', width: '140px', align: 'right', render: row => <span className={row.remaining < 50000 ? 'text-destructive font-medium' : ''}>${row.remaining.toLocaleString()}</span> },
          { key: 'utilization', header: 'Utilization', width: '180px', render: row => <ProgressBar value={parseFloat(getUtilization(row))} max={100} size="sm" color={getColor(row)} showLabel /> },
          { key: 'status', header: 'Status', width: '120px', render: row => <Badge status={row.status} /> },
        ]}
        keyExtractor={row => row.id}
        actions={row => (
          <>
            <button className="btn btn-icon btn-sm"><Pencil className="w-4 h-4" /></button>
            {can('delete') && <button className="btn btn-icon btn-sm text-destructive"><Trash2 className="w-4 h-4" /></button>}
            <button className="btn btn-icon btn-sm" title="Allocate to project"><ArrowRightLeft className="w-4 h-4" /></button>
          </>
        )}
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Budget" footer={<><button className="btn btn-primary" onClick={() => setShowModal(false)}>Create</button><button className="btn" onClick={() => setShowModal(false)}>Cancel</button></>}>
        <div className="space-y-4">
          <div><label className="text-sm text-muted-foreground">Budget name</label><input className="input mt-1" placeholder="Q3 Capital Expenditure" /></div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="text-sm text-muted-foreground">Fiscal year</label><input className="input mt-1" type="number" defaultValue={2026} /></div>
            <div><label className="text-sm text-muted-foreground">Quarter</label><select className="select mt-1"><option>Q1</option><option>Q2</option><option>Q3</option><option>Q4</option></select></div>
            <div><label className="text-sm text-muted-foreground">Total amount</label><input className="input mt-1" type="number" /></div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
