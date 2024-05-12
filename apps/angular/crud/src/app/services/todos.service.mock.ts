import { signal } from '@angular/core';
import { Todo } from '@ngneat/falso';
import { Observable, of } from 'rxjs';

export class TodosServiceMock {
  todos = signal<Todo[]>([]);
  todosFetchAllLock = signal<boolean>(false);
  todosUpdateLock = signal<boolean>(false);

  fetchAll(): Observable<Todo[]> {
    return of([]);
  }

  updateTodo(todo: Todo, index: number): Observable<Todo> {
    return of();
  }

  deleteTodo(todoToDelete: Todo): Observable<never> {
    return of();
  }
}
