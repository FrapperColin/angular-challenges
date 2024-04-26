import { Component, input, InputSignal, output } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content select="[image]" />

      <section>
        <ng-content />
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onItemAdded.emit()">
        Add
      </button>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  standalone: true,
})
export class CardComponent<T extends { id: number }> {
  items: InputSignal<Array<T>> = input.required<Array<T>>();

  onItemAdded = output<void>();
}
