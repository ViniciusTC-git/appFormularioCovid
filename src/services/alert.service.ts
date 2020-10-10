import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../app/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}
  public openSnackBar(message: string, action: string, snackType: string) {
    const _snackType = (snackType !== undefined ? snackType : 'success');
    this.snackBar.openFromComponent(AlertComponent, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [_snackType],
      data: { message: message, snackType: _snackType }
    });
  }
}
