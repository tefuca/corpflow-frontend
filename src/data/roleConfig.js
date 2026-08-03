export const ROLES = [
  'System Admin',
  'Finance Manager',
  'Finance Officer',
  'Cluster Contact',
  'Operation Lead',
  'Management',
  'Auditor',
]

export const ROLE_PERMISSIONS = {
  'System Admin': { viewAll: true, approveAny: true, editUsers: true, editSettings: true, deleteAny: true, executePayments: true },
  'Finance Manager': { viewAll: true, approveAny: true, editUsers: false, editSettings: false, deleteAny: false, executePayments: true },
  'Finance Officer': { viewAll: false, approveAny: false, editUsers: false, editSettings: false, deleteAny: false, executePayments: false },
  'Cluster Contact': { viewAll: false, approveAny: false, editUsers: false, editSettings: false, deleteAny: false, executePayments: false },
  'Operation Lead': { viewAll: true, approveAny: true, editUsers: false, editSettings: false, deleteAny: false, executePayments: false },
  'Management': { viewAll: true, approveAny: true, editUsers: false, editSettings: false, deleteAny: false, executePayments: true },
  'Auditor': { viewAll: true, approveAny: false, editUsers: false, editSettings: false, deleteAny: false, executePayments: false },
}

export const PAGE_ACCESS = {
  'System Admin': ['dashboard', 'stock', 'assets', 'hr', 'budget', 'projects', 'activities', 'payments', 'approvals', 'execution', 'bulk', 'masterdata', 'users', 'audit', 'settings'],
  'Finance Manager': ['dashboard', 'stock', 'assets', 'hr', 'budget', 'projects', 'activities', 'payments', 'approvals', 'execution', 'audit'],
  'Finance Officer': ['dashboard', 'stock', 'assets', 'hr', 'budget', 'projects', 'activities', 'payments', 'bulk'],
  'Cluster Contact': ['dashboard', 'stock', 'assets', 'projects', 'activities', 'payments'],
  'Operation Lead': ['dashboard', 'stock', 'assets', 'hr', 'projects', 'activities', 'payments', 'approvals'],
  'Management': ['dashboard', 'budget', 'projects', 'activities', 'approvals', 'execution', 'audit'],
  'Auditor': ['dashboard', 'stock', 'assets', 'hr', 'budget', 'projects', 'activities', 'payments', 'execution', 'audit'],
}

export const NAV_GROUPS = [
  { label: 'Resources', pages: ['stock', 'assets', 'hr', 'budget'] },
  { label: 'Operations', pages: ['projects', 'activities'] },
  { label: 'Finance', pages: ['payments', 'approvals', 'execution', 'bulk'] },
  { label: 'Admin', pages: ['masterdata', 'users', 'audit', 'settings'] },
]

export const NAV_ITEMS = [
  { page: 'stock', label: 'Stock Management', icon: 'Package', group: 'Resources' },
  { page: 'assets', label: 'Asset Management', icon: 'Briefcase', group: 'Resources' },
  { page: 'hr', label: 'Human Resources', icon: 'Users', group: 'Resources' },
  { page: 'budget', label: 'Budget Management', icon: 'DollarSign', group: 'Resources' },
  { page: 'projects', label: 'Projects', icon: 'FolderKanban', group: 'Operations' },
  { page: 'activities', label: 'Activities', icon: 'Activity', group: 'Operations' },
  { page: 'payments', label: 'Payment Requests', icon: 'CreditCard', group: 'Finance' },
  { page: 'approvals', label: 'Approvals', icon: 'FileCheck', group: 'Finance' },
  { page: 'execution', label: 'Payment Execution', icon: 'CheckCircle', group: 'Finance' },
  { page: 'bulk', label: 'Bulk Upload', icon: 'Upload', group: 'Finance' },
  { page: 'masterdata', label: 'Master Data', icon: 'Database', group: 'Admin' },
  { page: 'users', label: 'Users & Roles', icon: 'UserCog', group: 'Admin' },
  { page: 'audit', label: 'Audit Log', icon: 'Clock', group: 'Admin' },
  { page: 'settings', label: 'Settings', icon: 'Settings', group: 'Admin' },
]
