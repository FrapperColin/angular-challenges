import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Todo } from '@ngneat/falso';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'todo-item',
  template: `
    <p>TodoItemComponent mocked</p>
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemMockComponent {
  todo = input.required<Todo>();
  index = input.required<number>();
}
