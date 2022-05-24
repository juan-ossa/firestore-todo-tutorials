import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Task } from 'src/app/models/task.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  todo: Task = {
    task: '',
    priority: 0
  };

  todoId= null;

  constructor(private route: ActivatedRoute, private nav: NavController, private todoService: TodoService,
     private loadingController: LoadingController) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params.id;
    if (this.todoId){
      this.loadTodo();
    }
  }

  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();

    this.todoService.getTodo(this.todoId).subscribe(todo => {
      loading.dismiss();;
      this.todo = todo;
    });
  }

  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();

    if (this.todoId) {
      this.todoService.update(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    } else {
      this.todoService.create(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }
  async onRemoveTodo(idTodo: string) {
    this.todoService.delete(idTodo);
  }
}
