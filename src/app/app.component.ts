import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { SpinnerService } from 'src/services/spinner.service';

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
    private router: Router,
    public spinner: SpinnerService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.router.events.subscribe((event) => {
      [ 
        { condition: this.sidenav.opened, callback: () => this.sidenav.toggle() },
        { condition: event instanceof NavigationStart, callback: () => this.spinner.open(2000) },
        { condition: event instanceof NavigationEnd, callback: () => this.spinner.hide() }
      ].forEach(({ condition, callback }) => !condition || callback())
    })
  }

  ionViewDidLeave(){
    this.sidenav.toggle();
  }

  onLogout() {
    this.sidenav.toggle();
    this.authService.logout();
  }
 
}
