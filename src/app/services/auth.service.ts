import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

//Gestiona toda la lógica de autenticación
@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  //Registra usuario con los datos del formulario
  register(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cliente/guardar`, payload).pipe(
      catchError(error => {
        console.error('Error en registro:', error);
        return throwError(() => error);
      })
    );
  }

  //Autentica y guarda token en localStorage
  login(credentials: { user: string; password: string }) {
    console.log('URL de login: ', `${this.baseUrl}/cliente/login`);
    console.log('Payload enviado:', credentials);
    
    return this.http.post<{ token?: string; [key: string]: any }>(`http://localhost:8080/api/cliente/login`, credentials)
      .pipe(
        tap(res => {
          console.log('✅ Respuesta del backend:', res);
          if (res && (res as any).token) {
            localStorage.setItem('token', (res as any).token);
            localStorage.setItem('user', JSON.stringify({ user: (res as any).user, authorities: (res as any).authorities }));
            console.log('✅ Token guardado en localStorage');
          }
        }),
        catchError(error => {
          console.error('❌ Error en login:', error.status, error.statusText);
          console.error('❌ Respuesta del backend:', error.error);
          
          // Mostrar mensaje específico según el error
          if (error.status === 403) {
            console.error('❌ 403 Forbidden - Credenciales inválidas o servidor rechaza la petición');
          } else if (error.status === 0) {
            console.error('❌ No se puede conectar al backend. Verifica que esté corriendo en http://localhost:8080');
          } else if (error.status === 404) {
            console.error('❌ 404 - El endpoint /api/cliente/login no existe en el backend');
          }
          
          return throwError(() => error);
        })
      );
  }

  //Recupera el token guardado
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //Limpia localStorage (elimina token y usuario)
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

