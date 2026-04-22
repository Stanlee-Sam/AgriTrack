import {
  ActivityIcon,
  DashboardIcon,
  FieldsIcon,
  LogoutIcon,
} from './icons'

export const navigationByRole = {
  admin: [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: DashboardIcon,
      path: '/dashboard-admin',
    },
    {
      key: 'fields',
      label: 'Fields',
      icon: FieldsIcon,
      path: '/fields-admin',
    },
    {
      key: 'field-activity',
      label: 'Field Activity',
      icon: ActivityIcon,
      path: '/field-activity-admin',
    },
    { key: 'logout', label: 'Logout', icon: LogoutIcon },
  ],
  agent: [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: DashboardIcon,
      path: '/dashboard-agent',
    },
    {
      key: 'my-fields',
      label: 'My Fields',
      icon: FieldsIcon,
      path: '/my-fields-agent',
    },
    { key: 'logout', label: 'Logout', icon: LogoutIcon },
  ],
}
