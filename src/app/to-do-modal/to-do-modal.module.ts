import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToDoModalPageRoutingModule } from './to-do-modal-routing.module';

import { ToDoModalPage } from './to-do-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToDoModalPageRoutingModule
  ],
  declarations: [ToDoModalPage]
})
export class ToDoModalPageModule {}
