import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.interface';
import { TodoService } from '../services/todo.service';
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { Item } from '../models/item.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  title = 'my-app';
  nums: number[] = [1, 2, 3, 3, 1, 1, 1];
  todos: Task[];
  lstTareas = [];
  // item$: Observable<import('@angular/fire/firestore').DocumentData[]>;
  // item$: Observable<Item[]>;

  // constructor(private todoService: TodoService, firestore: Firestore) {
  constructor(private todoService: TodoService) {
    // const collection1 = collection(firestore, 'tutorias');
    // this.item$ = collectionData(collection1);
  }


  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      console.log('Todoss', todos);
      this.todos = todos;
    });

    // this.todoService.getCities().subscribe((todos) => {
    //   console.log('otra consulta:', todos);
    //   // this.todos = todos;
    // });
    this.allTareas();
  }

  allTareas() {
    this.todoService.getTareaxPrioridad(1).then(
      res => {
        res.forEach((doc) => {

          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
        });
      });

    this.todoService.getAll().snapshotChanges().subscribe(tareasRef => {

      this.lstTareas = tareasRef.map(
        tareaRef => {
          const tarea = tareaRef.payload.doc.data();
          tarea.id = tareaRef.payload.doc.id;
          return tarea;
        }
      );
      console.log(this.lstTareas);

      // tareasRef.forEach(tareaRef => {
      //   console.log(tareaRef.payload.doc.data());
      // }
      // );
    });

    ;
    // this.todoService.getTareasCompleto().then(
    //   firebaseResponse => {
    //     firebaseResponse.subscribe(tareasRef => {

    //       this.lstTareas=tareasRef.map(
    //         tareaRef=> {
    //           const tarea= tareaRef.payload.doc.data();
    //           tarea.id=tareaRef.payload.doc.id;
    //           return tarea;
    //         }
    //       );
    //       console.log(this.lstTareas);

    //       // tareasRef.forEach(tareaRef => {
    //       //   console.log(tareaRef.payload.doc.data());
    //       // }
    //       // );
    //     });
    //   }
    // );
  }


  onRemove(idTask: string) {
    this.todoService.delete(idTask);
  }

}
