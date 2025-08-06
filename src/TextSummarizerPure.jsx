import { useState, useRef } from 'react';

const TextSummarizer = ({ sourceText = "" }) => {
  const [length, setLength] = useState('medio');
  const [audience, setAudience] = useState('giornalista');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const lengthOptions = [
    { value: 'corta', label: 'Corta', description: '~50 parole' },
    { value: 'medio', label: 'Media', description: '~150 parole' },
    { value: 'lungo', label: 'Lunga', description: '~300 parole' }
  ];

  const audienceOptions = [
    { value: 'giornalista', label: 'Giornalista', description: 'Tono professionale' },
    { value: 'social', label: 'Social Media', description: 'Tono coinvolgente' }
  ];

  // Funzione per generare il riassunto
  const generateSummary = async () => {
    setIsLoading(true);
    
    // Simula una chiamata API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Riassunti di esempio basati sui parametri
    const summaries = {
      'corta-giornalista': 'L\'intelligenza artificiale sta trasformando settori chiave come sanità, automotive e finanza. Nonostante i benefici evidenti nella diagnostica medica e nella sicurezza stradale, emergono preoccupazioni significative riguardo l\'impatto occupazionale e le questioni etiche. Il futuro richiede uno sviluppo responsabile con regolamentazioni appropriate.',
      'corta-social': '🤖 L\'IA sta cambiando tutto! Dalla medicina alle auto autonome, questa tecnologia è incredibile. Ma attenzione: potrebbe eliminare molti lavori. Dobbiamo usarla con saggezza! #AI #Futuro #Tecnologia',
      'medio-giornalista': 'L\'intelligenza artificiale rappresenta una rivoluzione tecnologica senza precedenti, con applicazioni trasversali in medicina, automotive, finanza e ricerca. Nel settore sanitario, gli algoritmi di machine learning superano spesso la precisione diagnostica umana, mentre l\'industria automobilistica sviluppa veicoli autonomi per ridurre incidenti e ottimizzare consumi. Il settore finanziario utilizza l\'IA per rilevare frodi e gestire investimenti automatizzati. Tuttavia, emergono sfide cruciali: l\'automazione potrebbe eliminare numerosi posti di lavoro, richiedendo riqualificazione massiva. Questioni etiche come privacy, trasparenza algoritmica e bias discriminatori necessitano regolamentazioni globali.',
      'medio-social': '🚀 L\'IA sta letteralmente rivoluzionando il nostro mondo! Immaginate: dottori robot che diagnosticano malattie meglio degli umani, auto che si guidano da sole, e algoritmi che proteggono i nostri soldi dalle truffe. Sounds amazing, right? 🤖 Ma c\'è un "però"... Molti lavori potrebbero sparire! E poi ci sono questioni tipo: "Chi controlla questi algoritmi?" e "I nostri dati sono al sicuro?" 🤔 La vera sfida? Usare questa super-tecnologia in modo intelligente, senza dimenticare l\'aspetto umano. Il futuro è nelle nostre mani! 💪',
      'lungo-giornalista': 'L\'intelligenza artificiale costituisce una delle innovazioni più significative dell\'era contemporanea, ridefinendo paradigmi consolidati in molteplici settori economici e sociali. La tecnologia, basata su algoritmi complessi e reti neurali artificiali che emulano processi cognitivi umani, ha dimostrato applicabilità trasversale con risultati straordinari. Nel comparto sanitario, i sistemi di machine learning hanno rivoluzionato la diagnostica per immagini, analizzando radiografie, TAC e risonanze magnetiche con accuratezza spesso superiore ai professionisti medici. L\'industria automobilistica ha abbracciato questa tecnologia per realizzare veicoli autonomi dotati di sensori avanzati e algoritmi di deep learning capaci di navigazione in tempo reale. Il settore finanziario sfrutta l\'IA per rilevamento frodi, trading algoritmico e personalizzazione servizi bancari. Tuttavia, l\'evoluzione tecnologica solleva questioni etiche di primaria importanza: l\'automazione massiva potrebbe determinare obsolescenza occupazionale su larga scala, necessitando riqualificazione professionale estensiva.',
      'lungo-social': '🤯 Guys, l\'intelligenza artificiale è letteralmente la cosa più PAZZESCA che sta succedendo! 🧠✨ \n\nNella MEDICINA: I robot stanno diventando dottori migliori dei dottori veri! 💊🔬 Nelle AUTO: le macchine si guidano da sole! 🚗🤖 Nei SOLDI: algoritmi super-smart che fanno trading 24/7! 💰📈 MA... (e c\'è sempre un ma) 😅 Molti lavori potrebbero sparire. E poi: chi controlla questi algoritmi? I nostri dati sono sicuri? 🤔 La verità? Il futuro dell\'IA dipende da NOI! Dobbiamo essere smart nell\'usarla e assicurarci che aiuti TUTTI! 🌍💪'
    };

    const key = `${length}-${audience}`;
    setSummary(summaries[key] || 'Riassunto non disponibile per questa combinazione di parametri.');
    setIsLoading(false);
  };

  const copySummary = async () => {
    if (!summary) return;
    
    try {
      await navigator.clipboard.writeText(summary);
      alert('Testo copiato negli appunti!');
    } catch (err) {
      console.error('Errore nella copia:', err);
      alert('Errore durante la copia del testo');
    }
  };

  const downloadPDF = () => {
    // Semplificato: crea un file di testo invece di PDF
    const element = document.createElement('a');
    const file = new Blob([summary], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'riassunto.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      {/* CSS per l'animazione */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
      
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
      {/* Controls Section */}
      <div style={{
        padding: '24px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontWeight: '600',
            marginBottom: '12px',
            fontSize: '16px'
          }}>
            Lunghezza del riassunto:
          </label>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {lengthOptions.map(option => (
              <div
                key={option.value}
                style={{
                  flex: '1',
                  minWidth: '120px',
                  padding: '16px',
                  background: length === option.value ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
                  border: length === option.value ? '2px solid #ffffff' : '2px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  ...(length === option.value ? {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    transform: 'translateY(-2px)'
                  } : {})
                }}
                onClick={() => setLength(option.value)}
              >
                <div style={{
                  fontWeight: '600',
                  fontSize: '14px',
                  marginBottom: '4px'
                }}>
                  {option.label}
                </div>
                <div style={{
                  fontSize: '12px',
                  opacity: '0.9'
                }}>
                  {option.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label style={{
            display: 'block',
            fontWeight: '600',
            marginBottom: '12px',
            fontSize: '16px'
          }}>
            Tipo di audience:
          </label>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {audienceOptions.map(option => (
              <div
                key={option.value}
                style={{
                  flex: '1',
                  minWidth: '120px',
                  padding: '16px',
                  background: audience === option.value ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
                  border: audience === option.value ? '2px solid #ffffff' : '2px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  ...(audience === option.value ? {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    transform: 'translateY(-2px)'
                  } : {})
                }}
                onClick={() => setAudience(option.value)}
              >
                <div style={{
                  fontWeight: '600',
                  fontSize: '14px',
                  marginBottom: '4px'
                }}>
                  {option.label}
                </div>
                <div style={{
                  fontSize: '12px',
                  opacity: '0.9'
                }}>
                  {option.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div style={{ padding: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <h3 style={{
            margin: '0',
            color: '#333',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            Riassunto generato
          </h3>
          <button
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              minWidth: '140px',
              opacity: isLoading ? 0.7 : 1
            }}
            onClick={generateSummary}
            disabled={isLoading}
          >
            {isLoading ? 'Generando...' : 'Genera Riassunto'}
          </button>
        </div>

        <div style={{
          minHeight: '200px',
          border: '2px solid #e1e5e9',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          background: '#fafbfc'
        }}>
          {isLoading ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '160px',
              color: '#666'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #e1e5e9',
                borderTop: '4px solid #667eea',
                borderRadius: '50%',
                marginBottom: '16px',
                animation: 'spin 1s linear infinite'
              }} />
              <p>Generazione del riassunto in corso...</p>
            </div>
          ) : summary ? (
            <div style={{
              lineHeight: '1.6',
              color: '#333',
              fontSize: '15px',
              whiteSpace: 'pre-wrap'
            }}>
              {summary}
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '160px',
              color: '#999',
              fontStyle: 'italic',
              textAlign: 'center'
            }}>
              Clicca su "Genera Riassunto" per iniziare
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {summary && !isLoading && (
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <button
              style={{
                background: '#28a745',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                minWidth: '120px'
              }}
              onClick={copySummary}
            >
              📋 Copia
            </button>
            <button
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                minWidth: '120px'
              }}
              onClick={downloadPDF}
            >
              📄 Download TXT
            </button>
            <button
              style={{
                background: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                minWidth: '120px'
              }}
              onClick={generateSummary}
            >
              🔄 Rigenera
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default TextSummarizer;