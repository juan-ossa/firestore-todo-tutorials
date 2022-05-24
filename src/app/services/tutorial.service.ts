import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Tutorial } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  private dbPath = '/tutorials';
  private tutorialsRef: AngularFirestoreCollection<Tutorial>;

  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection<Tutorial>(this.dbPath);
  }


  getAll(): AngularFirestoreCollection<Tutorial> {
    // this.tutorialsRef.snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ id: c.payload.doc.id, ...c.payload.doc.data() })
    //     )
    //   )
    // ).subscribe(data => {
    //   console.log(data);
    // });

    return this.tutorialsRef;
  }
  create(tutorial: Tutorial): any {
    return this.tutorialsRef.add({ ...tutorial });
    // return this.tutorialsRef.add(tutorial);
  }
  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
}
