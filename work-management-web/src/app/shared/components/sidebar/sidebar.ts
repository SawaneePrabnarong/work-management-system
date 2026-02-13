import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SIDEBAR_MENU } from './sidebar.menu';
import { SidebarMenu } from '../../../models/sidebar.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  menus: SidebarMenu[] = SIDEBAR_MENU;

  expanded: Record<string, boolean> = {};

  @Output() menuClick = new EventEmitter<void>();

  onMenuClick() {
    this.menuClick.emit();
  }

  toggleMenu(item: SidebarMenu) {
    const key = item.label;
    this.expanded[key] = !this.expanded[key];
  }

  isExpanded(item: SidebarMenu): boolean {
    return !!this.expanded[item.label];
  }
}
