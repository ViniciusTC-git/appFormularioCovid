import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import {Usuario} from '../models/Usuario'
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private db: AngularFirestore) { }

  getUsuarios(){
    return this.db.collection('usuarios').snapshotChanges();
  }
  getUsuario(id){
    return this.db.collection<Usuario>('usuarios').doc(id).get()
  }
  postUsuario(usuario:Usuario){
    return this.db.collection('usuarios').add(usuario);
  }
  putUsuario(usuario:Usuario){
    return this.db.collection('usuarios').doc(usuario.id).update(JSON.parse(JSON.stringify(usuario)))
  }
  deleteUsuario(uuid){
    return this.db.collection('usuarios').doc(uuid).delete();
  }
}
