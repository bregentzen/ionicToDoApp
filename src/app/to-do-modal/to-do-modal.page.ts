import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToDo } from '../todo';

@Component({
  selector: 'app-to-do-modal',
  templateUrl: './to-do-modal.page.html',
  styleUrls: ['./to-do-modal.page.scss'],
})
export class ToDoModalPage {

  @Input() todo!: ToDo; // Input-Parameter // ! = nicht null

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  saveTodo() {
    this.modalController.dismiss(this.todo);
  }
}