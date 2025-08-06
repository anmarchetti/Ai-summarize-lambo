import { useState, useRef } from 'react';

// Componente Button riutilizzabile per le opzioni e azioni
const OptionButton = ({ 
  option, 
  isSelected = false, 
  onClick, 
  children,
  // Props per bottoni di azione
  isActionButton = false,
  backgroundColor = null,
  color = null
}) => {
  // Se è un bottone di azione, usa stili diversi
  const actionStyles = isActionButton ? {
    background: backgroundColor || 'rgba(255,255,255,0.1)',
    border: '2px solid rgba(255,255,255,0.2)',
    color: color || 'white'
  } : {
    background: isSelected ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
    border: isSelected ? '2px solid #ffffff' : '2px solid rgba(255,255,255,0.2)',
    color: 'white'
  };

  return (
    <div
      style={{
        flex: '1',
        minWidth: '120px',
        padding: '16px',
        ...actionStyles,
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        ...(isSelected && !isActionButton ? {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-2px)'
        } : {}),
        // Effetto hover per i bottoni di azione
        ':hover': isActionButton ? {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        } : {}
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (isActionButton) {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (isActionButton && !isSelected) {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }
      }}
    >
      {isActionButton ? (
        // Per bottoni di azione, mostra solo il contenuto
        <div style={{
          fontWeight: '600',
          fontSize: '14px'
        }}>
          {children}
        </div>
      ) : (
        // Per bottoni di opzione, mostra label e description
        <>
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

  // Funzione per generare il riassunto
  const generateSummary = async () => {
    setIsLoading(true);
    
    // Simula una chiamata API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Riassunti di esempio basati sui parametri
    const summaries = {
      'corta-giornalista': 'Lamborghini presenta Temerario, supersportiva ibrida con powertrain V8 biturbo da 920 CV. La vettura completa l\'elettrificazione della gamma HPEV, raggiungendo 340 km/h e accelerando 0-100 km/h in 2,7 secondi. Il V8 è il primo di serie a toccare 10.000 giri/min, mentre il nuovo telaio in alluminio migliora rigidezza e aerodinamica.',
      'corta-social': '🏎️ Wow! La nuova Lamborghini Temerario è PAZZESCA! 920 CV di potenza ibrida, da 0 a 100 in 2,7 secondi! Il motore V8 gira fino a 10.000 rpm - una BESTIA! 🔥 Lamborghini ha completato l\'elettrificazione di tutta la gamma. Il futuro è qui! #Lamborghini #Temerario #Supercar',
      'medio-giornalista': 'Automobili Lamborghini ha presentato Temerario, seconda vettura della gamma High Performance Electrified Vehicle dopo Revuelto, completando l\'elettrificazione del marchio. La supersportiva monta un inedito powertrain ibrido che combina un V8 biturbo sviluppato ex novo con tre motori elettrici, erogando 920 CV complessivi. Il motore termico, primo nella categoria a raggiungere 10.000 giri/min, garantisce prestazioni eccezionali: velocità massima oltre 340 km/h e accelerazione 0-100 km/h in 2,7 secondi. Il CEO Stephan Winkelmann sottolinea come Temerario rappresenti un traguardo tecnico e stilistico, rendendo Lamborghini il primo marchio luxury automotive con gamma completamente elettrificata. Il nuovo telaio in alluminio ultra-leggero migliora rigidezza torsionale e efficienza aerodinamica.',
      'medio-social': '🚀 BREAKING: Lamborghini Temerario è qui e sta spaccando tutto! 🔥\n\n✨ 920 CV di pura potenza ibrida\n⚡ V8 biturbo + 3 motori elettrici\n🏁 0-100 km/h in 2,7 secondi!\n💨 Oltre 340 km/h di velocità massima\n🎯 Primo motore di serie a 10.000 rpm!\n\nLambo ha completato l\'elettrificazione di TUTTA la gamma! Siamo nel futuro delle supercar, guys! 🤖🏎️ Il design? Ovviamente spettacolare! #LamborghiniTemerario #ElectricSupercar #BeastMode',
      'lungo-giornalista': 'La presentazione di Lamborghini Temerario alla Monterey Car Week 2024 segna un momento storico per il costruttore di Sant\'Agata Bolognese, che completa la strategia di elettrificazione delineata nel piano "Direzione Cor Tauri". Temerario, secondo modello della gamma High Performance Electrified Vehicle dopo Revuelto, si posiziona come riferimento tecnologico nel segmento delle supersportive ibride. Il cuore pulsante è rappresentato da un powertrain rivoluzionario che abbina un inedito V8 biturbo, progettato e sviluppato interamente in-house, a tre unità elettriche per una potenza complessiva di 920 CV. Il motore termico stabilisce un primato assoluto nella categoria, essendo il primo propulsore di serie capace di raggiungere 10.000 giri/min, offrendo al pilota una sensazione di progressione illimitata. Le prestazioni sono da riferimento: velocità massima superiore ai 340 km/h e accelerazione 0-100 km/h in 2,7 secondi. Il CEO Stephan Winkelmann evidenzia come ogni nuova Lamborghini debba superare la precedente in performance mantenendo sostenibilità ambientale. L\'architettura tecnica include un telaio completamente nuovo in lega di alluminio ad alta resistenza che incrementa significativamente la rigidezza torsionale, mentre l\'aerodinamica raggiunge nuovi livelli di efficienza coniugata al design iconico del marchio.',
      'lungo-social': '🤯 OMG! La nuova Lamborghini Temerario è letteralmente SPAZIALE! 🚀✨\n\n🔥 POTENZA MOSTRUOSA:\n• 920 CV di pura follia ibrida!\n• V8 biturbo + 3 motori elettrici\n• Primo motore di SERIE a toccare 10.000 rpm!\n\n⚡ PRESTAZIONI ALIENE:\n• 0-100 km/h in 2,7 secondi (WHAT?!)\n• Velocità max oltre 340 km/h\n• Telaio in alluminio ultra-tech\n\n🌍 STORIA FATTA:\nLamborghini è il PRIMO marchio luxury al mondo con gamma 100% elettrificata! Dopo Revuelto e Urus SE, ora anche Temerario! 🏆\n\nIl CEO dice: "Ogni nuova Lambo deve essere più potente E più sostenibile della precedente" - MISSION ACCOMPLISHED! 💪\n\nIl design? Ovviamente ILLEGALE! 😍 Sant\'Agata Bolognese ha fatto centro ancora una volta! #Lamborghini #Temerario #HybridBeast #ElectricRevolution'
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
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              minWidth: '140px',
              opacity: isLoading ? 0.7 : 1,
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onClick={generateSummary}
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
              backgroundColor="rgba(40, 167, 69, 0.8)"
            >
              📋 Copia
            </OptionButton>
            <OptionButton
              onClick={downloadPDF}
              isActionButton={true}
              backgroundColor="rgba(220, 53, 69, 0.8)"
            >
              📄 Download TXT
            </OptionButton>
            <OptionButton
              onClick={generateSummary}
              isActionButton={true}
              backgroundColor="rgba(108, 117, 125, 0.8)"
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