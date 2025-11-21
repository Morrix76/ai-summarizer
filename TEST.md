# 🧪 Test Completo AI Summarizer

Guida per testare tutte le funzionalità.

---

## ⚙️ Pre-requisiti

### 1. Backend Avviato

```bash
cd backend
npm run dev
```

✅ Vedi: `🚀 Server running on http://localhost:3001`

### 2. Frontend Avviato

```bash
cd frontend
npm run dev
```

✅ Vedi: `Ready on http://localhost:3000`

### 3. Groq API Key Configurata

File `backend/.env` deve contenere:
```env
GROQ_API_KEY=gsk_your_actual_key_here
PORT=3001
```

---

## 🧪 Test 1: Health Check Backend

**URL:** `http://localhost:3001/health`

**Expected Response:**
```json
{
  "status": "OK",
  "message": "AI Summarizer API is running",
  "timestamp": "2024-..."
}
```

✅ **PASS** se vedi JSON con status OK

---

## 🧪 Test 2: Get Templates

**URL:** `http://localhost:3001/api/templates`

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {"id": "brief", "name": "Breve", ...},
    {"id": "detailed", "name": "Dettagliato", ...},
    ... (6 templates total)
  ]
}
```

✅ **PASS** se vedi array con 6 template

---

## 🧪 Test 3: Riassunto Testo (Frontend)

1. Apri `http://localhost:3000`
2. Tab "📄 Testo" (dovrebbe essere già selezionato)
3. Incolla questo testo:

```
L'intelligenza artificiale sta rivoluzionando il mondo moderno in modi che 
non avremmo mai immaginato. Le aziende di tutti i settori stanno adottando 
soluzioni AI per migliorare l'efficienza operativa, ridurre i costi e offrire 
esperienze personalizzate ai loro clienti. Nel settore sanitario, l'IA aiuta 
i medici a diagnosticare malattie con maggiore precisione e rapidità. 
Nell'istruzione, permette di personalizzare l'apprendimento per ogni studente. 
Tuttavia, insieme a questi benefici, sorgono importanti questioni etiche 
riguardo alla privacy dei dati, alla trasparenza degli algoritmi e all'impatto 
sul mercato del lavoro. È fondamentale che lo sviluppo dell'IA proceda in modo 
responsabile, con regolamentazioni adeguate e un dialogo costante tra 
tecnologi, legislatori e società civile.
```

4. Seleziona template "⚡ Breve"
5. Click "✨ Genera Riassunto"

**Expected Behavior:**
- ⏳ Button mostra "Generazione in corso..." con spinner
- ⏱️ Attendi 2-5 secondi
- ✅ Appare sezione "Riassunto Generato"
- ✅ Testo riassunto (circa 3-4 frasi)
- ✅ Metadata: parole, caratteri, template, riduzione%
- ✅ Buttons: "📋 Copia Testo" e "📄 Esporta PDF"

**Expected Stats Update:**
- Sidebar destra "📊 Le Tue Statistiche"
- Riassunti: +1
- Parole: aumentate
- Caratteri: aumentati

✅ **PASS** se tutto appare correttamente

---

## 🧪 Test 4: Test Tutti i Template

Ripeti Test 3 con ogni template:

1. **⚡ Breve** - Riassunto corto (3-4 frasi)
2. **📋 Dettagliato** - Riassunto lungo e approfondito
3. **📝 Punti Chiave** - Elenco puntato (bullet points)
4. **🎓 Accademico** - Stile formale
5. **💼 Business** - Focus su metriche
6. **✨ Creativo** - Stile narrativo

✅ **PASS** se ogni template genera un riassunto diverso

---

## 🧪 Test 5: Copy to Clipboard

1. Genera un riassunto (qualsiasi template)
2. Click "📋 Copia Testo"

**Expected Behavior:**
- ✅ Button cambia a "✓ Copiato!"
- ✅ Dopo 2 secondi torna a "📋 Copia Testo"
- ✅ Testo copiato negli appunti (CTRL+V per verificare)

✅ **PASS** se il testo viene copiato

---

## 🧪 Test 6: Export PDF

1. Genera un riassunto
2. Click "📄 Esporta PDF"

**Expected Behavior:**
- ✅ File PDF scaricato (nome: `riassunto-[timestamp].pdf`)
- ✅ PDF contiene:
  - Titolo "AI Summarizer"
  - Metadata (template, data, lunghezze)
  - Testo del riassunto
  - Footer "Generato con AI Summarizer"

✅ **PASS** se PDF è leggibile e completo

---

## 🧪 Test 7: Upload File TXT

1. Crea file `test.txt` con contenuto:

```
Questo è un test di upload file per AI Summarizer.
Il sistema deve essere in grado di leggere file di testo,
estrarre il contenuto e generare un riassunto appropriato.
L'upload dovrebbe funzionare con drag and drop e con
il click sul pulsante per selezionare il file.
```

2. Tab "📎 File"
3. Trascina `test.txt` nella dropzone (o click per selezionare)

**Expected Behavior:**
- ✅ File appare nella card sotto la dropzone
- ✅ Mostra nome file e dimensione
- ✅ Icona corretta (📄 per TXT)
- ✅ Button ✕ per rimuovere

4. Seleziona template
5. Click "✨ Genera Riassunto"

**Expected Behavior:**
- ⏳ Loading spinner
- ✅ Riassunto generato dal contenuto del file
- ✅ Metadata include "filename: test.txt"

✅ **PASS** se il file viene processato correttamente

---

## 🧪 Test 8: Upload File PDF (opzionale)

Se hai un PDF di test:

1. Tab "📎 File"
2. Upload PDF (< 10MB)
3. Seleziona template
4. Genera riassunto

**Expected Behavior:**
- ✅ Testo estratto dal PDF
- ✅ Riassunto generato

✅ **PASS** se funziona
❓ **SKIP** se non hai PDF di test

---

## 🧪 Test 9: Validazione Input

### Test 9.1: Testo vuoto

1. Tab "Testo"
2. Lascia textarea vuoto
3. Click "Genera Riassunto"

**Expected:**
- ❌ Errore: "Inserisci del testo da riassumere"

✅ **PASS** se mostra errore

### Test 9.2: Nessun file

1. Tab "File"
2. Non caricare nessun file
3. Click "Genera Riassunto"

**Expected:**
- ❌ Errore: "Seleziona un file da caricare"

✅ **PASS** se mostra errore

### Test 9.3: File non supportato

1. Tab "File"
2. Prova a caricare file .jpg o .mp3

**Expected:**
- ❌ Dropzone rifiuta il file

✅ **PASS** se file viene rifiutato

---

## 🧪 Test 10: Statistiche Persistenti

1. Genera 3 riassunti diversi
2. Verifica che stats aumentano
3. **Ricarica la pagina** (F5)

**Expected:**
- ✅ Statistiche mantengono i valori (non si azzerano)
- ✅ Totali corretti

4. Apri DevTools (F12) → Application → Local Storage → `http://localhost:3000`
5. Cerca key: `ai-summarizer-stats`

**Expected:**
```json
{
  "totalSummaries": 3,
  "totalWords": ...,
  "totalCharacters": ...
}
```

✅ **PASS** se stats persistono dopo reload

---

## 🧪 Test 11: Character Counter

1. Tab "Testo"
2. Scrivi/incolla testo
3. Osserva contatore sotto textarea

**Expected:**
- ✅ Mostra: "X / 10,000"
- ✅ Progress bar si riempie
- ✅ Mostra numero parole
- ✅ Quando > 90%: progress bar diventa rossa
- ✅ Max 10,000 caratteri

✅ **PASS** se counter funziona

---

## 🧪 Test 12: Responsiveness

Testa su diverse risoluzioni:

### Mobile (< 640px)
1. Apri DevTools (F12)
2. Toggle device toolbar
3. Seleziona iPhone/Android

**Expected:**
- ✅ Layout si adatta
- ✅ Template cards in colonna singola
- ✅ Tutto leggibile

### Tablet (640px - 1024px)
**Expected:**
- ✅ Template cards in 2 colonne
- ✅ Sidebar stats sotto il contenuto

### Desktop (> 1024px)
**Expected:**
- ✅ Template cards in 3 colonne
- ✅ Sidebar a destra

✅ **PASS** se responsive su tutte le dimensioni

---

## 🧪 Test 13: Error Handling

### Test 13.1: Backend offline

1. **Ferma il backend** (CTRL+C nel terminal)
2. Prova a generare un riassunto

**Expected:**
- ❌ Errore: "Errore durante la connessione al server. Verifica che il backend sia avviato su http://localhost:3001"

✅ **PASS** se mostra errore chiaro

### Test 13.2: API Key invalida

1. Modifica `backend/.env`:
```env
GROQ_API_KEY=invalid_key
```
2. Riavvia backend
3. Genera riassunto

**Expected:**
- ❌ Errore relativo a API key

✅ **PASS** se gestisce l'errore

---

## 🧪 Test 14: Performance

1. Genera riassunto con testo di 5000+ caratteri
2. Misura tempo di risposta

**Expected:**
- ✅ Risposta in < 10 secondi
- ✅ UI non si blocca durante attesa
- ✅ Smooth animations

✅ **PASS** se performante

---

## 📊 Scorecard Finale

| Test | Descrizione | Risultato |
|------|-------------|-----------|
| 1 | Health Check | ⬜ PASS / ❌ FAIL |
| 2 | Get Templates | ⬜ PASS / ❌ FAIL |
| 3 | Riassunto Testo | ⬜ PASS / ❌ FAIL |
| 4 | Tutti i Template | ⬜ PASS / ❌ FAIL |
| 5 | Copy Clipboard | ⬜ PASS / ❌ FAIL |
| 6 | Export PDF | ⬜ PASS / ❌ FAIL |
| 7 | Upload TXT | ⬜ PASS / ❌ FAIL |
| 8 | Upload PDF | ⬜ PASS / ❌ SKIP |
| 9 | Validazione | ⬜ PASS / ❌ FAIL |
| 10 | Stats Persistenti | ⬜ PASS / ❌ FAIL |
| 11 | Character Counter | ⬜ PASS / ❌ FAIL |
| 12 | Responsive | ⬜ PASS / ❌ FAIL |
| 13 | Error Handling | ⬜ PASS / ❌ FAIL |
| 14 | Performance | ⬜ PASS / ❌ FAIL |

---

## ✅ Tutti i Test Passati?

**🎉 Congratulazioni! L'app è completamente funzionante!**

**❌ Qualche test fallito?**
- Controlla `CONNESSIONE.md` per troubleshooting
- Verifica logs backend nel terminal
- Controlla console browser (F12) per errori JavaScript

---

## 🚀 Next Steps

Se tutti i test passano, puoi:

1. 📝 Personalizzare i template in `backend/services/groqService.js`
2. 🎨 Modificare i colori in `frontend/tailwind.config.js`
3. 🚀 Deploy su Vercel (frontend) + Railway (backend)
4. 📊 Aggiungere analytics
5. 🔐 Aggiungere autenticazione (opzionale)

**Buon coding! 🤖✨**

