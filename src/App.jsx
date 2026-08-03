import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/context/AuthContext'
import { ResourceProvider } from '@/context/ResourceContext'
import Layout from '@/components/layout/Layout'
import ProtectedRoute from '@/components/common/ProtectedRoute'

// Pages
import LoginPage from '@/pages/auth/LoginPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import StockPage from '@/pages/stock/StockPage'
import AssetsPage from '@/pages/assets/AssetsPage'
import HRPage from '@/pages/hr/HRPage'
import BudgetPage from '@/pages/budget/BudgetPage'
import ProjectsPage from '@/pages/projects/ProjectsPage'
import ActivitiesPage from '@/pages/activities/ActivitiesPage'
import PaymentsPage from '@/pages/payments/PaymentsPage'
import ApprovalsPage from '@/pages/approvals/ApprovalsPage'
import ExecutionPage from '@/pages/execution/ExecutionPage'
import BulkUploadPage from '@/pages/bulk/BulkUploadPage'
import MasterDataPage from '@/pages/masterdata/MasterDataPage'
import UsersPage from '@/pages/users/UsersPage'
import AuditPage from '@/pages/audit/AuditPage'
import SettingsPage from '@/pages/settings/SettingsPage'

function App() {
  return (
    <AuthProvider>
      <ResourceProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />  {/* ← ADD THIS LINE */}
            <Route path="stock" element={<StockPage />} />
            <Route path="assets" element={<AssetsPage />} />
            <Route path="hr" element={<HRPage />} />
            <Route path="budget" element={<BudgetPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="activities" element={<ActivitiesPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="approvals" element={<ApprovalsPage />} />
            <Route path="execution" element={<ExecutionPage />} />
            <Route path="bulk" element={<BulkUploadPage />} />
            <Route path="masterdata" element={<MasterDataPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="audit" element={<AuditPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </ResourceProvider>
    </AuthProvider>
  )
}

export default App