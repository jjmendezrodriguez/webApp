// Info page component
// Information and about page

import { useTranslation } from 'react-i18next'

// Technology configuration with official links and logos
const technologies = [
  {
    name: 'React',
    url: 'https://react.dev',
    icon: 'react',
    color: '61DAFB',
    cdn: 'https://cdn.simpleicons.org/react/61DAFB',
  },
  {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org',
    icon: 'typescript',
    color: '3178C6',
    cdn: 'https://cdn.simpleicons.org/typescript/3178C6',
  },
  {
    name: 'Vite',
    url: 'https://vitejs.dev',
    icon: 'vite',
    color: '646CFF',
    cdn: 'https://cdn.simpleicons.org/vite/646CFF',
  },
  {
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    icon: 'tailwindcss',
    color: '06B6D4',
    cdn: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
  },
  {
    name: 'Supabase',
    url: 'https://supabase.com',
    icon: 'supabase',
    color: '3FCF8E',
    cdn: 'https://cdn.simpleicons.org/supabase/3FCF8E',
  },
  {
    name: 'Playwright',
    url: 'https://playwright.dev',
    icon: 'playwright',
    color: '2EAD33',
    // Usar CDN alternativo (jsdelivr) que es más confiable
    cdn: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/playwright.svg',
  },
  {
    name: 'Vitest',
    url: 'https://vitest.dev',
    icon: 'vitest',
    color: '6E9F18',
    cdn: 'https://cdn.simpleicons.org/vitest/6E9F18',
  },
  {
    name: 'i18next',
    url: 'https://www.i18next.com',
    icon: 'i18next',
    color: '26A69A',
    cdn: 'https://cdn.simpleicons.org/i18next/26A69A',
  },
]

export default function Info() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-900 sm:text-5xl">
            {t('info.title')}
          </h1>
          <p className="text-xl font-semibold text-indigo-600">
            {t('info.subtitle')}
          </p>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-indigo-500/10 sm:p-12">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-700">
              {t('info.description')}
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              {t('info.purpose')}
            </p>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-indigo-500/10 sm:p-12">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            {t('info.technologies.title')}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {technologies.map((tech) => (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 rounded-lg border-2 border-gray-100 p-4 transition-all duration-200 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md"
              >
                <img
                  src={tech.cdn}
                  alt={`${tech.name} logo`}
                  className="h-12 w-12 transition-transform duration-200 group-hover:scale-110"
                />
                <span className="text-center text-sm font-medium text-gray-700 group-hover:text-indigo-600">
                  {tech.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
