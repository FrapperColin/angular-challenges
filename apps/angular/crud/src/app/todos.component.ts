import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { TodosService } from './services/todos.service';
import { TodoItemComponent } from './todo/todo-item.component';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'todos',
  template: `
    <div class="todos">
      @for (todo of todosService.todos(); track todo.id) {
        <todo-item [todo]="todo" [index]="$index" />
      } @empty {
        <p>No todos available.</p>
      }
      @if (todosService.todosFetchAllLock()) {
        <mat-spinner data-testid="todos-loader" />
      }
      @if (error) {
        <p data-testid="todos-error">{{ error }}</p>
      }
    </div>
  `,
  imports: [CommonModule, TodoItemComponent, MatProgressSpinnerModule],
  providers: [TodosService],
  styles: `
    .todos {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  todosService: TodosService = inject(TodosService);
  #destroyRef: DestroyRef = inject(DestroyRef);

  error?: string;

  ngOnInit(): void {
    this.todosService.todosFetchAllLock.set(true);
    this.todosService
      .fetchAll()
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        finalize(() => this.todosService.todosFetchAllLock.set(false)),
      )
      .subscribe({
        error: (err) => (this.error = 'An error happened ; ' + err),
      });
  }
}
