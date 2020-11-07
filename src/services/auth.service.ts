import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private adminIn = new BehaviorSubject<boolean>(false);
  private userLogged:string;
  private adminId:string = 'KoEWrGCZ1Wk4Zo5PDk83';

  get getAdminId(){
    return this.adminId;
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  get isAdminIn(){
    return this.adminIn.asObservable();
  }
  get getUserLogged(){
    return this.userLogged;
  }
  
  constructor(private router: Router) { 
    const userId = sessionStorage.getItem("id");
    if(userId){
      this.setAuth(userId);
    }
  }
  authLogin(id:string){
    this.setAuth(id);
    this.router.navigate([this.userLogged === this.adminId ? '/HomeAdmin' : '/Home']);
  }
  authLogout() {       
    this.loggedIn.next(false);
    this.userLogged = '';
    sessionStorage.removeItem("id");
    this.router.navigate(['/Login']);
  }
  setAuth(id:string){
    this.loggedIn.next(true);
    this.userLogged = id;
    sessionStorage.setItem("id",id);
    this.adminIn.next(this.userLogged === this.adminId);
  }
}
