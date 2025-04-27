
import React, { useState, useEffect } from 'react';

const App = () => {
  const [leftFreq, setLeftFreq] = useState(200); 
  const [rightFreq, setRightFreq] = useState(210); 
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    setAudioContext(new (window.AudioContext || window.webkitAudioContext)());
  }, []);

  const playBinauralBeats = () => {
    if (!audioContext) return;

    const leftOscillator = audioContext.createOscillator();
    leftOscillator.frequency.setValueAtTime(leftFreq, audioContext.currentTime);
    leftOscillator.connect(audioContext.destination);

    const rightOscillator = audioContext.createOscillator();
    rightOscillator.frequency.setValueAtTime(rightFreq, audioContext.currentTime);
    rightOscillator.connect(audioContext.destination);

    leftOscillator.start();
    rightOscillator.start();

    setTimeout(() => {
      leftOscillator.stop();
      rightOscillator.stop();
    }, 60000); 
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nadajaal</h1>
      <div style={styles.frequencyInputs}>
        <label style={styles.label}>Left Frequency: {leftFreq} Hz</label>
        <input
          type="range"
          min="100"
          max="1000"
          value={leftFreq}
          onChange={(e) => setLeftFreq(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Right Frequency: {rightFreq} Hz</label>
        <input
          type="range"
          min="100"
          max="1000"
          value={rightFreq}
          onChange={(e) => setRightFreq(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={playBinauralBeats} style={styles.button}>Play Binaural Beats</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#121212',
    color: '#fff',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  frequencyInputs: {
    marginBottom: '20px',
  },
  label: {
    margin: '5px',
    fontSize: '1.2rem',
  },
  input: {
    width: '200px',
    marginBottom: '10px',
  },
  button: {
    padding: '15px 30px',
    backgroundColor: '#1c1c1c',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '1rem',
  },
};

export default App;
            