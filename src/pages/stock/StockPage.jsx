import { useState, useEffect, useCallback } from 'react'
import { usePermission } from '@/hooks/usePermission'
import { DataTable } from '@/components/tables'
import { SectionHeader, SearchInput, Badge, Modal } from '@/components/ui'
import { api } from '@/lib/api'
import { toast } from 'react-hot-toast'
import { Plus, Pencil, Trash2, ArrowRightLeft, Loader2 } from 'lucide-react'

const EMPTY_FORM = {
  name: '',
  sku: '',
  category: 'Construction',
  quantity: '',
  reorderLevel: '',
  unitCost: '',
  location: '',
  status: 'in_stock',
}

export default function StockPage() {
  const { can } = usePermission()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)

  // ── Fetch stock items ──
  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.get('/stock')
      // Handle both { data: [...] } and flat [...]
      const list = Array.isArray(data) ? data : data.data || []
      setItems(list)
    } catch (err) {
      toast.error(err.message || 'Failed to load stock items')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  // ── Search filter ──
  const filtered = items.filter((s) =>
    (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.sku || '').toLowerCase().includes(search.toLowerCase())
  )

  // ── Modal helpers ──
  const openCreate = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setShowModal(true)
  }

  const openEdit = (row) => {
    setEditingId(row.id)
    setForm({
      name: row.name || '',
      sku: row.sku || '',
      category: row.category || 'Construction',
      quantity: row.quantity ?? '',
      reorderLevel: row.reorderLevel ?? '',
      unitCost: row.unitCost ?? '',
      location: row.location || '',
      status: row.status || 'in_stock',
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  // ── Form handlers ──
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.sku) {
      toast.error('Item name and SKU are required')
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        ...form,
        quantity: Number(form.quantity) || 0,
        reorderLevel: Number(form.reorderLevel) || 0,
        unitCost: Number(form.unitCost) || 0,
      }

      if (editingId) {
        await api.put(`/stock/${editingId}`, payload)
        toast.success('Stock item updated')
      } else {
        await api.post('/stock', payload)
        toast.success('Stock item created')
      }
      closeModal()
      fetchItems()
    } catch (err) {
      toast.error(err.message || 'Failed to save stock item')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete "${row.name}"? This cannot be undone.`)) return
    try {
      await api.delete(`/stock/${row.id}`)
      toast.success('Stock item deleted')
      fetchItems()
    } catch (err) {
      toast.error(err.message || 'Failed to delete stock item')
    }
  }

  // ── Render ──
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Stock Management"
        subtitle="Inventory, requisitions, and project allocations"
        action={
          can('STOCK.add') && (
            <button onClick={openCreate} className="btn btn-primary">
              <Plus className="w-4 h-4" /> New item
            </button>
          )
        }
      />

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search stock items..."
        className="w-80"
      />

      {loading ? (
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading stock items...
        </div>
      ) : (
        <DataTable
          data={filtered}
          columns={[
            { key: 'id', header: 'ID', width: '80px' },
            { key: 'name', header: 'Item' },
            { key: 'sku', header: 'SKU', width: '120px' },
            { key: 'category', header: 'Category', width: '140px' },
            { key: 'quantity', header: 'Qty', width: '80px', align: 'right' },
            {
              key: 'unitCost',
              header: 'Unit Cost',
              width: '120px',
              align: 'right',
              render: (row) => `$${Number(row.unitCost || 0).toFixed(2)}`,
            },
            { key: 'location', header: 'Location', width: '140px' },
            {
              key: 'status',
              header: 'Status',
              width: '120px',
              render: (row) => <Badge status={row.status} />,
            },
          ]}
          keyExtractor={(row) => row.id}
          actions={(row) => (
            <>
              {can('STOCK.edit') && (
                <button
                  onClick={() => openEdit(row)}
                  className="btn btn-icon btn-sm"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              )}
              {can('STOCK.delete') && (
                <button
                  onClick={() => handleDelete(row)}
                  className="btn btn-icon btn-sm text-destructive"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                className="btn btn-icon btn-sm"
                title="Allocate to project"
                onClick={() => toast('Project allocation coming soon')}
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </>
          )}
        />
      )}

      {/* ── Create / Edit Modal ── */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingId ? 'Edit Stock Item' : 'New Stock Item'}
        footer={
          <>
            <button
              className="btn btn-primary flex items-center gap-2"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingId ? 'Update' : 'Create'}
            </button>
            <button className="btn" onClick={closeModal}>
              Cancel
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Item name *</label>
            <input
              className="input mt-1"
              placeholder="e.g. Cement 50kg bag"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">SKU *</label>
              <input
                className="input mt-1"
                placeholder="SKU-001"
                value={form.sku}
                onChange={(e) => handleChange('sku', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Category</label>
              <select
                className="select mt-1"
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option>Construction</option>
                <option>IT Equipment</option>
                <option>Furniture</option>
                <option>Office Supplies</option>
                <option>Vehicle</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Quantity</label>
              <input
                className="input mt-1"
                type="number"
                min="0"
                value={form.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Reorder level</label>
              <input
                className="input mt-1"
                type="number"
                min="0"
                value={form.reorderLevel}
                onChange={(e) => handleChange('reorderLevel', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Unit cost</label>
              <input
                className="input mt-1"
                type="number"
                step="0.01"
                min="0"
                value={form.unitCost}
                onChange={(e) => handleChange('unitCost', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Location</label>
              <input
                className="input mt-1"
                placeholder="Warehouse A"
                value={form.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Status</label>
              <select
                className="select mt-1"
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="allocated">Allocated</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}