import { useState } from 'react'
import { SectionHeader } from '@/components/ui'
import { Upload, Download, FileSpreadsheet, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

export default function BulkUploadPage() {
  const [dragOver, setDragOver] = useState(false)
  const [uploadHistory] = useState([
    { date: 'Today, 08:30', action: 'Batch upload processed', details: '24 records imported, 2 warnings', status: 'success' },
    { date: 'Yesterday, 14:15', action: 'Batch upload processed', details: '156 records imported successfully', status: 'success' },
    { date: 'Jul 17, 09:00', action: 'Batch upload failed', details: 'Invalid column mapping — see error log', status: 'error' },
    { date: 'Jul 15, 16:45', action: 'Batch upload processed', details: '89 records imported successfully', status: 'success' },
  ])

  return (
    <div className="space-y-6">
      <SectionHeader title="Bulk Upload" subtitle="Upload payment requests via CSV/Excel" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className={`rounded-xl border-2 border-dashed p-10 text-center transition-colors ${dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false) }}>
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <div className="font-medium mb-1">Drag & drop your file here</div>
            <div className="text-sm text-muted-foreground">or <span className="text-primary underline cursor-pointer">browse files</span></div>
            <div className="text-xs text-muted-foreground mt-2">Supports .csv, .xlsx (max 10MB)</div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Templates</h3>
            <div className="flex gap-3">
              <button className="btn btn-sm"><Download className="w-4 h-4" /> CSV template</button>
              <button className="btn btn-sm"><Download className="w-4 h-4" /> Excel template</button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-medium mb-4">Upload History</h3>
          <div className="relative pl-6 space-y-6">
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" />
            {uploadHistory.map((item, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-6 top-1 w-3 h-3 rounded-full border-2 ${item.status === 'success' ? 'bg-success border-success' : item.status === 'error' ? 'bg-destructive border-destructive' : 'bg-warning border-warning'}`} />
                <div className="text-xs text-muted-foreground mb-0.5">{item.date}</div>
                <div className="text-sm font-medium">{item.action}</div>
                <div className="text-sm text-muted-foreground">{item.details}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h3 className="font-medium mb-4">Validation Rules</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border">
            <div className="font-medium text-sm mb-1">Required fields</div>
            <div className="text-sm text-muted-foreground">Vendor name, Amount, Project code, Bank account</div>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="font-medium text-sm mb-1">Amount limits</div>
            <div className="text-sm text-muted-foreground">Min $100, Max $5M per transaction</div>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="font-medium text-sm mb-1">Duplicate check</div>
            <div className="text-sm text-muted-foreground">Auto-flag duplicate vendor + amount within 30 days</div>
          </div>
        </div>
      </div>
    </div>
  )
}