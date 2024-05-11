import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Todo, randText } from '@ngneat/falso';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos = signal<Todo[]>([]);
  todosFetchAllLock = signal<boolean>(false);
  todosUpdateLock = signal<boolean>(false);

  #http: HttpClient = inject(HttpClient);

  fetchAll(): Observable<Todo[]> {
    return this.#http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(tap((updatedTodos) => this.updateTodoList(updatedTodos)));
  }

  updateTodo(todo: Todo, index: number): Observable<Todo> {
    return this.#http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .pipe(
        tap((updatedTodo: Todo) =>
          this.updateTodoList(this.todos().with(index, updatedTodo)),
        ),
      );
  }

  delete(todoToDelete: Todo): Observable<never> {
    return this.#http
      .delete<never>(
        `https://jsonplaceholder.typicode.com/todos/${todoToDelete.id}`,
      )
      .pipe(
        tap(() =>
          this.updateTodoList(
            this.todos().filter((todo) => todo.id !== todoToDelete.id),
          ),
        ),
      );
  }

  updateTodoList(updatedTodos: Todo[]) {
    this.todos.set([...updatedTodos]);
  }
}
