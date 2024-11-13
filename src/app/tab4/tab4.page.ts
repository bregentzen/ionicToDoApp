import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToDoService } from '../ToDoService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  private toDoService: ToDoService;

  constructor(private alertController: AlertController, private http: HttpClient) {
    this.toDoService = new ToDoService(this.http);
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
            this.toDoService.resetLocalStorage();
          }
        }
      ]
    });

    await alert.present();
  }
}