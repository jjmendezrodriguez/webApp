# Development Workflow & Best Practices

**Version:** 1.0  
**Created:** 2025-10-27  
**Purpose:** Guía maestra para desarrollo de proyectos con estándares senior

---

## 📋 Flujo de Lectura para IA/Copilot

Cuando Copilot o una IA empieza a trabajar en el proyecto, **debe seguir este orden de lectura:**

### 1️⃣ **Archivos de Configuración del Workspace** (.vscode/)

- `.vscode/settings.json` → Conocer configuración de editor, formatters, y referencias a instrucciones
- `.vscode/mcp.json` → Si hay servicios MCP (Supabase, etc.)

### 2️⃣ **Instrucciones Principales** (.github/)

- `.github/copilot-instructions.md` → Overview del proyecto, stack, y guías generales
- Esta es la **entrada principal** que referencia otros archivos

### 3️⃣ **Estándares de Código** (frontEnd/)

- `frontEnd/AGENTS.md` → **Reglas críticas de código, comentarios, estructura**
- `frontEnd/PROJECT_STRUCTURE.md` → Dónde ubicar cada tipo de archivo

### 4️⃣ **Documentación de Seguridad y Features**

- `SECURITY.md` → Checklist de seguridad pre-deploy
- Otros MD específicos según el proyecto

### 5️⃣ **Código Fuente**

- Solo después de leer las reglas, analizar el código existente

---

## 🎯 Checklist: Inicio de Nuevo Proyecto (Setup)

### ✅ **Configuración Inicial**

#### 1. Estructura de Carpetas

```bash
proyecto/
├── .github/
│   ├── copilot-instructions.md     # ✅ Instrucciones principales
│   ├── DEVELOPMENT_WORKFLOW.md     # ✅ Este archivo (guía maestra)
│   └── workflows/
│       └── ci.yml                  # ✅ CI/CD pipeline
├── .vscode/
│   ├── settings.json               # ✅ Config de editor + referencias
│   ├── extensions.json             # ✅ Extensiones recomendadas
│   └── mcp.json                    # ⚠️ Solo si usas MCP
├── frontEnd/ (o src/)
│   ├── AGENTS.md                   # ✅ Reglas de código
│   ├── PROJECT_STRUCTURE.md        # ✅ Ubicación de archivos
│   └── ...código...
├── .env.example                    # ✅ Template de variables de entorno
├── .gitignore                      # ✅ Excluir .env, node_modules, etc.
├── README.md                       # ✅ Documentación del proyecto
├── SECURITY.md                     # ✅ Checklist de seguridad
└── LICENSE                         # ✅ Licencia del proyecto
```

#### 2. Archivos de Configuración Obligatorios

**`.vscode/settings.json`:**

```json
{
  "github.copilot.chat.codeGeneration.instructions": [
    { "file": ".github/copilot-instructions.md" },
    { "file": "frontEnd/AGENTS.md" },
    { "file": "frontEnd/PROJECT_STRUCTURE.md" }
  ],
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

**`.vscode/extensions.json`:**

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "GitHub.copilot",
    "GitHub.copilot-chat"
  ]
}
```

**`.github/workflows/ci.yml`:**

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run lint
      - run: bun run format:check
      - run: bun run test # Cuando implementes tests
      - run: bun run build
```

---

## 🔧 Checklist: Configuración de Herramientas

### ✅ **Linting & Formatting**

#### ESLint (TypeScript/JavaScript)

```bash
bun add -d eslint @eslint/js typescript-eslint
```

#### Prettier

```bash
bun add -d prettier prettier-plugin-tailwindcss
```

**`.prettierrc`:**

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Scripts en `package.json`:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,md}\"",
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  }
}
```

---

### ✅ **Testing (CRÍTICO para Senior)**

#### Frontend Testing Stack

```bash
bun add -d vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

#### Vitest Config (`vitest.config.ts`)

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

#### Test Setup (`src/test/setup.ts`)

```typescript
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
```

#### Prioridad de Tests (en orden)

1. **Validators/Utils** → Funciones puras (más fácil de testear)
2. **Custom Hooks** → Lógica de negocio reutilizable
3. **Components críticos** → Auth, forms, protected routes
4. **Integration tests** → Flujos completos (login, signup)

---

### ✅ **Path Aliases (TypeScript + Vite)**

**`tsconfig.json`:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**`vite.config.ts`:**

```typescript
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

### ✅ **Logger para Producción**

**`src/utils/logger.ts`:**

```typescript
const isDev = import.meta.env.DEV

interface LogContext {
  [key: string]: unknown
}

export const logger = {
  error: (message: string, error?: unknown, context?: LogContext) => {
    if (isDev) {
      console.error(`❌ ${message}`, error, context)
    } else {
      // Enviar a Sentry/LogRocket/etc.
      // sendToMonitoring({ level: 'error', message, error, context })
    }
  },

  warn: (message: string, context?: LogContext) => {
    if (isDev) {
      console.warn(`⚠️ ${message}`, context)
    }
  },

  info: (message: string, context?: LogContext) => {
    if (isDev) {
      console.log(`ℹ️ ${message}`, context)
    }
  },

  debug: (message: string, data?: unknown) => {
    if (isDev) {
      console.debug(`🐛 ${message}`, data)
    }
  },
}
```

**Uso:**

```typescript
import { logger } from '@/utils/logger'

try {
  // código...
} catch (error) {
  logger.error('Failed to fetch profile', error, { userId: user.id })
}
```

---

## 🔒 Checklist: Seguridad

### ✅ **Pre-Deploy Security**

- [ ] Todas las secrets en variables de entorno (`.env`)
- [ ] `.env` excluido en `.gitignore`
- [ ] No hay `console.log` o `console.error` en producción (usar logger)
- [ ] Security headers configurados (ver abajo)
- [ ] Validación de inputs en frontend Y backend
- [ ] RLS (Row Level Security) activado en Supabase
- [ ] OAuth redirect URLs whitelisteadas
- [ ] Secrets rotadas regularmente
- [ ] Dependencies auditadas (`bun audit`)

### ✅ **Security Headers (Vercel/Netlify)**

**`vercel.json`:**

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

---

## 📊 Checklist: Monitoreo y Analytics

### ✅ **Error Tracking**

**Sentry (Recomendado):**

```bash
bun add @sentry/react
```

**`src/main.tsx`:**

```typescript
import * as Sentry from '@sentry/react'

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    tracesSampleRate: 1.0,
  })
}
```

### ✅ **Performance Monitoring**

**Web Vitals:**

```bash
bun add web-vitals
```

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

---

## 🚀 Checklist: Optimización de Performance

### ✅ **Bundle Optimization**

#### 1. Lazy Loading de Rutas

```typescript
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

// En Routes:
<Suspense fallback={<LoadingSpinner />}>
  <Routes>...</Routes>
</Suspense>
```

#### 2. Code Splitting por Feature

```typescript
// En lugar de:
import { Button, Modal, Tooltip } from '@/components'

// Hacer:
import Button from '@/components/Button'
import Modal from '@/components/Modal'
```

#### 3. Vite Bundle Analysis

```bash
bun add -d rollup-plugin-visualizer
```

**`vite.config.ts`:**

```typescript
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }), // Solo en análisis
  ],
})
```

---

## 📝 Documentación Obligatoria

### ✅ **README.md Mínimo**

```markdown
# Nombre del Proyecto

**Stack:** React + TypeScript + Vite + [Backend]
**Estado:** En desarrollo / Producción

## 🚀 Inicio Rápido

\`\`\`bash
bun install
bun dev
\`\`\`

## 📁 Estructura

- Ver `PROJECT_STRUCTURE.md`

## 🔒 Variables de Entorno

- Ver `.env.example`

## 🧪 Tests

\`\`\`bash
bun test
bun test:coverage
\`\`\`

## 📦 Build

\`\`\`bash
bun build
\`\`\`

## 📚 Documentación

- Estándares de código: `AGENTS.md`
- Seguridad: `SECURITY.md`
```

### ✅ **SECURITY.md**

- Checklist pre-deploy
- Políticas de RLS
- Gestión de secrets
- Procedimientos de emergencia

### ✅ **CHANGELOG.md** (Opcional pero recomendado)

```markdown
# Changelog

## [1.0.0] - 2025-10-27

### Added

- Sistema de autenticación
- Dashboard de usuario

### Changed

- Migración a Bun

### Fixed

- Bug en validación de email
```

---

## 🎓 Niveles de Madurez del Proyecto

### 📊 **Evaluación por Categoría**

| Categoría       | Junior (0-3)      | Mid (4-6)     | Senior (7-8)         | Staff+ (9-10)                |
| --------------- | ----------------- | ------------- | -------------------- | ---------------------------- |
| **Testing**     | Sin tests         | Tests básicos | Coverage >70%        | E2E + Unit + Integration     |
| **CI/CD**       | Manual deploy     | Basic CI      | Auto deploy + checks | Full pipeline + staging      |
| **Docs**        | Sin README        | README básico | Docs completas       | Docs + ADRs + diagramas      |
| **Seguridad**   | Hardcoded secrets | .env básico   | Headers + RLS        | Security audit + pen testing |
| **Monitoring**  | Sin tracking      | Console.log   | Error tracking       | Full observability           |
| **Performance** | Sin optimizar     | Bundle básico | Lazy loading         | < 2s TTI + Lighthouse >90    |

---

## 🔄 Workflow Diario Recomendado

### **Antes de Programar:**

1. Pull latest changes
2. Leer issues/tickets asignados
3. Revisar AGENTS.md si hay cambios recientes

### **Durante el Desarrollo:**

1. Escribir comentarios ANTES del código
2. Testear funciones críticas mientras desarrollas
3. Commit frecuente con mensajes descriptivos

### **Antes de Push:**

```bash
bun run lint          # Fix automático
bun run format        # Formateo consistente
bun run test          # Todos los tests pasan
bun run build         # Build sin errores
```

### **Antes de Deploy:**

- [ ] Revisar SECURITY.md checklist
- [ ] Verificar que no hay console.log
- [ ] Actualizar CHANGELOG.md
- [ ] Tag de versión en git

---

## 📚 Recursos y Referencias

### **Herramientas Recomendadas**

- **Testing:** Vitest, Testing Library, Playwright (E2E)
- **Linting:** ESLint, Prettier
- **Monitoring:** Sentry, LogRocket, PostHog
- **Analytics:** Vercel Analytics, Plausible
- **Security:** Snyk, OWASP ZAP

### **Aprendizaje Continuo**

- [ ] Leer commits de proyectos open-source senior
- [ ] Hacer code reviews de otros proyectos
- [ ] Estudiar testing patterns
- [ ] Practicar arquitectura de software

---

## 🎯 Objetivos de Mejora (Roadmap Personal)

### **Corto Plazo (1-2 meses)**

- [ ] Implementar testing en todos los proyectos nuevos
- [ ] Configurar CI/CD desde el inicio
- [ ] Usar logger en vez de console.log

### **Mediano Plazo (3-6 meses)**

- [ ] Alcanzar 80% code coverage
- [ ] Implementar E2E tests con Playwright
- [ ] Integrar monitoreo de performance

### **Largo Plazo (6-12 meses)**

- [ ] Contribuir a proyectos open-source
- [ ] Crear templates de proyectos
- [ ] Mentoría a otros developers

---

**Última actualización:** 2025-10-27  
**Autor:** José Méndez  
**Licencia:** Proprietary - Mendez Tech
