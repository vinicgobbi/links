import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnalytics } from '@vinicgobbi/ui/consent';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // O Analytics só carrega depois do aceite no aviso de cookies (LGPD).
    provideAnalytics({ measurementId: 'G-KV981LY6QB' }),
  ]
};
