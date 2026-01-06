// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
// import { AuthResponse, LoginRequest, RegisterRequest } from './models';
// import { Observable, tap } from 'rxjs';
//
// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private readonly baseUrl = `${environment.apiBaseUrl}/api/auth`;
//   private readonly tokenKey = 'auth_token';
//
//   constructor(private http: HttpClient) {}
//
//   register(data: RegisterRequest): Observable<AuthResponse> {
//     return this.http.post<AuthResponse>(`${this.baseUrl}/register`, data).pipe(
//       tap(res => this.saveToken(res.token))
//     );
//   }
//
//   login(data: LoginRequest): Observable<AuthResponse> {
//     return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data).pipe(
//       tap(res => this.saveToken(res.token))
//     );
//   }
//
//   logout(): void {
//     localStorage.removeItem(this.tokenKey);
//   }
//
//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }
//
//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }
//
//   private saveToken(token: string): void {
//     localStorage.setItem(this.tokenKey, token);
//   }
// }


import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type UserRole = 'USER' | 'ADMIN';

export interface CurrentUser {
  id?: number;
  name?: string;
  email: string;
  role?: UserRole;
}

export interface AuthResponse {
  token: string;
  user?: CurrentUser; // optional depending on backend
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'current_user';
  private readonly baseUrl = `${environment.apiBaseUrl}/auth`;

  private userSignal = signal<CurrentUser | null>(this.loadUserFromStorage());

  currentUser = computed(() => this.userSignal());
  isLoggedIn = computed(() => !!this.getToken());
  isAdmin = computed(() => this.userSignal()?.role === 'ADMIN');

  constructor(private http: HttpClient) {}

  register(payload: { name: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, payload).pipe(
      tap(res => this.handleAuthSuccess(res))
    );
  }

  login(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, payload).pipe(
      tap(res => this.handleAuthSuccess(res))
    );
  }

  logout(): void {
    if (this.hasStorage()) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
    this.userSignal.set(null);
  }

  getToken(): string | null {
    if (!this.hasStorage()) return null;
    return localStorage.getItem(this.tokenKey);
  }

  private handleAuthSuccess(res: AuthResponse): void {
    if (!this.hasStorage()) return;

    if (res?.token) {
      localStorage.setItem(this.tokenKey, res.token);
    }
    if (res?.user) {
      localStorage.setItem(this.userKey, JSON.stringify(res.user));
      this.userSignal.set(res.user);
    }
  }

  private loadUserFromStorage(): CurrentUser | null {
    if (!this.hasStorage()) return null;

    const raw = localStorage.getItem(this.userKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as CurrentUser;
    } catch {
      return null;
    }
  }

  private hasStorage(): boolean {
    return typeof localStorage !== 'undefined';
  }
}
