import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AgendasService } from '../services/agendas.service';

interface Stats {
  totalAgendas: number;
  agendasActivas: number;
  proxiasAvencer: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  userName: string = '';
  stats: Stats = {
    totalAgendas: 0,
    agendasActivas: 0,
    proxiasAvencer: 0,
  };
  cargando: boolean = true;
  error: string | null = null;

  constructor(private agendasService: AgendasService, private cdr: ChangeDetectorRef) {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        this.userName = userData.user || 'Usuario';
      } catch {
        this.userName = 'Usuario';
      }
    }
  }

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.cargando = true;
    this.error = null;
    this.agendasService.getAllAgendas().subscribe({
      next: (data) => {
        console.log('📊 Datos recibidos en Home:', data);
        
        // Manejo flexible de la respuesta
        let agendas = [];
        if (Array.isArray(data)) {
          agendas = data;
        } else if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
          agendas = data.data;
        } else if (data && typeof data === 'object' && 'content' in data && Array.isArray(data.content)) {
          agendas = data.content;
        } else {
          agendas = data || [];
        }
        
        this.stats.totalAgendas = agendas.length;
        this.stats.agendasActivas = agendas.filter((a: any) => a.estado === 1).length;
        
        // Contar agendas próximas a vencer (en los próximos 7 días)
        const hoy = new Date();
        const dentro7dias = new Date(hoy.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        this.stats.proxiasAvencer = agendas.filter((a: any) => {
          const fechaVencimiento = new Date(a.fechaVencimiento);
          return fechaVencimiento >= hoy && fechaVencimiento <= dentro7dias && a.estado === 1;
        }).length;
        
        this.cargando = false;
        
        // Forzar detección de cambios
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar estadísticas:', err);
        this.error = 'Error al cargar los datos';
        this.cargando = false;
        
        // Forzar detección de cambios en caso de error
        this.cdr.detectChanges();
      },
    });
  }
}
