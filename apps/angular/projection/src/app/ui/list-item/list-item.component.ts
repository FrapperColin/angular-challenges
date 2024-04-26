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
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name() }}
      <button (click)="itemDeleted.emit(id())">
        <img class="h-5" src="assets/svg/trash.svg" alt="trash" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  id: InputSignal<number> = input.required<number>();
  name: InputSignal<string> = input.required<string>();

  @Output() itemDeleted = new EventEmitter<number>();
  // onItemDeleted: OutputEmitterRef<number> = output<number>();
}
