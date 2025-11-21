# AI Summarizer Backend

Backend API per AI Summarizer utilizzando Node.js, Express e Groq API.

## 🚀 Setup

### 1. Installa le dipendenze

```bash
npm install
```

### 2. Configura le variabili d'ambiente

Crea un file `.env` nella cartella backend:

```env
GROQ_API_KEY=gsk_your_key_here
PORT=3001
NODE_ENV=development
```

**Nota:** Ottieni la tua API key da [console.groq.com](https://console.groq.com)

### 3. Avvia il server

**Modalità sviluppo:**
```bash
npm run dev
```

**Modalità produzione:**
```bash
npm start
```

Il server sarà disponibile su `http://localhost:3001`

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Get Templates
```
GET /api/templates
```
Restituisce la lista dei 6 template disponibili.

### Summarize Text
```
POST /api/summarize
Content-Type: application/json

{
  "text": "Il testo da riassumere...",
  "template": "brief"
}
```

### Summarize File
```
POST /api/summarize-file
Content-Type: multipart/form-data

Fields:
- file: File (PDF, DOC, DOCX, TXT)
- template: Template type
```

## 📝 Template Disponibili

1. **brief** - Riassunto breve e conciso (3-4 frasi)
2. **detailed** - Analisi dettagliata e approfondita
3. **bullet** - Elenco puntato dei punti chiave
4. **academic** - Stile accademico e formale
5. **business** - Focus su metriche e decisioni aziendali
6. **creative** - Riassunto narrativo e coinvolgente

## 🔧 Tecnologie

- **Express.js** - Framework web
- **Groq SDK** - AI/LLM API (llama-3.1-70b-versatile)
- **Multer** - File upload handling
- **pdf-parse** - Estrazione testo da PDF
- **mammoth** - Estrazione testo da DOC/DOCX
- **CORS** - Cross-Origin Resource Sharing

## 📁 Struttura

```
backend/
├── server.js              # Entry point
├── routes/
│   └── summarize.js      # API routes
├── services/
│   └── groqService.js    # Groq API integration
├── utils/
│   └── fileProcessor.js  # File text extraction
├── uploads/              # Temporary file storage
├── package.json
└── .env                  # Environment variables
```

## ⚠️ Note

- Limite dimensione file: 10MB
- Limite lunghezza testo: ~24.000 caratteri (~6.000 parole)
- File supportati: PDF, DOC, DOCX, TXT
- I file caricati vengono eliminati automaticamente dopo l'elaborazione

