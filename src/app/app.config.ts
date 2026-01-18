import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthInterceptor } from './interceptors/auth.interceptor';
//Configura los providers globales:
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),// Maneja errores globales del navegador
    provideRouter(routes),// Configura el enrutador con las rutas definidas
    provideHttpClient(),// Proporciona el cliente HTTP para hacer peticiones
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Inyecta el token en todas las peticiones HTTP
  ]
};
