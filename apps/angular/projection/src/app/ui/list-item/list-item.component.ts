import {
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="flex justify-between border border-gray-300 px-2 py-1">
      {{ name() }}
      <button (click)="itemDeleted.emit()">
        <img class="h-5" src="assets/svg/trash.svg" alt="trash" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  name: InputSignal<string> = input.required<string>();

  @Output() itemDeleted = new EventEmitter<number>();
}
