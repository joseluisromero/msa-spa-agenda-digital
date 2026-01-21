import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendasService } from '../../services/agendas.service';

interface Agenda {
  idAgenda: number;
  titulo: string;
  descripcion: string;
  fechaCreacion: string;
  fechaModificacion: string | null;
  fechaVencimiento: string;
  notifica: boolean;
  diasNotifica: number;
  estado: number;
  clienteDto: {
    idCliente: number;
    identificacion: string;
    nombres: string;
    apellidos: string;
    email: string;
    username: string;
    estado: number;
    roles: string[];
  };
  categoriaDto: {
    idCategoria: number;
    nombre: string;
  };
  alertaAgendaList: Array<{
    idAlerta: number;
    nombre: string;
    fechaNotifica: string;
    agendaDto: null | any;
  }>;
}

@Component({
  selector: 'app-listar',
  imports: [CommonModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})
export class Listar implements OnInit {
  agendas: Agenda[] = [];
  cargando: boolean = true;
  error: string | null = null;

  constructor(private agendasService: AgendasService) {}

  ngOnInit(): void {
    this.cargarAgendas();
  }

  cargarAgendas(): void {
    this.cargando = true;
    this.error = null;
    console.log('🔄 Iniciando carga de agendas...');
    
    this.agendasService.getAllAgendas().subscribe({
      next: (data) => {
        console.log('📦 Datos recibidos en el componente:', data);
        console.log('📦 Tipo de datos:', typeof data);
        console.log('📦 Es array?:', Array.isArray(data));
        
        // Manejo flexible de la respuesta
        let agendas: Agenda[] = [];
        
        if (Array.isArray(data)) {
          agendas = data;
          console.log('✅ Respuesta es un array directo');
        } else if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
          agendas = data.data;
          console.log('✅ Respuesta envuelta en objeto.data');
        } else if (data && typeof data === 'object' && 'content' in data && Array.isArray(data.content)) {
          agendas = data.content;
          console.log('✅ Respuesta envuelta en objeto.content');
        } else {
          console.warn('⚠️ Estructura de respuesta desconocida:', data);
          agendas = data || [];
        }
        
        console.log('✅ Total de agendas asignadas:', agendas.length);
        this.agendas = agendas;
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar agendas en el componente:', err);
        console.error('❌ Error completo:', JSON.stringify(err));
        this.error = 'Error al cargar las agendas. Por favor, intenta nuevamente.';
        this.cargando = false;
      },
    });
  }

  obtenerEstadoTexto(estado: number): string {
    return estado === 1 ? 'Activo' : 'Inactivo';
  }

  obtenerColorEstado(estado: number): string {
    return estado === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  }
}
