import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import {Usuario} from '../models/Usuario'
import { JsonConversion } from "../utils/JsonConversion";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private db: AngularFirestore) {}

  getUsuarios(){
    return this.db.collection('usuarios')
    .snapshotChanges();
  }
  getUsuario(id:string){
    return this.db.collection('usuarios')
    .doc(id)
    .get()
  }
  postUsuario(usuario:Usuario){
    return this.db.collection('usuarios')
    .add(JsonConversion.convertModelToJson(usuario));
  }
  putUsuario(usuario:Usuario){
    return this.db.collection('usuarios')
    .doc(usuario.id)
    .update(JsonConversion.convertModelToJson(usuario))
  }
  deleteUsuario(uuid){
    return this.db.collection('usuarios')
    .doc(uuid)
    .delete();
  }
}
