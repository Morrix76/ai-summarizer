'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import TextInput from '@/components/TextInput'
import FileUpload from '@/components/FileUpload'
import TemplateSelector from '@/components/TemplateSelector'
import OutputDisplay from '@/components/OutputDisplay'
import StatsBar from '@/components/StatsBar'
import LanguageToggle from '@/components/LanguageToggle'
import { summarizeText, uploadFile } from '@/utils/api'

export default function Home() {
  const t = useTranslations()
  const [activeTab, setActiveTab] = useState('text') // 'text' or 'file'
  const [textInput, setTextInput] = useState('')
  const [fileInput, setFileInput] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState('brief')
  const [summary, setSummary] = useState('')
  const [metadata, setMetadata] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const updateStats = (originalLength, summaryLength) => {
    if (typeof window === 'undefined') return

    const stored = localStorage.getItem('ai-summarizer-stats')
    const stats = stored ? JSON.parse(stored) : {
      totalSummaries: 0,
      totalWords: 0,
      totalCharacters: 0
    }

    stats.totalSummaries += 1
    stats.totalWords += summaryLength.split(/\s+/).filter(w => w).length
    stats.totalCharacters += originalLength

    localStorage.setItem('ai-summarizer-stats', JSON.stringify(stats))
    
    // Trigger stats update event
    window.dispatchEvent(new Event('stats-updated'))
  }

  const handleSummarize = async () => {
    setError('')
    
    // Validation
    if (activeTab === 'text' && !textInput.trim()) {
      setError(t('errors.noText'))
      return
    }

    if (activeTab === 'file' && !fileInput) {
      setError(t('errors.noFile'))
      return
    }

    if (!selectedTemplate) {
      setError(t('errors.noTemplate'))
      return
    }

    setLoading(true)

    try {
      let data
      
      if (activeTab === 'text') {
        // Text summarization using API utility
        data = await summarizeText(textInput, selectedTemplate)
      } else {
        // File summarization using API utility
        data = await uploadFile(fileInput, selectedTemplate)
      }

      if (data.success && data.data) {
        setSummary(data.data.summary)
        setMetadata(data.data)
        
        // Update stats
        updateStats(
          data.data.originalLength || textInput.length,
          data.data.summary
        )
      } else {
        throw new Error(t('errors.generic'))
      }

    } catch (err) {
      console.error('Error:', err)
      setError(err.message || t('errors.connection'))
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setSummary('')
    setMetadata({})
    setError('')
  }

  const canSummarize = () => {
    if (loading) return false
    if (activeTab === 'text') return textInput.trim().length > 0
    if (activeTab === 'file') return fileInput !== null
    return false
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="glass border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🤖</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t('header.title')}
                </h1>
                <p className="text-white/60 text-sm">{t('header.subtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <div className="glass-card px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white/80 text-sm">{t('header.status')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            {t('hero.title')}{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('hero.titleHighlight')}
            </span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📝</span>
                <h3 className="text-white font-semibold text-lg">{t('input.title')}</h3>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 p-1 glass rounded-xl">
                <button
                  onClick={() => setActiveTab('text')}
                  className={`
                    flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300
                    ${activeTab === 'text' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-white/60 hover:text-white/90'
                    }
                  `}
                >
                  📄 {t('tabs.text')}
                </button>
                <button
                  onClick={() => setActiveTab('file')}
                  className={`
                    flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300
                    ${activeTab === 'file' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-white/60 hover:text-white/90'
                    }
                  `}
                >
                  📎 {t('tabs.file')}
                </button>
              </div>

              {/* Input Content */}
              <div className="pt-4">
                {activeTab === 'text' ? (
                  <TextInput 
                    value={textInput} 
                    onChange={setTextInput}
                    disabled={loading}
                  />
                ) : (
                  <FileUpload 
                    onFileSelect={setFileInput}
                    disabled={loading}
                  />
                )}
              </div>
            </div>

            {/* Template Selector */}
            <div className="glass-card p-6">
              <TemplateSelector
                selected={selectedTemplate}
                onSelect={setSelectedTemplate}
                disabled={loading}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleSummarize}
              disabled={!canSummarize()}
              className={`
                w-full btn-gradient px-8 py-4 text-lg font-semibold flex items-center justify-center gap-3
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              `}
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t('actions.generating')}</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>{t('actions.generate')}</span>
                </>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="glass-card p-4 border-l-4 border-red-500 animate-slide-up">
                <div className="flex items-center gap-2 text-red-400">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Output Section */}
            {summary && (
              <div className="glass-card p-6">
                <OutputDisplay
                  summary={summary}
                  metadata={metadata}
                  onClear={handleClear}
                />
              </div>
            )}
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            <StatsBar />

            {/* Features */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⚡</span>
                <h3 className="text-white font-semibold text-lg">{t('features.title')}</h3>
              </div>

              <div className="space-y-3">
                {[
                  { icon: '🎯', text: t('features.items.templates') },
                  { icon: '📄', text: t('features.items.files') },
                  { icon: '⚡', text: t('features.items.instant') },
                  { icon: '📊', text: t('features.items.stats') },
                  { icon: '💾', text: t('features.items.export') },
                  { icon: '🔒', text: t('features.items.free') }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80">
                    <span className="text-xl">{feature.icon}</span>
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="glass-card p-6 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💡</span>
                <h3 className="text-white font-semibold">Suggerimenti</h3>
              </div>
              
              <div className="space-y-2 text-white/70 text-sm">
                <p>• Usa <strong>Brief</strong> per riassunti veloci</p>
                <p>• Scegli <strong>Accademico</strong> per testi formali</p>
                <p>• <strong>Business</strong> è perfetto per report</p>
                <p>• I file vengono eliminati dopo l'elaborazione</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-white/50 text-sm">
          <p>
            Powered by{' '}
            <a 
              href="https://groq.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Groq AI
            </a>
            {' '}• Creato con ❤️
          </p>
        </footer>
      </div>
    </main>
  )
}

