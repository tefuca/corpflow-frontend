import { useState } from 'react'
import { useResources } from '@/context/ResourceContext'
import { usePermission } from '@/hooks/usePermission'
import { DataTable } from '@/components/tables'
import { SectionHeader, Badge, Modal } from '@/components/ui'
import { CheckCircle, XCircle, Plus, Pencil, Eye, Trash2 } from 'lucide-react'

const tabs = [
  { key: 'users', label: 'Users' },
  { key: 'roles-permissions', label: 'Roles & Permissions' },
]

const roles = ['System Admin', 'Finance Manager', 'Finance Officer', 'Cluster Contact', 'Operation Lead', 'Management', 'Auditor']
const permissions = ['View all payments', 'Approve any payment', 'Edit users', 'Edit settings', 'Delete records']

const rolePermissions = {
  'System Admin': [true, true, true, true, true],
  'Finance Manager': [true, true, false, false, false],
  'Finance Officer': [false, false, false, false, false],
  'Cluster Contact': [false, false, false, false, false],
  'Operation Lead': [true, true, false, false, false],
  'Management': [true, true, false, false, false],
  'Auditor': [true, false, false, false, false],
}

export default function UsersPage() {
  const { users } = useResources()
  const { can } = usePermission()
  const [activeTab, setActiveTab] = useState('users')
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Users & Roles"
        subtitle="Manage users, roles, and permissions"
        action={can('edit') && (
          <button onClick={() => setShowModal(true)} className="btn-crms-primary">
            <Plus className="w-4 h-4" /> Add User
          </button>
        )}
      />

      {/* Tabs */}
      <div className="tabs-crms">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={activeTab === tab.key ? 'tab-crms-active' : 'tab-crms'}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <DataTable
          title="All Users"
          data={users}
          columns={[
            {
              key: 'name',
              header: 'User',
              render: (row) => (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    {row.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{row.name}</p>
                    <p className="text-xs text-muted-foreground">{row.email}</p>
                  </div>
                </div>
              ),
            },
            { key: 'role', header: 'Role', width: '160px', render: (row) => (
              <span className="text-xs px-2 py-0.5 rounded-md bg-muted font-medium">{row.role}</span>
            )},
            { key: 'department', header: 'Department', width: '130px', render: (row) => (
              <span className="text-xs text-muted-foreground">{row.department || '—'}</span>
            )},
            { key: 'status', header: 'Status', width: '110px', render: (row) => <Badge status={row.status} /> },
            { key: 'lastLogin', header: 'Last Login', width: '150px', render: (row) => (
              <span className="text-xs text-muted-foreground">{row.lastLogin}</span>
            )},
          ]}
          keyExtractor={(row) => row.id}
          actions={() => (
            <>
              <button className="btn-crms-icon-sm btn-crms-ghost">
                <Eye className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              {can('edit') && (
                <button className="btn-crms-icon-sm btn-crms-ghost">
                  <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}
              {can('delete') && (
                <button className="btn-crms-icon-sm btn-crms-ghost text-destructive">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          )}
          emptyMessage="No users found"
        />
      )}

      {/* Roles & Permissions Tab */}
      {activeTab === 'roles-permissions' && (
        <div className="card-crms p-5 overflow-x-auto">
          <table className="table-crms">
            <thead>
              <tr>
                <th className="min-w-[200px]">Permission</th>
                {roles.map((role) => (
                  <th key={role} className="text-center min-w-[100px] text-xs">
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm, i) => (
                <tr key={perm}>
                  <td className="py-3 px-4 text-sm font-medium">{perm}</td>
                  {roles.map((role) => (
                    <td key={role} className="text-center py-3 px-3">
                      {rolePermissions[role][i] ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add User Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New User"
        footer={
          <>
            <button onClick={() => setShowModal(false)} className="btn-crms-secondary">
              Cancel
            </button>
            <button onClick={() => setShowModal(false)} className="btn-crms-primary">
              Add User
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Full Name</label>
            <input className="input-crms mt-1" placeholder="John Doe" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <input className="input-crms mt-1" type="email" placeholder="john@corpflow.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Role</label>
              <select className="input-crms mt-1">
                {roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Department</label>
              <select className="input-crms mt-1">
                <option>Engineering</option>
                <option>Finance</option>
                <option>Operations</option>
                <option>HR</option>
                <option>Management</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}