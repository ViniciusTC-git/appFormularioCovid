import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Formulario } from '../models/Formulario';
import { JsonConversion } from '../utils/JsonConversion';

@Injectable({
  providedIn: 'root'
})
export class FormularioService{
  constructor(private db: AngularFirestore) {}

  getFormsByUser(id: string){
    return this.db.collection('usuarios')
      .doc(id)
      .collection('formularios')
      .snapshotChanges();
  }

  postForm(formulario:Formulario){
    return this.db.collection('usuarios')
      .doc(formulario.idUsuario)
      .collection('formularios')
      .add(JsonConversion.convertModelToJson(formulario))
      
  }

}
