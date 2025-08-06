const React = require('react');
const { createRoot } = require('react-dom/client');
const TextSummarizer = require('./TextSummarizer').default;

// Funzione per inizializzare il componente
const initTextSummarizer = (containerId, options = {}) => {
  console.log('Inizializzazione componente per:', containerId);
  
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container con ID "${containerId}" non trovato`);
    return;
  }

  console.log('Container trovato:', container);

  // Estrae il testo dalla pagina se non fornito nelle opzioni
  let sourceText = options.sourceText || '';
  
  if (!sourceText) {
    // Cerca il testo nella pagina (escludendo il container del componente)
    const textElements = document.querySelectorAll('p, article, .content, .text, .article-body, .demo-text');
    const texts = [];
    
    textElements.forEach(element => {
      // Evita di includere il testo dal container del componente stesso
      if (!container.contains(element) && !element.contains(container)) {
        const text = element.textContent.trim();
        if (text.length > 50) { // Solo paragrafi significativi
          texts.push(text);
        }
      }
    });
    
    sourceText = texts.join('\n\n');
  }

  try {
    const root = createRoot(container);
    console.log('Root creato:', root);
    
    root.render(React.createElement(TextSummarizer, { sourceText, ...options }));
    console.log('Componente renderizzato con successo');
  } catch (error) {
    console.error('Errore durante il rendering:', error);
  }
};

// Esporta per uso come modulo
module.exports = { TextSummarizer, initTextSummarizer };

// Rende disponibile globalmente per l'integrazione in Drupal
if (typeof window !== 'undefined') {
  console.log('Registrazione globale TextSummarizer...');
  
  window.TextSummarizer = {
    init: initTextSummarizer,
    Component: TextSummarizer
  };

  // Auto-inizializzazione se trova un container con ID specifico
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM caricato, cerco container...');
    const defaultContainer = document.getElementById('text-summarizer-root');
    if (defaultContainer) {
      console.log('Container trovato, inizializzo...');
      initTextSummarizer('text-summarizer-root');
    } else {
      console.log('Container text-summarizer-root non trovato');
    }
  });
  
  console.log('TextSummarizer registrato globalmente:', window.TextSummarizer);
}