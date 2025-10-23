# webApp

**Stack:** React 19 + TypeScript + Vite + Supabase + Tailwind CSS  
**Package Manager:** Bun

## 🚀 Inicio Rápido

```bash
cd frontEnd
bun install
bun dev
```

## 📁 Estructura

```js
frontEnd/
├── src/
│   ├── services/supabase/    # Supabase client + config
│   ├── components/           # React components
│   ├── pages/                # App pages
│   └── App.tsx               # Main component
├── .env                      # Environment variables (no subir a git)
└── vite.config.ts            # Vite config
```

## 🔧 Configuración MCP

El proyecto está configurado para usar **Supabase MCP** (Model Context Protocol).

**Archivo:** `.vscode/mcp-settings.json`

Para usar MCP:

1. Reinicia VSCode
2. Abre Copilot Chat
3. La primera vez te pedirá autenticar con Supabase
4. Pregunta: `"@supabase Muéstrame las tablas de mi database"`

**Docs:** [supabase.com/docs/guides/getting-started/mcp](https://supabase.com/docs/guides/getting-started/mcp)

## 🗄️ Supabase

**Cliente:** `src/services/supabase/db.ts`

```typescript
import { supabase } from "@/services/supabase/db";

// Example query
const { data, error } = await supabase.from("table_name").select("*");
```

**Variables de entorno** (`.env`):

```env
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
```

## 📚 Comandos

```bash
bun dev      # Dev server
bun build    # Build para producción
bun lint     # ESLint
```

## 📖 Documentación

- **Instrucciones completas:** `.github/copilot-instructions.md`
- **Estándares de código:** `frontEnd/AGENTS.md`

---

© 2025 Mendez Tech
