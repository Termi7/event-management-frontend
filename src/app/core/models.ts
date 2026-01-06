export type Role = 'ADMIN' | 'USER';

export interface AuthResponse {
  token: string;
  email: string;
  role: Role;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface EventItem {
  id: number;
  title: string;
  description?: string;
  location?: string;
  startAt?: string;
  endAt?: string;
  capacity?: number;
}
