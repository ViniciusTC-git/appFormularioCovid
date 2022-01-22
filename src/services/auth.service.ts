import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertService } from './alert.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isRoot: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  hasEmailNotVerified: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userId: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private alertSrv: AlertService,
    private router: Router,
    public auth: AngularFireAuth,
    private usuarioService: UsuarioService
  ) { 
    this.authLogin();
  }

  private authLogin() {
    this.auth.authState.subscribe(async (e) => {
      if (e) {
        this.isLogged.next(true);

        if (!e.emailVerified) {
          this.hasEmailNotVerified.next(true);
          this.router.navigate(['/login/verificar-email'])
          return;
        } 
    
        this.userId.next(e.uid); 
        this.isRoot.next((await this.usuarioService.isRoot(e.uid)));
        this.router.navigate([this.isRoot.value ? '/home-admin' : '/home'])
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
