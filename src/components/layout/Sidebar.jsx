import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { NAV_GROUPS, NAV_ITEMS } from '@/data/roleConfig'
import { cn } from '@/utils/cn'
import {
  LayoutDashboard, Package, Briefcase, Users, DollarSign,
  FolderKanban, Activity, CreditCard, FileCheck, CheckCircle,
  Upload, Database, UserCog, Clock, Settings, ChevronLeft,
  ChevronRight, Boxes, RefreshCw, LogOut
} from 'lucide-react'

const iconMap = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  DollarSign: <DollarSign className="w-5 h-5" />,
  FolderKanban: <FolderKanban className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  CreditCard: <CreditCard className="w-5 h-5" />,
  FileCheck: <FileCheck className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
  Upload: <Upload className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  UserCog: <UserCog className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  Boxes: <Boxes className="w-5 h-5" />,
}

export function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentRole, hasPageAccess, switchRole, user, logout } = useAuth()
  const [showRoleMenu, setShowRoleMenu] = useState(false)

  const currentPage = location.pathname.replace('/', '') || 'dashboard'

  const handleNavigate = (page) => {
    if (!hasPageAccess(page)) return
    navigate(`/${page}`)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className={cn('flex flex-col border-r bg-card transition-all duration-300 ease-in-out relative', collapsed ? 'w-16' : 'w-64')}>
      {/* ── Logo / System Name ── */}
      <div className="h-16 flex items-center gap-3 px-4 border-b flex-shrink-0">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Boxes className="w-5 h-5 text-primary" />
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-foreground leading-tight tracking-tight truncate">
              CRMS
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight truncate">
              Corporate Resource Mgmt
            </span>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        <button onClick={() => navigate('/')} className={cn('w-full flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg text-sm transition-colors', currentPage === 'dashboard' ? 'bg-muted text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-primary')}>
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Dashboard</span>}
        </button>

        {NAV_GROUPS.map((group) => {
          const groupItems = NAV_ITEMS.filter((item) => item.group === group.label && hasPageAccess(item.page))
          if (groupItems.length === 0) return null

          return (
            <div key={group.label} className="mt-4">
              {!collapsed && <div className="px-5 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">{group.label}</div>}
              {groupItems.map((item) => (
                <button key={item.page} onClick={() => handleNavigate(item.page)} className={cn('w-full flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg text-sm transition-colors', currentPage === item.page ? 'bg-muted text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-primary')}>
                  {iconMap[item.icon] || <Boxes className="w-5 h-5" />}
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {!collapsed && item.badge && <span className="ml-auto bg-warning/10 text-warning text-xs px-2 py-0.5 rounded-md">{item.badge}</span>}
                </button>
              ))}
            </div>
          )
        })}
      </nav>

      {/* ── User Profile & Logout ── */}
      <div className="border-t p-3 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium flex-shrink-0">
            {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{currentRole}</div>
              <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
            </div>
          )}
          <button onClick={() => setShowRoleMenu(!showRoleMenu)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground" title="Switch role">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {showRoleMenu && !collapsed && (
          <div className="mt-2 space-y-1">
            {['System Admin', 'Finance Manager', 'Finance Officer', 'Cluster Contact', 'Operation Lead', 'Management', 'Auditor'].map((role) => (
              <button key={role} onClick={() => { switchRole(role); setShowRoleMenu(false) }} className={cn('w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors', currentRole === role ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted')}>
                {role}
              </button>
            ))}
            <div className="border-t my-1" />
            <button 
              onClick={handleLogout} 
              className="w-full text-left px-3 py-1.5 rounded-md text-xs text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        )}
      </div>

      <button onClick={onToggle} className="absolute -right-3 top-20 w-6 h-6 bg-card border rounded-full flex items-center justify-center shadow-sm hover:bg-muted z-10">
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  )
}