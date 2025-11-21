# ⚙️ Setup Configurazione Backend

## 📝 Step 1: Crea il file .env

Nella cartella `backend/`, crea un file chiamato `.env` con il seguente contenuto:

```env
GROQ_API_KEY=gsk_your_key_here
PORT=3001
NODE_ENV=development
```

## 🔑 Step 2: Ottieni la tua Groq API Key

1. Vai su [https://console.groq.com](https://console.groq.com)
2. Registrati o accedi con il tuo account
3. Naviga nella sezione "API Keys"
4. Clicca su "Create API Key"
5. Copia la chiave generata (inizia con `gsk_`)
6. Sostituisci `gsk_your_key_here` nel file `.env` con la tua chiave

## ✅ Step 3: Verifica l'installazione

Le dipendenze sono già state installate. Puoi avviare il server con:

```bash
npm run dev
```

Il server sarà disponibile su `http://localhost:3001`

## 🧪 Step 4: Testa il server

Apri il browser e vai su:
```
http://localhost:3001/health
```

Dovresti vedere una risposta JSON:
```json
{
  "status": "OK",
  "message": "AI Summarizer API is running",
  "timestamp": "..."
}
```

## 📡 Step 5: Testa i template

```
http://localhost:3001/api/templates
```

Dovresti vedere la lista dei 6 template disponibili.

## 🎯 Pronto!

Il backend è configurato e pronto per essere utilizzato dal frontend.

