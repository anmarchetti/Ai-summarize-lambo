import { useState, useRef } from 'react';

// Componente Button minimale e uniforme
const OptionButton = ({ 
  option, 
  isSelected = false, 
  onClick, 
  children,
  isActionButton = false,
  lightBackground = false // nuovo parametro per sfondo chiaro
}) => {
  // Stili per sfondo chiaro (sezione summary)
  const lightStyles = {
    background: isSelected ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.03)',
    border: '1px solid rgba(0,0,0,0.1)',
    color: '#333',
    hoverBackground: 'rgba(0,0,0,0.08)',
    hoverBorderColor: 'rgba(0,0,0,0.15)'
  };

  // Stili per sfondo scuro (sezione controls)
  const darkStyles = {
    background: isSelected ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'white',
    hoverBackground: 'rgba(255,255,255,0.15)',
    hoverBorderColor: 'rgba(255,255,255,0.2)'
  };

  const styles = lightBackground ? lightStyles : darkStyles;

  return (
    <div
      style={{
        flex: '1',
        minWidth: '120px',
        padding: '12px 16px',
        background: styles.background,
        border: styles.border,
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'center',
        color: styles.color
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.background = styles.hoverBackground;
        e.target.style.borderColor = styles.hoverBorderColor;
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.target.style.background = lightBackground ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)';
          e.target.style.borderColor = lightBackground ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
        } else {
          e.target.style.background = lightBackground ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.15)';
          e.target.style.borderColor = lightBackground ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
        }
      }}
    >
      {isActionButton ? (
        // Per bottoni di azione, mostra solo il contenuto
        <div style={{
          fontWeight: '500',
          fontSize: '14px'
        }}>
          {children}
        </div>
      ) : (
        // Per bottoni di opzione, mostra label e description
        <>
          <div style={{
            fontWeight: '500',
            fontSize: '14px',
            marginBottom: '2px'
          }}>
            {option.label}
          </div>
          <div style={{
            fontSize: '11px',
            opacity: '0.7'
          }}>
            {option.description}
          </div>
        </>
      )}
    </div>
  );
};


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

  // Configurazione OpenAI (opzionale)
  const getOpenAIConfig = () => {
    // Verifica se le variabili d'ambiente sono disponibili
    if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_OPENAI_API_KEY) {
      return {
        endpoint: 'https://api.openai.com/v1/chat/completions',
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        model: 'gpt-3.5-turbo'
      };
    }
    return null;
  };

  // Funzione per costruire il prompt basato sui parametri
  const buildPrompt = (text, length, audience) => {
    const lengthInstructions = {
      'corta': 'circa 50 parole',
      'medio': 'circa 150 parole', 
      'lungo': 'circa 300 parole'
    };

    const audienceInstructions = {
      'giornalista': 'Usa un tono professionale e formale, adatto per un articolo giornalistico. Mantieni obiettività e precisione.',
      'social': 'Usa un tono coinvolgente e dinamico, adatto per i social media. Puoi usare emoji e un linguaggio più diretto e accattivante.'
    };

    return `Riassumi il seguente testo in ${lengthInstructions[length]}. ${audienceInstructions[audience]}

Testo da riassumere:
${text}

Riassunto:`;
  };

  // Funzione per chiamare OpenAI
  const callOpenAI = async (text, length, audience, config) => {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'user',
            content: buildPrompt(text, length, audience)
          }
        ],
        max_tokens: length === 'lungo' ? 400 : length === 'medio' ? 200 : 80,
        temperature: audience === 'social' ? 0.8 : 0.3
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  };



  // Funzione principale per generare il riassunto
  const generateSummary = async () => {
    if (!sourceText.trim()) {
      alert('Nessun testo disponibile per il riassunto');
      return;
    }

    setIsLoading(true);
    
    try {
      let summary = '';
      
      // Verifica se OpenAI è disponibile e configurato
      const openAIConfig = getOpenAIConfig();
      
      if (openAIConfig) {
        // Usa OpenAI se configurato
        summary = await callOpenAI(sourceText, length, audience, openAIConfig);
      } else {
        // Modalità demo (predefinita) - simula il caricamento
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const demoSummaries = {
          'corta-giornalista': 'Lamborghini presenta Temerario, supersportiva ibrida con powertrain V8 biturbo da 920 CV. La vettura completa l\'elettrificazione della gamma HPEV, raggiungendo 340 km/h e accelerando 0-100 km/h in 2,7 secondi.',
          'corta-social': '🏎️ Wow! La nuova Lamborghini Temerario è PAZZESCA! 920 CV di potenza ibrida, da 0 a 100 in 2,7 secondi! 🔥 #Lamborghini #Temerario #Supercar',
          'medio-giornalista': 'Automobili Lamborghini presenta Temerario, seconda vettura HPEV dopo Revuelto. La supersportiva ibrida combina V8 biturbo e tre motori elettrici per 920 CV totali. Prestazioni eccezionali: oltre 340 km/h e 0-100 in 2,7s. Il V8 è il primo di serie a 10.000 giri/min.',
          'medio-social': '🚀 BREAKING: Lamborghini Temerario è qui! 🔥\n\n✨ 920 CV ibridi\n⚡ V8 biturbo + 3 motori elettrici\n🏁 0-100 in 2,7s!\n💨 340+ km/h\n\nIl futuro delle supercar! #LamborghiniTemerario',
          'lungo-giornalista': 'La presentazione di Lamborghini Temerario segna un momento storico per Sant\'Agata Bolognese. Seconda vettura HPEV dopo Revuelto, completa l\'elettrificazione del marchio. Il powertrain rivoluzionario abbina V8 biturbo sviluppato in-house a tre unità elettriche per 920 CV. Primo motore di serie a 10.000 giri/min. Prestazioni da riferimento: oltre 340 km/h, 0-100 in 2,7s. Nuovo telaio in alluminio ad alta resistenza migliora rigidezza e aerodinamica.',
          'lungo-social': '🤯 OMG! Lamborghini Temerario è SPAZIALE! 🚀✨\n\n🔥 POTENZA:\n• 920 CV ibridi!\n• V8 biturbo + 3 motori elettrici\n• Primo a 10.000 rpm!\n\n⚡ PRESTAZIONI:\n• 0-100 in 2,7s\n• 340+ km/h\n• Telaio ultra-tech\n\n🌍 STORIA FATTA:\nPrimo marchio luxury 100% elettrificato! 🏆\n\n#Lamborghini #Temerario #HybridBeast'
        };
        
        const key = `${length}-${audience}`;
        summary = demoSummaries[key] || 'Riassunto demo non disponibile per questa combinazione.';
      }

      setSummary(summary);
      
    } catch (error) {
      console.error('Errore nella generazione del riassunto:', error);
      
      // In caso di errore, fallback alla modalità demo
      const demoSummaries = {
        'corta-giornalista': 'Lamborghini presenta Temerario, supersportiva ibrida con powertrain V8 biturbo da 920 CV. (Modalità demo - errore API)',
        'corta-social': '🏎️ La nuova Lamborghini Temerario è PAZZESCA! 920 CV di potenza ibrida! 🔥 (Modalità demo - errore API)',
        'medio-giornalista': 'Automobili Lamborghini presenta Temerario, supersportiva ibrida con V8 biturbo e tre motori elettrici per 920 CV totali. (Modalità demo - errore API)',
        'medio-social': '🚀 Lamborghini Temerario è qui! 920 CV ibridi, 0-100 in 2,7s! Il futuro delle supercar! (Modalità demo - errore API)',
        'lungo-giornalista': 'La presentazione di Lamborghini Temerario segna un momento storico. La supersportiva ibrida abbina V8 biturbo a tre unità elettriche per 920 CV. Prestazioni eccezionali con nuovo telaio in alluminio. (Modalità demo - errore API)',
        'lungo-social': '🤯 Lamborghini Temerario è SPAZIALE! 920 CV ibridi, V8 + 3 motori elettrici, 0-100 in 2,7s! Primo marchio luxury 100% elettrificato! (Modalità demo - errore API)'
      };
      
      const key = `${length}-${audience}`;
      setSummary(demoSummaries[key] || 'Riassunto demo non disponibile.');
      
    } finally {
      setIsLoading(false);
    }
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
              <OptionButton
                key={option.value}
                option={option}
                isSelected={length === option.value}
                onClick={() => setLength(option.value)}
              />
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
              <OptionButton
                key={option.value}
                option={option}
                isSelected={audience === option.value}
                onClick={() => setAudience(option.value)}
              />
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
          <div
            style={{
              background: 'rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '6px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              minWidth: '140px',
              opacity: isLoading ? 0.6 : 1,
              textAlign: 'center',
              transition: 'all 0.2s ease',
              padding: '12px 24px',
              color: '#333'
            }}
            onClick={generateSummary}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.background = 'rgba(0,0,0,0.08)';
                e.target.style.borderColor = 'rgba(0,0,0,0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.background = 'rgba(0,0,0,0.05)';
                e.target.style.borderColor = 'rgba(0,0,0,0.1)';
              }
            }}
          >
            {isLoading ? 'Generando...' : 'Genera Riassunto'}
          </div>
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
            <OptionButton
              onClick={copySummary}
              isActionButton={true}
              lightBackground={true}
            >
              📋 Copia
            </OptionButton>
            <OptionButton
              onClick={downloadPDF}
              isActionButton={true}
              lightBackground={true}
            >
              📄 Download TXT
            </OptionButton>
            <OptionButton
              onClick={generateSummary}
              isActionButton={true}
              lightBackground={true}
            >
              🔄 Rigenera
            </OptionButton>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default TextSummarizer;