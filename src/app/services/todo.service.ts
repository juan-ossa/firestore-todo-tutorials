import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.interface';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private dbPath = '/todos';
  private todosRef: AngularFirestoreCollection<Task>;
  private todos: Observable<Task[]>;

  constructor(private db: AngularFirestore) {

    // this.comments = db.collectionGroup('Comments', ref => ref.where('user', '==', userId))
    //   .valueChanges({ idField: 'docId' });

    this.todosRef = db.collection<Task>(this.dbPath);

    this.todos = this.todosRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }


  getAll() {
    return this.todosRef;
  }

  create(todo: Task) {
    return this.todosRef.add(todo);
  }

  update(todo: Task, id: string) {
    return this.todosRef.doc(id).update(todo);
  }


  delete(id: string): Promise<void> {
    // removeTodo(id: string){
    return this.todosRef.doc(id).delete();
  }


  getTareaxPrioridad(np: string) {
    // let user = firebase.auth().currentUser;
    // return this.db.collection('todos').ref.where('priority', '==', 2).get();
    console.log('filtrando');
    const npNum =Number(np);
    return this.todosRef.ref.where('priority', '==', npNum).get();

  }

  getTareasCompleto() {
    try {
      // return this.db.collection<Task>('todos').snapshotChanges();
      return this.todosRef.snapshotChanges();

    } catch (error) {
      console.log('error en getTareas :', error);
    }

  }

  getTodos() {
    return this.todos;
  }


  getTodo(id: string) {
    return this.todosRef.doc<Task>(id).valueChanges();
  }



}
