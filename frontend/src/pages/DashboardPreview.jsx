import { useEffect, useMemo, useState } from 'react'
import RoleDashboardLayout from '../components/layout/RoleDashboardLayout'
import { navigationByRole } from '../components/layout/navigation'

const roleCopy = {
  admin: {
    roleLabel: 'Admin',
    avatarName: 'Amina Admin',
    heroTitle: 'Keep every field operation aligned',
    heroDescription:
      'Track performance, review field activity, and keep the whole farm team coordinated from one place.',
  },
  agent: {
    roleLabel: 'Agent',
    avatarName: 'Daniel Agent',
    heroTitle: 'Stay focused on your assigned fields',
    heroDescription:
      'Review your daily priorities, monitor crop status, and report progress while you are in the field.',
  },
}

function StatCard({ label, value, tone = 'default' }) {
  const toneClassName =
    tone === 'success'
      ? 'bg-secondary/20 text-tertiary'
      : tone === 'highlight'
        ? 'bg-primary text-on-primary'
        : 'bg-surface-container-low text-on-surface'

  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_12px_30px_rgba(45,106,79,0.08)]">
      <p className="text-xs font-medium leading-[1.2] uppercase tracking-[0.14em] text-on-surface-variant">
        {label}
      </p>
      <div className={`mt-4 inline-flex rounded-full px-4 py-2 ${toneClassName}`}>
        <span className="text-[1.5rem] font-semibold leading-[1.4]">{value}</span>
      </div>
    </div>
  )
}

export default function DashboardPreview() {
  const [role, setRole] = useState('admin')
  const [activeItem, setActiveItem] = useState('dashboard')

  const navItems = useMemo(() => navigationByRole[role], [role])
  const currentRoleCopy = roleCopy[role]
  const activeNavItem =
    navItems.find((item) => item.key === activeItem) ?? navItems[0]

  useEffect(() => {
    const currentItemExists = navItems.some((item) => item.key === activeItem)

    if (!currentItemExists) {
      setActiveItem(navItems[0].key)
    }
  }, [activeItem, navItems])

  const handleLogout = () => {
    window.alert('Logout action goes here.')
  }

  return (
    <RoleDashboardLayout
      roleLabel={currentRoleCopy.roleLabel}
      avatarName={currentRoleCopy.avatarName}
      navItems={navItems}
      activeItem={activeItem}
      onSelect={setActiveItem}
      onLogout={handleLogout}
    >
      <section className="rounded-3xl bg-surface-container-lowest p-6 shadow-[0_12px_30px_rgba(45,106,79,0.08)] lg:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-medium leading-[1.2] uppercase tracking-[0.14em] text-secondary">
              AgriTrack dashboard
            </p>
            <h1 className="mt-3 text-[3rem] font-bold leading-[1.2] tracking-[-0.02em] text-on-surface">
              {currentRoleCopy.heroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-[1.125rem] font-normal leading-[1.6] text-neutral">
              {currentRoleCopy.heroDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`rounded-full px-5 py-3 text-sm font-semibold leading-[1.2] tracking-[0.02em] transition-colors ${
                role === 'admin'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface hover:bg-secondary/20'
              }`}
            >
              Admin view
            </button>
            <button
              type="button"
              onClick={() => setRole('agent')}
              className={`rounded-full px-5 py-3 text-sm font-semibold leading-[1.2] tracking-[0.02em] transition-colors ${
                role === 'agent'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface hover:bg-secondary/20'
              }`}
            >
              Agent view
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active view" value={activeNavItem.label} tone="highlight" />
        <StatCard
          label={role === 'admin' ? 'Managed fields' : 'Assigned fields'}
          value={role === 'admin' ? '128' : '24'}
          tone="default"
        />
        <StatCard label="Activity today" value="36 updates" tone="success" />
        <StatCard label="System status" value="Stable" tone="default" />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_12px_30px_rgba(45,106,79,0.08)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium leading-[1.2] uppercase tracking-[0.14em] text-on-surface-variant">
                Navigation preview
              </p>
              <h2 className="mt-2 text-[2rem] font-semibold leading-[1.3] tracking-[-0.01em] text-on-surface">
                Reusable role-based sidebar
              </h2>
            </div>
            <span className="rounded-full bg-secondary/20 px-4 py-2 text-sm font-semibold leading-[1.2] tracking-[0.02em] text-tertiary">
              {currentRoleCopy.roleLabel}
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {navItems.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between rounded-2xl bg-surface px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold leading-[1.2] tracking-[0.02em] text-on-surface">{item.label}</span>
                </div>
                <span className="text-xs font-medium leading-[1.2] text-on-surface-variant">
                  {item.key === 'logout' ? 'Action' : 'Page'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_12px_30px_rgba(45,106,79,0.08)]">
          <p className="text-xs font-medium leading-[1.2] uppercase tracking-[0.14em] text-on-surface-variant">
            Top bar
          </p>
          <h2 className="mt-2 text-[2rem] font-semibold leading-[1.3] tracking-[-0.01em] text-on-surface">
            Avatar and quick actions
          </h2>
          <div className="mt-6 rounded-3xl bg-surface p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-on-primary">
                {currentRoleCopy.avatarName
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold leading-[1.2] tracking-[0.02em] text-on-surface">
                  {currentRoleCopy.avatarName}
                </p>
                <p className="text-xs font-medium leading-[1.2] text-on-surface-variant">
                  {currentRoleCopy.roleLabel} account
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-5 inline-flex items-center rounded-full bg-tertiary px-5 py-3 text-sm font-semibold leading-[1.2] tracking-[0.02em] text-on-tertiary transition-colors hover:bg-primary"
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </RoleDashboardLayout>
  )
}

