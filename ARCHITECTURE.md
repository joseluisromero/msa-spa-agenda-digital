# 📱 MSA SPA Agenda Digital

## 🏢 Arquitectura Senior

Este proyecto sigue las **mejores prácticas profesionales de Angular 21** con arquitectura modular, escalable y mantenible.

---

## 🎨 Sistema de Estilos: Tailwind CSS

### ¿Por qué Tailwind CSS?

| Aspecto | Tailwind CSS | CSS Puro | Bootstrap |
|--------|-------------|----------|-----------|
| **Tamaño Bundle** | ~15KB (purgado) | Variable | ~180KB |
| **Curva Aprendizaje** | Media | Baja | Media |
| **Personalización** | Excelente | Excelente | Limitada |
| **Performance** | Muy Rápido | Rápido | Lento |
| **DX (Developer Experience)** | Excelente | Buena | Buena |

**Decisión: Tailwind CSS** ✅

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.component.css
│   │   ├── register/
│   │   │   ├── register.component.ts
│   │   │   ├── register.component.html
│   │   │   └── register.component.css
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   ├── services/
│   │   └── auth.service.ts
│   ├── app.ts (Root Component)
│   ├── app.routes.ts (Routing)
│   ├── app.config.ts (Configuration)
│   └── app.css
├── main.ts (Entry Point)
├── styles.css (Global Styles + Tailwind)
└── index.html
├── tailwind.config.js (Configuración Tailwind)
└── postcss.config.js
```

---

## 🔐 Sistema de Autenticación

### Flujo de Login
```
Usuario ingresa credenciales
        ↓
LoginComponent → AuthService
        ↓
POST /api/cliente/login
        ↓
Backend retorna {token, user, authorities}
        ↓
Token guardado en localStorage
        ↓
Todas las peticiones incluyen Authorization: Bearer {token}
```

### Interceptor HTTP
- **Ubicación**: [src/app/interceptors/auth.interceptor.ts](src/app/interceptors/auth.interceptor.ts)
- **Función**: Inyecta automáticamente el token en todas las peticiones HTTP
- **Excepciones**: 
  - `/api/cliente/login` (usuario no autenticado)
  - `/api/cliente/guardar` (registro nuevo usuario)

---

## 📡 Endpoints Esperados del Backend

### 1. POST `/api/cliente/login`
**Request:**
```json
{
  "user": "string",
  "password": "string"
}
```
**Response (200):**
```json
{
  "token": "eyJhbGc...",
  "user": "username",
  "authorities": ["ROLE_USER"]
}
```

### 2. POST `/api/cliente/guardar`
**Request:**
```json
{
  "identificacion": "string",
  "nombres": "string",
  "apellidos": "string",
  "email": "string",
  "estado": 1,
  "username": "string",
  "password": "string",
  "roles": ["ROLE_USER"]
}
```
**Response (200):**
```json
{
  "message": "Usuario creado correctamente"
}
```

---

## 🛠️ Stack Tecnológico

```json
{
  "framework": "Angular 21.1.0",
  "language": "TypeScript 5.9",
  "styling": "Tailwind CSS + PostCSS",
  "forms": "Reactive Forms",
  "http": "HttpClientModule",
  "routing": "Angular Router",
  "state": "Signals (Angular 21+)",
  "bundler": "esbuild",
  "testing": "Vitest + Jasmine",
  "package_manager": "npm 11.7.0"
}
```

---

## 🎯 Componentes

### LoginComponent
- **Path**: `src/app/auth/login/`
- **Forma**: Reactive Form
- **Validaciones**: usuario requerido, password requerido
- **Styling**: Tailwind CSS (clases utilitarias)

### RegisterComponent
- **Path**: `src/app/auth/register/`
- **Forma**: Reactive Form
- **Validaciones**: 
  - Email válido (Validators.email)
  - Todos los campos requeridos
  - Password mínimo
- **Styling**: Tailwind CSS (clases utilitarias)

---

## 🎨 Clases Tailwind Personalizadas

Se han definido **componentes reutilizables** en `src/styles.css` usando `@layer components`:

### Botones
- `.btn` - Botón base
- `.btn-primary` - Botón primario (gradiente)
- `.btn-secondary` - Botón secundario
- `.btn-link` - Botón como enlace

### Formularios
- `.form-group` - Contenedor del grupo
- `.form-label` - Etiqueta
- `.form-input` - Input con estilos
- `.form-hint` - Texto de ayuda

### Tarjetas
- `.card` - Contenedor de contenido
- `.card-hover` - Con efecto hover

### Alertas
- `.alert` - Base
- `.alert-success` - Alerta verde
- `.alert-error` - Alerta roja
- `.alert-warning` - Alerta amarilla

### Animaciones
- `.animate-slide-up` - Entrada desde abajo
- `.animate-slide-down` - Entrada desde arriba
- `.animate-shake` - Animación de error
- `.animate-fade-in` - Desvanecimiento

---

## 🚀 Comandos

```bash
# Desarrollo
npm start                 # ng serve

# Compilar
npm run build            # ng build

# Testing
npm test                 # ng test

# Watch mode
npm run watch            # ng build --watch
```

---

## 📦 Configuración Tailwind

**Archivo**: `tailwind.config.js`

```javascript
{
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: { /* Colores personalizados */ },
      fontFamily: { /* Fuentes */ },
      boxShadow: { /* Sombras */ }
    }
  }
}
```

---

## ✅ Mejores Prácticas Implementadas

### 1. **Arquitectura Modular**
- Componentes standalone (Angular 21+)
- Separación de responsabilidades
- Reutilización de código

### 2. **Seguridad**
- HttpInterceptor para inyectar token
- localStorage para almacenar token
- Validación en formularios reactivos

### 3. **Estilos**
- Tailwind CSS (utility-first)
- Variables de color personalizadas
- Componentes CSS reutilizables
- Responsive design

### 4. **Performance**
- Lazy loading de rutas
- Tree-shaking con Tailwind
- Componentes standalone (menos bundle)

### 5. **Mantenibilidad**
- Código limpio y documentado
- Estructura clara de carpetas
- Tipos TypeScript estrictos

---

## 🔄 Flujo de Desarrollo

### Para agregar un nuevo componente:

1. Crear carpeta en `src/app/`
2. Crear `*.component.ts` (standalone)
3. Crear `*.component.html` (con clases Tailwind)
4. No necesita `.component.css` (usar Tailwind)
5. Registrar en rutas si es página

### Para un nuevo servicio:
1. Crear en `src/app/services/`
2. Decorador `@Injectable({ providedIn: 'root' })`
3. Inyectar en componentes

---

## 📚 Recursos Útiles

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Angular Docs](https://angular.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 👨‍💼 Notas Senior

Este proyecto está configurado para **producción** con:
- ✅ Bundling optimizado
- ✅ Tree-shaking de estilos
- ✅ Minificación automática
- ✅ Source maps para debugging
- ✅ Configuración escalable

**Próximos pasos recomendados:**
1. Agregar validadores personalizados
2. Implementar global error handler
3. Crear Guards para proteger rutas
4. Agregar temas dinámicos (dark mode)
5. Implementar caching de HTTP
6. Tests unitarios e integración

---

**Última actualización**: Enero 2026  
**Versión**: 1.0.0  
**Autor**: Senior Developer
