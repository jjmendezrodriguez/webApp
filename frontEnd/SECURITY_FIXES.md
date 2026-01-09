# Security Fixes - Priority Order

## 🔴 ALTA PRIORIDAD (Hacer ANTES de producción)

### 1. Fix Function Search Path (SECURITY)

**Severidad:** MEDIA  
**Tiempo:** 5 minutos  
**Impacto:** Previene ataques de inyección de schema

**Solución:**

```sql
-- Fix handle_new_user()
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth  -- ✅ ADD THIS LINE
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'firstName',
    new.raw_user_meta_data->>'lastName'
  );
  RETURN new;
END;
$$;

-- Fix sync_profile_email()
CREATE OR REPLACE FUNCTION public.sync_profile_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth  -- ✅ ADD THIS LINE
AS $$
BEGIN
  UPDATE public.profiles
  SET email = new.email
  WHERE id = new.id;
  RETURN new;
END;
$$;

-- Fix sync_auth_metadata_from_profile()
CREATE OR REPLACE FUNCTION public.sync_auth_metadata_from_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth  -- ✅ ADD THIS LINE
AS $$
DECLARE
  display_name_value text;
BEGIN
  display_name_value := TRIM(CONCAT(new.first_name, ' ', new.last_name));

  IF display_name_value = '' THEN
    display_name_value := NULL;
  END IF;

  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
    jsonb_set(
      jsonb_set(
        COALESCE(raw_user_meta_data, '{}'::jsonb),
        '{firstName}',
        to_jsonb(new.first_name)
      ),
      '{lastName}',
      to_jsonb(new.last_name)
    ),
    '{display_name}',
    to_jsonb(display_name_value)
  )
  WHERE id = new.id;

  RETURN new;
END;
$$;
```

**Ejecutar en:** Supabase SQL Editor o usar MCP apply_migration

---

### 2. Enable Leaked Password Protection (SECURITY)

**Severidad:** MEDIA  
**Tiempo:** 1 minuto  
**Impacto:** Previene uso de contraseñas comprometidas

**Pasos:**

1. Ve a **Supabase Dashboard**
2. **Authentication → Policies → Password**
3. Activa **"Check password against data breaches"**
4. Save

**Documentación:**

```txt
https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection
```

---

## 🟡 MEDIA PRIORIDAD (Hacer en próximas semanas)

### 3. Optimize RLS Policies (PERFORMANCE)

**Severidad:** BAJA (solo impacta con miles de registros)  
**Tiempo:** 3 minutos  
**Impacto:** Mejora rendimiento en queries

**Solución:**

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Recreate with optimized queries
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING ((SELECT auth.uid()) = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
WITH CHECK ((SELECT auth.uid()) = id);
```

**Ejecutar en:** Supabase SQL Editor

---

## 🟢 OPCIONAL (Nice to have)

### 4. Add DELETE Policy (OPTIONAL)

**Nota:** Actualmente NO es necesario porque usas Edge Function con service_role.  
Solo agregar si en el futuro permites que usuarios eliminen sus propios perfiles desde el frontend sin Edge Function.

```sql
CREATE POLICY "Users can delete own profile"
ON public.profiles
FOR DELETE
USING ((SELECT auth.uid()) = id);
```

---

## ✅ Checklist de Verificación Post-Fixes

Después de aplicar los fixes, verificar:

- [ ] Las 3 funciones tienen `SET search_path = public, auth`
- [ ] Leaked password protection está habilitado en Dashboard
- [ ] Las políticas RLS usan `(SELECT auth.uid())`
- [ ] Ejecutar `mcp_supabase_get_advisors` para confirmar que warnings desaparecieron
- [ ] Probar signup/login/profile edit para confirmar que todo funciona

---

**Última actualización:** 2025-10-23  
**Revisado con:** Supabase MCP + Database Linter
