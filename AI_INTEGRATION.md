# Integrazione Gemini per Text Summarizer

Questo componente utilizza Google Gemini per la generazione automatica di riassunti intelligenti e contestualizzati.

## Servizio Supportato

### Google Gemini
- Modelli: `gemini-1.5-flash` (predefinito)
- Endpoint REST: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`
- Parametri usati: `maxOutputTokens` e `temperature` in base a lunghezza/audience

## Configurazione

### Impostare la API Key

Opzioni supportate per fornire la chiave:

1. Variabile d'ambiente build-time (sviluppo/build):
```env
REACT_APP_GEMINI_API_KEY=la-tua-chiave
```

2. Variabile globale runtime (prima di caricare lo script):
```html
<script>window.GEMINI_API_KEY = 'la-tua-chiave';</script>
```

3. Valore di default nel codice (solo per test locali).

### Modalità Demo

Se non imposti nessuna chiave, il componente funziona in modalità demo con riassunti predefiniti.

## Come Funziona

Il componente:

1. Costruisce prompt ottimizzati in base a lunghezza e audience
2. Regola `maxOutputTokens` e `temperature`
3. Gestisce errori e fallback alla modalità demo

### Esempio di Prompt

```
Riassumi il seguente testo in circa 150 parole. Usa un tono professionale e formale, adatto per un articolo giornalistico. Mantieni obiettività e precisione.

Testo da riassumere:
[Il tuo testo qui...]

Riassunto:
```

## Sicurezza

⚠️ Le API key non dovrebbero essere esposte nel frontend in produzione.

Soluzioni consigliate:
- Backend proxy
- Serverless functions (Vercel/Netlify)
- Variabili d'ambiente solo in sviluppo

## Testing

```bash
# Modalità demo (gratuita)
npm start

# Con Gemini
REACT_APP_GEMINI_API_KEY=la-tua-chiave npm start
```

## Modalità di Funzionamento

- Senza API Key: modalità demo
- Con API Key: riassunti generati da Gemini in tempo reale