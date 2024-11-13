import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from './todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  constructor(private http: HttpClient) {}

  getTodos(): ToDo[] {
    return [
      new ToDo('Pokémon Yellow', 'Ein klassisches Spiel', 'Ash', '2022-01-12', 'new'),
      new ToDo('Mega Man X', 'Ein Action-Spiel', 'Rock', '2022-02-15', 'todo'),
      new ToDo('The Legend of Zelda', 'Ein Abenteuer-Spiel', 'Link', '2022-03-20', 'delegate'),
      new ToDo('Pac-Man', 'Ein Arcade-Klassiker', 'Player1', '2022-04-18', 'done'),
      new ToDo('Super Mario World', 'Ein Jump’n’Run-Spiel', 'Mario', '2022-05-25', 'new')
    ];
  }

  getDefaultTodos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>('assets/DefaultToDos.json');
  }

  loadTodos(): ToDo[] {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      return JSON.parse(storedTodos).map((todo: any) => 
        new ToDo(todo.title, todo.description, todo.assignee, todo.dueDate, todo.status)
      );
    } else {
      let todos: ToDo[] = [];
      this.getDefaultTodos().subscribe(defaultTodos => {
        todos = defaultTodos.map(todo =>
          new ToDo(todo.title, todo.description, todo.assignee, todo.dueDate, todo.status)
        );
        this.saveTodos(todos);
      });
      return todos;
    }
  }

  saveTodos(todos: ToDo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  resetLocalStorage() {
    this.getDefaultTodos().subscribe(defaultTodos => {
      const todos = defaultTodos.map(todo =>
        new ToDo(todo.title, todo.description, todo.assignee, todo.dueDate, todo.status)
      );
      this.saveTodos(todos);
    });
  }
}