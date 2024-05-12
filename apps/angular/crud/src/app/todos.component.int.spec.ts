import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { randTodo } from '@ngneat/falso';
import { of } from 'rxjs';
import { TodosService } from './services/todos.service';
import { TodosServiceMock } from './services/todos.service.mock';
import { TodoItemComponent } from './todo/todo-item.component';
import { TodosComponent } from './todos.component';

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
      imports: [TestHostComponent, TodosComponent, TodoItemComponent],
      // declarations: [TestHostComponent],
      providers: [{ provide: TodosService, useClass: TodosServiceMock }],
    })
      .overrideComponent(TodosComponent, {
        set: {
          imports: [HttpClientModule, MatProgressSpinnerModule],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should remove item from the list when deleting', () => {
    const firstTodo = randTodo();
    jest
      .spyOn(TestBed.inject(TodosService), 'fetchAll')
      .mockReturnValue(of([firstTodo, randTodo(), randTodo()]));

    fixture.detectChanges();
  });

  it('should disable other buttons when one update/delete is made', () => {
    const firstTodo = randTodo();
    jest
      .spyOn(TestBed.inject(TodosService), 'fetchAll')
      .mockReturnValue(of([firstTodo, randTodo(), randTodo()]));

    fixture.detectChanges();
  });
});
