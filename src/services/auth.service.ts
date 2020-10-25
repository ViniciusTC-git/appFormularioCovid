import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private userLogged:string;
  private adminId:string = 'KoEWrGCZ1Wk4Zo5PDk83';

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
      if(this.userLogged === this.adminId){
        this.router.navigate(['/HomeAdmin']);
      }else{
        this.router.navigate(['/Home']);
      }
  }
  authLogout() {       
    this.loggedIn.next(false);
    this.userLogged = '';
    this.router.navigate(['/Login']);
  }
}
