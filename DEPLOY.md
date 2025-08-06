# Deployment su Vercel

## Setup Rapido

### 1. Installa Vercel CLI
```bash
npm i -g vercel
```

### 2. Login
```bash
vercel login
```

### 3. Deploy
```bash
vercel --prod
```

## Configurazione

Il progetto è già configurato con:
- ✅ `vercel.json` - Configurazione routing
- ✅ `package.json` - Script di build
- ✅ Homepage ottimizzata per demo

## Struttura Deploy

```
/                    → Homepage con demo live
/demo                → Demo per integrazione
/integration         → Esempio Drupal
/text-summarizer.js  → Script per integrazione
/text-summarizer-standalone.js → Script standalone
```

## Alternative di Deploy

### Deploy automatico da GitHub
1. Pusha il codice su GitHub
2. Vai su [vercel.com](https://vercel.com)
3. Importa il repository
4. Deploy automatico ✅

### Deploy manuale
```bash
# Dalla directory del progetto
vercel --prod
```

## Comandi Utili

```bash
# Build locale
npm run build

# Preview locale
npx serve dist

# Deploy preview
vercel

# Deploy produzione
vercel --prod

# Vedi deployments
vercel list
```

## URL Demo

Dopo il deploy avrai:
- **Homepage**: `https://your-app.vercel.app`
- **Demo Integrazione**: `https://your-app.vercel.app/demo`
- **Esempio Drupal**: `https://your-app.vercel.app/integration`

## Personalizzazione

Per personalizzare:
1. Modifica `public/index-vercel.html` per la homepage
2. Aggiorna il link GitHub nel footer
3. Ricompila con `npm run build`
4. Redeploy con `vercel --prod`