import { Injectable } from '@angular/core';
import { Usuario } from 'src/models/Usuario';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private db: AngularFirestore) { }
  public login(usuario:Usuario){
    return this.db.collection("usuarios").ref
    .where('senha','==',usuario.senha)
    .where('email','==',usuario.email)
    .get();
  }
  public validateUsuario(usuario:Usuario){
    const password = this.db.collection("usuarios").ref.where('senha','==',usuario.senha).get();
    const email =this.db.collection("usuarios").ref.where('email','==',usuario.email).get();
    return Promise.all([password,email]);
  }
}
