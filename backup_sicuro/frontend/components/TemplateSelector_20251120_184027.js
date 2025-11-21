'use client'

import { useTranslations } from 'next-intl'

const templateConfig = [
  {
    id: 'brief',
    icon: '⚡',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'detailed',
    icon: '📋',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'bullet',
    icon: '📝',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'academic',
    icon: '🎓',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'business',
    icon: '💼',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'creative',
    icon: '✨',
    color: 'from-pink-500 to-purple-500'
  }
]

export default function TemplateSelector({ selected, onSelect, disabled }) {
  const t = useTranslations()
  
  const templates = templateConfig.map(template => ({
    ...template,
    name: t(`templates.${template.id}.name`),
    description: t(`templates.${template.id}.description`)
  }))
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-white font-semibold text-lg">{t('templates.title')}</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            disabled={disabled}
            className={`
              glass-card p-4 text-left transition-all duration-300 group
              ${selected === template.id 
                ? 'ring-2 ring-purple-500 bg-white/20 scale-105' 
                : 'hover:scale-105 hover:bg-white/15'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-start gap-3">
              <div className={`
                text-3xl transition-transform duration-300
                ${selected === template.id ? 'scale-110' : 'group-hover:scale-110'}
              `}>
                {template.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold mb-1 flex items-center gap-2">
                  {template.name}
                  {selected === template.id && (
                    <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 px-2 py-0.5 rounded-full">
                      ✓
                    </span>
                  )}
                </h4>
                <p className="text-white/60 text-xs leading-relaxed">
                  {template.description}
                </p>
              </div>
            </div>

            {/* Gradient indicator */}
            <div className={`
              h-1 w-full mt-3 rounded-full bg-gradient-to-r ${template.color} 
              transition-opacity duration-300
              ${selected === template.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
            `} />
          </button>
        ))}
      </div>

      {selected && (
        <div className="glass-card p-3 animate-fade-in">
          <p className="text-white/80 text-sm">
            <span className="font-semibold">{t('output.stats.template')}:</span>{' '}
            {templates.find(tmpl => tmpl.id === selected)?.name}
          </p>
        </div>
      )}
    </div>
  )
}

