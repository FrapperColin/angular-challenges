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
            context: { $implicit: item, appList: item, index: $index }
          " />
      </div>
    }
    <ng-template #emptyRef>No Template</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<TItem extends { name: string }> {
  list: InputSignal<TItem[]> = input.required<TItem[]>();

  listTemplateRef = contentChild(ListDirective, {
    read: TemplateRef<ListTemplateContext<TItem>>,
  });
}
