'use client'

export default function TextInput({ value, onChange, disabled }) {
  const maxChars = 10000
  const charCount = value.length
  const percentage = (charCount / maxChars) * 100

  return (
    <div className="space-y-3">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Incolla qui il tuo testo da riassumere..."
          maxLength={maxChars}
          className="input-glass w-full min-h-[300px] p-4 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 rounded-full ${
                percentage > 90 ? 'bg-red-500' : 
                percentage > 70 ? 'bg-yellow-500' : 
                'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className={`font-medium ${
            percentage > 90 ? 'text-red-400' : 'text-white/60'
          }`}>
            {charCount.toLocaleString()} / {maxChars.toLocaleString()}
          </span>
        </div>
        
        <div className="text-white/40">
          {value.split(/\s+/).filter(w => w).length} parole
        </div>
      </div>

      {charCount === 0 && (
        <div className="text-white/40 text-sm flex items-center gap-2">
          <span>💡</span>
          <span>Suggerimento: Incolla articoli, email, documenti o qualsiasi testo da riassumere</span>
        </div>
      )}
    </div>
  )
}

