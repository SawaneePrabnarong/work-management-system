import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  get(path: string) {
    return this.http.get(`${this.baseUrl}${path}`);
  }

  post(path: string, body: any) {
    return this.http.post(`${this.baseUrl}${path}`, body);
  }
}
