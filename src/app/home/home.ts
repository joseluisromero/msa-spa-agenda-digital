import { Component, OnInit } from '@angular/core';
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

  constructor(private agendasService: AgendasService) {
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
        this.stats.totalAgendas = data.length;
        this.stats.agendasActivas = data.filter((a: any) => a.estado === 1).length;
        
        // Contar agendas próximas a vencer (en los próximos 7 días)
        const hoy = new Date();
        const dentro7dias = new Date(hoy.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        this.stats.proxiasAvencer = data.filter((a: any) => {
          const fechaVencimiento = new Date(a.fechaVencimiento);
          return fechaVencimiento >= hoy && fechaVencimiento <= dentro7dias && a.estado === 1;
        }).length;
        
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar estadísticas:', err);
        this.error = 'Error al cargar los datos';
        this.cargando = false;
      },
    });
  }
}
