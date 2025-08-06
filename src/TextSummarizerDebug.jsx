import { useState } from 'react';

const TextSummarizer = ({ sourceText = "" }) => {
  const [summary, setSummary] = useState('');

  const generateSummary = () => {
    setSummary("Questo è un riassunto di test generato dal componente.");
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>Text Summarizer Debug</h2>
      
      <p>Testo sorgente: {sourceText.substring(0, 100)}...</p>
      
      <button 
        onClick={generateSummary}
        style={{
          background: '#007cba',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Genera Riassunto
      </button>
      
      {summary && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f0f0f0',
          borderRadius: '4px'
        }}>
          <strong>Riassunto:</strong> {summary}
        </div>
      )}
    </div>
  );
};

export default TextSummarizer;