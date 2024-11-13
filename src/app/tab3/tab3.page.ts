import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../ToDoService';
import { ToDo } from '../todo';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  delegates: ToDo[] = [];

  constructor(private todoService: ToDoService) {}

  ngOnInit() {
    this.loadDelegates();
  }

  loadDelegates() {
    this.delegates = this.todoService.getTodos().filter(todo => todo.status.status === 'delegate');
  }
}