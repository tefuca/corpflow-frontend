import { Search, Bell, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/utils/cn'

export function Topbar() {
  const { currentRole } = useAuth()
  const [darkMode, setDarkMode] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search across all modules..." className="w-full pl-9 pr-4 py-1.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={cn('px-2.5 py-1 rounded-md text-xs font-medium', 'bg-primary/10 text-primary')}>{currentRole}</span>
        <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>
      </div>
    </header>
  )
}
