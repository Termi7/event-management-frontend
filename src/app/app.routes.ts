// import { Routes } from '@angular/router';
// import { EventListComponent } from './events/event-list/event-list.component';
// import { EventDetailsComponent } from './events/event-details/event-details.component';
// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';
//
// export const routes: Routes = [
//   { path: '', component: EventListComponent },
//   { path: 'events/:id', component: EventDetailsComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: '**', redirectTo: '' }
// ];


import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
// import { adminGuard } from './core/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./events/event-list/event-list.component').then(m => m.EventListComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'events/new',
    canActivate: [authGuard],
    loadComponent: () => import('./events/event-create/event-create.component').then(m => m.EventCreateComponent)
  },
  {
    path: 'events/:id',
    loadComponent: () => import('./events/event-details/event-details.component').then(m => m.EventDetailsComponent)
  },
  {
    path: 'my-registrations',
    canActivate: [authGuard],
    loadComponent: () => import('./registrations/my-registrations.component').then(m => m.MyRegistrationsComponent)
  },
  //
  // // Example protected area
  // {
  //   path: 'my-events',
  //   canActivate: [authGuard],
  //   loadComponent: () => import('./events/my-events/my-events.component').then(m => m.MyEventsComponent)
  // },

  { path: '**', redirectTo: '' }
];
