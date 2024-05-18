import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { randTodo } from '@ngneat/falso';
import { delay, of } from 'rxjs';
import { TodosService } from './services/todos.service';
import { TodosServiceMock } from './services/todos.service.mock';
import { TodoItemComponent } from './todo/todo-item.component';
import { TodosComponent } from './todos.component';
import {
  clickOn,
  queryExpect,
  queryExpectLength,
  queryExpectSpecificButtonAttribute,
  queryExpectTextContent,
  queryExpectToExist,
} from './utils/test-utils';

@Component({
  template: `
    <todos />
  `,
  standalone: true,
  imports: [TodosComponent],
})
class TestHostComponent {}

describe('TodosComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TodosComponent],
      providers: [{ provide: TodosService, useClass: TodosServiceMock }],
    })
      .overrideComponent(TodosComponent, {
        set: {
          imports: [
            HttpClientModule,
            MatProgressSpinnerModule,
            TodoItemComponent,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should remove item from the list when deleting', () => {
    const firstTodo = randTodo();

    jest
      .spyOn(TestBed.inject(TodosService), 'fetchAll')
      .mockReturnValue(of([firstTodo, randTodo(), randTodo()]));

    fixture.detectChanges();
    queryExpectLength('todo-item').toEqual(3);

    clickOn(`delete-todo-${firstTodo.id}`, fixture);

    queryExpectLength('todo-item').toEqual(2);
  });

  it('should disable other buttons when one update/delete is made', () => {
    const firstTodo = randTodo();
    const secondTodo = randTodo();

    jest
      .spyOn(TestBed.inject(TodosService), 'fetchAll')
      .mockReturnValue(of([firstTodo, secondTodo, randTodo()]));

    jest
      .spyOn(TestBed.inject(TodosService), 'updateTodo')
      .mockImplementationOnce(() => of(firstTodo).pipe(delay(100)));
    fixture.detectChanges();

    clickOn(`update-todo-${firstTodo.id}`, fixture);

    queryExpectToExist(`todo-loader`);
    queryExpectSpecificButtonAttribute(
      `update-todo-${secondTodo.id}`,
      'disabled',
    ).toEqual(true);
  });

  it('should update todo when', () => {
    const firstTodo = randTodo();
    const secondTodo = randTodo();

    jest
      .spyOn(TestBed.inject(TodosService), 'fetchAll')
      .mockReturnValue(of([firstTodo, secondTodo, randTodo()]));

    const updatedTodo = randTodo();
    jest
      .spyOn(TestBed.inject(TodosService), 'updateTodo')
      .mockReturnValue(of(updatedTodo));

    fixture.detectChanges();

    queryExpectTextContent(`todo-title-${firstTodo.id}`).toEqual(
      firstTodo.title,
    );
    clickOn(`update-todo-${firstTodo.id}`, fixture);
    queryExpectTextContent(`todo-title-${updatedTodo.id}`).toEqual(
      updatedTodo.title,
    );
    queryExpect(`todo-title-${firstTodo.id}`).toBeNull();
  });

  it('should delete todo when', () => {
    const firstTodo = randTodo();
    const secondTodo = randTodo();

    jest
      .spyOn(TestBed.inject(TodosService), 'fetchAll')
      .mockReturnValue(of([firstTodo, secondTodo, randTodo()]));

    jest
      .spyOn(TestBed.inject(TodosService), 'deleteTodo')
      .mockReturnValue(of({}));

    fixture.detectChanges();

    clickOn(`delete-todo-${firstTodo.id}`, fixture);
    queryExpect(`todo-title-${firstTodo.id}`).toBeNull();

    queryExpectLength('todo-item').toEqual(2);
  });
});
