import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../app/components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) {}

  public open(message: string, type: string, duration?: number) {
    this.snackBar.openFromComponent(AlertComponent, {
      duration: (duration || Infinity),
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [(type || '')],
      data: { message: message, snackType: type || null }
    });
  }

  public hide() {
    this.snackBar.dismiss();
  }
  
}
