import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToDoModalPage } from './to-do-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ToDoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToDoModalPageRoutingModule {}
