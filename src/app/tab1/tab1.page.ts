import { Component } from '@angular/core';
import { ToDo } from '../todo';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  todos: ToDo[] = [
    new ToDo('Pokémon Yellow', 'Ein klassisches Spiel', 'Ash', new Date('2022-01-12'), 'new'),
    new ToDo('Mega Man X', 'Ein Action-Spiel', 'Rock', new Date('2022-02-15'), 'todo'),
    new ToDo('The Legend of Zelda', 'Ein Abenteuer-Spiel', 'Link', new Date('2022-03-20'), 'delegate'),
    new ToDo('Pac-Man', 'Ein Arcade-Klassiker', 'Player1', new Date('2022-04-18'), 'done'),
    new ToDo('Super Mario World', 'Ein Jump’n’Run-Spiel', 'Mario', new Date('2022-05-25'), 'new')
  ];

  constructor() {}

  addTodo() {
    const newTodo = new ToDo('Neues Todo', 'Beschreibung hier', 'Besitzer hier', new Date(), 'new');
    this.todos.push(newTodo);
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

  resetLocalStorage() {
    
  }

}
