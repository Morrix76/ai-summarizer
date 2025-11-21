# 🤖 AI Summarizer v2

Applicazione moderna per riassunti AI con 6 template specializzati, powered by Groq API.

![AI Summarizer](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?style=for-the-badge&logo=tailwindcss)
![Groq](https://img.shields.io/badge/Groq-AI-orange?style=for-the-badge)

## ✨ Caratteristiche

- 🎯 **6 Template AI Specializzati**
  - ⚡ Brief - Riassunto conciso e diretto
  - 📋 Dettagliato - Analisi approfondita
  - 📝 Punti Chiave - Elenco puntato
  - 🎓 Accademico - Stile formale e scientifico
  - 💼 Business - Focus su metriche e decisioni
  - ✨ Creativo - Narrativo e coinvolgente

- 📄 **Upload Multipli Formati**: PDF, DOC, DOCX, TXT
- 📊 **Dashboard Statistiche**: Tracking in tempo reale (localStorage)
- 💾 **Export PDF**: Salva i tuoi riassunti
- 🎨 **Design Glassmorphism**: Gradient blu-viola-rosa
- 🌙 **Dark Mode**: Integrato nativamente
- ⚡ **Single Page App**: Zero reload, esperienza fluida
- 🔒 **100% Privato**: Nessun dato salvato sui server

## 🛠️ Stack Tecnologico

### Frontend
- **Next.js 14** (App Router)
- **TailwindCSS** (zero CSS custom)
- **Framer Motion** (animazioni smooth)
- **react-dropzone** (drag & drop)
- **jsPDF** (export PDF)

### Backend
- **Node.js** + **Express**
- **Groq API** (llama-3.1-70b-versatile)
- **Multer** (file upload)
- **pdf-parse**, **mammoth** (text extraction)

## 🚀 Quick Start

### 1️⃣ Backend Setup

```bash
cd backend
npm install

# Crea file .env
echo "GROQ_API_KEY=gsk_your_key_here" > .env

npm run dev
```

✅ Backend su `http://localhost:5000`

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend su `http://localhost:3000`

### 3️⃣ Ottieni Groq API Key (Gratis!)

1. Vai su [console.groq.com](https://console.groq.com)
2. Registrati (GitHub/Google)
3. Crea API Key
4. Copia nel file `backend/.env`

📚 **Setup dettagliato**: Vedi `SETUP.md`

## 📸 Preview

```
┌─────────────────────────────────────────────┐
│  🤖 AI Summarizer    [●] Online            │
├─────────────────────────────────────────────┤
│                                             │
│   Riassunti Intelligenti in Secondi        │
│                                             │
│  ┌──────────────┐  ┌──────────────┐        │
│  │  📄 Testo   │  │  📎 File     │        │
│  └──────────────┘  └──────────────┘        │
│                                             │
│  [Textarea o Dropzone]                     │
│                                             │
│  Template:                                  │
│  [⚡Brief] [📋Detail] [📝Bullet]          │
│  [🎓Academic] [💼Business] [✨Creative]    │
│                                             │
│  [✨ Genera Riassunto]                     │
│                                             │
│  📊 Statistiche: 42 riassunti              │
└─────────────────────────────────────────────┘
```

## 📡 API Endpoints

| Endpoint | Method | Descrizione |
|----------|--------|-------------|
| `/health` | GET | Health check server |
| `/api/templates` | GET | Lista 6 template |
| `/api/summarize` | POST | Riassumi testo |
| `/api/summarize-file` | POST | Riassumi file |

## 🎯 Utilizzo

1. **Scegli input**: Incolla testo o carica file (PDF/DOC/TXT)
2. **Seleziona template**: Scegli tra 6 stili specializzati
3. **Genera**: Click su "Genera Riassunto"
4. **Export**: Copia o esporta in PDF

## 📁 Struttura Progetto

```
AI-Summarizer-v2/
├── backend/
│   ├── server.js              # Express server
│   ├── routes/
│   │   └── summarize.js      # API routes
│   ├── services/
│   │   └── groqService.js    # Groq integration
│   ├── utils/
│   │   └── fileProcessor.js  # File parsing
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── page.js           # Main page
│   │   ├── layout.js         # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── TextInput.js      # Text input
│   │   ├── FileUpload.js     # File upload
│   │   ├── TemplateSelector.js
│   │   ├── OutputDisplay.js
│   │   └── StatsBar.js
│   └── package.json
│
├── README.md
├── SETUP.md                   # Setup dettagliato
└── START.md                   # Quick start
```

## 🔧 Configurazione

### Backend (.env)
```env
GROQ_API_KEY=gsk_your_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

**Backend non parte?**
- Verifica che il file `.env` esista in `backend/`
- Controlla che `GROQ_API_KEY` sia valida

**Frontend non comunica con backend?**
- Assicurati che il backend sia su porta 5000
- Controlla CORS nel browser console

**File upload non funziona?**
- Massimo 10MB per file
- Solo PDF, DOC, DOCX, TXT supportati

📖 Vedi `SETUP.md` per troubleshooting completo

## 🚀 Build Production

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm start
```

## 📝 Note

- ✅ **Gratuito**: Groq offre free tier generoso
- ✅ **Privato**: File eliminati dopo elaborazione
- ✅ **Veloce**: Groq è uno degli LLM più veloci
- ✅ **Open**: Codice modificabile e estendibile

## 🤝 Contributing

Contributi benvenuti! Per nuove feature:

1. Fork il progetto
2. Crea un branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

MIT License - Vedi `LICENSE` per dettagli

## 👨‍💻 Autore

Creato con ❤️ usando:
- [Groq AI](https://groq.com) - LLM velocissimo
- [Next.js](https://nextjs.org) - React framework
- [TailwindCSS](https://tailwindcss.com) - Utility CSS

---

⭐ Se ti piace questo progetto, lascia una stella su GitHub!

