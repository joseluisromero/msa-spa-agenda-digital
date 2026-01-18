import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
// Intercepta todas las peticiones HTTP y adjunta automáticamente el token
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    /**
     * Excepto para las rutas /cliente/login y /cliente/guardar (no necesitan token)
        Clona la petición y agrega header: Authorization: Bearer {token}
        Continúa con la petición modificada
     */
    if (token && !req.url.endsWith('/cliente/login') && !req.url.endsWith('/cliente/guardar')) {
      const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
