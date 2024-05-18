import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { throwError } from 'rxjs';
import { TodosService } from './services/todos.service';
import { TodosServiceMock } from './services/todos.service.mock';
import { TodoItemMockComponent } from './todo/todo-item.component.mock';
import { TodosComponent } from './todos.component';
import { queryExpectToExist } from './utils/test-utils';

@Component({
  template: `
    <todos />
  `,
  standalone: true,
  imports: [TodosComponent],
})
class TestHostComponent {}

describe('TodosComponent', () => {
  let component: TestHostComponent;
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
            TodoItemMockComponent,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should show error when fetching all todos return error', () => {
    jest
      .spyOn(TestBed.inject(TodosService), 'fetchAll')
      .mockReturnValue(throwError(() => new HttpErrorResponse({})));

    fixture.detectChanges();

    queryExpectToExist('todos-error');
  });
});
