import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Meta } from '../models/meta.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MetaService {
  constructor(private firestore: AngularFirestore) {}

  getMetas(): Observable<Meta[]> {
    return this.firestore.collection<Meta>('metas').valueChanges({ idField: 'id' });
  }

  addMeta(meta: Meta) {
    return this.firestore.collection('metas').add(meta);
  }

  deleteMeta(id: string) {
    return this.firestore.collection('metas').doc(id).delete();
  }
}
