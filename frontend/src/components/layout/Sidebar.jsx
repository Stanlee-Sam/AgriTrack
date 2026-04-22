const baseItemClassName =
  'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors'

function SidebarNavItem({ item, isActive, onSelect }) {
  const Icon = item.icon

  return (
    <button
      type="button"
      onClick={() => onSelect(item.key)}
      className={`${baseItemClassName} ${
        isActive
          ? 'bg-primary text-on-primary shadow-sm'
          : 'text-neutral hover:bg-surface-container-low hover:text-primary'
      }`}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{item.label}</span>
    </button>
  )
}

function SidebarContent({ roleLabel, items, activeItem, onSelect, onLogout }) {
  return (
    <div className="flex h-full flex-col bg-surface-container-lowest">
      <div className="border-b border-outline-variant px-6 py-6">
        <p className="text-caption uppercase tracking-[0.14em] text-on-surface-variant">
          AgriTrack
        </p>
        <h1 className="mt-2 text-h3 text-on-surface">{roleLabel} Portal</h1>
        <p className="mt-1 text-sm text-neutral">Farm operations at a glance</p>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {items.map((item) => (
          <SidebarNavItem
            key={item.key}
            item={item}
            isActive={activeItem === item.key}
            onSelect={item.key === 'logout' ? onLogout : onSelect}
          />
        ))}
      </nav>

      <div className="border-t border-outline-variant px-6 py-4">
        <p className="text-caption text-on-surface-variant">
          Reliable tools for teams in the field.
        </p>
      </div>
    </div>
  )
}

export default function Sidebar({
  roleLabel,
  items,
  activeItem,
  onSelect,
  onLogout,
  isMobileOpen,
  onClose,
}) {
  return (
    <>
      <aside className="hidden h-screen w-72 shrink-0 border-r border-outline-variant bg-surface-container-lowest lg:flex">
        <SidebarContent
          roleLabel={roleLabel}
          items={items}
          activeItem={activeItem}
          onSelect={onSelect}
          onLogout={onLogout}
        />
      </aside>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close sidebar"
            className="absolute inset-0 bg-[#151c22]/45"
            onClick={onClose}
          />
          <aside className="relative z-10 h-full w-72 max-w-[85vw] border-r border-outline-variant bg-surface-container-lowest shadow-2xl">
            <SidebarContent
              roleLabel={roleLabel}
              items={items}
              activeItem={activeItem}
              onSelect={(key) => {
                if (key !== 'logout') {
                  onSelect(key)
                  onClose()
                }
              }}
              onLogout={() => {
                onLogout()
                onClose()
              }}
            />
          </aside>
        </div>
      ) : null}
    </>
  )
}
