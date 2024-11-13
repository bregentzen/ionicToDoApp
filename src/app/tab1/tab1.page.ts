import { Component } from '@angular/core';
import { ToDo } from '../todo';
import { ModalController } from '@ionic/angular';  // <-- Hier sicherstellen, dass ModalController importiert ist
import { ToDoModalPage } from '../to-do-modal/to-do-modal.page';  // <-- Importiere auch die Modal-Komponente
import { ToDoService } from '../ToDoService';  // <-- Importiere den ToDoService

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  todos: ToDo[] = [];

  constructor(private modalController: ModalController, private toDoService: ToDoService) {  // <-- Hier wird der modalController injiziert
  }

  ngOnInit() {
    this.loadTodos();
  }

  ionViewWillEnter() {
    this.loadTodos();
  }

  async openAddTodoModal() { 
    const newTodo = new ToDo('', '', '', '', 'new');

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
          this.saveTodos();
        }
      }
    });
  
    return await modal.present();
  }

  loadTodos() {
    this.todos = this.toDoService.loadTodos();
  }


  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }


  saveTodos() {
    this.toDoService.saveTodos(this.todos);
  }
}