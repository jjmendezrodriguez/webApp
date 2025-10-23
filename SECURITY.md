# Security Checklist - Production Deployment

## ✅ Pre-Deploy Checklist

### Supabase Configuration

- [ ] Enable RLS (Row Level Security) on ALL tables
- [ ] Review RLS policies - ensure users can only access their own data
- [ ] Disable email confirmation in production (or configure SMTP)
- [ ] Set up custom domain for auth emails
- [ ] Enable MFA (Multi-Factor Authentication) if needed
- [ ] Review Edge Functions permissions

### Environment Variables

- [ ] All secrets in Vercel Environment Variables (NOT in code)
- [ ] VITE_SUPABASE_URL configured
- [ ] VITE_SUPABASE_ANON_KEY configured
- [ ] No .env files committed to git

### Database Security

- [ ] Check all triggers are working (sync_profile_email, sync_auth_metadata)
- [ ] Verify delete-user Edge Function has correct permissions
- [ ] Review any custom SQL functions for SQL injection risks
- [ ] Enable database backups

### Frontend Security

- [ ] Remove all console.log in production (or use conditional logging)
- [ ] Verify no hardcoded credentials anywhere
- [ ] Check bundle size (current: ~500KB - OK)
- [ ] Enable HTTPS only (Vercel does this by default)

### API Security

- [ ] Rate limiting on Supabase (check your plan limits)
- [ ] CORS properly configured in Supabase dashboard
- [ ] Edge Functions protected with auth headers

### Monitoring

- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Monitor Supabase usage/quota
- [ ] Enable Vercel Analytics (optional)

---

## 🔒 Current Security Status

### ✅ Already Implemented

- Environment variables properly configured
- .env excluded from git
- RLS enabled on profiles table
- Password validation (8+ chars, uppercase, number)
- Protected routes with authentication checks
- Session token management via Supabase
- Edge Function with bearer token auth
- Bidirectional sync triggers

### ⚠️ To Verify in Supabase Dashboard

1. Go to Database → Policies
2. Ensure ALL tables have RLS enabled
3. Review each policy to prevent data leaks
4. Test with different user accounts

### 📋 Optional Enhancements

- Add rate limiting to login attempts
- Implement CAPTCHA on signup
- Add security headers (CSP, X-Frame-Options)
- Set up audit logs for sensitive actions
- Add IP-based access controls (if needed)

---

## 🚨 Common Security Mistakes to Avoid

❌ Never commit .env files  
❌ Never use service_role key in frontend  
❌ Never disable RLS on production tables  
❌ Never log sensitive user data  
❌ Never trust client-side validation only  
❌ Never store passwords in plain text

✅ Always use environment variables  
✅ Always validate on server-side (RLS policies)  
✅ Always use HTTPS  
✅ Always sanitize user inputs  
✅ Always review Supabase policies before deploy

---

## 📞 Emergency Procedures

### If API Key is Exposed

1. Go to Supabase Dashboard → Settings → API
2. Rotate the anon key immediately
3. Update VITE_SUPABASE_ANON_KEY in Vercel
4. Redeploy application

### If Database Breach Suspected

1. Check Supabase logs (Database → Logs)
2. Review RLS policies
3. Force logout all users (revoke sessions)
4. Rotate database password
5. Enable additional security measures

---

**Last Updated:** October 23, 2025  
**Reviewed By:** Security Audit - GitHub Copilot
