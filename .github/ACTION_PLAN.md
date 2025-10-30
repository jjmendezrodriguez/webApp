# Plan de Acción: De Mid-Senior a Staff Engineer

**Fecha:** 2025-10-27  
**Autor:** José Méndez  
**Objetivo:** Elevar el nivel de todos los proyectos futuros a estándares Staff+

---

## 📊 Diagnóstico Actual

### Tu Nivel Actual por Categoría

| Categoría         | Nivel Actual | Meta   | Gap Principal                     |
| ----------------- | ------------ | ------ | --------------------------------- |
| **Arquitectura**  | 🟢 Senior+   | Staff  | Feature-based organization        |
| **Documentación** | 🟢 Senior+   | Staff  | ADRs (decisiones arquitectónicas) |
| **Testing**       | 🔴 Junior    | Senior | Coverage >70% frontend            |
| **CI/CD**         | 🔴 Junior    | Senior | GitHub Actions + Husky            |
| **Logging**       | 🔴 Junior    | Senior | Logger centralizado               |
| **Seguridad**     | 🟢 Senior    | Staff  | Security headers + audit          |
| **Performance**   | 🟡 Mid       | Senior | Lazy loading + metrics            |

**Promedio:** Mid-Senior (6.5/10)  
**Meta:** Staff Engineer (9/10)

---

## 🎯 Los 3 Gaps Críticos (80/20 Rule)

Estos 3 cambios tendrán el **mayor impacto** en tu nivel:

### 1. 🧪 **Testing (De 0/10 → 8/10)**

**Impacto:** ALTO - Es lo que más separa Junior de Senior

**Implementación:**

#### Paso 1: Setup (15 minutos)

```bash
cd frontEnd
bun add -d vitest @testing-library/react @testing-library/jest-dom jsdom
```

#### Paso 2: Crear `vitest.config.ts`

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
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

#### Paso 3: Crear primer test (10 minutos)

```typescript
// src/utils/__tests__/validators.test.ts
import { describe, it, expect } from 'vitest'
import { validateEmail, validatePassword } from '../validators'

describe('validateEmail', () => {
  it('should accept valid emails', () => {
    expect(validateEmail('user@example.com')).toBe(true)
  })

  it('should reject invalid emails', () => {
    expect(validateEmail('invalid')).toBe(false)
  })
})

describe('validatePassword', () => {
  it('should validate minimum length', () => {
    const result = validatePassword('short')
    expect(result.isValid).toBe(false)
  })

  it('should validate strong password', () => {
    const result = validatePassword('Strong123!')
    expect(result.isValid).toBe(true)
  })
})
```

#### Paso 4: Agregar scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

**Tiempo total:** 30 minutos  
**Resultado:** De 0% → 30% coverage (utils + validators)

---

### 2. 🔍 **Logger Centralizado (De 0/10 → 9/10)**

**Impacto:** MEDIO - Fácil de implementar, gran diferencia profesional

**Implementación:**

#### Paso 1: Crear logger (5 minutos)

```typescript
// src/utils/logger.ts
const isDev = import.meta.env.DEV

interface LogContext {
  [key: string]: unknown
}

export const logger = {
  error: (message: string, error?: unknown, context?: LogContext) => {
    if (isDev) {
      console.error(`❌ ${message}`, error, context)
    } else {
      // TODO: Integrar Sentry cuando esté listo
      // Sentry.captureException(error, { extra: context })
    }
  },

  warn: (message: string, context?: LogContext) => {
    if (isDev) console.warn(`⚠️ ${message}`, context)
  },

  info: (message: string, context?: LogContext) => {
    if (isDev) console.log(`ℹ️ ${message}`, context)
  },

  debug: (message: string, data?: unknown) => {
    if (isDev) console.debug(`🐛 ${message}`, data)
  },
}
```

#### Paso 2: Reemplazar console.error (20 minutos)

Buscar y reemplazar en todos los archivos:

```bash
# Encontrar todos los console.error
grep -r "console.error" frontEnd/src/

# Reemplazar uno por uno con logger
```

**Antes:**

```typescript
console.error('Error fetching profile:', error)
```

**Después:**

```typescript
import { logger } from '@/utils/logger'
logger.error('Failed to fetch profile', error, { userId: user.id })
```

**Tiempo total:** 25 minutos  
**Resultado:** Logs profesionales + preparado para Sentry

---

### 3. 🔄 **CI/CD Pipeline (De 0/10 → 8/10)**

**Impacto:** MEDIO - Previene errores antes de producción

**Implementación:**

#### Paso 1: Crear workflow (10 minutos)

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1

      - name: Install dependencies
        run: |
          cd frontEnd
          bun install

      - name: Run linter
        run: |
          cd frontEnd
          bun run lint

      - name: Run tests
        run: |
          cd frontEnd
          bun run test

      - name: Build
        run: |
          cd frontEnd
          bun run build

      - name: Security audit
        run: |
          cd frontEnd
          bun audit
```

#### Paso 2: Setup Husky (10 minutos)

```bash
cd frontEnd
bun add -D husky lint-staged
bunx husky init
```

**`.husky/pre-commit`:**

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

cd frontEnd && bunx lint-staged
```

**`package.json`:**

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

**Tiempo total:** 20 minutos  
**Resultado:** CI automático + prevención de errores

---

## 📅 Plan de Implementación (4 Semanas)

### Semana 1: Fundamentos

- ✅ Día 1-2: Implementar logger centralizado
- ✅ Día 3-4: Configurar path aliases
- ✅ Día 5: Actualizar AGENTS.md con logging rules

**Resultado:** Logger profesional funcionando

---

### Semana 2: Testing

- ✅ Día 1: Setup Vitest + Testing Library
- ✅ Día 2-3: Tests para validators y utils (30% coverage)
- ✅ Día 4-5: Tests para hooks principales (50% coverage)

**Resultado:** Testing base establecido

---

### Semana 3: CI/CD

- ✅ Día 1: GitHub Actions workflow
- ✅ Día 2: Husky + lint-staged
- ✅ Día 3-4: Security headers en vercel.json
- ✅ Día 5: Sentry setup (básico)

**Resultado:** Pipeline de calidad automatizado

---

### Semana 4: Documentación y Mejoras

- ✅ Día 1-2: Actualizar AGENTS.md (testing + CI/CD)
- ✅ Día 3: Crear primera ADR (decision record)
- ✅ Día 4-5: Tests para componentes críticos (70% coverage)

**Resultado:** Proyecto completo nivel Senior+

---

## 🎯 Quick Wins (Implementar HOY - 2 horas)

Estas mejoras toman poco tiempo pero dan gran impacto:

### 1. Path Aliases (30 minutos)

**tsconfig.app.json:**

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

**vite.config.ts:**

```typescript
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

Luego buscar/reemplazar imports:

```typescript
// Antes: import { supabase } from "../../services/supabase/db"
// Después: import { supabase } from "@/services/supabase/db"
```

---

### 2. Security Headers (15 minutos)

**vercel.json:**

```json
{
  "version": 2,
  "framework": "vite",
  "devCommand": "bun run dev",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
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
        }
      ]
    }
  ]
}
```

---

### 3. Logger Básico (30 minutos)

Ver **Gap #2** arriba - crear `logger.ts` y reemplazar 3-4 console.error como ejemplo.

---

### 4. Prettier Config (15 minutos)

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

**package.json:**

```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,md}\""
  }
}
```

**Tiempo total Quick Wins:** ~2 horas  
**Impacto:** Proyecto se ve mucho más profesional inmediatamente

---

## 📚 Actualización de Documentación

### Archivos a Actualizar

#### 1. **AGENTS.md** - Añadir 3 secciones nuevas:

```markdown
## 🔍 Logging & Debugging

### Reglas de Logging

❌ NUNCA: console.log en producción
✅ SIEMPRE: logger centralizado

[Template completo del logger...]

## 🧪 Testing Guidelines

### Frontend Testing (Obligatorio)

- Unit tests para utils
- Hook tests
- Component tests críticos
  Coverage mínimo: 70%

[Stack y ejemplos...]

## 🔄 CI/CD & Automation

### Configuración Obligatoria

- GitHub Actions workflow
- Husky pre-commit hooks
- Lint, test, build automático

[Template de workflow...]
```

#### 2. **copilot-instructions.md** - Añadir:

```markdown
## ⚙️ Path Aliases

**Usar siempre:**

- `@/` en vez de rutas relativas largas

## 🧪 Testing

**Comandos:**

- `bun test` - Run tests
- `bun test:coverage` - Coverage report

**Coverage actual:** 70% (meta: 80%)
```

---

## 🎓 Recursos de Aprendizaje

### Prioridad ALTA (estudiar esta semana)

1. **Testing en React**

   - [Vitest Docs](https://vitest.dev)
   - [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
   - Video: "React Testing Tutorial" (30 min)

2. **CI/CD con GitHub Actions**

   - [GitHub Actions Quickstart](https://docs.github.com/en/actions/quickstart)
   - Template: Buscar "vite github actions" en GitHub

3. **Logging Best Practices**
   - [Sentry Docs](https://docs.sentry.io/platforms/javascript/guides/react/)
   - Blog: "Production Logging in React Apps"

---

## ✅ Definition of Done: Proyecto Nivel Senior

Tu proyecto alcanza nivel Senior cuando cumple:

### Código

- [ ] 70%+ test coverage
- [ ] Logger centralizado (no console.log)
- [ ] Path aliases configurados
- [ ] ESLint + Prettier sin errores
- [ ] TypeScript strict mode

### CI/CD

- [ ] GitHub Actions funcionando
- [ ] Pre-commit hooks activos
- [ ] Tests corren en cada PR
- [ ] Build exitoso en CI

### Seguridad

- [ ] Security headers configurados
- [ ] RLS activo en Supabase
- [ ] Secrets en variables de entorno
- [ ] Dependencies auditadas

### Documentación

- [ ] README completo
- [ ] SECURITY.md actualizado
- [ ] AGENTS.md con testing/logging/CI-CD
- [ ] Al menos 1 ADR documentada

### Performance

- [ ] Lazy loading en rutas grandes
- [ ] Bundle < 500KB initial
- [ ] Lighthouse score > 85

---

## 🚀 Siguiente Nivel: Staff Engineer

Una vez que domines lo anterior (4-8 semanas), para llegar a Staff:

### Arquitectura

- [ ] Feature-based organization
- [ ] Monorepo con Turborepo/Nx
- [ ] Micro-frontends (si aplica)

### Testing

- [ ] E2E tests con Playwright
- [ ] Visual regression tests
- [ ] Performance testing

### DevOps

- [ ] Staging environment
- [ ] Preview deploys automáticos
- [ ] Rollback strategy

### Observabilidad

- [ ] Sentry full setup
- [ ] Performance monitoring
- [ ] User analytics

---

## 💰 ROI de Estas Mejoras

### Beneficios Cuantificables

| Mejora  | Tiempo Inversión | Bugs Prevenidos      | Tiempo Ahorrado |
| ------- | ---------------- | -------------------- | --------------- |
| Testing | 8 horas          | 40-60% menos bugs    | 20 horas/mes    |
| CI/CD   | 2 horas          | 80% errores de build | 10 horas/mes    |
| Logger  | 1 hora           | Debug 3x más rápido  | 5 horas/mes     |

**Total inversión:** ~11 horas  
**Ahorro mensual:** ~35 horas  
**ROI:** Recuperas inversión en 1 semana

---

## 📞 Support & Ayuda

Si te atascas en alguna implementación:

1. **Testing:** Buscar "vitest react testing library tutorial"
2. **CI/CD:** Ver workflows de proyectos similares en GitHub
3. **Logger:** Copiar template de DEVELOPMENT_WORKFLOW.md
4. **General:** Preguntar a Copilot con contexto completo

---

## 🎯 Tu Compromiso

Para mantener nivel Senior en TODOS los proyectos futuros:

### Checklist Pre-Proyecto

- [ ] Copiar estructura de carpetas recomendada
- [ ] Setup testing DESDE EL INICIO
- [ ] Configurar CI/CD en primer commit
- [ ] Crear logger antes de escribir lógica

### Checklist Semanal

- [ ] Coverage no baja de 70%
- [ ] CI passing en todos los PRs
- [ ] Documentar decisiones importantes (ADRs)

### Checklist Pre-Deploy

- [ ] Revisar SECURITY.md completo
- [ ] Lighthouse score > 85
- [ ] No hay console.log/error
- [ ] Dependencies auditadas

---

**Última actualización:** 2025-10-27  
**Próxima revisión:** 2025-11-27 (evaluar progreso)  
**Meta Q1 2026:** Todos los proyectos nivel Senior+

---

**"Excellence is not a destination; it is a continuous journey that never ends."**  
— Brian Tracy
