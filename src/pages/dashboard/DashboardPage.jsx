import { cn } from '@/utils/cn'
import { useResources } from '@/context/ResourceContext'
import { SectionHeader } from '@/components/ui'
import { DataTable } from '@/components/tables'
import { Badge } from '@/components/ui'
import {
  Package, Briefcase, Users, DollarSign,
  TrendingUp, TrendingDown, ArrowRight,
  AlertTriangle, CheckCircle, Clock
} from 'lucide-react'

const kpiData = [
  { label: 'Stock Value', value: '$67K', change: '+12%', trend: 'up', icon: <Package className="w-5 h-5 text-blue-600" />, iconBg: 'bg-blue-50', alert: '2 items low/out', alertType: 'danger' },
  { label: 'Asset Book Value', value: '$309K', change: '+5%', trend: 'up', icon: <Briefcase className="w-5 h-5 text-purple-600" />, iconBg: 'bg-purple-50', alert: '2 maintenance due', alertType: 'danger' },
  { label: 'Monthly Payroll', value: '$36.9K', change: '+3%', trend: 'up', icon: <Users className="w-5 h-5 text-green-600" />, iconBg: 'bg-green-50', alert: '5 active staff', alertType: 'info' },
  { label: 'Total Budget', value: '$4.1M', change: '-2%', trend: 'down', icon: <DollarSign className="w-5 h-5 text-orange-600" />, iconBg: 'bg-orange-50', alert: '51% utilized', alertType: 'info' },
]

const opsData = [
  { label: 'Pending Approvals', value: '2', sub: '$5,900', icon: <Clock className="w-5 h-5 text-amber-600" />, iconBg: 'bg-amber-50', status: 'warning' },
  { label: 'Ready for Execution', value: '2', sub: 'Approved payments awaiting bank', icon: <CheckCircle className="w-5 h-5 text-emerald-600" />, iconBg: 'bg-emerald-50', status: 'success' },
  { label: 'Active Projects', value: '3', sub: '4 activities running', icon: <Briefcase className="w-5 h-5 text-blue-600" />, iconBg: 'bg-blue-50', status: 'info' },
  { label: 'Budgets Near Limit', value: '0', sub: 'Review required', icon: <AlertTriangle className="w-5 h-5 text-red-600" />, iconBg: 'bg-red-50', status: 'danger' },
]

export default function DashboardPage() {
  const { payments } = useResources()

  const recentPayments = payments.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Header */}
      <SectionHeader
        title="Dashboard"
        subtitle="Overview of your corporate resources and operations"
      />

      {/* Resource Flow */}
      <div className="card-crms p-5">
        <h3 className="text-sm font-semibold mb-4">Resource Flow</h3>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {['Stock', 'Assets', 'HR', 'Budget', 'Projects', 'Activities', 'Payments', 'Execution'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium border',
                i <= 4 ? 'bg-primary/5 text-primary border-primary/20' : 'bg-muted text-muted-foreground border-border'
              )}>
                {step}
              </span>
              {i < 7 && <ArrowRight className="w-3 h-3 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <div key={kpi.label} className="kpi-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="kpi-card-label">{kpi.label}</p>
                <p className="kpi-card-value">{kpi.value}</p>
              </div>
              <div className={cn('kpi-card-icon', kpi.iconBg)}>
                {kpi.icon}
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1">
                {kpi.trend === 'up' ? (
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                )}
                <span className={kpi.trend === 'up' ? 'kpi-card-trend-up' : 'kpi-card-trend-down'}>
                  {kpi.change}
                </span>
              </div>
              <span className={cn(
                'text-xs',
                kpi.alertType === 'danger' ? 'text-red-500 font-medium' : 'text-muted-foreground'
              )}>
                {kpi.alert}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Operations Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {opsData.map((op) => (
          <div key={op.label} className="card-crms-hover p-4 flex items-center gap-4">
            <div className={cn('p-2.5 rounded-lg', op.iconBg)}>
              {op.icon}
            </div>
            <div>
              <p className="text-lg font-bold">{op.value}</p>
              <p className="text-xs text-muted-foreground">{op.label}</p>
              <p className={cn(
                'text-xs mt-0.5',
                op.status === 'warning' ? 'text-amber-600' :
                op.status === 'success' ? 'text-emerald-600' :
                op.status === 'danger' ? 'text-red-600' : 'text-blue-600'
              )}>
                {op.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Payments */}
        <div className="lg:col-span-2">
          <DataTable
            title="Recent Payments"
            data={recentPayments}
            columns={[
              { key: 'id', header: 'Payment', width: '120px' },
              { key: 'trigger', header: 'Trigger', width: '140px', render: row => (
                <span className="text-xs px-2 py-0.5 rounded bg-muted">{row.trigger}</span>
              )},
              { key: 'projectId', header: 'Project/Activity', width: '160px', render: row => (
                <span className="text-xs text-muted-foreground">{row.projectId || '—'}</span>
              )},
              { key: 'amount', header: 'Amount', width: '120px', render: row => (
                <span className="font-mono text-sm font-medium">${row.amount.toLocaleString()}</span>
              )},
              { key: 'status', header: 'Status', width: '110px', render: row => <Badge status={row.status} /> },
            ]}
            keyExtractor={row => row.id}
            emptyMessage="No recent payments"
          />
        </div>

        {/* System Alerts */}
        <div className="card-crms p-5">
          <h3 className="text-sm font-semibold mb-4">System Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">2 stock items below reorder level</p>
                <p className="text-xs text-amber-600 mt-0.5">STK-003, STK-007 need restocking</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100">
              <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-orange-800">2 assets require maintenance soon</p>
                <p className="text-xs text-orange-600 mt-0.5">AST-002, AST-005 scheduled</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
              <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-emerald-800">Auto-payment PAY-2026-010 generated</p>
                <p className="text-xs text-emerald-600 mt-0.5">From AST-004 maintenance trigger</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}