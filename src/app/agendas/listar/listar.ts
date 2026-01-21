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
    this.agendasService.getAllAgendas().subscribe({
      next: (data) => {
        this.agendas = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar agendas:', err);
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
