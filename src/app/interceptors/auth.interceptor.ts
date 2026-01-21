import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Intercepta todas las peticiones HTTP y adjunta automáticamente el token
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // Rutas que NO requieren token (login y registro)
  private rutasSinToken = ['/cliente/login', '/cliente/guardar'];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    // Verifica si la URL requiere token
    const requiereToken = !this.rutasSinToken.some(ruta => req.url.includes(ruta));
    
    /**
     * Si tenemos token y la ruta lo requiere:
     * Clona la petición y agrega header: Authorization: Bearer {token}
     */
    if (token && requiereToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ Token agregado a la petición:', req.url);
      return next.handle(authReq).pipe(
        catchError(error => {
          if (error.status === 401 || error.status === 403) {
            console.error('❌ Token inválido o expirado. Sesión finalizada.');
            // Aquí podrías redirigir al login si el token está expirado
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
          return throwError(() => error);
        })
      );
    }
    
    // Para rutas sin token, continúa con la petición original
    return next.handle(req);
  }
}

