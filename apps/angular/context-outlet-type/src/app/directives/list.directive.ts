import { Directive, input } from '@angular/core';

export interface ListTemplateContext<TItem> {
  $implicit: TItem;
  appList: TItem;
  index: number;
}
@Directive({
  selector: 'ng-template[appList]',
  standalone: true,
})
export class ListDirective<TItem> {
  data = input.required<TItem[]>({ alias: 'appList' });

  static ngTemplateContextGuard<TContextItem>(
    dir: ListDirective<TContextItem>,
    ctx: unknown,
  ): ctx is ListTemplateContext<TContextItem> {
    return true;
  }
}
