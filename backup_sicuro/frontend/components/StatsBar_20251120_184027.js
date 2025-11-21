'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function StatsBar() {
  const t = useTranslations()
  const [stats, setStats] = useState({
    totalSummaries: 0,
    totalWords: 0,
    totalCharacters: 0
  })

  useEffect(() => {
    // Load stats from localStorage
    const loadStats = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('ai-summarizer-stats')
        if (stored) {
          try {
            setStats(JSON.parse(stored))
          } catch (e) {
            console.error('Error loading stats:', e)
          }
        }
      }
    }

    loadStats()

    // Listen for stats updates
    const handleStatsUpdate = () => loadStats()
    window.addEventListener('stats-updated', handleStatsUpdate)
    
    return () => window.removeEventListener('stats-updated', handleStatsUpdate)
  }, [])

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📊</span>
        <h3 className="text-white font-semibold text-lg">{t('stats.title')}</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
            {stats.totalSummaries.toLocaleString()}
          </div>
          <div className="text-white/60 text-sm">{t('stats.totalSummaries')}</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
            {stats.totalWords.toLocaleString()}
          </div>
          <div className="text-white/60 text-sm">{t('stats.totalWords')}</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-1">
            {(stats.totalCharacters / 1000).toFixed(1)}k
          </div>
          <div className="text-white/60 text-sm">{t('stats.totalCharacters')}</div>
        </div>
      </div>
    </div>
  )
}

