import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{
		path: 'login',
		loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
	},
	{
		path: 'register',
		loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
	},
	{
		path: 'home',
		loadComponent: () => import('./home/home').then(m => m.HomeComponent)
	},
	{
		path: 'agendas/listar',
		loadComponent: () => import('./agendas/listar/listar').then(m => m.Listar)
	},
	{
		path: 'agendas/crear',
		loadComponent: () => import('./agendas/crear/crear').then(m => m.Crear)
	}
];
