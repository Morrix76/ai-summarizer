'use client'

import { NextIntlClientProvider } from 'next-intl'
import { useState, useEffect, createContext, useContext } from 'react'
import itMessages from '@/translations/it.json'
import enMessages from '@/translations/en.json'

const messages = {
  it: itMessages,
  en: enMessages
}

const LanguageContext = createContext()

export function useLanguage() {
  return useContext(LanguageContext)
}

export default function I18nProvider({ children }) {
  const [locale, setLocale] = useState('it')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Get locale from localStorage
    const savedLocale = localStorage.getItem('ai-summarizer-locale') || 'it'
    setLocale(savedLocale)
    setMounted(true)
  }, [])

  const changeLocale = (newLocale) => {
    setLocale(newLocale)
    localStorage.setItem('ai-summarizer-locale', newLocale)
  }

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ locale, changeLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages[locale]}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  )
}

