import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private userLogged:string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  get getUserLogged(){
    return this.userLogged;
  }
  
  constructor(private router: Router) { }

  authLogin(id:string){
      this.loggedIn.next(true);
      this.userLogged = id;
      this.router.navigate(['/Home']);
  }
  authLogout() {       
    this.loggedIn.next(false);
    this.userLogged = '';
    this.router.navigate(['/Login']);
  }
}
