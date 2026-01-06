// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { EventService, EventDto } from '../event.service';
//
// import { MatCardModule } from '@angular/material/card';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
//
// @Component({
//   selector: 'app-event-details',
//   standalone: true,
//   imports: [CommonModule, RouterLink, MatCardModule, MatProgressSpinnerModule],
//   templateUrl: './event-details.component.html'
// })
// export class EventDetailsComponent implements OnInit {
//   loading = false;
//   errorMessage = '';
//   event: EventDto | null = null;
//
//   constructor(
//     private route: ActivatedRoute,
//     private eventService: EventService
//   ) {}
//
//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//     if (!id) {
//       this.errorMessage = 'Invalid event id';
//       return;
//     }
//
//     this.loading = true;
//     this.eventService.getEventById(id).subscribe({
//       next: (data) => {
//         this.event = data;
//         this.loading = false;
//       },
//       error: () => {
//         this.errorMessage = 'Failed to load event';
//         this.loading = false;
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EventService, EventDto } from '../event.service';
import { RegistrationService, RegistrationDto } from '../../registrations/registration.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './event-details.component.html'
})
export class EventDetailsComponent implements OnInit {
  loading = false;
  errorMessage = '';
  event: EventDto | null = null;

  regLoading = false;
  myReg: RegistrationDto | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventsApi: EventService,
    private regApi: RegistrationService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.loadEvent(id);
    if (this.auth.isLoggedIn()) this.loadMyReg(id);
  }

  private loadEvent(id: number) {
    this.loading = true;
    this.eventsApi.getEventById(id).subscribe({
      next: (e) => { this.event = e; this.loading = false; },
      error: () => { this.errorMessage = 'Failed to load event'; this.loading = false; }
    });
  }

  private loadMyReg(eventId: number) {
    this.regApi.myRegistrations().subscribe({
      next: (regs) => {
        this.myReg = regs.find(r => r.eventId === eventId && r.status !== 'CANCELED') ?? null;
      },
      error: () => {
        // ignore silently for now
      }
    });
  }

  register(): void {
    if (!this.event) return;
    this.regLoading = true;
    this.regApi.register(this.event.id).subscribe({
      next: (reg) => { this.myReg = reg; this.regLoading = false; },
      error: (err) => {
        this.regLoading = false;
        this.errorMessage = err?.error?.message || 'Registration failed';
      }
    });
  }

  cancel(): void {
    if (!this.myReg) return;
    this.regLoading = true;
    this.regApi.cancel(this.myReg.id).subscribe({
      next: () => { this.myReg = null; this.regLoading = false; },
      error: () => { this.regLoading = false; this.errorMessage = 'Cancel failed'; }
    });
  }
}
