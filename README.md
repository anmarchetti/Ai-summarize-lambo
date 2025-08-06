# Text Summarizer Component

Un componente React standalone per la generazione di riassunti di testo personalizzabili, progettato per l'integrazione in siti Drupal.

## Funzionalità

- **Controlli intuitivi**: Barre per selezionare lunghezza (corta, media, lunga) e tipo di audience (giornalista, social media)
- **Interfaccia responsive**: Design moderno e adattabile a tutti i dispositivi
- **Azioni integrate**: Copia negli appunti, download TXT e rigenerazione del riassunto
- **Auto-estrazione**: Estrae automaticamente il testo dalla pagina corrente
- **Integrazione semplice**: Script standalone facilmente integrabile in qualsiasi sito

## Struttura del Progetto

```
text-summarizer-component/
├── src/
│   ├── TextSummarizer.jsx      # Componente principale
│   ├── TextSummarizerPure.jsx  # Componente configurabile
│   └── index.js                # Punto di ingresso e logica di integrazione
├── dist/                       # File compilati (generati con npm run build)
│   ├── text-summarizer.js          # Script per integrazione (richiede React esterno)
│   ├── text-summarizer-standalone.js # Script standalone (include React)
│   ├── text-summarizer-pure.js     # Script configurabile (richiede React esterno)
│   └── example-configurable.html   # Demo configurabile (homepage)
├── webpack.config.js           # Configurazione Webpack
├── package.json               # Dipendenze e script
└── integration-guide.md       # Guida dettagliata per l'integrazione in Drupal
```

## Quick Start

### 1. Installazione delle dipendenze
```bash
npm install
```

### 2. Sviluppo
```bash
npm run dev    # Modalità sviluppo con watch
npm run serve  # Server di sviluppo su http://localhost:3000
```

### 3. Build per produzione
```bash
npm run build              # Build per integrazione (richiede React esterno)
npm run build:standalone   # Build standalone (include React nel bundle)
npm run build:all          # Entrambe le versioni
```

### 4. Test della demo
- `example-configurable.html` - Demo configurabile (homepage, richiede React CDN)

## Due Versioni Disponibili

### Versione per Integrazione (`text-summarizer.js`)
- **Dimensione**: ~185KB
- **Dipendenze**: Richiede React e ReactDOM esterni
- **Uso**: Ideale quando il sito ha già React caricato
- **Vantaggi**: File più piccolo se React è condiviso con altri componenti

### Versione Standalone (`text-summarizer-standalone.js`) 
- **Dimensione**: ~195KB  
- **Dipendenze**: Include tutto nel bundle
- **Uso**: Perfetta per siti senza React o per test rapidi
- **Vantaggi**: Funziona immediatamente senza configurazioni

## Integrazione in Drupal

### Metodo Rapido (Versione Standalone)

1. Carica `dist/text-summarizer-standalone.js` nel tuo sito Drupal
2. Aggiungi un div con ID `text-summarizer-root`

```html
<!-- Componente standalone (non servono altre dipendenze) -->
<script src="/path/to/text-summarizer-standalone.js"></script>

<!-- Container -->
<div id="text-summarizer-root"></div>
```

### Metodo con Dipendenze Esterne (Versione Integrazione)

```html
<!-- Dipendenze React -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Componente -->
<script src="/path/to/text-summarizer.js"></script>

<!-- Container -->
<div id="text-summarizer-root"></div>
```

### Integrazione Avanzata

Per una guida dettagliata sull'integrazione in Drupal, inclusi moduli personalizzati e configurazioni avanzate, consulta `integration-guide.md`.

## API del Componente

### Inizializzazione Automatica
Il componente si inizializza automaticamente se trova un elemento con ID `text-summarizer-root`.

### Inizializzazione Manuale
```javascript
TextSummarizer.init('container-id', {
  sourceText: 'Testo da riassumere...'  // Opzionale
});
```

### Opzioni
- `sourceText`: Testo specifico da riassumere (se non fornito, estrae dalla pagina)

## Personalizzazione

### Stili
Il componente include CSS integrato ma può essere personalizzato sovrascrivendo le classi:

```css
.text-summarizer {
  /* Personalizzazioni */
}
```

### API per Riassunti
Il componente usa attualmente riassunti di esempio. Per integrare un servizio reale:

1. Modifica la funzione `generateSummary` in `src/TextSummarizer.jsx`
2. Sostituisci con chiamate API reali
3. Ricompila con `npm run build`

## Esempi di Riassunti

Il componente genera riassunti diversi basati sui parametri selezionati:

- **Lunghezza**: Corta (~50 parole), Media (~150 parole), Lunga (~300 parole)
- **Audience**: Giornalista (tono professionale), Social Media (tono coinvolgente)

## Browser Supportati

- Chrome (ultime 2 versioni)
- Firefox (ultime 2 versioni)  
- Safari (ultime 2 versioni)
- Edge (ultime 2 versioni)

## Dipendenze

### Runtime
- React 18
- ReactDOM 18

### Build
- Webpack 5
- Babel

## Contributi

1. Fork del repository
2. Crea un branch per la feature (`git checkout -b feature/nuova-funzionalita`)
3. Commit delle modifiche (`git commit -am 'Aggiunge nuova funzionalità'`)
4. Push del branch (`git push origin feature/nuova-funzionalita`)
5. Apri una Pull Request

## Licenza

ISC License

## Support

Per problemi di integrazione o domande, consulta:
- `integration-guide.md` per la guida completa
- `example-configurable.html` per un esempio funzionante
- La console del browser per eventuali errori JavaScript