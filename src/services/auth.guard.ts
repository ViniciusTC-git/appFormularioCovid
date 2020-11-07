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

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn .pipe(take(1),
      map((isLoggedIn: boolean) => { 
        if(isLoggedIn){
          if(state.url === "/HomeAdmin" && this.authService.getUserLogged === this.authService.getAdminId){
            return true;
          }
          if(state.url === "/HomeAdmin/portaria" && this.authService.getUserLogged === this.authService.getAdminId){
            return true;
          }
          return true;
        }else{
          this.router.navigate(['/Login']);  
        }     
        return false;
      })
    )
  }
}