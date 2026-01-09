# 🔐 WebApp - Modern Authentication Template

> **A production-ready authentication system template** built with React 19, TypeScript, and Supabase. Save weeks of development time with enterprise-grade security and best practices out of the box.

[![Live Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge&logo=vercel)](https://web-app-brown-chi.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.76-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

---

## 🎯 What is WebApp?

**WebApp** is a **production-ready authentication system template** designed for developers who want to build modern web applications quickly without sacrificing code quality. It follows senior-level engineering practices and includes everything you need to start a new project.

**🚀 Live Demo:** [https://web-app-brown-chi.vercel.app/](https://web-app-brown-chi.vercel.app/)

### 📸 Screenshots

**Home Page**
![Home Page](docs/screenshots/home.png)

**Authentication Modal**
![Login Modal](docs/screenshots/login-modal.png)

**Multi-language Support**
![Language Switcher](docs/screenshots/language-switcher.png)

---

## ✨ Key Features

### 🔐 **Complete Authentication System**

- ✅ Email/Password login with validation
- ✅ Google OAuth integration
- ✅ Password reset flow
- ✅ Account creation with email verification
- ✅ Protected routes with AuthContext
- ✅ Session persistence

### 🎨 **Modern UI/UX**

- ✅ Clean, responsive design with Tailwind CSS v4
- ✅ Smooth animations and transitions
- ✅ Modal-based authentication flow
- ✅ Form validation with real-time feedback
- ✅ Loading states and error handling

### 🌍 **Internationalization (i18n)**

- ✅ English and Spanish support
- ✅ Easy to add new languages
- ✅ Persistent language selection

### 🔒 **Security Best Practices**

- ✅ TypeScript strict mode
- ✅ Input sanitization and validation
- ✅ Secure password handling (Supabase Auth)
- ✅ RLS (Row Level Security) policies
- ✅ Environment variables for secrets
- ✅ CORS protection

### 🧪 **Testing & Quality**

- ✅ Vitest + Testing Library setup
- ✅ Unit tests for utils and hooks
- ✅ Test coverage reporting
- ✅ ESLint + Prettier configuration
- ✅ Pre-commit hooks with Husky

### 🚀 **CI/CD Ready**

- ✅ GitHub Actions workflow
- ✅ Automated testing on PRs
- ✅ Build verification
- ✅ Security audit
- ✅ Deployment to Vercel

---

## 🛠 Tech Stack

| Category         | Technologies                                |
| ---------------- | ------------------------------------------- |
| **Frontend**     | React 19, TypeScript, Vite, Tailwind CSS v4 |
| **Backend**      | Supabase (Auth, Database, RLS)              |
| **Runtime**      | Bun (fastest package manager)               |
| **Testing**      | Vitest, Testing Library, jsdom              |
| **CI/CD**        | GitHub Actions, Vercel                      |
| **Code Quality** | ESLint, Prettier, Husky, lint-staged        |
| **i18n**         | react-i18next                               |

---

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Supabase account (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/jjmendezrodriguez/webApp.git
cd webApp

# Navigate to frontend
cd frontEnd

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
bun dev
```

Visit `http://localhost:5173` 🎉

---

## 📁 Project Structure

```files
frontEnd/
├── src/
│   ├── components/          # React components
│   │   ├── auth/           # Authentication modals
│   │   └── dashboard/      # User dashboard
│   ├── hooks/              # Custom React hooks
│   ├── services/           # External integrations
│   │   └── supabase/       # Supabase client
│   ├── utils/              # Pure utility functions
│   ├── context/            # React Context providers
│   ├── pages/              # Route pages
│   └── locales/            # i18n translations
├── tests/                  # Test files
├── docs/                   # Documentation
└── .github/workflows/      # CI/CD pipelines
```

See [PROJECT_STRUCTURE.md](frontEnd/PROJECT_STRUCTURE.md) for detailed organization.

---

## 📚 Documentation

- **[AGENTS.md](frontEnd/AGENTS.md)** - AI-assisted development guidelines
- **[SECURITY.md](SECURITY.md)** - Security best practices
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[Frontend README](frontEnd/README.md)** - Detailed frontend documentation

---

## 🧪 Available Scripts

```bash
bun dev          # Start development server
bun build        # Build for production
bun lint         # Run ESLint
bun test         # Run tests in watch mode
bun test:run     # Run tests once
bun test:coverage # Generate coverage report
```

---

## 🔧 Environment Setup

Create a `.env` file in `frontEnd/`:

```env
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Get your Supabase credentials from: [supabase.com/dashboard](https://supabase.com/dashboard)

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Jose Mendez**  
💼 [LinkedIn](https://linkedin.com/in/jjmendezrodriguez)  
🐙 [GitHub](https://github.com/jjmendezrodriguez)

---

## 🌟 Show Your Support

If this template helped you save time, give it a ⭐️!

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
