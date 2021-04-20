import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  CanActivate, 
  Router, 
  RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, first, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable((observer: any) => {
      const isLogged = this.authService.isLogged.value ? true : false;
      const routes = { 
        '/login': () => !isLogged,
        '/login/verificar-email': () => this.authService.hasEmailNotVerified,
        '/home': () => isLogged,
        '/home-admin': () => isLogged,
        '/home-admin/portaria': () => isLogged
      }
      const route = Object.keys(routes).find((url) => String(url) === state.url);

      observer.next((!route ? false : routes[route]()));
    })

  }

}