import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertService } from './alert.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  hasEmailNotVerified: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  hasUser: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private alertSrv: AlertService,
    private router: Router,
    public auth: AngularFireAuth,
    private spinner: SpinnerService
  ) { 
    this.authLogin();
  }

  private authLogin() {
    this.auth.authState.subscribe((e) => {
      if (e) {
        this.isLogged.next(true);

        if (!e.emailVerified) {
          this.hasEmailNotVerified.next(true);
          this.router.navigate(['/login/verificar-email'])
        } else {
          this.hasUser.next(e.uid);
          this.router.navigate(['/home'])
        }

      } else {
        this.router.navigate(['/login'])
        this.isLogged.next(false);
      }
    });
  }

  logout() {
    this.auth
      .signOut()
      .catch(({ message }) => this.alertSrv.open(message, 'danger', 3000))
  }

}
