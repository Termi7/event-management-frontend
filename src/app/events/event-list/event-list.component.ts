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
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventService, EventDto } from '../event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './event-list.component.html'
})
export class EventListComponent implements OnInit {
  loading = false;
  errorMessage = '';
  events: EventDto[] = [];

  constructor(private eventsApi: EventService) {}

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
