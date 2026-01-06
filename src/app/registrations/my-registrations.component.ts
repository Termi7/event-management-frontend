import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import {RegistrationService, RegistrationDto} from './registration.service';

@Component({
  selector: 'app-my-registrations',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './my-registrations.component.html'
})
export class MyRegistrationsComponent implements OnInit {
  loading = false;
  errorMessage = '';
  regs: RegistrationDto[] = [];

  constructor(private regApi: RegistrationService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.errorMessage = '';
    this.regApi.myRegistrations().subscribe({
      next: (data) => { this.regs = data ?? []; this.loading = false; },
      error: () => { this.errorMessage = 'Failed to load registrations'; this.loading = false; }
    });
  }

  cancel(id: number): void {
    this.regApi.cancel(id).subscribe({
      next: () => this.fetch(),
      error: () => this.errorMessage = 'Cancel failed'
    });
  }
}
