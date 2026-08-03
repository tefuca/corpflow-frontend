import { useState } from 'react'
import { SectionHeader } from '@/components/ui'
import { Save } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'CorpFlow Inc.',
    currency: 'USD',
    dateFormat: 'YYYY-MM-DD',
    fiscalYearStart: '01-01',
    autoApproveThreshold: 5000,
    paymentReminderDays: 3,
    emailNotifications: true,
    smsNotifications: false,
  })

  return (
    <div className="space-y-6">
      <SectionHeader title="Settings" subtitle="System configuration and preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <h3 className="font-semibold">General</h3>
          <div><label className="text-sm text-muted-foreground">Company name</label><input className="input mt-1" value={settings.companyName} onChange={e => setSettings({...settings, companyName: e.target.value})} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-muted-foreground">Currency</label><select className="select mt-1" value={settings.currency} onChange={e => setSettings({...settings, currency: e.target.value})}><option>USD</option><option>EUR</option><option>GBP</option></select></div>
            <div><label className="text-sm text-muted-foreground">Date format</label><select className="select mt-1" value={settings.dateFormat} onChange={e => setSettings({...settings, dateFormat: e.target.value})}><option>YYYY-MM-DD</option><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option></select></div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 space-y-4">
          <h3 className="font-semibold">Payment Workflow</h3>
          <div><label className="text-sm text-muted-foreground">Auto-approve threshold ($)</label><input className="input mt-1" type="number" value={settings.autoApproveThreshold} onChange={e => setSettings({...settings, autoApproveThreshold: parseInt(e.target.value)})} /></div>
          <div><label className="text-sm text-muted-foreground">Payment reminder (days before due)</label><input className="input mt-1" type="number" value={settings.paymentReminderDays} onChange={e => setSettings({...settings, paymentReminderDays: parseInt(e.target.value)})} /></div>
        </div>

        <div className="rounded-xl border bg-card p-5 space-y-4">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex items-center justify-between">
            <div><div className="font-medium">Email notifications</div><div className="text-sm text-muted-foreground">Receive alerts via email</div></div>
            <button onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})} className={`w-12 h-6 rounded-full transition-colors ${settings.emailNotifications ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-5 h-5 rounded-full bg-card shadow-sm transition-transform ${settings.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div><div className="font-medium">SMS notifications</div><div className="text-sm text-muted-foreground">Receive alerts via SMS</div></div>
            <button onClick={() => setSettings({...settings, smsNotifications: !settings.smsNotifications})} className={`w-12 h-6 rounded-full transition-colors ${settings.smsNotifications ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-5 h-5 rounded-full bg-card shadow-sm transition-transform ${settings.smsNotifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn btn-primary"><Save className="w-4 h-4" /> Save changes</button>
      </div>
    </div>
  )
}