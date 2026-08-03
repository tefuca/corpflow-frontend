export const stockItems = [
  { id: 'STK-001', name: 'Cement (50kg bag)', sku: 'CEM-50', category: 'Construction', quantity: 2450, reorderLevel: 500, unitCost: 12.50, location: 'Warehouse A', status: 'active', projectAllocations: ['PRJ-001', 'PRJ-003'] },
  { id: 'STK-002', name: 'Steel Rebar 12mm', sku: 'SRB-12', category: 'Construction', quantity: 180, reorderLevel: 100, unitCost: 45.00, location: 'Warehouse B', status: 'active', projectAllocations: ['PRJ-001'] },
  { id: 'STK-003', name: 'Laptop Dell XPS 15', sku: 'LTP-DX15', category: 'IT Equipment', quantity: 12, reorderLevel: 5, unitCost: 1899.00, location: 'IT Store', status: 'active', projectAllocations: ['PRJ-002'] },
  { id: 'STK-004', name: 'Office Chairs (Ergonomic)', sku: 'CHR-ERG', category: 'Furniture', quantity: 8, reorderLevel: 10, unitCost: 320.00, location: 'Warehouse A', status: 'low', projectAllocations: [] },
  { id: 'STK-005', name: 'Network Switch 48-port', sku: 'NET-SW48', category: 'IT Equipment', quantity: 3, reorderLevel: 2, unitCost: 850.00, location: 'IT Store', status: 'active', projectAllocations: ['PRJ-002'] },
  { id: 'STK-006', name: 'Paint (20L bucket)', sku: 'PNT-20L', category: 'Construction', quantity: 0, reorderLevel: 20, unitCost: 85.00, location: 'Warehouse B', status: 'out', projectAllocations: [] },
]

export const assets = [
  { id: 'AST-001', name: 'Excavator CAT 320', category: 'Heavy Machinery', purchaseDate: '2024-03-15', cost: 185000, bookValue: 142000, depreciationRate: 15, location: 'Site Alpha', status: 'active', assignedProject: 'PRJ-001', assignedActivity: 'ACT-001', maintenanceDue: '2026-08-15' },
  { id: 'AST-002', name: 'Generator 50kVA', category: 'Power Equipment', purchaseDate: '2024-06-20', cost: 25000, bookValue: 21000, depreciationRate: 12, location: 'Site Beta', status: 'active', assignedProject: 'PRJ-003', assignedActivity: 'ACT-005', maintenanceDue: '2026-09-01' },
  { id: 'AST-003', name: 'Company Vehicle - Toyota Hilux', category: 'Transport', purchaseDate: '2023-01-10', cost: 35000, bookValue: 22000, depreciationRate: 20, location: 'HQ Garage', status: 'active', assignedProject: 'PRJ-004', assignedActivity: 'ACT-008', maintenanceDue: '2026-07-25' },
  { id: 'AST-004', name: 'CNC Machine', category: 'Manufacturing', purchaseDate: '2024-11-01', cost: 120000, bookValue: 108000, depreciationRate: 10, location: 'Factory Floor', status: 'maintenance', maintenanceDue: '2026-07-20' },
  { id: 'AST-005', name: 'Server Rack Dell R750', category: 'IT Infrastructure', purchaseDate: '2025-02-15', cost: 18000, bookValue: 16200, depreciationRate: 20, location: 'Data Center', status: 'active', assignedProject: 'PRJ-002', assignedActivity: 'ACT-003', maintenanceDue: '2026-10-10' },
]

export const employees = [
  { id: 'EMP-001', name: 'John Doe', department: 'Engineering', designation: 'Senior Engineer', salary: 85000, joinDate: '2022-05-10', status: 'active', assignedProject: 'PRJ-001', assignedActivity: 'ACT-001', utilization: 85 },
  { id: 'EMP-002', name: 'Sarah Chen', department: 'Finance', designation: 'Finance Manager', salary: 95000, joinDate: '2021-03-15', status: 'active', assignedProject: 'PRJ-001', assignedActivity: 'ACT-002', utilization: 90 },
  { id: 'EMP-003', name: 'Mike Ross', department: 'Operations', designation: 'Operation Lead', salary: 78000, joinDate: '2023-08-01', status: 'active', assignedProject: 'PRJ-003', assignedActivity: 'ACT-005', utilization: 75 },
  { id: 'EMP-004', name: 'Jane Smith', department: 'Engineering', designation: 'Engineer', salary: 65000, joinDate: '2024-01-20', status: 'active', assignedProject: 'PRJ-002', assignedActivity: 'ACT-003', utilization: 60 },
  { id: 'EMP-005', name: 'Tom Wilson', department: 'Management', designation: 'Project Director', salary: 120000, joinDate: '2020-11-05', status: 'active', assignedProject: 'PRJ-004', assignedActivity: 'ACT-008', utilization: 95 },
  { id: 'EMP-006', name: 'Lisa Park', department: 'HR', designation: 'HR Specialist', salary: 55000, joinDate: '2023-02-14', status: 'on-leave', utilization: 0 },
]

export const budgets = [
  { id: 'BUD-2026-001', name: 'Q3 Capital Expenditure', fiscalYear: 2026, quarter: 'Q3', totalBudget: 2500000, committed: 1850000, spent: 1420000, remaining: 1080000, projectIds: ['PRJ-001', 'PRJ-002'], status: 'active' },
  { id: 'BUD-2026-002', name: 'Q3 Operational Budget', fiscalYear: 2026, quarter: 'Q3', totalBudget: 800000, committed: 620000, spent: 480000, remaining: 320000, projectIds: ['PRJ-004'], status: 'active' },
  { id: 'BUD-2026-003', name: 'IT Infrastructure Reserve', fiscalYear: 2026, quarter: 'Q3', totalBudget: 500000, committed: 350000, spent: 210000, remaining: 290000, projectIds: ['PRJ-002'], status: 'active' },
  { id: 'BUD-2026-004', name: 'Emergency Fund', fiscalYear: 2026, quarter: 'Q3', totalBudget: 300000, committed: 50000, spent: 0, remaining: 300000, projectIds: [], status: 'reserved' },
]

export const projects = [
  { id: 'PRJ-001', name: 'Q3 Infrastructure Build', budgetId: 'BUD-2026-001', budget: 500000, spent: 320000, status: 'active', manager: 'John Doe', startDate: '2026-04-01', endDate: '2026-09-30', milestones: [{ name: 'Foundation', status: 'completed' }, { name: 'Structure', status: 'completed' }, { name: 'MEP Install', status: 'in-progress' }, { name: 'Finishing', status: 'pending' }], resources: { stockIds: ['STK-001', 'STK-002'], assetIds: ['AST-001'], employeeIds: ['EMP-001', 'EMP-002'] }, activityIds: ['ACT-001', 'ACT-002'] },
  { id: 'PRJ-002', name: 'Cloud Migration Phase 2', budgetId: 'BUD-2026-001', budget: 800000, spent: 450000, status: 'active', manager: 'Sarah Chen', startDate: '2026-05-01', endDate: '2026-12-31', milestones: [{ name: 'Assessment', status: 'completed' }, { name: 'Data Migration', status: 'completed' }, { name: 'App Migration', status: 'in-progress' }, { name: 'Cutover', status: 'pending' }, { name: 'Optimization', status: 'pending' }, { name: 'Decommission', status: 'pending' }], resources: { stockIds: ['STK-003', 'STK-005'], assetIds: ['AST-005'], employeeIds: ['EMP-004'] }, activityIds: ['ACT-003', 'ACT-004'] },
  { id: 'PRJ-003', name: 'Data Center Expansion', budgetId: 'BUD-2026-001', budget: 1200000, spent: 320000, status: 'on-hold', manager: 'Mike Ross', startDate: '2026-06-01', endDate: '2027-03-31', milestones: [{ name: 'Site Prep', status: 'completed' }, { name: 'Civil Works', status: 'pending' }, { name: 'Electrical', status: 'pending' }, { name: 'Cooling', status: 'pending' }, { name: 'Racking', status: 'pending' }, { name: 'Network', status: 'pending' }, { name: 'Testing', status: 'pending' }, { name: 'Go-live', status: 'pending' }], resources: { stockIds: [], assetIds: ['AST-002'], employeeIds: ['EMP-003'] }, activityIds: ['ACT-005', 'ACT-006'] },
  { id: 'PRJ-004', name: 'Security Audit & Compliance', budgetId: 'BUD-2026-002', budget: 150000, spent: 89000, status: 'active', manager: 'Tom Wilson', startDate: '2026-07-01', endDate: '2026-10-15', milestones: [{ name: 'Gap Analysis', status: 'completed' }, { name: 'Remediation', status: 'in-progress' }, { name: 'Certification', status: 'pending' }], resources: { stockIds: [], assetIds: ['AST-003'], employeeIds: ['EMP-005'] }, activityIds: ['ACT-007', 'ACT-008'] },
]

export const activities = [
  { id: 'ACT-001', name: 'Foundation concrete pour', projectId: 'PRJ-001', type: 'construction', budgetAllocated: 80000, spent: 72000, status: 'completed', resources: { stock: [{ itemId: 'STK-001', quantity: 600, unitCost: 12.50 }, { itemId: 'STK-002', quantity: 80, unitCost: 45.00 }], assetIds: ['AST-001'], employeeIds: ['EMP-001'] }, startDate: '2026-04-15', endDate: '2026-05-30' },
  { id: 'ACT-002', name: 'Budget reconciliation Q2', projectId: 'PRJ-001', type: 'administrative', budgetAllocated: 5000, spent: 3200, status: 'completed', resources: { stock: [], assetIds: [], employeeIds: ['EMP-002'] }, startDate: '2026-06-01', endDate: '2026-06-15' },
  { id: 'ACT-003', name: 'Server provisioning & config', projectId: 'PRJ-002', type: 'technical', budgetAllocated: 45000, spent: 38000, status: 'in-progress', resources: { stock: [{ itemId: 'STK-003', quantity: 8, unitCost: 1899.00 }, { itemId: 'STK-005', quantity: 2, unitCost: 850.00 }], assetIds: ['AST-005'], employeeIds: ['EMP-004'] }, startDate: '2026-07-01', endDate: '2026-07-25' },
  { id: 'ACT-004', name: 'Network redesign', projectId: 'PRJ-002', type: 'technical', budgetAllocated: 25000, spent: 0, status: 'pending', resources: { stock: [], assetIds: [], employeeIds: [] }, startDate: '2026-08-01', endDate: '2026-08-15' },
  { id: 'ACT-005', name: 'Site preparation & grading', projectId: 'PRJ-003', type: 'construction', budgetAllocated: 120000, spent: 95000, status: 'in-progress', resources: { stock: [], assetIds: ['AST-002'], employeeIds: ['EMP-003'] }, startDate: '2026-06-15', endDate: '2026-07-20' },
  { id: 'ACT-006', name: 'Permit application processing', projectId: 'PRJ-003', type: 'administrative', budgetAllocated: 3000, spent: 1500, status: 'in-progress', resources: { stock: [], assetIds: [], employeeIds: [] }, startDate: '2026-06-01', endDate: '2026-07-30' },
  { id: 'ACT-007', name: 'Vulnerability assessment', projectId: 'PRJ-004', type: 'technical', budgetAllocated: 35000, spent: 28000, status: 'completed', resources: { stock: [], assetIds: [], employeeIds: ['EMP-005'] }, startDate: '2026-07-01', endDate: '2026-07-15' },
  { id: 'ACT-008', name: 'Compliance documentation', projectId: 'PRJ-004', type: 'administrative', budgetAllocated: 15000, spent: 12000, status: 'in-progress', resources: { stock: [], assetIds: ['AST-003'], employeeIds: ['EMP-005'] }, startDate: '2026-07-16', endDate: '2026-08-15' },
]

export const payments = [
  { id: 'PAY-2026-001', vendor: 'Acme Building Supplies', amount: 8500, status: 'executed', projectId: 'PRJ-001', activityId: 'ACT-001', trigger: 'stock-requisition', submitted: '2026-05-20', submitter: 'John Doe', approver: 'Sarah Chen', executedDate: '2026-05-22', bankRef: 'BANK-REF-77821' },
  { id: 'PAY-2026-002', vendor: 'Beta Steel Corp', amount: 3600, status: 'executed', projectId: 'PRJ-001', activityId: 'ACT-001', trigger: 'stock-requisition', submitted: '2026-05-21', submitter: 'John Doe', approver: 'Sarah Chen', executedDate: '2026-05-23', bankRef: 'BANK-REF-77834' },
  { id: 'PAY-2026-003', vendor: 'Dell Technologies', amount: 15192, status: 'approved', projectId: 'PRJ-002', activityId: 'ACT-003', trigger: 'stock-requisition', submitted: '2026-07-10', submitter: 'Jane Smith', approver: 'Sarah Chen' },
  { id: 'PAY-2026-004', vendor: 'Cisco Systems', amount: 1700, status: 'pending', projectId: 'PRJ-002', activityId: 'ACT-003', trigger: 'stock-requisition', submitted: '2026-07-12', submitter: 'Jane Smith', approver: '' },
  { id: 'PAY-2026-005', vendor: 'HeavyRent Equipment', amount: 8500, status: 'executed', projectId: 'PRJ-003', activityId: 'ACT-005', trigger: 'asset-rental', submitted: '2026-06-25', submitter: 'Mike Ross', approver: 'Tom Wilson', executedDate: '2026-06-27', bankRef: 'BANK-REF-77912' },
  { id: 'PAY-2026-006', vendor: 'SecureAudit Partners', amount: 28000, status: 'executed', projectId: 'PRJ-004', activityId: 'ACT-007', trigger: 'service-contract', submitted: '2026-07-08', submitter: 'Tom Wilson', approver: 'Sarah Chen', executedDate: '2026-07-10', bankRef: 'BANK-REF-77945' },
  { id: 'PAY-2026-007', vendor: 'City Permits Office', amount: 1500, status: 'approved', projectId: 'PRJ-003', activityId: 'ACT-006', trigger: 'administrative-fee', submitted: '2026-06-20', submitter: 'Mike Ross', approver: 'Tom Wilson' },
  { id: 'PAY-2026-008', vendor: 'Global Logistics', amount: 4200, status: 'pending', projectId: 'PRJ-001', activityId: 'ACT-001', trigger: 'logistics', submitted: '2026-07-18', submitter: 'John Doe', approver: '' },
  { id: 'PAY-2026-009', vendor: 'Employee Payroll - July', amount: 125000, status: 'executed', projectId: 'PRJ-001', activityId: 'ACT-002', trigger: 'payroll', submitted: '2026-07-01', submitter: 'Sarah Chen', approver: 'Tom Wilson', executedDate: '2026-07-03', bankRef: 'BANK-REF-78001' },
  { id: 'PAY-2026-010', vendor: 'Maintenance Services Inc', amount: 3500, status: 'draft', projectId: 'PRJ-004', activityId: 'ACT-008', trigger: 'asset-maintenance', submitted: '2026-07-19', submitter: 'Tom Wilson', approver: '' },
]

export const executions = [
  { id: 'EXE-2026-001', paymentId: 'PAY-2026-001', amount: 8500, executionDate: '2026-05-22', method: 'Bank Transfer', bankRef: 'BANK-REF-77821', status: 'completed', vendor: 'Acme Building Supplies', projectId: 'PRJ-001' },
  { id: 'EXE-2026-002', paymentId: 'PAY-2026-002', amount: 3600, executionDate: '2026-05-23', method: 'Bank Transfer', bankRef: 'BANK-REF-77834', status: 'completed', vendor: 'Beta Steel Corp', projectId: 'PRJ-001' },
  { id: 'EXE-2026-003', paymentId: 'PAY-2026-005', amount: 8500, executionDate: '2026-06-27', method: 'Bank Transfer', bankRef: 'BANK-REF-77912', status: 'completed', vendor: 'HeavyRent Equipment', projectId: 'PRJ-003' },
  { id: 'EXE-2026-004', paymentId: 'PAY-2026-006', amount: 28000, executionDate: '2026-07-10', method: 'Wire Transfer', bankRef: 'BANK-REF-77945', status: 'completed', vendor: 'SecureAudit Partners', projectId: 'PRJ-004' },
  { id: 'EXE-2026-005', paymentId: 'PAY-2026-009', amount: 125000, executionDate: '2026-07-03', method: 'ACH Batch', bankRef: 'BANK-REF-78001', status: 'completed', vendor: 'Employee Payroll - July', projectId: 'PRJ-001' },
  { id: 'EXE-2026-006', paymentId: 'PAY-2026-003', amount: 15192, method: 'Bank Transfer', bankRef: '', status: 'scheduled', vendor: 'Dell Technologies', projectId: 'PRJ-002' },
  { id: 'EXE-2026-007', paymentId: 'PAY-2026-007', amount: 1500, method: 'Check', bankRef: '', status: 'scheduled', vendor: 'City Permits Office', projectId: 'PRJ-003' },
]

export const auditLogs = [
  { time: '2026-07-19 09:15', user: 'Sarah Chen', action: 'Approved payment PAY-2026-003 ($15,192)', type: 'approval' },
  { time: '2026-07-19 08:45', user: 'John Doe', action: 'Issued stock STK-001 x200 to PRJ-001/ACT-001', type: 'stock' },
  { time: '2026-07-19 08:30', user: 'System', action: 'Auto-triggered payment PAY-2026-010 from asset maintenance alert AST-004', type: 'system' },
  { time: '2026-07-18 17:00', user: 'Mike Ross', action: 'Assigned asset AST-002 to PRJ-003/ACT-005', type: 'asset' },
  { time: '2026-07-18 16:30', user: 'Jane Smith', action: 'Requisitioned stock STK-003 x8 for PRJ-002/ACT-003', type: 'stock' },
  { time: '2026-07-18 14:00', user: 'Tom Wilson', action: 'Allocated budget BUD-2026-002 $15K to ACT-008', type: 'budget' },
  { time: '2026-07-17 11:00', user: 'System', action: 'Payment PAY-2026-006 executed via wire transfer', type: 'system' },
  { time: '2026-07-16 09:30', user: 'Sarah Chen', action: 'Updated employee EMP-001 utilization to 85%', type: 'hr' },
]

export const users = [
  { id: 1, name: 'John Doe', email: 'john@corpflow.com', role: 'Finance Officer', status: 'active', lastLogin: '2026-07-19 08:30' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@corpflow.com', role: 'Finance Manager', status: 'active', lastLogin: '2026-07-19 07:45' },
  { id: 3, name: 'Mike Ross', email: 'mike@corpflow.com', role: 'Operation Lead', status: 'active', lastLogin: '2026-07-18 16:20' },
  { id: 4, name: 'Jane Smith', email: 'jane@corpflow.com', role: 'Cluster Contact', status: 'active', lastLogin: '2026-07-19 09:10' },
  { id: 5, name: 'Tom Wilson', email: 'tom@corpflow.com', role: 'Management', status: 'active', lastLogin: '2026-07-19 08:00' },
  { id: 6, name: 'Lisa Park', email: 'lisa@corpflow.com', role: 'Auditor', status: 'inactive', lastLogin: '2026-07-15 14:30' },
]

// src/data/mockData.js
export const masterData = {
  // Add your master data here
  departments: [],
  designations: [],
  // ... etc
};
