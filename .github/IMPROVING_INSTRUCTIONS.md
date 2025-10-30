# Guía: Cómo Mejorar tus Instrucciones para IA

**Version:** 1.0  
**Created:** 2025-10-27  
**Purpose:** Análisis y mejoras para AGENTS.md, PROJECT_STRUCTURE.md y copilot-instructions.md

---

## 🎯 Objetivo

Crear instrucciones que permitan a **cualquier IA** (Copilot, Claude, ChatGPT) trabajar como un **desarrollador senior** siguiendo tus estándares.

---

## 📊 Estado Actual de tus Instrucciones

### ✅ **Lo que ya está EXCELENTE**

#### 1. **AGENTS.md**

- ✅ Comentarios obligatorios con formato específico
- ✅ Reglas de naming claras (camelCase, inglés, descriptivo)
- ✅ JSDoc obligatorio para funciones exportadas
- ✅ Single quotes, no semicolons bien definido
- ✅ Max 300 líneas con guía de splitting
- ✅ Seguridad bien documentada (variables de entorno, sanitización)
- ✅ Git workflow con convenciones de commits

#### 2. **PROJECT_STRUCTURE.md**

- ✅ Tabla clara de ubicación por propósito
- ✅ Regla de aprobación antes de crear archivos
- ✅ Referencias cruzadas a AGENTS.md

#### 3. **copilot-instructions.md**

- ✅ Stack technology claramente definido
- ✅ Quick start commands
- ✅ Integración con Supabase bien documentada
- ✅ Referencias a archivos de estándares

---

## ⚠️ **Gaps Identificados (Áreas de Mejora)**

### 1. **Testing: Ambigüedad entre Frontend y Backend**

**Problema actual:**

```markdown
## Testing (Solo Backend - aún no hay en frontend)
```

**Mejora sugerida:**

```markdown
## 🧪 Testing Guidelines

### Frontend Testing (React/Vue/Angular)

**Obligatorio para proyectos nivel Senior+:**

- [ ] **Unit Tests** para utils y funciones puras

  - Validadores (email, password, etc.)
  - Helpers y formatters
  - Calculadoras de lógica de negocio

- [ ] **Hook Tests** para custom hooks

  - useAuth, useForm, useProfile, etc.
  - Mocking de llamadas a API

- [ ] **Component Tests** para UI crítica

  - Formularios de autenticación
  - Componentes con lógica condicional
  - Rutas protegidas

- [ ] **Integration Tests** para flujos completos
  - Login → Dashboard
  - Signup → Email verification
  - Checkout flow

**Stack recomendado:**

- Vitest (test runner)
- Testing Library (React/Vue)
- MSW (Mock Service Worker) para API mocking

**Coverage mínimo:** 70% para proyectos en producción

---

### Backend Testing

**Obligatorio siempre:**

- [ ] Unit tests (lógica de negocio)
- [ ] Integration tests (endpoints + DB)
- [ ] Security tests (validación, autenticación)

**Coverage mínimo:** 80%
```

**Por qué es mejor:**

- Elimina ambigüedad
- Define qué testear primero
- Establece coverage esperado
- Da stack tecnológico específico

---

### 2. **Logging: Falta Guía de Implementación**

**Problema actual:**
En AGENTS.md no hay sección sobre logging/debugging.

**Mejora sugerida:**

````markdown
## 🔍 Logging & Debugging

### Reglas de Logging

❌ **NUNCA en producción:**

```javascript
console.log(user)
console.error(error)
```
````

✅ **SIEMPRE usar logger centralizado:**

```typescript
import { logger } from '@/utils/logger'

logger.error('Failed to fetch profile', error, { userId: user.id })
logger.warn('API rate limit approaching', { remaining: 10 })
logger.info('User logged in', { userId: user.id })
logger.debug('API response', response) // Solo dev
```

### Implementación del Logger

**Ubicación:** `src/utils/logger.ts`

**Template base:**

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
      // TODO: Integrar Sentry/LogRocket
    }
  },
  // ... más métodos
}
```

### Integración con Sentry (Producción)

**Setup obligatorio antes de deploy:**

```bash
bun add @sentry/react
```

Ver DEVELOPMENT_WORKFLOW.md para setup completo.

````

---

### 3. **CI/CD: Falta Sección Completa**

**Problema actual:**
Se menciona Git workflow pero no CI/CD automation.

**Mejora sugerida:**

```markdown
## 🔄 CI/CD & Automation

### Configuración Obligatoria

#### 1. GitHub Actions (o GitLab CI)

**Ubicación:** `.github/workflows/ci.yml`

**Checks obligatorios:**
- [ ] Linting (ESLint)
- [ ] Formatting (Prettier)
- [ ] Type checking (TypeScript)
- [ ] Tests (Vitest)
- [ ] Build success
- [ ] Security audit (bun audit)

**Template mínimo:** Ver DEVELOPMENT_WORKFLOW.md

#### 2. Pre-commit Hooks (Husky)

**Prevenir commits con errores:**
```bash
bun add -D husky lint-staged
npx husky init
````

**`.husky/pre-commit`:**

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

bunx lint-staged
```

**`package.json`:**

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

#### 3. Semantic Versioning

**Commits siguen Conventional Commits:**

- `feat: add login modal` → Minor version bump
- `fix: email validation bug` → Patch version bump
- `feat!: change auth API` → Major version bump (breaking)

**Herramienta:** `standard-version` o `semantic-release`

````

---

### 4. **Path Aliases: Falta en Configuración**

**Problema actual:**
No se menciona en AGENTS.md ni en copilot-instructions.md.

**Mejora sugerida:**

Añadir en **copilot-instructions.md** sección "Configuración del Proyecto":

```markdown
## ⚙️ Configuración del Proyecto

### Path Aliases

**Configurado en:** `tsconfig.json` + `vite.config.ts`

**Uso obligatorio:**
```typescript
// ❌ EVITAR rutas relativas largas
import { supabase } from '../../../services/supabase/db'

// ✅ USAR alias desde raíz
import { supabase } from '@/services/supabase/db'
````

**Aliases disponibles:**

- `@/` → `src/`
- `@/components/` → `src/components/`
- `@/hooks/` → `src/hooks/`
- `@/utils/` → `src/utils/`
- `@/services/` → `src/services/`

**Setup completo:** Ver DEVELOPMENT_WORKFLOW.md

````

---

### 5. **Decisiones Arquitectónicas: Falta Documentación**

**Problema actual:**
No hay registro de por qué se eligieron ciertas tecnologías o patrones.

**Mejora sugerida:**

Crear **`.github/ADR/`** (Architecture Decision Records):

```markdown
# ADR-001: Uso de Zustand vs Context API

**Fecha:** 2025-10-27
**Estado:** Propuesto | Aceptado | Rechazado | Obsoleto

## Contexto
Necesitamos manejar estado global (auth, theme, notifications).

## Decisión
Usar Context API mientras solo tengamos 1-2 contextos.
Migrar a Zustand si crecemos a 3+ contextos.

## Consecuencias

**Positivas:**
- Menos dependencias
- Nativo de React
- Suficiente para este tamaño

**Negativas:**
- Performance issues si crece mucho
- Re-renders innecesarios

## Alternativas Consideradas
- Zustand (mejor performance, más boilerplate)
- Redux Toolkit (overkill para este proyecto)
- Jotai (muy nuevo, menos adopción)

## Referencias
- [Context API Docs](https://react.dev/reference/react/useContext)
- [When to use Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
````

---

### 6. **Estructura de Carpetas: Falta Guía de Escalabilidad**

**Mejora para PROJECT_STRUCTURE.md:**

Añadir sección:

```markdown
## 🔄 Cuando Escalar la Estructura

### Proyecto Pequeño (<10 componentes)
```

src/
├── components/ # Todos los componentes juntos
├── pages/ # Páginas
├── hooks/ # Hooks globales
└── utils/ # Utilidades

```

### Proyecto Mediano (10-30 componentes)
```

src/
├── components/
│ ├── auth/ # Componentes de autenticación
│ ├── dashboard/ # Componentes del dashboard
│ └── ui/ # Componentes genéricos (Button, Modal)
├── pages/
├── hooks/
└── utils/

```

### Proyecto Grande (30+ componentes)
```

src/
├── features/ # Feature-based organization
│ ├── auth/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── utils/
│ │ └── index.ts
│ ├── dashboard/
│ └── ...
├── shared/ # Código compartido
│ ├── components/
│ ├── hooks/
│ └── utils/
└── pages/

```

**Señales de que necesitas reorganizar:**
- Más de 10 archivos en `/components/`
- Dificultad para encontrar archivos
- Imports muy largos (`../../../`)
- Código duplicado entre features
```

---

## 🎯 Checklist de Instrucciones Completas

### ✅ **AGENTS.md debe incluir:**

- [x] Code style (comentarios, naming, estructura)
- [x] Seguridad (variables de entorno, validación)
- [ ] **Testing (frontend + backend separados)**
- [ ] **Logging (logger centralizado obligatorio)**
- [ ] **CI/CD (automation obligatoria)**
- [ ] **Path Aliases (uso obligatorio)**
- [x] Git workflow
- [x] Licencias

### ✅ **PROJECT_STRUCTURE.md debe incluir:**

- [x] Tabla de ubicación por propósito
- [x] Regla de aprobación para crear archivos
- [ ] **Guía de escalabilidad (pequeño → mediano → grande)**
- [ ] **Feature-based vs Tipo-based organization**

### ✅ **copilot-instructions.md debe incluir:**

- [x] Stack technology
- [x] Quick start
- [x] Integración con servicios (Supabase, etc.)
- [ ] **Path aliases configurados**
- [ ] **Testing setup y commands**
- [ ] **CI/CD status (si está configurado)**
- [ ] **Performance metrics esperados**

### ✅ **DEVELOPMENT_WORKFLOW.md debe incluir:**

- [x] Flujo de lectura para IA
- [x] Checklist de setup inicial
- [x] Templates de configuración (CI, tests, logger)
- [x] Niveles de madurez del proyecto
- [x] Workflow diario recomendado

---

## 🚀 Plan de Acción: Mejoras Prioritarias

### 🔥 **Urgente (implementar esta semana)**

1. **Añadir sección de Testing a AGENTS.md**

   - Frontend testing obligatorio
   - Stack recomendado (Vitest + Testing Library)
   - Coverage mínimo (70%)

2. **Añadir sección de Logging a AGENTS.md**

   - Prohibir console.log en producción
   - Template de logger centralizado
   - Integración con Sentry

3. **Añadir sección de CI/CD a AGENTS.md**
   - GitHub Actions obligatorio
   - Husky para pre-commit hooks
   - Checks mínimos (lint, test, build)

### 📅 **Importante (implementar este mes)**

4. **Actualizar PROJECT_STRUCTURE.md**

   - Añadir guía de escalabilidad
   - Feature-based organization para proyectos grandes

5. **Actualizar copilot-instructions.md**

   - Documentar path aliases
   - Añadir sección de testing
   - Incluir performance goals

6. **Crear carpeta ADR/**
   - Documentar decisiones arquitectónicas
   - Template de ADR

### 💡 **Opcional (implementar próximos meses)**

7. **Crear CONTRIBUTING.md**

   - Para colaboradores externos
   - Incluir workflow de PR

8. **Crear TEMPLATES/**
   - Template de componente
   - Template de hook
   - Template de servicio

---

## 📚 Recursos para Seguir Mejorando

### **Proyectos Open Source de Referencia**

Estudiar cómo documentan:

1. **Next.js** - Docs y estructura de proyecto

   - https://github.com/vercel/next.js

2. **shadcn/ui** - Component patterns

   - https://github.com/shadcn-ui/ui

3. **TanStack Query** - Testing patterns

   - https://github.com/tanstack/query

4. **Supabase** - Architecture decisions
   - https://github.com/supabase/supabase

### **Lecturas Recomendadas**

- [ ] "The Twelve-Factor App" (metodología)
- [ ] "Clean Code" (Robert C. Martin)
- [ ] "Software Architecture Patterns" (Mark Richards)
- [ ] "Testing JavaScript" (Kent C. Dodds)

### **Herramientas de Análisis de Código**

- **SonarQube** - Code quality & security
- **CodeClimate** - Maintainability analysis
- **Lighthouse** - Performance audits
- **Bundlephobia** - Bundle size analysis

---

## 🔄 Proceso de Mejora Continua

### **Revisión Mensual**

1. ¿Se siguieron las instrucciones en todos los commits?
2. ¿Hubo confusiones o ambigüedades?
3. ¿Qué errores se repitieron?
4. ¿Qué nuevas prácticas descubrimos?

### **Actualización de Documentos**

Cuando actualices AGENTS.md o PROJECT_STRUCTURE.md:

```markdown
**Version:** v2.2  
**Last updated by:** JM ✍️  
**Last updated:** 2025-11-15

## Changelog

### v2.2 (2025-11-15)

- Added testing guidelines for frontend
- Added logging best practices
- Added CI/CD automation requirements
```

### **Testing de Instrucciones**

**Con nueva IA:**

1. Darle solo las instrucciones
2. Pedirle crear un feature nuevo
3. Verificar si siguió todas las reglas
4. Documentar gaps encontrados

---

## ✅ Validación: ¿Mis Instrucciones son Senior-Level?

### **Criterios de Evaluación**

| Aspecto         | ❌ Junior               | ✅ Senior                            |
| --------------- | ----------------------- | ------------------------------------ |
| **Testing**     | "Opcional"              | "Obligatorio con stack definido"     |
| **Logging**     | "console.log está bien" | "Logger centralizado obligatorio"    |
| **CI/CD**       | No mencionado           | GitHub Actions template incluido     |
| **Seguridad**   | "Usa .env"              | Checklist completo + headers + audit |
| **Docs**        | README básico           | ADRs + CHANGELOG + SECURITY.md       |
| **Estructura**  | Ad-hoc                  | Guía de escalabilidad definida       |
| **Performance** | No mencionado           | Lazy loading + bundle analysis       |

### **Tu Estado Actual**

- Testing: 🟡 Mencionado pero ambiguo → **Mejorar**
- Logging: 🔴 No definido → **Añadir**
- CI/CD: 🔴 No incluido → **Añadir**
- Seguridad: 🟢 Excelente → **Mantener**
- Docs: 🟢 Muy buena → **Añadir ADRs**
- Estructura: 🟢 Clara → **Añadir escalabilidad**
- Performance: 🟡 Implícito → **Explicitar**

---

## 🎓 Conclusión

Tus instrucciones actuales son **sólidas** (nivel Mid-Senior), pero con los gaps identificados puedes llegar a **Staff/Principal level**.

**Próximos pasos:**

1. Implementar las 3 mejoras urgentes (Testing, Logging, CI/CD)
2. Probar las instrucciones mejoradas en un proyecto nuevo
3. Iterar basado en experiencia real

**Meta:** Que cualquier IA pueda crear un proyecto production-ready siguiendo solo tus instrucciones, sin necesidad de correcciones manuales.

---

**Última actualización:** 2025-10-27  
**Autor:** José Méndez  
**Licencia:** Proprietary - Mendez Tech
