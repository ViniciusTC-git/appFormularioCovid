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

  isLogged: Observable<boolean>;  
  isAdmin : Observable<boolean>;  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
    this.router.events.subscribe(() => {
      if(this.sidenav.opened){
        this.sidenav.toggle();
      }
    })
  }
  initializeApp() {
    this.isLogged = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdminIn;
  }
  ionViewDidLeave(){
    this.sidenav.toggle();
  }
  logout(){
    this.sidenav.toggle();
    this.authService.authLogout();
  }
 
}
