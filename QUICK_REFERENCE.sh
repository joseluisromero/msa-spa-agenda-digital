#!/bin/bash
# Quick Reference - Comandos útiles para el proyecto

# ===== DESARROLLO =====

# Iniciar servidor de desarrollo
npm start

# Compilar para producción
npm run build

# Ejecutar tests
npm test

# Watch mode (recompila cambios automáticamente)
npm run watch

# ===== TAILWIND CSS =====

# El proyecto ya está configurado con Tailwind.
# No necesitas hacer nada, solo usa las clases:

# Ejemplos de clases Tailwind disponibles:

# Botones
<button class="btn btn-primary">Primario</button>
<button class="btn btn-secondary">Secundario</button>

# Formularios
<div class="form-group">
  <label class="form-label">Campo</label>
  <input class="form-input" />
  <small class="form-hint">Ayuda</small>
</div>

# Tarjetas
<div class="card">Contenido</div>

# Alertas
<div class="alert alert-success">✅ Éxito</div>
<div class="alert alert-error">❌ Error</div>

# Animaciones
<div class="animate-slide-up">Entra suave</div>
<div class="animate-shake">Error</div>

# ===== ESTRUCTURAS =====

# Para crear un nuevo componente:
ng generate component nombre --skip-tests

# Para crear un nuevo servicio:
ng generate service nombre --skip-tests

# Para crear un interceptor:
ng generate interceptor nombre

# ===== GIT =====

# Ver cambios
git status

# Agregar cambios
git add .

# Commit
git commit -m "feat: descripción del cambio"

# Push
git push origin main

# ===== DEBUGGING =====

# Abrir DevTools del navegador
F12

# Verificar que el token está guardado
localStorage.getItem('token')

# Ver los usuarios guardados
localStorage.getItem('user')

# Limpiar localStorage
localStorage.clear()

# ===== DOCUMENTACIÓN =====

# Lee estos archivos para entender el proyecto:
# 1. ARCHITECTURE.md     → Decisiones técnicas
# 2. STYLING_GUIDE.md    → Cómo usar Tailwind
# 3. README.md           → Guía rápida

# ===== ENDPOINTS ESPERADOS DEL BACKEND =====

# Login
POST http://localhost:8080/api/cliente/login
{
  "user": "admin",
  "password": "password"
}
→ { token: "...", user: "admin", authorities: ["ROLE_USER"] }

# Register
POST http://localhost:8080/api/cliente/guardar
{
  "identificacion": "123456",
  "nombres": "Juan",
  "apellidos": "Pérez",
  "email": "juan@email.com",
  "estado": 1,
  "username": "juan.perez",
  "password": "password123",
  "roles": ["ROLE_USER"]
}

# ===== NOTAS IMPORTANTES =====

# 1. Tailwind no necesita CSS personalizado
#    → Usa clases utilitarias en los templates HTML

# 2. El token se inyecta automáticamente
#    → HttpInterceptor agrega Authorization header

# 3. Componentes standalone
#    → No necesitan módulos, más limpio

# 4. Lazy loading habilitado
#    → Login y Register cargan bajo demanda

# 5. Validaciones reactivas
#    → FormBuilder con Validators

# ===== ESTRUCTURA DE CARPETAS =====

src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.component.css
│   │   └── register/
│   │       ├── register.component.ts
│   │       ├── register.component.html
│   │       └── register.component.css
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   ├── services/
│   │   └── auth.service.ts
│   ├── app.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── styles.css
└── main.ts

# ===== TROUBLESHOOTING =====

# ¿Errores de compilación?
# → Ejecuta: npm install

# ¿Puerto 4200 en uso?
# → El servidor usará otro puerto automáticamente

# ¿Cambios no se reflejan?
# → Guarda el archivo y espera a que se recompile

# ¿Token no se envía?
# → Verifica que login fue exitoso
# → localStorage.getItem('token') debe tener valor

# ¿Estilos de Tailwind no aplican?
# → Asegúrate de usar clases validas
# → Revisa STYLING_GUIDE.md

# ===== INFORMACIÓN DE VERSIONES =====

# Angular:       21.1.0
# TypeScript:    5.9.2
# Tailwind CSS:  3.x
# Node:          v22.14.0
# npm:           11.7.0

# ===== CONTACTO & AYUDA =====

# Preguntas sobre la arquitectura → Ve a ARCHITECTURE.md
# Preguntas sobre estilos → Ve a STYLING_GUIDE.md
# Preguntas sobre implementación → Ve a código comentado
