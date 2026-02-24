import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { dashboardListReducer } from './store/dashboard-list/dashboard.reducers';
import { DashboardEffects } from './store/dashboard-list/dashboard.effects';
import { DashboardDataEffects } from './store/dashboard-data/dashboard-data.effects';
import { dashboardDataReducer } from './store/dashboard-data/dashboard-data.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ dashboardList: dashboardListReducer, dashboardData: dashboardDataReducer }),
    provideEffects(DashboardEffects, DashboardDataEffects),
  ],
};
