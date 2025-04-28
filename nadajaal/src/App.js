// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import FrequencySlider from './components/FrequencySlider';

const App = () => {
  const [leftFreq, setLeftFreq] = useState(200);
  const [rightFreq, setRightFreq] = useState(210);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const leftOscillator = useRef(null);
  const rightOscillator = useRef(null);

  useEffect(() => {
    setAudioContext(new (window.AudioContext || window.webkitAudioContext)());
  }, []);

  const startOscillators = () => {
    if (!audioContext) return;

    leftOscillator.current = audioContext.createOscillator();
    leftOscillator.current.frequency.setValueAtTime(leftFreq, audioContext.currentTime);
    leftOscillator.current.connect(audioContext.destination);

    rightOscillator.current = audioContext.createOscillator();
    rightOscillator.current.frequency.setValueAtTime(rightFreq, audioContext.currentTime);
    rightOscillator.current.connect(audioContext.destination);

    leftOscillator.current.start();
    rightOscillator.current.start();
  };

  const stopOscillators = () => {
    if (leftOscillator.current && rightOscillator.current) {
      leftOscillator.current.stop();
      rightOscillator.current.stop();
    }
  };

  const playBinauralBeats = () => {
    if (!isPlaying) {
      startOscillators();
      setIsPlaying(true);
    }
  };

  const pauseBinauralBeats = () => {
    if (isPlaying) {
      stopOscillators();
      setIsPlaying(false);
    }
  };

  const handleFrequencyChange = (e, setFreq) => {
    const value = parseInt(e.target.value, 10);
    setFreq(value);
    if (isPlaying) {
      stopOscillators();
      startOscillators();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nadajaal</h1>
      <FrequencySlider
        label="Left Frequency"
        value={leftFreq}
        onChange={(e) => handleFrequencyChange(e, setLeftFreq)}
      />
      <FrequencySlider
        label="Right Frequency"
        value={rightFreq}
        onChange={(e) => handleFrequencyChange(e, setRightFreq)}
      />
      <div style={styles.controls}>
        <button
          onClick={isPlaying ? pauseBinauralBeats : playBinauralBeats}
          style={styles.button}
        >
          {isPlaying ? 'Pause' : 'Play'} Binaural Beats
        </button>
      </div>
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
  controls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
