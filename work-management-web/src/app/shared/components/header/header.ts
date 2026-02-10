import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output() menuToggle = new EventEmitter<void>();

  username: string;
  userInitial: string;
  profileOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.username = this.authService.getUser()?.username || '';
    this.userInitial = this.username.charAt(0).toUpperCase();
  }

  /* ---------- sidebar toggle ---------- */
  toggleSidebar() {
    this.menuToggle.emit();
  }

  /* ---------- profile dropdown ---------- */
  toggleProfileMenu(event: MouseEvent) {
    event.stopPropagation();
    this.profileOpen = !this.profileOpen;
  }

  logout() {
    this.authService.logout();
    this.profileOpen = false;
    this.router.navigate(['/auth/login']);
  }

  /* ---------- close when clicking outside ---------- */
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.header-right')) {
      this.profileOpen = false;
    }
  }
}
