# Copilot Instructions - webApp

**Project:** React 19 + TypeScript + Vite + Supabase + Tailwind CSS  
**Package Manager:** Bun  
**Última actualización:** 2025-10-21

## Inicio Rápido

```bash
bun install          # Instalar dependencias
bun dev              # Iniciar servidor de desarrollo
bun build            # Build para producción
bun lint             # Ejecutar ESLint
```

## Arquitectura del Proyecto

- **Frontend:** `/frontEnd/` - React 19 SPA con Vite + SWC
- **Database:** Cliente Supabase en `src/services/supabase/db.ts`
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4 (vía Vite plugin)
- **Config:** Carpeta `/config/` para settings centralizados (crear cuando sea necesario)

> **Nota:** Este es un proyecto nuevo, muchas features están en desarrollo.

## Estilo de Código (CRÍTICO - Lee `frontEnd/AGENTS.md` para reglas completas)

### TypeScript

- **Strict mode activado** - no usar `any` implícito
- **Single quotes, SIN semicolons**
- **camelCase** para functions y variables
- Orden de imports: React → third-party → local
- **Max file size: ~300 lines** (split if exceeds)

### 🔹 File Splitting Guideline

Si un componente supera ~200-300 líneas o se vuelve difícil de leer, **separar UI y lógica**.

**Cuándo dividir:**

- Componente crece más de 200-300 líneas
- Contiene lógica de negocio significativa (fetching, transforms, validación)
- Maneja estado complejo (múltiples `useState`, `useEffect`, timers)
- Necesita hooks reutilizables o testeables

**Patrón recomendado:**

```
pages/Home/
  ├── Home.tsx         # UI + composición
  ├── useHome.ts       # hook con state y handlers
  ├── home.service.ts  # llamadas a API/Supabase (opcional)
  └── index.ts         # export { default } from './Home'
```

> Consulta `frontEnd/PROJECT_STRUCTURE.md` para ubicación exacta según propósito

### Comments (OBLIGATORIO)

```typescript
// ✅ SIEMPRE iniciar archivos con comment explicando su propósito
// This component handles user authentication flow

/**
 * Validates user credentials and returns auth token.
 * @param email - User email address
 * @param password - Plain text password (hashed internally)
 */
function authenticateUser(email: string, password: string) {
  // Validate inputs before processing
  // ...
}
```

- Dejar **blank line antes de comments** (separación visual)
- Usar **JSDoc** para todas las functions exportadas
- Comentar transiciones de state: `// Switch to loading state`

### Naming

- `getUserData()` ✅ NO `gud()` ❌
- Variables descriptivas: `isAuthenticated` no `auth`
- Siempre en inglés

### Estructura

- Una function = una responsabilidad
- Flujo natural: **read → validate → process → respond**
- Evitar nested ifs (preferir early returns)
- **Declarar funciones fuera del JSX** (fuera del `return`)

### Estructura de Componentes

**Componentes simples** (un solo archivo):

- Componentes sin estado complejo: `Header.tsx`, `Button.tsx`
- Menos de 300 líneas
- Solo UI y props, sin lógica de negocio

**Componentes complejos** (carpeta):

```
ComponentName/
  ├── ComponentName.tsx         # UI + JSX
  ├── useComponentName.ts       # hook con state/handlers
  ├── componentName.service.ts  # API calls (opcional)
  └── index.ts                  # re-export
```

## React Router

### Configuración de Rutas

**Inline en `main.tsx`** (actual):

- ✅ Proyectos con 3-5 rutas simples
- ✅ Sin loaders/actions/error boundaries
- ✅ Prototipado rápido

**Archivo `routes.tsx` separado** (migrar cuando):

- Más de 5 rutas o rutas anidadas complejas
- Necesitas loaders/actions (data router)
- Implementas lazy loading (`React.lazy()`)
- Route guards o autenticación
- Menús generados dinámicamente

### Layout Components

- `Header`, `Footer`, `Sidebar` → en `src/components/`
- Integrar en `App.tsx` con `<Outlet />`:

```tsx
function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
```

## Integración con Supabase

```typescript
// Import desde el client centralizado
import { supabase } from '@/services/supabase/db'

// Example query
const { data, error } = await supabase.from('table_name').select('*')
```

**Archivos importantes:**

- `src/services/supabase/db.ts` - Cliente de Supabase
- `src/services/supabase/config.ts` - Configuración y validación
- `src/services/supabase/README.md` - Schema y queries comunes

**Environment variables** (en `.env`):

```env
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Seguridad:** NUNCA hardcodear keys - siempre usar `import.meta.env.VITE_*`

## Tailwind CSS

- **Approach principal** - clases inline de Tailwind
- Usar **CSS custom properties** si se repite 3+ veces
- Referir a `/config/` para design tokens globales (crear cuando sea necesario)
- Patrón ejemplo de `App.tsx`:
  ```tsx
  <div className="flex min-h-screen flex-col items-center">
  ```

## Configuration Files

Crear carpeta `/frontEnd/src/config/` para:

- `apiConfig.ts` → API routes, endpoints, versions
- `systemSettings.ts` → nombre de la app, version, environment
- `globals.ts` → opcional, para exportar todas las config centralizadas
- Marcar valores sensibles: `// 🔒 Do NOT expose publicly`

**Reglas de configuración:**

- NUNCA hardcodear claves API, tokens o contraseñas
- Usar variables de entorno (`.env`) para datos sensibles
- Cada variable debe tener comentario indicando si es editable o no
- No modificar valores globales desde otros archivos (editar en `/config/`)

## Security Checklist

- [ ] Todos los datos externos validados antes de usarse
- [ ] No hay secrets hardcodeados (usar `.env`)
- [ ] Sanitizar inputs (SQL, HTML, shell commands)
- [ ] Flujo de auth: **Authenticate → Authorize → Validate → Log**
- [ ] Ejecutar `bun audit` antes de deploy

## Git Workflow

Nombres de branches: `feature/login-ui`, `fix/api-timeout`, `refactor/db-model`

Convención de commits:

- `feat:` nueva feature
- `fix:` corrección de bug
- `docs:` cambios en documentación
- `chore:` tareas de mantenimiento

## Testing (Solo Backend - aún no hay en frontend)

Si se añade backend:

- Unit tests (Jest recomendado)
- Coverage mínimo 80%
- Mockear servicios externos
- Nombres descriptivos para tests: `should return 401 when token expired`

## Archivos Clave

- `frontEnd/AGENTS.md` - **Estándares completos de código (LEER PRIMERO)**
- `frontEnd/PROJECT_STRUCTURE.md` - **Ubicación de archivos por propósito**
- `src/services/supabase/db.ts` - Cliente de database
- `vite.config.ts` - Configuración de build (React SWC + Tailwind)
- `eslint.config.js` - Reglas de linting

## AI Guidelines

- Seguir reglas de `AGENTS.md` estrictamente
- No generar código sin comentarios ni estructura lógica
- Antes de crear nuevas carpetas o módulos, **preguntar y esperar aprobación**
- Consultar `PROJECT_STRUCTURE.md` para saber dónde ubicar nuevos archivos
- Priorizar modularidad, rendimiento y seguridad

## Licencia

© 2025 Mendez Tech. Propiedad privada. Copia no autorizada prohibida.
