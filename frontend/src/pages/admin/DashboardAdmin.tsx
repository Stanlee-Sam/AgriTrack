import { useState } from 'react'
import RoleDashboardLayout from '../../components/layout/RoleDashboardLayout'
import { navigationByRole } from '../../components/layout/navigation'

export default function DashboardAdmin() {
  const [activeItem, setActiveItem] = useState('dashboard')

  const handleLogout = () => {
    window.alert('Logout action goes here.')
  }

  return (
    <RoleDashboardLayout
      roleLabel="Admin"
      avatarName="Amina Admin"
      navItems={navigationByRole.admin}
      activeItem={activeItem}
      onSelect={setActiveItem}
      onLogout={handleLogout}
    >
      <section className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_12px_30px_rgba(45,106,79,0.08)] lg:p-8">
        <p className="text-caption uppercase tracking-[0.14em] text-secondary">
          Admin Dashboard
        </p>
        <h1 className="mt-3 text-h1 text-on-surface">Welcome back</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-neutral">
          This is your starter admin dashboard page. Add cards, tables, charts,
          and actions here.
        </p>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <h2 className="text-h3 text-on-surface">Overview</h2>
          <p className="mt-3 text-body-md text-on-surface-variant">
            Replace this block with your admin summary content.
          </p>
        </div>

        <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <h2 className="text-h3 text-on-surface">Fields</h2>
          <p className="mt-3 text-body-md text-on-surface-variant">
            Use this area for field metrics or quick actions.
          </p>
        </div>

        <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <h2 className="text-h3 text-on-surface">Activity</h2>
          <p className="mt-3 text-body-md text-on-surface-variant">
            Drop recent activity, alerts, or updates here.
          </p>
        </div>
      </section>
    </RoleDashboardLayout>
  )
}
