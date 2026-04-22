import {
  ActivityIcon,
  DashboardIcon,
  FieldsIcon,
  LogoutIcon,
} from './icons'

export const navigationByRole = {
  admin: [
    { key: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { key: 'fields', label: 'Fields', icon: FieldsIcon },
    { key: 'field-activity', label: 'Field Activity', icon: ActivityIcon },
    { key: 'logout', label: 'Logout', icon: LogoutIcon },
  ],
  agent: [
    { key: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { key: 'my-fields', label: 'My Fields', icon: FieldsIcon },
    { key: 'logout', label: 'Logout', icon: LogoutIcon },
  ],
}
