export interface SidebarMenu {
  label: string;
  icon?: string;
  route?: string;
  children?: SidebarMenu[];
}
