import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  todos: { id: number; title: string }[] = [
    { id: 1, title: 'Pokémon Yellow' },
    { id: 2, title: 'Mega Man X' },
    { id: 3, title: 'The Legend of Zelda' },
    { id: 4, title: 'Pac-Man' },
    { id: 5, title: 'Super Mario World' }
  ];

  constructor() {}

  addTodo() {
    const newId = this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
    this.todos.push({ id: newId, title: 'New Todo' });
  }

  editTodo(id: number) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      const newTitle = prompt('Bearbeiten:', todo.title);
      if (newTitle) {
        todo.title = newTitle;
      }
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

}
