'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function FileUpload({ onFileSelect, disabled }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled
  })

  const selectedFile = acceptedFiles[0]

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          glass-card p-8 border-2 border-dashed transition-all duration-300 cursor-pointer
          ${isDragActive ? 'border-purple-500 bg-purple-500/10 scale-105' : 'border-white/20 hover:border-purple-400'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">
            {isDragActive ? '📥' : '📄'}
          </div>
          
          <div className="space-y-2">
            {isDragActive ? (
              <p className="text-white text-lg font-medium">
                Rilascia il file qui...
              </p>
            ) : (
              <>
                <p className="text-white text-lg font-medium">
                  Trascina un file qui o clicca per selezionare
                </p>
                <p className="text-white/60 text-sm">
                  Supportati: PDF, DOC, DOCX, TXT (max 10MB)
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {selectedFile && (
        <div className="glass-card p-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">
                {selectedFile.name.endsWith('.pdf') ? '📕' :
                 selectedFile.name.endsWith('.doc') || selectedFile.name.endsWith('.docx') ? '📘' :
                 '📄'}
              </div>
              <div>
                <p className="text-white font-medium">{selectedFile.name}</p>
                <p className="text-white/60 text-sm">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                acceptedFiles.length = 0
                onFileSelect(null)
              }}
              disabled={disabled}
              className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="text-white/40 text-xs space-y-1">
        <p>✓ PDF - Estrae testo da documenti PDF</p>
        <p>✓ DOC/DOCX - Supporta Microsoft Word</p>
        <p>✓ TXT - File di testo semplice</p>
      </div>
    </div>
  )
}

