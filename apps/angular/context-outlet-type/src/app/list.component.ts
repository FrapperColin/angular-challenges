import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  TemplateRef,
  contentChild,
  input,
} from '@angular/core';
import {
  ListDirective,
  ListTemplateContext,
} from './directives/list.directive';

@Component({
  selector: 'list',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for (item of list(); track $index) {
      <div>
        <ng-container
          *ngTemplateOutlet="
            listTemplateRef() || emptyRef;
            context: { $implicit: item, aList: item, index: $index }
          " />
      </div>
    }
    <ng-template #emptyRef>No Template</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<T extends object> {
  list: InputSignal<T[]> = input.required<T[]>();

  listTemplateRef = contentChild(ListDirective, {
    read: TemplateRef<ListTemplateContext<T>>,
  });
}
