import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgendasService {
    private baseUrl = '/api';

    constructor(private http: HttpClient ) { }

    getAllAgendas() {
        console.log('📨 Obteniendo todas las agendas...');
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error('❌ No hay token disponible');
          return throwError(() => new Error('Token no disponible'));
        }
        
        return this.http.get<any>(`${this.baseUrl}/agenda/todos`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
              .pipe(
                tap(res => {
                  console.log('✅ Respuesta del backend:', res);
                  console.log('✅ Total de agendas obtenidas:', res.length || 0);
                }),
                catchError(error => {
                  console.error('❌ Error en la petición de agendas:', error.status, error.statusText);
                  console.error('❌ Respuesta del backend:', error.error);
                  
                  // Mostrar mensaje específico según el error
                  if (error.status === 403 || error.status === 401) {
                    console.error('❌ 401/403 - Token inválido o expirado. Limpiando sesión...');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                  } else if (error.status === 0) {
                    console.error('❌ No se puede conectar al backend. Verifica que esté corriendo en http://localhost:8080');
                  } else if (error.status === 404) {
                    console.error('❌ 404 - El endpoint /api/agenda/todos no existe en el backend');
                  }
                  
                  return throwError(() => error);
                })
              );
    }
}
