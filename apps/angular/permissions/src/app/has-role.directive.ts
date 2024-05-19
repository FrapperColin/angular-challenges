import {
  Directive,
  InputSignal,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hasRole], [hasRoleIsAdmin]',
  standalone: true,
})
export class HasRoleDirective implements OnInit {
  #userStore = inject(UserStore);
  #templateRef = inject(TemplateRef<unknown>);
  #viewContainer = inject(ViewContainerRef);

  roles: InputSignal<Role[] | Role> = input<Role[] | Role>([], {
    alias: 'hasRole',
  });

  isAdmin: InputSignal<boolean> = input<boolean>(false, {
    alias: 'hasRoleIsAdmin',
  });

  ngOnInit(): void {
    if (this.isAdmin()) {
      this.#userStore.isAdmin() ? this.addTemplate() : this.clearTemplate();
    } else if (this.roles()) {
      this.#userStore.hasAnyRole(this.roles())
        ? this.addTemplate()
        : this.clearTemplate();
    } else {
      this.addTemplate();
    }
  }

  private addTemplate() {
    this.#viewContainer.clear();
    this.#viewContainer.createEmbeddedView(this.#templateRef);
  }

  private clearTemplate() {
    this.#viewContainer.clear();
  }
}
