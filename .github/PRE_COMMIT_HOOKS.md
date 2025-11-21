# Pre-commit Hooks Configuration

## Setup

Pre-commit hooks automatically run code quality checks before each commit.

### Installed Tools

- **Husky** - Git hooks manager
- **lint-staged** - Run linters on staged files only
- **Prettier** - Code formatter

### What Runs on Commit

```bash
git commit
  ↓
1. ESLint --fix (auto-fix errors)
2. Prettier --write (format code)
  ↓
✅ Commit proceeds if no errors
❌ Commit blocked if errors remain
```

### Configuration

**Location:** `frontEnd/package.json`

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md}": ["prettier --write"]
  }
}
```

### Prettier Rules

**Location:** `frontEnd/.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Benefits

✅ **Prevents broken commits** - No more "fix lint" commits  
✅ **Auto-formatting** - Code style is consistent  
✅ **Faster CI** - Fewer failed builds  
✅ **Team consistency** - Everyone uses same standards

### Bypass Hook (Emergency Only)

```bash
# Skip pre-commit hook (NOT recommended)
git commit --no-verify -m "emergency fix"
```

**⚠️ Warning:** Only use in emergencies. CI will still catch errors.

### Manual Run

Test hooks without committing:

```bash
cd frontEnd
bunx lint-staged
```

### Troubleshooting

**Hook not running?**

```bash
# Reinstall hooks
cd frontEnd
bun run prepare
```

**Prettier conflicts with ESLint?**

```bash
# Prettier should run after ESLint
# Check package.json lint-staged order
```

**Too slow?**

```bash
# lint-staged only runs on changed files
# If still slow, check .prettierignore
```

---

**Created:** 2025-11-20
