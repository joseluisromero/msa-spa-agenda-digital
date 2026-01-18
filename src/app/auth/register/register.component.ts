import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form!: FormGroup;

  message = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      identificacion: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      estado: [1],
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['ROLE_USER']
    });
  }

  submit() {
    const value = { ...this.form.value };
    // ensure roles is array
    value.roles = typeof value.roles === 'string' ? value.roles.split(',').map((r: string) => r.trim()) : value.roles;
    this.auth.register(value).subscribe({
      next: () => this.message = 'Usuario creado correctamente',
      error: e => this.message = 'Error: ' + (e?.error?.message || e.statusText || e.message)
    });
  }
}
