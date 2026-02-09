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
      }),
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
}
