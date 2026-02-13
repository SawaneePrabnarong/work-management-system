import { SidebarMenu } from '../../../models/sidebar.model';

export const SIDEBAR_MENU: SidebarMenu[] = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    route: '/dashboard',
  },

  {
    label: 'Projects',
    icon: 'pi pi-briefcase',
    route: '/projects',
  },

  {
    label: 'Tasks',
    icon: 'pi pi-check-square',
    route: '/tasks',
  },
];
