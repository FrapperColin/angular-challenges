import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Todo } from '@ngneat/falso';
import { finalize } from 'rxjs';
import { TodosService } from '../services/todos.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'todo-item',
  template: `
    <div class="todo-item">
      <span>{{ todo().title }}</span>
      @if (loading()) {
        <mat-spinner [diameter]="20" data-test="todo-loader" />
      } @else {
        <div class="actions">
          <button
            type="button"
            [disabled]="todosService.todosUpdateLock()"
            (click)="update(todo(), index())"
            [attr.data-testid]="'update-todo' + todo().id">
            Update
          </button>
          <button
            type="button"
            [disabled]="todosService.todosUpdateLock()"
            (click)="deleteTodo(todo())"
            [attr.data-testid]="'delete-todo' + todo().id">
            delete
          </button>
        </div>
      }
    </div>
    @if (error) {
      <p data-testid="todo-error">{{ error }}</p>
    }
  `,
  styles: `
    .todo-item {
      display: flex;
      column-gap: 1rem;
    }

    .actions {
      display: flex;
      column-gap: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  index = input.required<number>();

  todosService: TodosService = inject(TodosService);
  #destroyRef: DestroyRef = inject(DestroyRef);

  error?: string;
  loading = signal<boolean>(false);

  update(todo: Todo, index: number): void {
    this.loading.set(true);
    this.todosService.todosUpdateLock.set(true);
    this.todosService
      .updateTodo(todo, index)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        finalize(() => {
          this.loading.set(false);
          this.todosService.todosUpdateLock.set(false);
        }),
      )
      .subscribe({
        error: (err) => (this.error = 'An error happened ; ' + err),
      });
  }

  deleteTodo(todo: Todo): void {
    this.todosService.todosUpdateLock.set(true);
    this.todosService
      .deleteTodo(todo)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        finalize(() => {
          this.todosService.todosUpdateLock.set(false);
        }),
      )
      .subscribe({
        error: (err) => (this.error = 'An error happened ; ' + err),
      });
  }
}
