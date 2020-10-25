import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  @ViewChild('sidenav') sidenav: MatSidenav;

  isLogged: Observable<boolean>;     
  constructor(private authService: AuthService) {
    this.initializeApp();
  }
  initializeApp() {
    this.isLogged = this.authService.isLoggedIn;
  }
  logout(){
     this.sidenav.toggle();
     this.authService.authLogout();
  }
 
}
