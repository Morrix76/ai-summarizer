# 🚀 Setup Completo AI Summarizer

Guida passo-passo per avviare il progetto.

## 📋 Prerequisiti

- Node.js 18+ installato
- Account Groq (gratuito) per API key

---

## 🔧 Step 1: Backend Setup

### 1.1 Installa dipendenze

```bash
cd backend
npm install
```

### 1.2 Configura API Key

Crea un file `.env` nella cartella `backend/`:

```env
GROQ_API_KEY=gsk_your_key_here
PORT=5000
NODE_ENV=development
```

**Come ottenere la Groq API Key:**

1. Vai su [https://console.groq.com](https://console.groq.com)
2. Registrati o accedi
3. Vai in "API Keys"
4. Clicca "Create API Key"
5. Copia la chiave (inizia con `gsk_`)
6. Incollala nel file `.env`

### 1.3 Avvia il backend

```bash
npm run dev
```

Il backend sarà disponibile su `http://localhost:5000`

### 1.4 Testa il backend

Apri il browser e vai su:
- `http://localhost:5000/health` - Dovrebbe mostrare status OK
- `http://localhost:5000/api/templates` - Dovrebbe mostrare i 6 template

---

## 🎨 Step 2: Frontend Setup

### 2.1 Installa dipendenze

In un **nuovo terminale**:

```bash
cd frontend
npm install
```

### 2.2 Configura API URL (Opzionale)

Crea un file `.env.local` nella cartella `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> **Nota**: Se non crei questo file, l'app userà automaticamente `http://localhost:5000/api`

### 2.3 Avvia il frontend

```bash
npm run dev
```

Il frontend sarà disponibile su `http://localhost:3000`

---

## ✅ Step 3: Verifica

Apri il browser su `http://localhost:3000` e dovresti vedere:

- ✅ Interfaccia con gradient blu-viola-rosa
- ✅ Header "AI Summarizer" con stato "Online"
- ✅ Tabs "Testo" e "File"
- ✅ 6 template cards cliccabili
- ✅ Pulsante "Genera Riassunto"

### Test Rapido

1. Clicca sul tab "Testo"
2. Incolla questo testo:

```
L'intelligenza artificiale sta trasformando il mondo. Le aziende utilizzano l'IA per automatizzare processi, migliorare decisioni e creare esperienze personalizzate. Tuttavia, è importante sviluppare l'IA in modo responsabile, considerando l'etica e l'impatto sociale.
```

3. Seleziona template "Breve"
4. Clicca "Genera Riassunto"
5. Dovresti vedere il riassunto in pochi secondi!

---

## 🐛 Troubleshooting

### Backend non si avvia

**Errore**: `GROQ_API_KEY is not configured`
- **Soluzione**: Verifica di aver creato il file `.env` nella cartella `backend/` con la tua API key

**Errore**: `Port 5000 already in use`
- **Soluzione**: Cambia la porta nel file `.env`: `PORT=5001`
- Ricorda di aggiornare anche `NEXT_PUBLIC_API_URL` nel frontend

### Frontend non comunica con backend

**Errore**: `Failed to fetch` o errori di connessione
- **Soluzione 1**: Verifica che il backend sia avviato su `http://localhost:5000`
- **Soluzione 2**: Controlla il file `.env.local` del frontend
- **Soluzione 3**: Disabilita estensioni browser che bloccano CORS

### File upload non funziona

**Errore**: `File type not supported`
- **Soluzione**: Assicurati di caricare solo PDF, DOC, DOCX o TXT

---

## 📂 Struttura Progetto

```
AI-Summarizer-v2/
├── backend/
│   ├── server.js           # Server Express
│   ├── routes/             # API endpoints
│   ├── services/           # Groq integration
│   ├── utils/              # File processing
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── page.js        # Main page
│   │   ├── layout.js      # Layout
│   │   └── globals.css    # Styles
│   ├── components/        # UI components
│   └── package.json
│
└── README.md
```

---

## 🎯 Next Steps

Una volta che tutto funziona:

1. **Personalizza i template** - Modifica i prompts in `backend/services/groqService.js`
2. **Cambia i colori** - Modifica il gradient in `frontend/app/layout.js`
3. **Aggiungi features** - Il codice è ben strutturato per estensioni

---

## 📚 Documentazione

- **Backend API**: Vedi `backend/README.md`
- **Frontend**: Vedi `frontend/README.md`
- **Groq Docs**: [https://console.groq.com/docs](https://console.groq.com/docs)

---

## 🎉 Fatto!

Il tuo AI Summarizer è pronto all'uso!

Se hai domande o problemi, controlla i log del terminale per dettagli sugli errori.

