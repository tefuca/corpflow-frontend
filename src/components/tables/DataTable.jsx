import { useState } from 'react'
import { cn } from '@/utils/cn'
import { Search, Filter, Plus, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

export function DataTable({
  data,
  columns,
  keyExtractor,
  title,
  searchPlaceholder = 'Search...',
  onAdd,
  addLabel = 'Add',
  actions,
  emptyMessage = 'No data available',
  className,
}) {
  const [search, setSearch] = useState('')

  const filtered = search
    ? data.filter((row) =>
        columns.some((col) => {
          const val = row[col.key]
          return val && String(val).toLowerCase().includes(search.toLowerCase())
        })
      )
    : data

  return (
    <div className={cn('card-crms overflow-hidden', className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 border-b bg-muted/30">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-crms pl-8 w-48 text-xs"
            />
          </div>
          <button className="btn-crms-icon btn-crms-ghost">
            <Filter className="w-4 h-4 text-muted-foreground" />
          </button>
          {onAdd && (
            <button onClick={onAdd} className="btn-crms-primary">
              <Plus className="w-4 h-4" /> {addLabel}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-crms">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={{ width: col.width }}>
                  {col.header}
                </th>
              ))}
              {actions && <th className="text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="py-12">
                  <div className="empty-state">
                    <Search className="empty-state-icon" />
                    <p className="empty-state-title">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((row, idx) => (
                <tr key={keyExtractor ? keyExtractor(row) : idx} className="group">
                  {columns.map((col) => (
                    <td key={col.key} className={col.className}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {actions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}