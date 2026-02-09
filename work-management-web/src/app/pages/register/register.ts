import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ErrorCode, ErrorCodeKey } from '../../shared/enums/error-code.enum';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  username = '';
  email = '';
  password = '';
  errorMessage = signal('');

  constructor(
    private auth: AuthService,
    private router: Router,
    private popup: PopupService,
  ) {}

  register() {
    this.auth
      .register({
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.popup.show(
            'Creation successful!',
            'You have been successfully created.',
            () => {
              this.router.navigate(['/auth/login']);
            },
          );
        },
        error: (err) => {
          const code = err?.error?.code as ErrorCodeKey;

          this.errorMessage.set(ErrorCode[code] ?? 'An error occurred. Please try again.');
        },
      });
  }
}
