import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  register(data: any) {
    return this.api.post('/auth/register', data);
  }

  login(data: any) {
    return this.api.post('/auth/login', data).pipe(
      tap((res: any) => {
        this.saveToken(res.access_token);
        this.saveUser(res.user);
      }),
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
