import { Directive, input } from '@angular/core';

export interface ListTemplateContext<T> {
  $implicit: T;
  aList: T;
  index: number;
}
@Directive({
  selector: 'ng-template[aList]',
  standalone: true,
})
export class ListDirective<T> {
  data = input.required<
    T[],
    {
      alias: 'aList';
    }
  >;

  static ngTemplateContextGuard<TContextItem>(
    dir: ListDirective<TContextItem>,
    ctx: unknown,
  ): ctx is ListTemplateContext<TContextItem> {
    return true;
  }
}
