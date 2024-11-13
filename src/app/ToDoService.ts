import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from './todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private todos: ToDo[] = [];

  constructor(private http: HttpClient) {
    this.loadTodos();
  }

  getTodos(): ToDo[] {
    return this.todos;
  }

  getDefaultTodos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>('assets/DefaultToDo.json');
  }

  private loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos).map((todo: any) => 
        new ToDo(todo.title, todo.description, todo.assignee, new Date(todo.dueDate), todo.status)
      );
    } else {
      this.getDefaultTodos().subscribe(defaultTodos => {
        this.todos = defaultTodos.map(todo =>
          new ToDo(todo.title, todo.description, todo.assignee, new Date(todo.dueDate), todo.status.status)
        );
        this.saveTodos(this.todos);
      });
    }
  }

  saveTodos(todos: ToDo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  resetLocalStorage() {
    this.getDefaultTodos().subscribe(defaultTodos => {
      this.todos = defaultTodos.map(todo =>
        new ToDo(todo.title, todo.description, todo.assignee, new Date(todo.dueDate), todo.status.status)
      );
      this.saveTodos(this.todos);
    });
  }
}