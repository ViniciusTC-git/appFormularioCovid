import { Injectable } from '@angular/core';
import { AngularFireAuth } from  "@angular/fire/auth";
import { IAuth } from 'src/interfaces/IAuth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth: AngularFireAuth) {}

  async login(auth: IAuth) {
    const { email, senha } = auth;

    return await this.auth.signInWithEmailAndPassword(email, senha)
  }

  async cadastro(auth: IAuth) {
    const { email, senha } = auth;
    
    return await this.auth.createUserWithEmailAndPassword(email, senha)
  }

  async resetSenha(email: string) {
    return await this.auth.sendPasswordResetEmail(email);
  }

  async verificarEmail() {
    const user = await this.auth.currentUser;

    return await user.sendEmailVerification()
  }

}
