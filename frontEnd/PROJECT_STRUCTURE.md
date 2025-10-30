# 🧱 PROJECT_STRUCTURE.md

## 📁 Estructura del Proyecto — Guía Oficial de Organización

> **Propósito:**  
> Este documento define **dónde debe ubicarse cada archivo o módulo**, según su responsabilidad en el proyecto.  
> Garantiza orden, escalabilidad y colaboración entre varios desarrolladores o IAs (Copilot, ChatGPT, etc.).

---

## 🧩 1️⃣ Estructura Principal

| Caso o propósito                               | Archivo recomendado                          | Carpeta             |
| ---------------------------------------------- | -------------------------------------------- | ------------------- |
| Función o clase reutilizable interna           | `lib/formatDate.ts`                          | `lib/`              |
| Funciones pequeñas sin dependencias de negocio | `utils/validateForm.ts`                      | `utils/`            |
| Lógica central del negocio (reglas)            | `core/auth.ts`                               | `core/`             |
| Integración con servicios externos             | `services/supabase_service.ts`               | `services/`         |
| Manejo de eventos o acciones del usuario       | `handlers/login_handler.ts`                  | `handlers/`         |
| Controladores o capa intermedia (MVC)          | `controllers/userController.ts`              | `controllers/`      |
| Modelos de datos o esquemas                    | `models/User.ts`                             | `models/`           |
| Interfaces visuales o páginas JSX              | `views/Home.tsx` o `pages/Home.tsx`          | `views/` / `pages/` |
| Hooks personalizados                           | `hooks/useAuth.ts`                           | `hooks/`            |
| Middlewares (autenticación, validación)        | `middlewares/session.ts`                     | `middlewares/`      |
| Configuración global o variables de entorno    | `config/env.ts`                              | `config/`           |
| Componentes UI reutilizables                   | `components/Button.tsx`                      | `components/`       |
| Recursos estáticos (imágenes, fuentes, íconos) | `assets/logo.png`, `assets/fonts/Roboto.ttf` | `assets/`           |
| Archivos públicos (favicon, manifest, etc.)    | `public/index.html`, `public/robots.txt`     | `public/`           |

---

## 🧠 2️⃣ Principios Fundamentales de Organización

### 🔹 Separation of Concerns (SoC)

Cada carpeta debe tener **una única responsabilidad clara**.  
Ejemplo: `utils/` no debe contener lógica de negocio, y `core/` no debe tener funciones de UI.

### 🔹 Feature vs Type

- Usa **type-based** (`components/`, `hooks/`, `utils/`) en proyectos pequeños o individuales.
- Usa **feature-based** (`auth/`, `dashboard/`, `profile/`) cuando haya múltiples desarrolladores o el proyecto crezca.

> **Regla:**  
> “Un buen ingeniero sabe cuándo migrar de una estructura por tipo a una basada en features.”

---

## 🧩 3️⃣ Reglas de Escalabilidad y Refactorización

| Señal de alerta                       | Acción recomendada                                      |
| ------------------------------------- | ------------------------------------------------------- |
| Más de **10 archivos** en una carpeta | Dividir por feature o submódulo                         |
| Código duplicado entre features       | Extraer a `shared/` o `lib/`                            |
| Archivos de +300 líneas               | Separar según la guía en `AGENTS.md → Code Style Rules` |
| Dificultad para encontrar archivos    | Revisar naming y `PROJECT_STRUCTURE.md`                 |

> **Senior Rule:**  
> “Refactoriza la estructura progresivamente, manteniendo carpetas alineadas con los dominios del negocio y evitando capas redundantes.”

---

## ⚙️ 4️⃣ Archivos de Configuración

Los archivos de configuración deben estar **aislados por entorno** y **nunca contener secretos**.

| Entorno    | Archivo                           | Propósito                              |
| ---------- | --------------------------------- | -------------------------------------- |
| Desarrollo | `.env.development`                | Variables locales                      |
| Producción | `.env.production`                 | Variables de despliegue                |
| Testing    | `.env.test`                       | Variables temporales para pruebas      |
| General    | `vite.config.ts`, `tsconfig.json` | Configuración del compilador y bundler |
| Aplicación | `src/config/`                     | Constantes globales no sensibles       |

> **Senior Rule:**  
> “Mantén configuraciones separadas por entorno y nunca compartas datos sensibles entre módulos.”

---

## 🧱 5️⃣ Organización Avanzada (para proyectos grandes)

Cuando el proyecto supere las 30+ componentes o 3+ features principales, migra a **Feature-based Structure**:

## 📚 6️⃣ Interacción con IAs (Copilot, ChatGPT, Claude)

1. **La IA debe leer primero:**
   - `.github/copilot-instructions.md`
   - `PROJECT_STRUCTURE.md`
   - `AGENTS.md`

2. **Antes de crear carpetas o archivos nuevos:**
   - Debe **preguntar y esperar aprobación**.
   - No puede modificar estructuras sin confirmación.

3. **Referencias cruzadas:**
   - Si la IA detecta una inconsistencia (por ejemplo, función duplicada), debe sugerir refactor, **no hacerlo automáticamente**.

---

## 🧩 7️⃣ Relación con otros archivos

> 🔗 **Relacionado:**
>
> - **`AGENTS.md` → Code Style Rules** (nombres, comentarios, límites de líneas)
> - **`DEVELOPMENT_WORKFLOW.md` → Setup inicial y CI/CD**
> - **`SECURITY.md` → Checklist de seguridad y manejo de .env**

---

## ✅ 8️⃣ Resumen Final

- 📘 `PROJECT_STRUCTURE.md` = **Mapa del sistema**
- ⚙️ `AGENTS.md` = **Reglas de estilo y buenas prácticas**
- 🧩 `DEVELOPMENT_WORKFLOW.md` = **Flujo completo del proyecto**

> **Meta:**  
> Que cualquier persona (humana o IA) pueda entender y contribuir al proyecto sin romper su estructura ni su lógica.
