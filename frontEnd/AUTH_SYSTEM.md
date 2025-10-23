# Sistema de Autenticación y Protección de Rutas

## 📋 Resumen

Se ha implementado un sistema completo de autenticación con protección de rutas y estilos de botones reutilizables.

## 🔐 Características de Seguridad

### 1. Contexto de Autenticación (`AuthContext`)

- **Ubicación:** `src/context/`
- **Archivos:**
  - `authContext.ts` - Definición del contexto
  - `AuthContext.tsx` - Provider component
- **Hook:** `src/hooks/useAuth.ts`

**Estado manejado:**

- `isAuthenticated`: Boolean indicando si el usuario está autenticado
- `user`: Objeto con datos del usuario (`id`, `name`) o `null`
- `login(userId, userName)`: Método para autenticar usuario
- `logout()`: Método para cerrar sesión

### 2. Rutas Protegidas (`ProtectedRoute`)

**Ubicación:** `src/components/ProtectedRoute.tsx`

**Funcionamiento:**

- Verifica autenticación antes de renderizar contenido
- Si no autenticado: muestra `AlertModal` con mensaje de acceso denegado
- Redirige automáticamente a Home al cerrar el modal
- `closeOnBackdropClick={false}` para prevenir cierre accidental

**Uso:**

```tsx
<Route
  path="user"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### 3. Alert Modal

**Props configuradas para seguridad:**

- `closeOnBackdropClick={false}` - Previene cierre accidental
- `shadowColor="shadow-red-500"` - Visual feedback de error
- Botón explícito "Volver al Inicio" para redirección consciente

## 🎨 Sistema de Estilos de Botones

### Custom CSS Classes

**Ubicación:** `src/index.css`

**Clases disponibles:**

#### `.btn` (Base)

- Padding: `1rem` horizontal, `0.5rem` vertical
- Border radius: `0.75rem` (rounded-xl)
- Shadow: `-1px 2px 5px gray`
- Active state: sombra interior

#### `.btn-primary`

- Background: azul (`#2563eb`)
- Hover: azul oscuro (`#1d4ed8`)
- Color texto: blanco

#### `.btn-secondary`

- Background: gris claro (`#e5e7eb`)
- Hover: gris medio (`#d1d5db`)

#### `.btn-danger`

- Background: rojo (`#dc2626`)
- Hover: rojo oscuro (`#b91c1c`)
- Color texto: blanco

### Uso de Estilos

**Antes:**

```tsx
<button className="cursor-pointer rounded-xl px-4 py-2 shadow-[-1px_2px_5px_gray] active:inset-shadow-sm/60">
  Login
</button>
```

**Ahora:**

```tsx
<button className="btn">Login</button>
<button className="btn-primary">Guardar</button>
<button className="btn-danger">Eliminar</button>
```

## 🔄 Flujo de Autenticación

### Login Demo (temporal)

```tsx
// En Header.tsx
login("demo-user-123", "Demo User");
```

### Logout

```tsx
// En Header.tsx
logout();
```

### Estado Visual en Header

- Si autenticado: muestra "Hola, {nombre}" + botón "Logout"
- Si no autenticado: solo botón "Login"

## 🛡️ Buenas Prácticas Aplicadas

### Seguridad

✅ Rutas protegidas con middleware (`ProtectedRoute`)  
✅ Verificación de autenticación antes de renderizar contenido  
✅ Redirección automática para usuarios no autenticados  
✅ Modal no cerrable accidentalmente (backdrop deshabilitado)  
✅ Mensajes claros de error/acceso denegado

### Arquitectura

✅ Separación de concerns (context, hooks, components)  
✅ Context API para estado global  
✅ Fast Refresh compatible (archivos separados)  
✅ TypeScript con tipos completos  
✅ Componentes reutilizables

### UX

✅ Feedback visual claro (shadow rojo en modal de error)  
✅ Botones consistentes en toda la app  
✅ Transiciones suaves en hover  
✅ Mensajes descriptivos

## 📂 Estructura de Archivos

```js
src/
├── context/
│   ├── authContext.ts      # Context definition
│   └── AuthContext.tsx     # Provider component
├── hooks/
│   └── useAuth.ts          # Hook para acceder al auth context
├── components/
│   ├── Header.tsx          # Navbar con auth buttons
│   ├── ProtectedRoute.tsx  # Route wrapper para protección
│   └── AlertModal.tsx      # Modal component
├── pages/
│   ├── Home.tsx
│   ├── Dashboard.tsx       # Ruta protegida (ahora /user)
│   └── Info.tsx
├── index.css               # Custom button styles
└── main.tsx                # App wrapped con AuthProvider
```

## 🚀 Próximos Pasos (Recomendados)

### 1. Integración con Supabase Auth

Reemplazar demo login con autenticación real:

```tsx
// En Header.tsx
import { supabase } from "@/services/supabase/db";

const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "user@example.com",
    password: "password",
  });

  if (data.user) {
    login(data.user.id, data.user.email);
  }
};
```

### 2. Persistencia de Sesión

Agregar localStorage o cookies para mantener sesión:

```tsx
// En AuthContext.tsx
useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    const user = JSON.parse(savedUser);
    setIsAuthenticated(true);
    setUser(user);
  }
}, []);
```

### 3. Roles y Permisos

Extender `AuthContext` para manejar roles:

```tsx
interface User {
  id: string;
  name: string;
  role: "admin" | "user" | "guest";
}
```

### 4. Formulario de Login Real

Crear página `/login` con formulario completo

### 5. Token Refresh

Implementar refresh token para sesiones de larga duración

## 📝 Notas Importantes

- **Demo Mode:** Actualmente el login es instantáneo sin verificación real
- **Path Change:** La ruta `/dashboard` ahora es `/user` en el Header
- **Tailwind v4:** Los estilos de botones usan CSS vanilla (no `@apply`) para compatibilidad
- **Fast Refresh:** Archivos de context separados para evitar warnings

## 🧪 Testing

### Probar Protección de Rutas

1. Navegar a `/user` sin login → Ver AlertModal
2. Hacer click en "Login" en Header
3. Navegar a `/user` → Ver contenido de Dashboard
4. Hacer click en "Logout"
5. Intentar acceder a `/user` nuevamente → Bloqueado

### Verificar Estilos

```bash
# Build production
bun run build

# Dev mode
bun dev
```

Todos los botones deben tener sombras consistentes y estados hover/active funcionales.
