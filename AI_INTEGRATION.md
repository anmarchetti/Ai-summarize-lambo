# Integrazione OpenAI per Text Summarizer

Questo componente utilizza OpenAI GPT per la generazione automatica di riassunti intelligenti e contestualizzati.

## Servizio Supportato

### OpenAI GPT
- **Modello**: GPT-3.5-turbo (configurabile)
- **Costo**: ~$0.002 per 1K token
- **Qualità**: Eccellente per riassunti
- **Velocità**: Veloce (2-5 secondi)

## Configurazione

### Configurazione API Key

Crea un file `.env` nella root del progetto:

```env
# OpenAI API Key (obbligatoria per usare l'AI)
REACT_APP_OPENAI_API_KEY=sk-your-openai-key-here
```

**Come ottenere l'API Key:**
1. Vai su [platform.openai.com](https://platform.openai.com)
2. Crea un account o effettua il login
3. Vai su "API Keys" nel menu
4. Clicca "Create new secret key"
5. Copia la chiave nel file `.env`

### Modalità Demo

Se non configuri nessun servizio, il componente funziona in modalità demo con riassunti predefiniti.

## Come Funziona

Il componente automaticamente:

1. **Costruisce prompt ottimizzati** basati sui parametri selezionati
2. **Regola max_tokens** in base alla lunghezza richiesta
3. **Imposta temperature** diversa per il tipo di audience
4. **Gestisce errori** e fallback alla modalità demo

### Esempio di Prompt Generato

```
Riassumi il seguente testo in circa 150 parole. Usa un tono professionale e formale, adatto per un articolo giornalistico. Mantieni obiettività e precisione.

Testo da riassumere:
[Il tuo testo qui...]

Riassunto:
```

## Parametri Ottimizzati

### Lunghezza
- **Corta**: ~50 parole (max_tokens: 80)
- **Media**: ~150 parole (max_tokens: 200)  
- **Lunga**: ~300 parole (max_tokens: 400)

### Audience
- **Giornalista**: Temperature 0.3 (più deterministico)
- **Social**: Temperature 0.8 (più creativo)

## Gestione Errori

Il componente gestisce automaticamente:
- Errori di rete
- Rate limiting
- API key non valide
- Timeout delle richieste

## Sicurezza

⚠️ **IMPORTANTE**: Le API key non devono mai essere esposte nel codice frontend in produzione.

### Soluzioni Consigliate:

1. **Backend Proxy**: Crea un endpoint nel tuo backend che chiama l'AI
2. **Serverless Functions**: Usa Vercel Functions o Netlify Functions
3. **Environment Variables**: Solo per sviluppo locale

## Costi Stimati

Per 1000 riassunti al mese con GPT-3.5-turbo:
- **Testo breve** (~500 parole): ~$1-2
- **Testo medio** (~1000 parole): ~$3-5  
- **Testo lungo** (~2000 parole): ~$6-10

## Testing

```bash
# Modalità demo (gratuita) - senza API key
npm start

# Con OpenAI - con API key configurata
REACT_APP_OPENAI_API_KEY=sk-your-key npm start
```

## Modalità di Funzionamento

- **Senza API Key**: Modalità demo con riassunti predefiniti
- **Con API Key**: Riassunti generati da OpenAI GPT in tempo reale