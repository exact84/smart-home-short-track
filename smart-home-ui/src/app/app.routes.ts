import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then((m) => m.Login),
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard').then((m) => m.Dashboard),
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./components/dashboard/dashboard').then((m) => m.Dashboard),
          },
          {
            path: ':dashboardId',
            loadComponent: () =>
              import('./components/dashboard/dashboard').then((m) => m.Dashboard),
          },
        ],
      },
    ],
  },
  // {
  // path: '**',
  // loadComponent: () => import('./components/404/404').then((m) => m.404),
  // },
];
