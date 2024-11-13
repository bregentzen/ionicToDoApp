import { Component } from '@angular/core';
import { ToDo } from '../todo';
import { ModalController } from '@ionic/angular';
import { ToDoModalPage } from '../to-do-modal/to-do-modal.page';
import { ToDoService } from '../ToDoService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  todos: ToDo[] = [];
  toDoService: ToDoService;

  constructor(private modalController: ModalController, private http: HttpClient) {
    this.toDoService = new ToDoService(this.http);
  }

  ngOnInit() {
    this.loadTodos();
  }

  ionViewWillEnter() {
    this.loadTodos();
  }

  async openAddTodoModal() {
    const newTodo = new ToDo('', '', '', new Date(), 'new');

    const modal = await this.modalController.create({
      component: ToDoModalPage,
      componentProps: {
        todo: newTodo
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.todos.push(result.data);
        this.saveTodos();
      }
    });

    return await modal.present();
  }

  async openTodoDetails(todo: ToDo) {
    const modal = await this.modalController.create({
      component: ToDoModalPage,
      componentProps: {
        todo: todo
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const updatedTodo = result.data;

        const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      }
    });

    return await modal.present();
  }

  loadTodos() {
    this.todos = this.toDoService.getTodos();
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  saveTodos() {
    this.toDoService.saveTodos(this.todos);
  }
}