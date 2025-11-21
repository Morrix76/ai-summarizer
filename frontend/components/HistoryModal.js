'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { getHistory, deleteHistoryItem, clearHistory } from '@/utils/history'
import jsPDF from 'jspdf'

export default function HistoryModal({ isOpen, onClose }) {
  const t = useTranslations()
  const [history, setHistory] = useState([])
  const [filteredHistory, setFilteredHistory] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [templateFilter, setTemplateFilter] = useState('all')
  const [expandedItem, setExpandedItem] = useState(null)
  const [copiedId, setCopiedId] = useState(null)

  // Load history
  useEffect(() => {
    if (isOpen) {
      loadHistory()
    }
  }, [isOpen])

  // Handle history updates
  useEffect(() => {
    const handleHistoryUpdate = () => {
      if (isOpen) {
        loadHistory()
      }
    }

    window.addEventListener('history-updated', handleHistoryUpdate)
    return () => window.removeEventListener('history-updated', handleHistoryUpdate)
  }, [isOpen])

  // Filter history
  useEffect(() => {
    let filtered = [...history]

    // Filter by template
    if (templateFilter !== 'all') {
      filtered = filtered.filter(item => item.template === templateFilter)
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(item =>
        item.summary.toLowerCase().includes(search) ||
        item.inputPreview.toLowerCase().includes(search) ||
        item.template.toLowerCase().includes(search)
      )
    }

    setFilteredHistory(filtered)
  }, [history, searchTerm, templateFilter])

  const loadHistory = () => {
    const data = getHistory()
    setHistory(data)
  }

  const handleCopy = async (item) => {
    await navigator.clipboard.writeText(item.summary)
    setCopiedId(item.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDownloadTxt = (item) => {
    const date = new Date(item.timestamp)
    const formattedDate = date.toLocaleString('it-IT')
    
    let content = `${t('history.txt.title')}\n`
    content += `${'='.repeat(50)}\n\n`
    content += `${t('history.txt.date')}: ${formattedDate}\n`
    content += `${t('history.txt.template')}: ${item.template}\n\n`
    content += `${'='.repeat(50)}\n\n`
    content += `${t('history.txt.summary')}:\n\n`
    content += `${item.summary}\n\n`
    
    if (item.actionItems && item.actionItems.length > 0) {
      content += `${'='.repeat(50)}\n\n`
      content += `${t('history.txt.actionItems')}:\n\n`
      item.actionItems.forEach((action, i) => {
        content += `${i + 1}. ${action}\n`
      })
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `riassunto-${item.template}-${Date.now()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleExportPDF = (item) => {
    const doc = new jsPDF()
    const date = new Date(item.timestamp)
    
    // Title
    doc.setFontSize(20)
    doc.text(t('pdf.title'), 20, 20)
    
    // Metadata
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(`${t('pdf.template')}: ${item.template}`, 20, 30)
    doc.text(`${t('pdf.date')}: ${date.toLocaleString('it-IT')}`, 20, 35)
    doc.text(`${t('pdf.originalLength')}: ${item.originalLength?.toLocaleString() || 'N/A'} ${t('pdf.characters')}`, 20, 40)
    doc.text(`${t('pdf.summaryLength')}: ${item.summaryLength?.toLocaleString() || 'N/A'} ${t('pdf.characters')}`, 20, 45)
    
    // Summary
    doc.setFontSize(12)
    doc.setTextColor(0)
    
    const pageWidth = doc.internal.pageSize.getWidth()
    const margins = 20
    const maxWidth = pageWidth - (margins * 2)
    
    const lines = doc.splitTextToSize(item.summary, maxWidth)
    doc.text(lines, margins, 55)
    
    // Footer
    const pageHeight = doc.internal.pageSize.getHeight()
    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.text(t('pdf.footer'), margins, pageHeight - 10)
    
    doc.save(`riassunto-${item.template}-${item.timestamp}.pdf`)
  }

  const handleDelete = (id) => {
    if (confirm(t('history.confirmDelete'))) {
      deleteHistoryItem(id)
      if (expandedItem === id) {
        setExpandedItem(null)
      }
    }
  }

  const handleClearAll = () => {
    if (confirm(t('history.confirmClearAll'))) {
      clearHistory()
      setExpandedItem(null)
    }
  }

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  if (!isOpen) return null

  // Get unique templates for filter
  const templates = ['all', ...new Set(history.map(item => item.template))]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass-card max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-slide-up">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📋</span>
              <h2 className="text-2xl font-bold text-white">
                {t('history.title')}
              </h2>
              <span className="text-white/60 text-sm">
                ({filteredHistory.length} {t('history.items')})
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-2xl transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('history.search')}
                className="w-full px-4 py-2 glass rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Template Filter */}
            <select
              value={templateFilter}
              onChange={(e) => setTemplateFilter(e.target.value)}
              className="px-4 py-2 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">{t('history.all')}</option>
              {templates.slice(1).map(template => (
                <option key={template} value={template}>
                  {t(`templates.${template}.name`)}
                </option>
              ))}
            </select>

            {/* Clear All */}
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2 glass rounded-lg text-red-400 hover:text-red-300 transition-colors font-medium whitespace-nowrap"
              >
                {t('history.clearAll')}
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-white/60 text-lg">{t('history.empty')}</p>
            </div>
          ) : (
            filteredHistory.map(item => {
              const date = new Date(item.timestamp)
              const isExpanded = expandedItem === item.id
              
              return (
                <div
                  key={item.id}
                  className="glass-card p-4 space-y-3 hover:border-purple-500/30 transition-all duration-300"
                >
                  {/* Item Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 glass rounded text-xs font-medium text-purple-300 capitalize">
                          {t(`templates.${item.template}.name`)}
                        </span>
                        <span className="text-white/40 text-xs">
                          {date.toLocaleString('it-IT')}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm line-clamp-2">
                        {item.inputPreview}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="text-white/60 hover:text-white transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      {isExpanded ? t('history.hideDetails') : t('history.viewDetails')}
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="space-y-3 animate-slide-up">
                      {/* Summary */}
                      <div className="glass p-4 rounded-lg">
                        <p className="text-white/90 leading-relaxed whitespace-pre-wrap text-sm">
                          {item.summary}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div className="glass p-2 rounded text-center">
                          <div className="text-white/50 text-xs">{t('output.stats.words')}</div>
                          <div className="text-white font-semibold text-sm">
                            {item.summary.split(/\s+/).filter(w => w).length}
                          </div>
                        </div>
                        <div className="glass p-2 rounded text-center">
                          <div className="text-white/50 text-xs">{t('output.stats.characters')}</div>
                          <div className="text-white font-semibold text-sm">
                            {item.summaryLength?.toLocaleString() || 'N/A'}
                          </div>
                        </div>
                        <div className="glass p-2 rounded text-center">
                          <div className="text-white/50 text-xs">{t('pdf.originalLength')}</div>
                          <div className="text-white font-semibold text-sm">
                            {item.originalLength?.toLocaleString() || 'N/A'}
                          </div>
                        </div>
                        <div className="glass p-2 rounded text-center">
                          <div className="text-white/50 text-xs">{t('output.stats.reduction')}</div>
                          <div className="text-white font-semibold text-sm">
                            {item.originalLength && item.summaryLength
                              ? Math.round((1 - item.summaryLength / item.originalLength) * 100)
                              : 0}%
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <button
                          onClick={() => handleCopy(item)}
                          className="btn-gradient px-3 py-2 text-sm flex items-center justify-center gap-2"
                        >
                          {copiedId === item.id ? (
                            <>
                              <span>✓</span>
                              <span>{t('actions.copied')}</span>
                            </>
                          ) : (
                            <>
                              <span>📋</span>
                              <span>{t('history.actions.copy')}</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleDownloadTxt(item)}
                          className="btn-gradient px-3 py-2 text-sm flex items-center justify-center gap-2"
                        >
                          <span>💾</span>
                          <span>{t('history.actions.download')}</span>
                        </button>

                        <button
                          onClick={() => handleExportPDF(item)}
                          className="btn-gradient px-3 py-2 text-sm flex items-center justify-center gap-2"
                        >
                          <span>📄</span>
                          <span>{t('history.actions.exportPdf')}</span>
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="glass px-3 py-2 text-sm flex items-center justify-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <span>🗑️</span>
                          <span>{t('history.actions.delete')}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

