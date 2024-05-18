import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Todo, randText } from '@ngneat/falso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos = signal<Todo[]>([]);
  todosFetchAllLock = signal<boolean>(false);
  todosUpdateLock = signal<boolean>(false);

  #http: HttpClient = inject(HttpClient);

  fetchAll(): Observable<Todo[]> {
    console.log('fetchAll');
    return this.#http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.#http.put<Todo>(
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
    );
  }

  deleteTodo(todoToDelete: Todo): Observable<unknown> {
    return this.#http.delete<unknown>(
      `https://jsonplaceholder.typicode.com/todos/${todoToDelete.id}`,
    );
  }
}
