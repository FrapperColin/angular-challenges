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
  selector: 'app-root',
  template: `
    @for (todo of todosService.todos(); track todo.id) {
      <app-todo-item [todo]="todo" [index]="$index" />
      {{ $index }}
    } @empty {
      <p>No todos available.</p>
    }
    @if (todosService.todosFetchAllLock()) {
      <mat-spinner class="custom-spinner" />
    }
    @if (error) {
      <p>{{ error }}</p>
    }
  `,
  imports: [CommonModule, TodoItemComponent, MatProgressSpinnerModule],
  providers: [TodosService],
  styles: `
    .custom-spinner {
      color: black;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
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
