import { Tractor } from "lucide-react";
import { NavLink } from "react-router-dom";

const baseItemClassName =
  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors";

function getItemClassName(isActive) {
  return `${baseItemClassName} w-full ${
    isActive
      ? "bg-primary text-on-primary shadow-sm"
      : "text-neutral hover:bg-surface-container-low hover:text-primary"
  }`;
}

function SidebarNavItem({ item, isActive, onClick, onNavigate }) {
  const Icon = item.icon;

  if (item.path && !onClick) {
    return (
      <NavLink
        to={item.path}
        end
        onClick={onNavigate}
        className={({ isActive: isCurrentRoute }) =>
          getItemClassName(isCurrentRoute)
        }
      >
        <Icon className="h-5 w-5 shrink-0" />
        <span>{item.label}</span>
      </NavLink>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={getItemClassName(isActive)}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{item.label}</span>
    </button>
  );
}

function SidebarContent({
  roleLabel,
  items,
  activeItem,
  onSelect,
  onLogout,
  onNavigate,
}) {
  return (
    <div className="flex h-full flex-col bg-surface-container-lowest w-full">
      <div className="border-b border-outline-variant px-6 py-6 flex flex-row items-center gap-3 w-full">
        <div className="bg-primary rounded-lg p-2">
          <Tractor className="text-white text-2xl" />
        </div>
        <div>
          <p className="text-2xl text-primary font-extrabold">SmartSeason</p>
          <p className="text-lg text-neutral font-semibold">{roleLabel} Portal</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6 w-full">
        {items.map((item) => (
          <SidebarNavItem
            key={item.key}
            item={item}
            isActive={activeItem === item.key}
            onClick={
              item.key === "logout"
                ? onLogout
                : onSelect
                  ? () => onSelect(item.key)
                  : undefined
            }
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="border-t border-outline-variant px-6 py-4">
        <p className="text-caption text-on-surface-variant">
          Reliable tools for teams in the field.
        </p>
      </div>
    </div>
  );
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
<aside className="hidden lg:flex w-72 shrink-0 border-r border-outline-variant bg-surface-container-lowest sticky top-0 h-screen">        <SidebarContent
          roleLabel={roleLabel}
          items={items}
          activeItem={activeItem}
          onSelect={onSelect}
          onLogout={onLogout}
          onNavigate={onClose}
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
              onSelect={onSelect ? (key) => {
                onSelect(key);
                onClose();
              } : undefined}
              onLogout={() => {
                onLogout();
                onClose();
              }}
              onNavigate={onClose}
            />
          </aside>
        </div>
      ) : null}
    </>
  );
}
