import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private snack: MatSnackBar) {}

  success(message: string, config?: MatSnackBarConfig): void {
    this.snack.open(message, 'Close', {
      duration: 3000,
      panelClass: ['toast-success'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      ...config
    });
  }

  error(message: string, config?: MatSnackBarConfig): void {
    this.snack.open(message, 'Close', {
      duration: 4000,
      panelClass: ['toast-error'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      ...config
    });
  }
}
