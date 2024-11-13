import { Component } from '@angular/core';
import { ToDo } from '../todo';
import { ModalController } from '@ionic/angular';  // <-- Hier sicherstellen, dass ModalController importiert ist
import { ToDoModalPage } from '../to-do-modal/to-do-modal.page';  // <-- Importiere auch die Modal-Komponente

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  todos: ToDo[] = [];

  constructor(private modalController: ModalController) {  // <-- Hier wird der modalController injiziert
    this.loadTodos();
  }

  async openAddTodoModal() { // Neues ToDo erstellen
    // Neues leeres ToDo erstellen
    const newTodo = new ToDo('', '', '', new Date(), 'new');

    // Modal öffnen und das leere ToDo übergeben
    const modal = await this.modalController.create({
      component: ToDoModalPage,
      componentProps: {
        todo: newTodo  // Leeres ToDo-Objekt übergeben
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        // Neues ToDo zur Liste hinzufügen
        this.todos.push(result.data);
        this.saveTodos();
      }
    });

    return await modal.present();
  }

  async openTodoDetails(todo: ToDo) { // Vorhandenes ToDo bearbeiten
    const modal = await this.modalController.create({
      component: ToDoModalPage,
      componentProps: {
        todo: todo  // Das ToDo-Objekt wird als Prop an das Modal übergeben
      }
    });
  
    // Warte auf das Schließen des Modals und empfange die bearbeiteten Daten
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const updatedTodo = result.data; // Die bearbeiteten Daten des ToDos
  
        // Aktualisiere das ToDo in der Liste
        const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      }
    });
  
    return await modal.present();
  }


  // LocalStorage ToDo's
  getDefaultTodos(): ToDo[] {
    return [
      new ToDo('Pokémon Yellow', 'Ein klassisches Spiel', 'Ash', new Date('2022-01-12'), 'new'),
      new ToDo('Mega Man X', 'Ein Action-Spiel', 'Rock', new Date('2022-02-15'), 'todo'),
      new ToDo('The Legend of Zelda', 'Ein Abenteuer-Spiel', 'Link', new Date('2022-03-20'), 'delegate'),
      new ToDo('Pac-Man', 'Ein Arcade-Klassiker', 'Player1', new Date('2022-04-18'), 'done'),
      new ToDo('Super Mario World', 'Ein Jump’n’Run-Spiel', 'Mario', new Date('2022-05-25'), 'new')
    ];
  }


  loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos).map((todo: any) => 
        new ToDo(todo.title, todo.description, todo.assignee, new Date(todo.dueDate), todo.status.status)
      );
    } else {
      this.todos = this.getDefaultTodos();
    }
  }


  addTodo() {
    const newTodo = new ToDo('Neues Todo', 'Beschreibung hier', 'Besitzer hier', new Date(), 'new');
    this.todos.push(newTodo);
    this.saveTodos();
  }


  editTodo(id: number) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      const newTitle = prompt('Bearbeiten:', todo.title);
      if (newTitle) {
        todo.title = newTitle;
        this.saveTodos();
      }
    }
  }


  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }


  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  // wird gerade nicht benutzt
  resetLocalStorage() {
    this.todos = this.getDefaultTodos();
    this.saveTodos();
  }

}