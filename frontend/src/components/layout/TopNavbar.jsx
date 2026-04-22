import { LogoutIcon, MenuIcon, UserIcon } from './icons'

export default function TopNavbar({
  roleLabel,
  avatarName,
  activeLabel,
  onMenuClick,
  onLogout,
}) {
  const initials = avatarName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-outline-variant bg-surface-container-lowest/95 px-4 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-outline-variant text-on-surface transition-colors hover:bg-surface-container-low lg:hidden"
          aria-label="Open sidebar"
        >
          <MenuIcon />
        </button>

        <div>
          <p className="text-caption uppercase tracking-[0.14em] text-on-surface-variant">
            {roleLabel} workspace
          </p>
          <h2 className="text-h3 text-on-surface">{activeLabel}</h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-3 rounded-full border border-outline-variant bg-surface px-2 py-2 sm:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary">
            {initials}
          </div>
          <div className="pr-2">
            <p className="text-label-md text-on-surface">{avatarName}</p>
            <p className="text-caption text-on-surface-variant">
              {roleLabel} account
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-full border border-outline-variant px-4 py-2 text-label-md text-on-surface transition-colors hover:border-secondary hover:bg-surface-container-low"
        >
          <LogoutIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container text-on-surface sm:hidden">
          <UserIcon />
        </div>
      </div>
    </header>
  )
}
