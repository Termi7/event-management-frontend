import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EventItem } from './models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly baseUrl = `${environment.apiBaseUrl}/events`;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(this.baseUrl);
  }

  getEventById(id: number): Observable<EventItem> {
    return this.http.get<EventItem>(`${this.baseUrl}/${id}`);
  }
}
