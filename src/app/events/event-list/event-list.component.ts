// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';
// import { EventService } from '../../core/event.service';
// import { EventItem } from '../../core/models';
//
// import { MatCardModule } from '@angular/material/card';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
//
// @Component({
//   selector: 'app-event-list',
//   standalone: true,
//   imports: [CommonModule, RouterLink, MatCardModule, MatProgressSpinnerModule],
//   templateUrl: './event-list.component.html'
// })
// export class EventListComponent implements OnInit {
//   loading = false;
//   errorMessage = '';
//   events: EventItem[] = [];
//
//   constructor(private eventService: EventService) {}
//
//   ngOnInit(): void {
//     this.loading = true;
//     this.eventService.getEvents().subscribe({
//       next: (data) => {
//         this.events = data;
//         this.loading = false;
//       },
//       error: () => {
//         this.errorMessage = 'Failed to load events';
//         this.loading = false;
//       }
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventService, EventDto } from '../event.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.scss']
})
export class EventListComponent implements OnInit {
  loading = false;
  errorMessage = '';
  events: EventDto[] = [];

  constructor(
    private eventsApi: EventService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.loading = true;
    this.errorMessage = '';

    this.eventsApi.getEvents().subscribe({
      next: (data) => {
        this.events = data ?? [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Failed to load events';
      }
    });
  }
}
