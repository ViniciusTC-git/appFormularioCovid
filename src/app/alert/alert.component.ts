import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})

export class AlertComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
  ngOnInit() {}

  get getIcon() {
    switch (this.data.snackType) {
      case 'success':
        return 'done';
      case 'danger':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
    }
  }

}
