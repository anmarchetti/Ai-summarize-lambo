# Guida all'Integrazione del Text Summarizer in Drupal

## Installazione

### 1. Build del Componente
```bash
npm run build
```

Questo genererà i file nella cartella `dist/`:
- `text-summarizer.js` - Il componente JavaScript
- `text-summarizer-pure.js` - Versione configurabile
- `text-summarizer-standalone.js` - Versione standalone

### 2. Caricamento dei File in Drupal

1. Carica il file `text-summarizer.js` nella cartella `/sites/default/files/js/` del tuo sito Drupal
2. Assicurati che React e ReactDOM siano disponibili sul sito

### 3. Inclusione delle Dipendenze

Aggiungi questi script nell'header del tuo tema o tramite un modulo:

```html
<!-- React e ReactDOM (se non già presenti) -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Il nostro componente -->
<script src="/sites/default/files/js/text-summarizer.js"></script>
```

### 4. Utilizzo del Componente

#### Metodo 1: Auto-inizializzazione
Aggiungi semplicemente un div con ID `text-summarizer-root` nella tua pagina:

```html
<div id="text-summarizer-root"></div>
```

Il componente si inizializzerà automaticamente e estrarrà il testo dalla pagina.

#### Metodo 2: Inizializzazione Manuale
```javascript
// Inizializza il componente con opzioni personalizzate
TextSummarizer.init('my-container-id', {
  sourceText: 'Il tuo testo da riassumere...'
});
```

### 5. Integrazione in un Modulo Drupal

Crea un modulo personalizzato per una migliore integrazione:

#### text_summarizer.info.yml
```yaml
name: Text Summarizer
type: module
description: 'Integra il componente Text Summarizer'
core_version_requirement: ^9 || ^10
```

#### text_summarizer.module
```php
<?php

/**
 * Implements hook_page_attachments().
 */
function text_summarizer_page_attachments(array &$attachments) {
  // Aggiungi le librerie necessarie
  $attachments['#attached']['library'][] = 'text_summarizer/text_summarizer';
}

/**
 * Implements hook_library_info_build().
 */
function text_summarizer_library_info_build() {
  $libraries = [];
  
  $libraries['text_summarizer'] = [
    'js' => [
      'https://unpkg.com/react@18/umd/react.production.min.js' => [
        'type' => 'external',
        'minified' => TRUE,
      ],
      'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js' => [
        'type' => 'external',
        'minified' => TRUE,
      ],
      '/sites/default/files/js/text-summarizer.js' => [],
    ],
  ];
  
  return $libraries;
}
```

### 6. Utilizzo in un Block o Field

#### Crea un Block personalizzato:
```php
<?php

namespace Drupal\text_summarizer\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Text Summarizer' Block.
 *
 * @Block(
 *   id = "text_summarizer_block",
 *   admin_label = @Translation("Text Summarizer"),
 * )
 */
class TextSummarizerBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#markup' => '<div id="text-summarizer-root"></div>',
      '#attached' => [
        'library' => ['text_summarizer/text_summarizer'],
      ],
    ];
  }
}
```

## Personalizzazione

### Estrazione del Testo Personalizzata

Se vuoi controllare quale testo viene riassunto, puoi passarlo esplicitamente:

```javascript
// Estrai testo da selettori specifici
const articleText = document.querySelector('.field--name-body').textContent;

TextSummarizer.init('text-summarizer-root', {
  sourceText: articleText
});
```

### Styling Personalizzato

Il componente include CSS integrato, ma puoi sovrascrivere gli stili:

```css
.text-summarizer {
  /* I tuoi stili personalizzati */
}
```

## API per Riassunti Reali

Il componente attualmente usa riassunti di esempio. Per integrare un servizio reale:

1. Modifica la funzione `generateSummary` in `TextSummarizer.jsx`
2. Sostituisci la logica simulata con chiamate API reali
3. Ricompila con `npm run build`

Esempio di integrazione API:

```javascript
const generateSummary = async () => {
  setIsLoading(true);
  
  try {
    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: sourceText,
        length: length,
        audience: audience
      })
    });
    
    const data = await response.json();
    setSummary(data.summary);
  } catch (error) {
    console.error('Errore:', error);
    setSummary('Errore nella generazione del riassunto');
  }
  
  setIsLoading(false);
};
```

## Risoluzione Problemi

### Il componente non si carica
- Verifica che React e ReactDOM siano caricati prima del nostro script
- Controlla la console del browser per errori JavaScript
- Assicurati che l'ID del container sia corretto

### Problemi di styling
- Verifica che il CSS sia incluso nel build
- Controlla conflitti con il CSS del tema Drupal

### Problemi con il PDF
- Assicurati che le librerie jsPDF e html2canvas siano incluse nel build
- Verifica i permessi del browser per il download di file