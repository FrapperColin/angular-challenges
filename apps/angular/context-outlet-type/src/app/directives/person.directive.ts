import { Directive } from '@angular/core';

export interface PersonContext {
  $implicit: string;
  age: number;
}

@Directive({
  selector: 'ng-template[person]',
  standalone: true,
})
export class PersonDirective {
  static ngTemplateContextGuard(
    dir: PersonDirective,
    ctx: unknown,
  ): ctx is PersonContext {
    return true;
  }
}
