import { Injectable } from '@angular/core';
import { ToDo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
    private todos: ToDo[] = [
        new ToDo('Task 1', 'Description 1', 'John Doe', new Date('2024-11-15'), 'todo'),
        new ToDo('Task 2', 'Description 2', 'Jane Doe', new Date('2024-11-16'), 'todo'),
        new ToDo('Task 3', 'Description 3', 'John Smith', new Date('2024-11-17'), 'delegate')
      ];

  constructor() {
    this.loadTodos();
  }

  getTodos(): ToDo[] {
    return this.todos;
  }

  private loadTodos() {
    const todosJson = localStorage.getItem('todos');
    if (todosJson) {
      this.todos = JSON.parse(todosJson);
    }
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}