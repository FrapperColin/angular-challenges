import { Route } from '@angular/router';
import { hasRole, isAdmin } from './guards/has-permissions.guard';
import { Role } from './user.model';

interface TypedRoute extends Route {
  data?: {
    isAdmin?: boolean;
    accessRolesList?: Role[];
  };
}
export const APP_ROUTES: TypedRoute[] = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'no-user',
    loadComponent: () =>
      import('./dashboard/no-user.component').then(
        (c) => c.NoUserDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [isAdmin],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (c) => c.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [hasRole],
    data: {
      accessRolesList: ['MANAGER'],
    },
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (c) => c.ManagerDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [hasRole],
    data: {
      accessRolesList: ['WRITER', 'READER'],
    },
    loadComponent: () =>
      import('./dashboard/writer-reader.component').then(
        (c) => c.WriterReaderDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [hasRole],
    data: {
      accessRolesList: ['CLIENT'],
    },
    loadComponent: () =>
      import('./dashboard/client.component').then(
        (c) => c.ClientDashboardComponent,
      ),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/everyone.component').then(
        (c) => c.EveryoneDashboardComponent,
      ),
  },
];
