import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from '.shared/navbar/navbar';
import {NavbarComponent} from './shared/navbar/navbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MatSnackBarModule],
  template: `
    <app-navbar></app-navbar>

    <div class="page">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .page {
      max-width: 1000px;
      margin: 0 auto;
      padding: 16px;
    }
  `]
})
export class AppComponent {}
