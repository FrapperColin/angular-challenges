import { inject } from '@angular/core';
import { CanMatchFn, Route, Router } from '@angular/router';
import { of } from 'rxjs';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

export const isAdmin: CanMatchFn = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  return userStore.isAdmin() ?? of(router.parseUrl('no-user'));
};

export const hasRole: CanMatchFn = (route: Route) => {
  const userStore = inject(UserStore);
  const accessRolesList: Role[] = route.data?.['accessRolesList'] ?? [];
  return userStore.hasAnyRole(accessRolesList);
};
