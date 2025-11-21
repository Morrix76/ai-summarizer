# ✅ Connessione Frontend-Backend Configurata

## 🎯 Cosa è Stato Fatto

### 1. ✅ Creato `frontend/utils/api.js`

File utility con 4 funzioni principali:

```javascript
- summarizeText(text, template)     // Riassumi testo
- uploadFile(file, template)        // Upload e riassumi file
- getTemplates()                    // Ottieni lista template
- checkHealth()                     // Verifica stato backend
```

### 2. ✅ Aggiornato `frontend/app/page.js`

- Importa le funzioni da `@/utils/api`
- Usa `summarizeText()` per tab Testo
- Usa `uploadFile()` per tab File
- Gestisce loading states
- Mostra errori con messaggi chiari
- Aggiorna statistiche localStorage automaticamente

### 3. ✅ Porta Backend Aggiornata

- Backend ora usa porta **3001** (default)
- Frontend punta a `http://localhost:3001/api`
- Tutti i file di configurazione aggiornati

---

## 🚀 Come Testare

### Step 1: Avvia Backend

**Terminal 1:**
```bash
cd backend

# IMPORTANTE: Crea file .env prima!
# Usa Notepad o editor per creare backend/.env con:
# GROQ_API_KEY=gsk_your_key_here
# PORT=3001

npm run dev
```

Dovresti vedere:
```
🚀 Server running on http://localhost:3001
📝 Environment: development
🔑 Groq API Key: ✓ Configured
```

### Step 2: Testa Backend

Apri browser su: `http://localhost:3001/health`

Dovresti vedere:
```json
{
  "status": "OK",
  "message": "AI Summarizer API is running",
  "timestamp": "2024-..."
}
```

### Step 3: Avvia Frontend

**Terminal 2:**
```bash
cd frontend
npm run dev
```

Vai su: `http://localhost:3000`

### Step 4: Testa Riassunto Testo

1. Nel tab "📄 Testo"
2. Incolla questo testo:

```
L'intelligenza artificiale sta rivoluzionando il mondo. 
Le aziende utilizzano l'IA per automatizzare processi, 
migliorare decisioni strategiche e creare esperienze 
personalizzate. È fondamentale sviluppare l'IA in modo 
responsabile ed etico.
```

3. Seleziona template "⚡ Breve"
4. Clicca "✨ Genera Riassunto"
5. **Attendi 2-3 secondi** (Groq elabora)
6. Dovresti vedere il riassunto!

### Step 5: Testa Upload File

1. Nel tab "📎 File"
2. Crea un file `test.txt` con del testo
3. Trascina il file nella dropzone
4. Seleziona un template
5. Clicca "✨ Genera Riassunto"
6. Dovresti vedere il riassunto!

---

## 🔍 Verifica Statistiche

Dopo ogni riassunto:

1. Guarda la sidebar destra "📊 Le Tue Statistiche"
2. Dovrebbe aumentare:
   - Numero riassunti
   - Parole processate
   - Caratteri totali

Le statistiche sono salvate in **localStorage** del browser.

---

## 🐛 Troubleshooting

### ❌ Backend non parte

**Errore:** `GROQ_API_KEY is not configured`

**Soluzione:**
1. Vai su [console.groq.com](https://console.groq.com)
2. Registrati (gratis)
3. Crea API Key
4. Crea file `backend/.env`:
```env
GROQ_API_KEY=gsk_your_actual_key_here
PORT=3001
```

### ❌ Frontend non si connette

**Errore:** `Failed to fetch` o `Could not connect`

**Soluzione:**
1. Verifica che backend sia avviato: `http://localhost:3001/health`
2. Controlla console browser (F12) per errori CORS
3. Verifica che la porta sia 3001 in entrambi

### ❌ "Errore durante la connessione al server"

**Causa:** Backend non risponde

**Soluzione:**
1. Controlla che backend sia running nel terminal
2. Verifica che Groq API key sia valida
3. Controlla i log del backend per errori

---

## 📋 Checklist Funzionalità

- ✅ Tab "Testo" con textarea
- ✅ Tab "File" con dropzone
- ✅ 6 template selezionabili
- ✅ Button "Genera Riassunto"
- ✅ Loading spinner durante elaborazione
- ✅ Output display con riassunto
- ✅ Copy to clipboard
- ✅ Export PDF
- ✅ Statistiche localStorage
- ✅ Gestione errori completa
- ✅ Messaggi di errore chiari

---

## 🎨 Flusso Completo

```
User Input (Testo/File)
    ↓
Seleziona Template (6 opzioni)
    ↓
Click "Genera Riassunto"
    ↓
Loading state (spinner)
    ↓
API Call → Backend (port 3001)
    ↓
Groq API Processing
    ↓
Response → Frontend
    ↓
Display Summary
    ↓
Update localStorage Stats
    ↓
User can Copy/Export PDF
```

---

## 📝 Endpoints Utilizzati

| Funzione | Endpoint | Method | Body |
|----------|----------|--------|------|
| `summarizeText()` | `/api/summarize` | POST | `{text, template}` |
| `uploadFile()` | `/api/summarize-file` | POST | FormData (file, template) |
| `getTemplates()` | `/api/templates` | GET | - |
| `checkHealth()` | `/health` | GET | - |

---

## 🔧 File Modificati

### Backend
- ✅ `server.js` - Porta 3001
- ✅ `README.md` - Documentazione aggiornata
- ✅ `SETUP.md` - Porta aggiornata
- ✅ `test-api.http` - Endpoint aggiornati

### Frontend
- ✅ `utils/api.js` - **NUOVO** - Funzioni API
- ✅ `app/page.js` - Usa funzioni API
- ✅ `.env.example` - Porta 3001

---

## ✨ Pronto!

L'app è completamente connessa e funzionante!

**Ricorda:**
1. Backend su porta **3001**
2. Frontend su porta **3000**
3. Groq API key **obbligatoria** in `backend/.env`

🎉 **Buon riassunto!**

