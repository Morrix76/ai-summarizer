'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import jsPDF from 'jspdf'

export default function OutputDisplay({ summary, metadata, onClear }) {
  const t = useTranslations()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    
    // Title
    doc.setFontSize(20)
    doc.text(t('pdf.title'), 20, 20)
    
    // Metadata
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(`${t('pdf.template')}: ${metadata.template || 'N/A'}`, 20, 30)
    doc.text(`${t('pdf.date')}: ${new Date(metadata.timestamp).toLocaleString('it-IT')}`, 20, 35)
    doc.text(`${t('pdf.originalLength')}: ${metadata.originalLength?.toLocaleString() || 'N/A'} ${t('pdf.characters')}`, 20, 40)
    doc.text(`${t('pdf.summaryLength')}: ${metadata.summaryLength?.toLocaleString() || 'N/A'} ${t('pdf.characters')}`, 20, 45)
    
    // Summary
    doc.setFontSize(12)
    doc.setTextColor(0)
    
    const pageWidth = doc.internal.pageSize.getWidth()
    const margins = 20
    const maxWidth = pageWidth - (margins * 2)
    
    const lines = doc.splitTextToSize(summary, maxWidth)
    doc.text(lines, margins, 55)
    
    // Footer
    const pageHeight = doc.internal.pageSize.getHeight()
    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.text(t('pdf.footer'), margins, pageHeight - 10)
    
    doc.save(`riassunto-${Date.now()}.pdf`)
  }

  if (!summary) return null

  const wordCount = summary.split(/\s+/).filter(w => w).length

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-semibold text-lg">Riassunto Generato</h3>
          <span className="text-2xl">✨</span>
        </div>
        <button
          onClick={onClear}
          className="text-white/60 hover:text-white/90 transition-colors text-sm"
        >
          Pulisci
        </button>
      </div>

      {/* Summary Content */}
      <div className="glass-card p-6">
        <div className="prose prose-invert max-w-none">
          <p className="text-white/90 leading-relaxed whitespace-pre-wrap">
            {summary}
          </p>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-card p-3">
          <div className="text-white/50 text-xs mb-1">Parole</div>
          <div className="text-white font-semibold text-lg">{wordCount}</div>
        </div>
        <div className="glass-card p-3">
          <div className="text-white/50 text-xs mb-1">Caratteri</div>
          <div className="text-white font-semibold text-lg">
            {metadata.summaryLength?.toLocaleString() || 'N/A'}
          </div>
        </div>
        <div className="glass-card p-3">
          <div className="text-white/50 text-xs mb-1">Template</div>
          <div className="text-white font-semibold text-sm capitalize">
            {metadata.template || 'N/A'}
          </div>
        </div>
        <div className="glass-card p-3">
          <div className="text-white/50 text-xs mb-1">Riduzione</div>
          <div className="text-white font-semibold text-lg">
            {metadata.originalLength && metadata.summaryLength
              ? Math.round((1 - metadata.summaryLength / metadata.originalLength) * 100)
              : 0}%
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="btn-gradient flex-1 px-6 py-3 flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <span>✓</span>
              <span>Copiato!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>Copia Testo</span>
            </>
          )}
        </button>
        
        <button
          onClick={handleExportPDF}
          className="btn-gradient flex-1 px-6 py-3 flex items-center justify-center gap-2"
        >
          <span>📄</span>
          <span>Esporta PDF</span>
        </button>
      </div>
    </div>
  )
}

