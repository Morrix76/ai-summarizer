# 🤖 AI Summarizer - Frontend

Frontend Next.js 14 per AI Summarizer con design moderno glassmorphism.

## 🚀 Quick Start

### 1. Installa le dipendenze

```bash
npm install
```

### 2. Configura l'API URL

Crea un file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Avvia il server di sviluppo

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## ✨ Features

### Design System
- **Background**: Gradient blu-viola-rosa animato
- **Glassmorphism**: Cards con backdrop blur e bordi semitrasparenti
- **Animazioni**: Smooth transitions e hover effects
- **Responsive**: Design ottimizzato per mobile, tablet e desktop

### Componenti

1. **TextInput** - Textarea con contatore caratteri e progress bar
2. **FileUpload** - Dropzone drag & drop per PDF, DOC, DOCX, TXT
3. **TemplateSelector** - 6 cards interattive per i template
4. **OutputDisplay** - Visualizzazione riassunto con export PDF
5. **StatsBar** - Statistiche in tempo reale da localStorage

### Funzionalità

- ✅ Input testo o upload file
- ✅ 6 template AI specializzati
- ✅ Riassunti in tempo reale
- ✅ Copy to clipboard
- ✅ Export PDF
- ✅ Statistiche persistenti (localStorage)
- ✅ Gestione errori completa
- ✅ Loading states

## 🎨 Template Disponibili

1. **⚡ Breve** - Riassunto conciso (3-4 frasi)
2. **📋 Dettagliato** - Analisi approfondita
3. **📝 Punti Chiave** - Elenco puntato
4. **🎓 Accademico** - Stile formale
5. **💼 Business** - Focus su metriche
6. **✨ Creativo** - Narrativo e coinvolgente

## 📁 Struttura

```
frontend/
├── app/
│   ├── page.js          # Pagina principale (single page app)
│   ├── layout.js        # Layout globale
│   └── globals.css      # Stili globali + utilities
├── components/
│   ├── TextInput.js     # Input testo
│   ├── FileUpload.js    # Upload file
│   ├── TemplateSelector.js  # Selezione template
│   ├── OutputDisplay.js # Visualizzazione output
│   └── StatsBar.js      # Barra statistiche
├── package.json
├── tailwind.config.js
└── next.config.js
```

## 🔧 Tecnologie

- **Next.js 14** - React framework con App Router
- **TailwindCSS** - Utility-first CSS (zero CSS custom)
- **Framer Motion** - Animazioni smooth
- **react-dropzone** - Drag & drop file upload
- **jsPDF** - Export PDF
- **html2canvas** - Screenshot per PDF

## 💾 LocalStorage

Le statistiche vengono salvate localmente:

```json
{
  "totalSummaries": 42,
  "totalWords": 15230,
  "totalCharacters": 95847
}
```

## 🎯 API Integration

Il frontend comunica con il backend tramite:

- `POST /api/summarize` - Riassunto testo
- `POST /api/summarize-file` - Riassunto file

## 🏗️ Build Production

```bash
npm run build
npm start
```

## 📝 Note

- Il backend deve essere avviato su `localhost:5000`
- I file caricati vengono eliminati automaticamente dal backend
- Le statistiche sono salvate solo localmente nel browser
- Nessun dato viene inviato a terze parti (privacy-first)

