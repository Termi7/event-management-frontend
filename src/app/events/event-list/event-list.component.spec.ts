import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EventListComponent } from './event-list.component';
import { EventService, EventDto } from '../event.service';
import { AuthService } from '../../core/auth.service';

class EventServiceMock {
  getEvents() {
    const data: EventDto[] = [
      { id: 1, title: 'Event A', description: 'Desc A', location: 'City A' },
      { id: 2, title: 'Event B', description: 'Desc B', location: 'City B' }
    ];
    return of(data);
  }
}

class AuthServiceMock {
  isLoggedIn() { return true; }
}

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListComponent],
      providers: [
        { provide: EventService, useClass: EventServiceMock },
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render events from service', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Event A');
    expect(compiled.textContent).toContain('Event B');
  });
});
