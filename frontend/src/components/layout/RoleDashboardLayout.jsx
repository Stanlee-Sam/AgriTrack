import { useState } from 'react'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'

export default function RoleDashboardLayout({
  roleLabel,
  avatarName,
  navItems,
  activeItem,
  onSelect,
  onLogout,
  children,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const activeNavItem =
    navItems.find((item) => item.key === activeItem) ?? navItems[0]

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen">
        <Sidebar
          roleLabel={roleLabel}
          items={navItems}
          activeItem={activeNavItem.key}
          onSelect={onSelect}
          onLogout={onLogout}
          isMobileOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <TopNavbar
            roleLabel={roleLabel}
            avatarName={avatarName}
            activeLabel={activeNavItem.label}
            onMenuClick={() => setIsSidebarOpen(true)}
            onLogout={onLogout}
          />

          <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
