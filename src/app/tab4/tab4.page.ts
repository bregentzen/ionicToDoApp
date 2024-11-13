import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToDo } from '../todo';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  constructor(private alertController: AlertController) {

  }

  getDefaultTodos(): ToDo[] {
    return [
      new ToDo('Pokémon Yellow', 'Ein klassisches Spiel', 'Ash', new Date('2022-01-12'), 'new'),
      new ToDo('Mega Man X', 'Ein Action-Spiel', 'Rock', new Date('2022-02-15'), 'todo'),
      new ToDo('The Legend of Zelda', 'Ein Abenteuer-Spiel', 'Link', new Date('2022-03-20'), 'delegate'),
      new ToDo('Pac-Man', 'Ein Arcade-Klassiker', 'Player1', new Date('2022-04-18'), 'done'),
      new ToDo('Super Mario World', 'Ein Jump’n’Run-Spiel', 'Mario', new Date('2022-05-25'), 'new')
    ];
  }

  async confirmResetLocalStorage() {
    const alert = await this.alertController.create({
      header: 'Bestätigung',
      message: 'Möchten Sie wirklich ihre Daten zurücksetzen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            console.log('Zurücksetzen abgebrochen');
          }
        },
        {
          text: 'Bestätigen',
          handler: () => {
            this.resetLocalStorage();
          }
        }
      ]
    });

    await alert.present();
  }

  resetLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.getDefaultTodos()));
    }
}