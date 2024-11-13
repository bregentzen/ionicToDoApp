import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoModalPage } from './to-do-modal.page';

describe('ToDoModalPage', () => {
  let component: ToDoModalPage;
  let fixture: ComponentFixture<ToDoModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
