import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { finalize } from 'rxjs/operators';
import { EventService } from '../event.service';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './event-create.component.html'
})
export class EventCreateComponent {
  form: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private eventsApi: EventService,
    private router: Router,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      location: [''],
      startDate: [''],
      startTime: [''],
      endDate: [''],
      endTime: [''],
      capacity: [null]
    });
  }

  submit(): void {
    this.errorMessage = '';
    if (this.form.invalid) return;

    const value = this.form.value;
    const payload: any = {
      title: value.title,
      description: value.description || null,
      location: value.location || null,
      capacity: value.capacity === '' ? null : value.capacity
    };

    payload.startAt = this.combineDateTime(value.startDate, value.startTime);
    payload.endAt = this.combineDateTime(value.endDate, value.endTime);

    this.loading = true;
    this.eventsApi.createEvent(payload)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (created) => {
          if (created?.id) {
            this.router.navigate(['/events', created.id]);
          } else {
            this.router.navigateByUrl('/');
          }
          this.toast.success('Event created');
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Failed to create event';
          this.toast.error(this.errorMessage);
        }
      });
  }

  private combineDateTime(date: any, time: string | null): string | null {
    if (!date) return null;
    const d = new Date(date);
    if (time) {
      const [h, m] = time.split(':').map(Number);
      d.setHours(h || 0, m || 0, 0, 0);
    }
    return d.toISOString();
  }
}
