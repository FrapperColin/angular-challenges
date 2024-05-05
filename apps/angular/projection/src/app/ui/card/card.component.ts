import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  InputSignal,
  output,
  TemplateRef,
} from '@angular/core';
import { CardRowDirective } from './card-row.directive';

@Component({
  selector: 'app-card',
  template: `
    <div class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content select="[image]" />

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        type="button"
        (click)="onItemAdded.emit()">
        Add
      </button>

      <section>
        @for (item of items(); track item.id) {
          <ng-template
            [ngTemplateOutlet]="rowTemplate()"
            [ngTemplateOutletContext]="{ $implicit: item }" />
        } @empty {
          <p>No items available.</p>
        }
      </section>
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
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends { id: number }> {
  items: InputSignal<Array<T>> = input.required<Array<T>>();
  onItemAdded = output<void>();
  rowTemplate = contentChild.required(CardRowDirective, { read: TemplateRef });
}
