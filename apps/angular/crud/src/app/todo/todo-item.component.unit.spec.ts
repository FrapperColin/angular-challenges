import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Todo, randTodo } from '@ngneat/falso';
import { throwError } from 'rxjs';
import { TodosService } from '../services/todos.service';
import { TodosServiceMock } from '../services/todos.service.mock';
import { clickOn, queryExpectToExist } from '../utils/test-utils';
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

  it('should show error when updating todo return error', () => {
    component.todo = randTodo();
    component.index = 0;

    jest
      .spyOn(TestBed.inject(TodosService), 'updateTodo')
      .mockReturnValue(throwError(() => new HttpErrorResponse({})));

    fixture.detectChanges();

    clickOn(`update-todo-${component.todo.id}`, fixture);

    queryExpectToExist(`todo-error-${component.todo.id}`);
  });

  it('should show error when deleting todo return error', () => {
    component.todo = randTodo();
    component.index = 0;

    jest
      .spyOn(TestBed.inject(TodosService), 'deleteTodo')
      .mockReturnValue(throwError(() => new HttpErrorResponse({})));

    fixture.detectChanges();

    clickOn(`delete-todo-${component.todo.id}`, fixture);

    queryExpectToExist(`todo-error-${component.todo.id}`);
    queryExpectToExist(`delete-todo-${component.todo.id}`);
  });
});
