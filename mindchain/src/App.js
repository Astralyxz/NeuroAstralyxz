import React, { useState } from 'react';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState('');

  const handleEntry = () => {
    if (!input.trim()) return;
    const mood = analyzeMood(input);
    const now = new Date().toLocaleString();
    const entry = {
      text: input,
      mood,
      timestamp: now,
      badge: generateBadge(mood)
    };
    setEntries([entry, ...entries]);
    setInput('');
  };

  const analyzeMood = (text) => {
    const t = text.toLowerCase();
    if (t.includes('estresado') || t.includes('ansioso')) return 'Ansiedad';
    if (t.includes('feliz') || t.includes('tranquilo')) return 'Calma';
    if (t.includes('triste') || t.includes('solo')) return 'Tristeza';
    return 'Neutral';
  };

  const generateBadge = (mood) => {
    const date = new Date().toLocaleDateString();
    switch (mood) {
      case 'Ansiedad': return `🌪️ Superando ansiedad – ${date}`;
      case 'Calma': return `🌤️ Día de calma – ${date}`;
      case 'Tristeza': return `💧 Procesando emociones – ${date}`;
      default: return `🌀 Registro emocional – ${date}`;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🧠 MIND•CHAIN</h1>
        <p>Bitácora emocional inteligente</p>
      </header>

      <main>
        <textarea
          placeholder="¿Cómo te sientes hoy? Escribe libremente..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button onClick={handleEntry}>Registrar entrada</button>

        <section className="entries">
          {entries.map((entry, idx) => (
            <div key={idx} className={`entry ${entry.mood.toLowerCase()}`}>
              <h3>{entry.badge}</h3>
              <p>{entry.text}</p>
              <small>{entry.timestamp} · Estado: {entry.mood}</small>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
