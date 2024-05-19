import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  user: WritableSignal<User | undefined> = signal(undefined);
  isAdmin: Signal<boolean | undefined> = computed(() => this.user()?.isAdmin);
  isUserLoggedIn: Signal<boolean> = computed(() => this.user() !== undefined);

  add(user: User) {
    this.user.set(user);
  }

  hasAnyRole(role: Role | Role[]): boolean {
    if (this.isUserLoggedIn()) {
      if (this.user()!.isAdmin) {
        return true;
      } else if (this.user()) {
        const roles: Role[] = Array.isArray(role) ? role : [role];
        return (
          roles.length === 0 ||
          this.user()!.roles.some((r) => roles.includes(r))
        );
      } else {
        return false;
      }
    }
    return false;
  }
}
