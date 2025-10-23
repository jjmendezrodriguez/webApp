# Project Structure - Auth Refactoring

## 📁 Nueva Estructura

```
src/
├── components/
│   ├── auth/                    # Auth-specific components (NEW)
│   │   ├── LoginModal.tsx       # Refactored - to be created
│   │   ├── SignupModal.tsx      # New - to be created
│   │   ├── AuthInput.tsx        # Reusable input - to be created
│   │   ├── PasswordInput.tsx    # Password with toggle - to be created
│   │   └── OAuthButton.tsx      # OAuth buttons - to be created
│   │
│   ├── AlertModal.tsx           # Existing
│   ├── Header.tsx               # Existing
│   └── ProtectedRoute.tsx       # Existing
│
├── locales/                     # Internationalization (NEW)
│   ├── en.json                  # English translations ✅
│   ├── es.json                  # Spanish translations ✅
│   └── i18n.ts                  # i18n config ✅
│
├── utils/                       # Utility functions (NEW)
│   ├── validators.ts            # Validation functions - to be created
│   └── passwordStrength.ts      # Password strength - to be created
│
├── hooks/
│   ├── useAuth.ts               # Existing
│   └── useAuthForm.ts           # Auth form logic - to be created
│
└── services/
    └── supabase/
        ├── config.ts            # Existing
        ├── db.ts                # Existing
        └── types.ts             # Existing
```

## ✅ FASE 1 Completada

### Instalaciones:

- ✅ react-i18next (16.1.4)
- ✅ i18next (25.6.0)

### Archivos Creados:

- ✅ `/src/locales/en.json` - Traducciones en inglés
- ✅ `/src/locales/es.json` - Traducciones en español
- ✅ `/src/locales/i18n.ts` - Configuración de i18n
- ✅ `/src/main.tsx` - Actualizado con import de i18n

### Carpetas Creadas:

- ✅ `/src/locales/`
- ✅ `/src/utils/`
- ✅ `/src/components/auth/`

## 🎯 Próximos Pasos (FASE 2)

1. Crear `utils/validators.ts` - Funciones de validación puras
2. Crear `utils/passwordStrength.ts` - Calcular fuerza de contraseña
3. Preparar para componentes reutilizables

## 📝 Notas

- **Idioma por defecto:** Español (es)
- **Idioma fallback:** Inglés (en)
- **Traducciones incluidas:** Login, Signup, Errores, Success messages
- **Compatibilidad:** 100% con Supabase Auth
