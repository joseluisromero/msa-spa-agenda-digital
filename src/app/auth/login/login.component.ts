import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({ user: ['', Validators.required], password: ['', Validators.required] });
  }

  submit() {
    console.log('LoginComponent submit called with', this.form.value);
    this.auth.login(this.form.value).subscribe({
      //Si éxito: Redirige a home
      next: () => this.router.navigate(['/home']),
      //Si error: Muestra mensaje "Credenciales inválidas"
      error: () => this.error = 'Credenciales inválidas'
    });
  }
}
