import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Formulario } from 'src/models/Formulario';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  constructor(private db: AngularFirestore) { }

  public postForm(formulario:Formulario){
    this.db.collection('formularios').add(JSON.parse(JSON.stringify(formulario)));
  }

}
