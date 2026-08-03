import { useState } from 'react'
import { DataTable } from '@/components/tables'
import { SectionHeader, Badge } from '@/components/ui'
import { Pencil } from 'lucide-react'

const vendors = [
  { id: 'VEN-001', name: 'Acme Corporation', code: 'VEN-001', country: 'USA', taxId: '12-3456789', bank: 'Chase Bank', status: 'active' },
  { id: 'VEN-002', name: 'Beta Solutions Ltd', code: 'VEN-002', country: 'UK', taxId: 'GB12345678', bank: 'Barclays', status: 'active' },
  { id: 'VEN-003', name: 'Gamma Industries', code: 'VEN-003', country: 'Germany', taxId: 'DE987654321', bank: 'Deutsche Bank', status: 'pending' },
  { id: 'VEN-004', name: 'Delta Inc', code: 'VEN-004', country: 'Canada', taxId: 'CA555555555', bank: 'RBC', status: 'suspended' },
]

export default function MasterDataPage() {
  const [activeTab, setActiveTab] = useState('vendors')

  const tabs = ['Vendors', 'Bank Accounts', 'Cost Centers', 'Payment Methods']

  return (
    <div className="space-y-6">
      <SectionHeader title="Master Data" subtitle="Manage vendors, bank accounts, and cost centers" />

      <div className="flex gap-1 border-b">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.toLowerCase().replace(' ', '-') ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-primary'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'vendors' && (
        <DataTable
          data={vendors}
          columns={[
            { key: 'name', header: 'Vendor Name' },
            { key: 'code', header: 'Code', width: '100px' },
            { key: 'country', header: 'Country', width: '100px' },
            { key: 'taxId', header: 'Tax ID', width: '140px' },
            { key: 'bank', header: 'Bank', width: '160px' },
            { key: 'status', header: 'Status', width: '120px', render: row => <Badge status={row.status} /> },
          ]}
          keyExtractor={row => row.id}
          actions={() => <button className="btn btn-icon btn-sm"><Pencil className="w-4 h-4" /></button>}
        />
      )}

      {activeTab !== 'vendors' && (
        <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
          {activeTab} management coming soon
        </div>
      )}
    </div>
  )
}