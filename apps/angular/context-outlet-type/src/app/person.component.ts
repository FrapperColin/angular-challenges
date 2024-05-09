import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  InputSignal,
  TemplateRef,
  contentChild,
  input,
} from '@angular/core';
import { PersonContext, PersonDirective } from './directives/person.directive';

export interface Person {
  name: string;
  age: number;
}

@Component({
  standalone: true,
  imports: [NgTemplateOutlet],
  selector: 'person',
  template: `
    <ng-container
      *ngTemplateOutlet="
        personTemplateRef() || emptyRef;
        context: { $implicit: person().name, age: person().age }
      " />

    <ng-template #emptyRef>No Template</ng-template>
  `,
})
export class PersonComponent {
  person: InputSignal<Person> = input.required<Person>();
  personTemplateRef = contentChild(PersonDirective, {
    read: TemplateRef<PersonContext>,
  });
}
