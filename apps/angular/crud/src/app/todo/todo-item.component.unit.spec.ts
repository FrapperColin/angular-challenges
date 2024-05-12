import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Todo, randTodo } from '@ngneat/falso';
import { of, throwError } from 'rxjs';
import { TodosService } from '../services/todos.service';
import { TodosServiceMock } from '../services/todos.service.mock';
import { TodoItemComponent } from './todo-item.component';

@Component({
  template: `
    <todo-item [todo]="todo" [index]="index" />
  `,
  standalone: true,
  imports: [TodoItemComponent],
})
class TestHostComponent {
  todo: Todo = randTodo();
  index = 0;
}

describe('TodoItemComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TodoItemComponent],
      providers: [{ provide: TodosService, useClass: TodosServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should update todo when', () => {
    component.todo = randTodo();
    component.index = 0;

    const updatedTodo = randTodo();
    jest
      .spyOn(TestBed.inject(TodosService), 'updateTodo')
      .mockReturnValue(of(updatedTodo));

    fixture.detectChanges();
  });

  it('should show error when updating todo return error', () => {
    jest
      .spyOn(TestBed.inject(TodosService), 'updateTodo')
      .mockReturnValue(throwError(() => new HttpErrorResponse({})));

    fixture.detectChanges();
  });

  it('should show error when deleting todo return error', () => {
    jest
      .spyOn(TestBed.inject(TodosService), 'deleteTodo')
      .mockReturnValue(throwError(() => new HttpErrorResponse({})));

    fixture.detectChanges();
  });
});
