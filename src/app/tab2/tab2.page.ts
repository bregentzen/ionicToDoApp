import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../ToDoService';
import { ToDo } from '../todo';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  todos: ToDo[] = [];

  constructor(private todoService: ToDoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  ionViewWillEnter() {
    this.loadTodos();
  }

  loadTodos() {
    const state: String = 'todo';
    this.todos = this.todoService.loadTodos().filter(todo => todo.status === state);
    this.todos.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }
}