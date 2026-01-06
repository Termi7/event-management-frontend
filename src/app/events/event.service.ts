import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EventDto {
  id: number;
  title: string;
  description?: string;
  location?: string;
  startAt?: string;
  endAt?: string;
  capacity?: number;
}

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly baseUrl = `${environment.apiBaseUrl}/events`;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.baseUrl);
  }

  getEventById(id: number): Observable<EventDto> {
    return this.http.get<EventDto>(`${this.baseUrl}/${id}`);
  }

  createEvent(payload: Partial<EventDto>): Observable<EventDto> {
    return this.http.post<EventDto>(this.baseUrl, payload);
  }

  updateEvent(id: number, payload: Partial<EventDto>): Observable<EventDto> {
    return this.http.put<EventDto>(`${this.baseUrl}/${id}`, payload);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
