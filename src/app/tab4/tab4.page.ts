import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  darkMode: boolean;

  constructor(private alertController: AlertController) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }

  ngOnInit() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      this.darkMode = savedDarkMode === 'true';
      this.applyDarkMode();
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.applyDarkMode();
    localStorage.setItem('darkMode', this.darkMode.toString());
  }

  applyDarkMode() {
    document.body.classList.toggle('dark', this.darkMode);
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
    localStorage.clear();
    }
}