import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  @ViewChild('sidenav') sidenav: MatSidenav;

  menu_options: [];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.router.events.subscribe(() => !this.sidenav.opened || this.sidenav.toggle())
  }

  ionViewDidLeave(){
    this.sidenav.toggle();
  }

  onLogout() {
    this.sidenav.toggle();
    this.authService.logout();
  }
 
}
