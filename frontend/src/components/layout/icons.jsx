function iconProps(className) {
  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }
}

export function MenuIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function DashboardIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" />
    </svg>
  )
}

export function FieldsIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M5 6.5 12 3l7 3.5v11L12 21l-7-3.5z" />
      <path d="M12 3v18M5 6.5l14 11" />
    </svg>
  )
}

export function ActivityIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M4 13h4l2.5-5 3 8 2.5-5H20" />
    </svg>
  )
}

export function LogoutIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  )
}

export function UserIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  )
}
