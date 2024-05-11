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
  selector: 'app-todo-item',
  template: `
    <div>
      {{ todo().title }}
      @if (loading()) {
        <span>
          todo: Todo, index: number
          <mat-spinner [color]="'black'" />
        </span>
      } @else {
        <button
          type="button"
          [disabled]="todosService.todosUpdateLock()"
          (click)="update(todo(), index())">
          Update
        </button>
        <button
          type="button"
          [disabled]="todosService.todosUpdateLock()"
          (click)="delete(todo())">
          delete
        </button>
      }
    </div>
    @if (error) {
      <p>{{ error }}</p>
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

  delete(todo: Todo): void {
    this.todosService.todosUpdateLock.set(true);
    this.todosService
      .delete(todo)
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
