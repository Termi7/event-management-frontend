import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';

export interface RegistrationDto {
  id: number;
  eventId: number;
  eventTitle: string;
  location?: string;
  startAt?: string;
  status: 'REGISTERED' | 'WAITLIST' | 'CANCELED';
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  register(eventId: number): Observable<RegistrationDto> {
    return this.http.post<RegistrationDto>(`${this.baseUrl}/events/${eventId}/register`, {});
  }

  cancel(registrationId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/registrations/${registrationId}`);
  }

  myRegistrations(): Observable<RegistrationDto[]> {
    return this.http.get<RegistrationDto[]>(`${this.baseUrl}/users/me/registrations`);
  }
}
