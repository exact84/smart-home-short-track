import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { authGuard } from './guards/auth-guard';
import { dashboardFallbackGuard } from './guards/dashboard-fallback.guard';

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
        canActivate: [authGuard, dashboardFallbackGuard],
      },
      {
        path: 'dashboard/:dashboardId',
        loadComponent: () => import('./components/dashboard/dashboard').then((m) => m.Dashboard),
        canActivate: [authGuard, dashboardFallbackGuard],
      },
      {
        path: 'dashboard/:dashboardId/:tabId',
        loadComponent: () => import('./components/dashboard/dashboard').then((m) => m.Dashboard),
        canActivate: [authGuard, dashboardFallbackGuard],
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found').then((m) => m.NotFound),
  },
];
