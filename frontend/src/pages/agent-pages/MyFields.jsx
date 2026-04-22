import RoleDashboardLayout from '../../components/layout/RoleDashboardLayout'
import { navigationByRole } from '../../components/layout/navigation'

export default function MyFields() {
  const handleLogout = () => {
    window.alert('Logout action goes here.')
  }

  return (
    <RoleDashboardLayout
      roleLabel="Agent"
      avatarName="Daniel Agent"
      navItems={navigationByRole.agent}
      onLogout={handleLogout}
    >
      <section className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_12px_30px_rgba(45,106,79,0.08)] lg:p-8">
        <p className="text-xs font-medium leading-[1.2] uppercase tracking-[0.14em] text-secondary">
          Agent Dashboard
        </p>
        <h1 className="mt-3 text-[3rem] font-bold leading-[1.2] tracking-[-0.02em] text-on-surface">Welcome back</h1>
        <p className="mt-4 max-w-2xl text-[1.125rem] font-normal leading-[1.6] text-neutral">
          This is your starter agent dashboard page. Add assigned field data,
          daily tasks, and reporting actions here.
        </p>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <h2 className="text-[1.5rem] font-semibold leading-[1.4] text-on-surface">Overview</h2>
          <p className="mt-3 text-base font-normal leading-[1.6] text-on-surface-variant">
            Replace this block with the agent summary content.
          </p>
        </div>

        <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <h2 className="text-[1.5rem] font-semibold leading-[1.4] text-on-surface">My Fields</h2>
          <p className="mt-3 text-base font-normal leading-[1.6] text-on-surface-variant">
            Use this area for assigned field metrics or quick actions.
          </p>
        </div>

        <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <h2 className="text-[1.5rem] font-semibold leading-[1.4] text-on-surface">Tasks</h2>
          <p className="mt-3 text-base font-normal leading-[1.6] text-on-surface-variant">
            Drop task updates, reminders, or reporting tools here.
          </p>
        </div>
      </section>
    </RoleDashboardLayout>
  )
}

