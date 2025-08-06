const { useState } = require('react');

const TextSummarizer = (props) => {
  const sourceText = props.sourceText || "";
  
  const summaryState = useState('');
  const summary = summaryState[0];
  const setSummary = summaryState[1];

  const generateSummary = () => {
    setSummary("Questo è un riassunto di test generato dal componente vanilla.");
  };

  return React.createElement('div', {
    style: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif'
    }
  }, [
    React.createElement('h2', { key: 'title' }, 'Text Summarizer Vanilla'),
    React.createElement('p', { key: 'source' }, 'Testo sorgente: ' + sourceText.substring(0, 100) + '...'),
    React.createElement('button', {
      key: 'button',
      onClick: generateSummary,
      style: {
        background: '#007cba',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer'
      }
    }, 'Genera Riassunto'),
    summary ? React.createElement('div', {
      key: 'result',
      style: {
        marginTop: '20px',
        padding: '15px',
        background: '#f0f0f0',
        borderRadius: '4px'
      }
    }, [
      React.createElement('strong', { key: 'label' }, 'Riassunto: '),
      summary
    ]) : null
  ]);
};

module.exports = TextSummarizer;