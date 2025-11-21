'use client'

import { useLanguage } from './I18nProvider'

export default function LanguageToggle() {
  const { locale, changeLocale } = useLanguage()

  return (
    <div className="glass-card px-3 py-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => changeLocale('it')}
          className={`
            px-3 py-1 rounded-md text-sm font-medium transition-all duration-200
            ${locale === 'it' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
              : 'text-white/60 hover:text-white/90'
            }
          `}
        >
          🇮🇹 IT
        </button>
        <button
          onClick={() => changeLocale('en')}
          className={`
            px-3 py-1 rounded-md text-sm font-medium transition-all duration-200
            ${locale === 'en' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
              : 'text-white/60 hover:text-white/90'
            }
          `}
        >
          🇬🇧 EN
        </button>
      </div>
    </div>
  )
}

