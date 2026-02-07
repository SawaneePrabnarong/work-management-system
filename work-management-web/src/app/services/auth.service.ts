import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  login(data: any) {
    return this.api.post('/auth/login', data);
  }

  logout() {
    localStorage.removeItem('token');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
}
