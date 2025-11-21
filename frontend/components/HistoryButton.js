'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { getHistoryCount } from '@/utils/history'

export default function HistoryButton({ onClick }) {
  const t = useTranslations()
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Load initial count
    const loadCount = () => {
      setCount(getHistoryCount())
    }

    loadCount()

    // Listen for history updates
    const handleHistoryUpdate = () => loadCount()
    window.addEventListener('history-updated', handleHistoryUpdate)
    
    return () => window.removeEventListener('history-updated', handleHistoryUpdate)
  }, [])

  return (
    <button
      onClick={onClick}
      className="glass-card px-4 py-2 hover:scale-105 transition-all duration-300 relative"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">📋</span>
        <span className="text-white/80 text-sm font-medium">
          {t('history.title')}
        </span>
      </div>
      
      {count > 0 && (
        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          {count > 99 ? '99+' : count}
        </div>
      )}
    </button>
  )
}

