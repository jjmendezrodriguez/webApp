# PROJECT_STRUCTURE.md

## 📁 Estructura del Proyecto — Ubicación por Propósito

Esta guía define **dónde ubicar cada archivo o módulo** según su función.  
La IA puede **sugerir crear nuevas carpetas o archivos** si son necesarios,  
pero **debe preguntar primero y esperar aprobación** antes de hacerlo.

---

| Caso                                        | Archivo recomendado                          | Carpeta       |
| ------------------------------------------- | -------------------------------------------- | ------------- |
| Reutilizas una función común                | `lib/formatDate.js`                          | lib           |
| Validación de formularios                   | `utils/validateForm.js`                      | utils         |
| Lógica de autenticación                     | `core/auth.ts`                               | core          |
| Conexión a Supabase                         | `services/supabase_service.ts`               | services      |
| Manejo de botón “Login”                     | `handlers/login_handler.ts`                  | handlers      |
| Control de usuarios (MVC)                   | `controllers/userController.ts`              | controllers   |
| Modelo de base de datos                     | `models/User.ts`                             | models        |
| Vista JSX o página de inicio                | `views/Home.tsx` o `pages/Home.tsx`          | views / pages |
| Hook de autenticación                       | `hooks/useAuth.ts`                           | hooks         |
| Middleware de sesión                        | `middlewares/session.ts`                     | middlewares   |
| Config de entorno                           | `config/env.ts`                              | config        |
| Componente visual reutilizable              | `components/Button.tsx`                      | components    |
| Imágenes, íconos o fuentes                  | `assets/logo.png`, `assets/fonts/Roboto.ttf` | assets        |
| Archivos públicos (favicon, manifest, etc.) | `public/index.html`, `public/robots.txt`     | public        |

---

### 💡 Reglas generales

- Si un archivo supera las **300 líneas**, sigue la guía en `AGENTS.md → Code Style Rules`.
- La IA puede sugerir reorganizar archivos, **pero siempre debe pedir tu aprobación antes** de modificar o crear nuevas estructuras.

---

> 🔗 **Relacionado:**  
> Consulta el archivo `AGENTS.md` → sección **Code Style Rules**  
> para ver las reglas de estilo, límite de líneas y guía de separación de archivos.
