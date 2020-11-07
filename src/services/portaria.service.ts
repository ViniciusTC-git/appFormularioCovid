import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PortariaService {

  constructor(private db: AngularFirestore) {}

  get(){
    return this.db.collection('portaria').snapshotChanges();
  }
}
